import type { Product as ProductCommerce } from 'apps/commerce/types.ts'
import { scriptAsDataURI } from 'apps/utils/dataURI.ts'
import { InsiderProduct, InsiderTrackingProps, InsiderTrackingSectionProps, User, UserAPI } from './types.ts'
import { OrderForm } from 'apps/vtex/utils/types.ts'

const categoriesToArray = (categories: { [key: string]: string }) => {
  return Object.keys(categories).map((key) => categories[key])
}

export const setInsiderBasket = (orderForm: OrderForm | null) => {
  if (!orderForm) return

  const subtotal = orderForm.totalizers.find((item) => item.id === 'Items')?.value ?? 0
  const discounts = orderForm.totalizers.find((item) => item.id === 'Discounts')?.value ?? 0
  const total = subtotal - Math.abs(discounts)

  const line_items = orderForm.items.map((item) => {
    return {
      product: {
        id: item.productId,
        name: item.name,
        taxonomy: categoriesToArray(item.productCategories),
        currency: orderForm.storePreferencesData?.currencyCode ?? 'BRL',
        unit_price: parseFloat((item.price / 100).toFixed(2)) ?? 0,
        unit_sale_price: parseFloat((item.sellingPrice / 100).toFixed(2)) ?? 0,
        url: `${window.location.origin}${item.detailUrl}`,
        product_image_url: item.imageUrl,
      },
      subtotal: parseFloat((item.sellingPrice * item.quantity / 100).toFixed(2)),
      quantity: item.quantity,
    }
  })

  const data = {
    currency: orderForm.storePreferencesData?.currencyCode ?? 'BRL',
    total: parseFloat((total / 100).toFixed(2)),
    line_items,
  }

  if (!globalThis.window.insider_object) globalThis.window.insider_object = {}
  globalThis.window.insider_object.page = { type: 'Basket' }
  globalThis.window.insider_object.basket = { ...data }
}

export const extractProductData = (product: ProductCommerce): InsiderProduct => {
  const PIX_DISCOUNT = 0.03
  const SALE_PRICE =
    product.offers?.offers[0].priceSpecification.find((priceSpecification) =>
      priceSpecification.priceType === 'https://schema.org/SalePrice' &&
      priceSpecification.priceComponentType !== 'https://schema.org/Installment'
    )?.price ?? 0

  const PIX_PRICE = parseFloat((SALE_PRICE - (SALE_PRICE * PIX_DISCOUNT)).toFixed(2))

  return {
    id: product.productID,
    name: product.name,
    taxonomy: product.category?.split('>'),
    currency: product.offers?.priceCurrency,
    unit_price: product.offers?.offers[0].priceSpecification.find((priceSpecification) =>
      priceSpecification.priceType === 'https://schema.org/ListPrice'
    )?.price,
    unit_sale_price: PIX_PRICE,
    url: product.url,
    stock: product.offers?.offers[0].inventoryLevel.value,
    product_image_url: product.image?.[0].url,
  }
}

const InsiderTrackingSection = ({ pageType, data }: InsiderTrackingProps) => {
  const scriptContent = async (_id: string, { pageType, data }: InsiderTrackingProps) => {
    const getUser = async () => {
      try {
        const response = await fetch(
          '/api/io/safedata/CL/search?_fields=id,birthDate,email,gender,firstName,lastName,gdpr_optin,isNewsletterOptIn,homePhone,whatsappOptIn',
        )
        const users = await response.json() as UserAPI[]

        if (users.length > 0) {
          const userApi = users[0]
          const birthday = userApi?.birthDate ? new Date(userApi.birthDate).toISOString().split('T')[0] : ''

          const user = {
            uuid: userApi?.id || '',
            gender: userApi?.gender || '',
            name: userApi?.firstName || '',
            surname: userApi?.lastName || '',
            email: userApi?.email || '',
            language: 'pt_BR' || '',
            gdpr_optin: userApi?.gdpr_optin || true,
            email_optin: userApi?.isNewsletterOptIn || false,
            birthday,
            phone_number: userApi?.homePhone || '',
            whatsapp_optin: userApi?.whatsappOptIn || false,
          }

          return user
        }

        return null
      } catch (_error) {
        return null
      }
    }

    const user = await getUser()

    // deno-lint-ignore no-explicit-any
    const setInsiderObject = (pageType: string, data: any, user: User | null) => {
      globalThis.window.insider_object = globalThis.window.insider_object || {}
      globalThis.window.insider_object.page = { type: pageType }
      if (user) globalThis.window.insider_object.user = user
      if (pageType === 'Product') globalThis.window.insider_object.product = data
      if (pageType === 'Category' || pageType === 'Search') globalThis.window.insider_object.listing = { items: data }
    }

    const setInsiderTag = () => {
      const head = document.head
      const script = document.createElement('script')
      script.async = true
      script.src = '//truesource.api.useinsider.com/ins.js?id=10010490'
      head && head.appendChild(script)
    }

    setInsiderObject(pageType, data, user)
    localStorage.setItem('insider_object_page_type', pageType)
    setInsiderTag()
  }

  return (
    <script
      src={scriptAsDataURI(scriptContent, 'insider-tracking', { pageType, data })}
    />
  )
}

export const loader = (props: InsiderTrackingSectionProps) => {
  if (!props.currentPage) return { ...props }
  const { currentPage } = props
  const currentPageType = currentPage?.['@type']

  if (currentPageType === 'ProductDetailsPage') {
    const data = extractProductData(currentPage.product)
    return { pageType: 'Product', data }
  }

  if (currentPageType === 'ProductListingPage') {
    const isSearchPage = currentPage.pageInfo.pageTypes?.includes('Search')
    const pageType = isSearchPage ? 'Search' : 'Category'
    const data = currentPage.products.map(extractProductData)
    return { pageType, data }
  }

  return { pageType: currentPageType, data: null }
}

export default InsiderTrackingSection
