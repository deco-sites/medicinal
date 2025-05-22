import type { Product } from 'apps/commerce/types.ts'
import Image from 'apps/website/components/Image.tsx'
import { PixShelf } from 'site/components/product/PixShelf.tsx'
import ProductCardBuy from 'site/components/product/ProductCardBuy.tsx'
import ProductStarCard from 'site/components/product/ProductStarCard.tsx'
import { SealConfig } from 'site/loaders/seals.tsx'
import c from 'site/sdk/c.ts'
import { formatPrice } from 'site/sdk/format.ts'
import { relative } from 'site/sdk/url.ts'
import { useOffer } from 'site/sdk/useOffer.ts'
import WishlistButtonVtex from '../../islands/WishlistButton/vtex.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { mapProductToAnalyticsItem } from 'apps/commerce/utils/productToAnalyticsItem.ts'

type Props =
	& {
		/** Preload card image */
		preload?: boolean
		isMobile: boolean
		price: number
		listPrice: number
		seller: string
		isAvailable: boolean
		productGroupID?: string
		canBuyWithSubscription?: boolean
		priceCurrency?: string
		image: string
		alt: string
		seals: SealConfig[]
	}
	& Pick<
		Product,
		'url' | 'productID' | 'name' | 'brand' | "category"
	>

const WIDTH = 350
const HEIGHT = 350

export default function ProductCard({
	preload,
	isMobile,
	url,
	productID,
	name,
	image,
	alt,
	priceCurrency,
	productGroupID,
	price,
	listPrice,
	seller,
	isAvailable,
	canBuyWithSubscription,
	seals,
	brand,
	category
}: Props) {
	const id = `product-card-${productID}`

	const discountPercentage = Math.round(
		((listPrice - price) / listPrice) * 100,
	)

	const subscriptionDiscount = listPrice * 0.20

	const eventItem = mapProductToAnalyticsItem({
		product: {
			productID,
			name,
			brand,
			category
		} as Product,
		price,
		listPrice,
	})

	return (
		<div
			id={id}
			data-deco='view-product'
			class='w-full lg:max-w-[260px]'
		>
			<figure class='relative overflow-hidden aspect-[13/15] flex justify-center items-center rounded-[20px]'>
				{/* Wishlist button */}
				<div class='absolute top-4 right-4 z-[9] flex items-center'>
					<WishlistButtonVtex
						productGroupID={productGroupID}
						productID={productID}
						isMobile={isMobile}
					/>
				</div>

				<div class='absolute top-2.5 left-2.5 flex flex-col items-start gap-2 z-[1]'>
					{canBuyWithSubscription
						? (
							<div class='rounded-full bg-green text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap'>
								20% OFF
							</div>
						)
						: (
							<>
								{!!seals?.length && seals.map((seal) => {
									const sizes = seal?.size?.split('x')

									return (
										<div
											class={c(
												'flex items-center text-xs font-bold px-2 py-2 rounded-full whitespace-nowrap',
												!seal.image && 'px-3 py-1.5 max-w-fit',
											)}
											style={{
												backgroundColor: seal?.bgColor ?? 'transparent',
												color: seal?.color ?? '#3c3c3b',
												backgroundRepeat: 'no-repeat',
												backgroundSize: 'contain',
												width: seal.image && sizes?.[0] && `${sizes[0]}px`,
												height: seal.image && sizes?.[1] && `${sizes[1]}px`,
											}}
										>
											{seal?.image ? <img src={seal.image} alt='' /> : seal?.label}
										</div>
									)
								})}

								{/* Discount % */}
								{listPrice && price && discountPercentage > 0 && (
									<div class='rounded-full bg-green text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap'>
										{discountPercentage}% OFF
									</div>
								)}
							</>
						)}
				</div>

				{/* Product Images */}
				<a
					href={url && relative(url)}
					class='flex items-center justify-center relative h-full bg-ice'
					aria-label='view product'
				>
					<Image
						src={image}
						alt={alt}
						width={WIDTH}
						height={HEIGHT}
						class='mix-blend-multiply z-[1] bg-ice'
						sizes='(max-width: 640px) 50vw, 20vw'
						preload={preload}
						loading={preload ? 'eager' : 'lazy'}
						decoding='async'
					/>
					<div class='absolute bg-ice w-full h-full top-0 left-0 z-0' />
				</a>

        <div className='custom-text-price-sale hidden absolute bottom-0 w-full flex justify-center py-2 text-xs leading-none font-bold text-white bg-gradient-to-r from-[#f137a6] to-[#ff4632]'>
          ECONOMIZE {formatPrice(listPrice - price, priceCurrency)}
        </div>
			</figure>
			{/* Prices & Name */}
			<div class='flex-auto flex flex-col gap-2 lg:px-4 lg:gap-4 mt-4'>
				<h3 class='text-dark text-sm text-ellipsis font-bold line-clamp-2 h-10'>
					{name}
				</h3>

				{/* Price and rating */}
				<div id='product-card-new-option-00' class='flex gap-2 h-7 lg:h-6'>
					{canBuyWithSubscription
						? (
							<div class='flex flex-col gap-x-2 lg:flex-row justify-center'>
								<div class='line-through text-gray text-xs lg:text-sm'>
									{formatPrice(price, priceCurrency)}
								</div>
								<div class='text-dark text-xs lg:text-sm'>
									{formatPrice(listPrice - subscriptionDiscount, priceCurrency)}
								</div>
							</div>
						)
						: (
							<div class='flex flex-col gap-x-2 lg:flex-row justify-center'>
								{listPrice > price && (
									<div class='line-through text-gray text-xs lg:text-sm'>
										{formatPrice(listPrice, priceCurrency)}
									</div>
								)}
								{price && (
									<span class='text-dark text-xs lg:text-sm'>
										{formatPrice(price, 'BRL')}
									</span>
								)}
								{/* {price && <PixShelf sellingPrice={price} quantity={1} />} */}
							</div>
						)}

					<div class='ml-auto'>
						<ProductStarCard
							storeId='113397'
							productId={productGroupID ?? ''}
						/>
					</div>
				</div>

				<ProductCardBuy
					productID={productID}
					seller={seller}
					listPrice={listPrice}
					price={price}
					canBuyWithSubscription={canBuyWithSubscription}
					isAvailable={isAvailable}
					isMobile={isMobile}
					eventItems={eventItem}
				/>
			</div>
		</div>
	)
}

export function productToProductCardProps(
	{ product, isMobile, showOnlySubscription, seals }: {
		product: Product
		isMobile: boolean
		showOnlySubscription?: boolean
		seals: SealConfig[]
	},
) {
	const {
		productID,
		name,
		image,
		offers,
		isVariantOf,
		additionalProperty,
	} = product
	const { price = 0, listPrice = 0, seller = '1', availability } = useOffer(offers) || {}

	const productGroupID = isVariantOf?.productGroupID

	const filteredSeals = seals?.reduce((acc, seal) => {
		const matcherType = seal.matcherType
		const matcherTypeId = seal.matcherTypeId?.toString()
		if (!matcherType || !matcherTypeId) return [...acc]

		if (matcherType === 'product' && matcherTypeId === productID) return [...acc, seal]

		const filter = additionalProperty?.some((add) => matcherType === add.name && matcherTypeId === add.propertyID)
		if (filter) return [...acc, seal]
		return [...acc]
	}, [] as SealConfig[])

	const canBuyWithSubscription = additionalProperty?.some(
		({ name }) => name === 'activeSubscriptions',
	)

	if (product.url) {
		const url = new URL(product.url)

		url.searchParams.delete('skuId')

		product.url = url.href
	}

	return {
		isMobile: isMobile,
		url: product.url,
		productID: productID,
		name: name,
		image: image?.[0].url ?? '',
		alt: image?.[0].alternateName ?? '',
		price: price,
		listPrice: listPrice,
		seller: seller,
		isAvailable: availability === 'https://schema.org/InStock',
		productGroupID: productGroupID,
		canBuyWithSubscription: canBuyWithSubscription && showOnlySubscription,
		priceCurrency: offers?.priceCurrency,
		seals: filteredSeals,
		brands: product.brand,
		category:product.category
	}
}
