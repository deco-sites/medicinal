import Breadcrumb from 'site/components/ui/Breadcrumb.tsx'
import ProductStars from 'site/components/product/ProductStars.tsx'
import GallerySlider from './Gallery/ImageSlider.tsx'
import AddToCartArea from 'site/islands/AddToCartArea.tsx'
import ProductSimilars from 'site/islands/Product/ProductSimilars.tsx'
import ShippingSimulation from 'site/islands/ShippingSimulation.tsx'
import WishlistButtonVtex from '../../islands/WishlistButton/vtex.tsx'

import { useId } from 'site/sdk/useId.ts'
import { useOffer } from 'site/sdk/useOffer.ts'
import { type ProductDetailsPage } from 'apps/commerce/types.ts'
import { mapProductToAnalyticsItem } from 'apps/commerce/utils/productToAnalyticsItem.ts'
import { SendEventOnViewIsland } from 'site/islands/Product/SendEventOnViewIsland.tsx'

interface Props {
	page: ProductDetailsPage | null
	isMobile: boolean
}

interface ProductDataProps {
	name: string
	brandName: string
	productID: string
	productGroupID: string
	isMobile: boolean
}

function ProductData({
	name,
	productID,
	productGroupID,
	brandName,
	isMobile,
}: ProductDataProps) {
	return (
		<>
			{/* Code and name */}
			<div class='flex items-center gap-4 justify-between'>
				<h1>
					<span class='font-semibold text-base sm:text-2xl uppercase '>
						{name}
					</span>
				</h1>
				{!isMobile && (
					<>
						<ProductStars storeId='113397' productId={productGroupID} />

						<WishlistButtonVtex
							variant='full'
							productID={productID}
							productGroupID={productGroupID}
							isMobile={isMobile}
						/>
					</>
				)}
			</div>
			{/* Brand */}
			<div class='flex items-center justify-between'>
				<span class='text-sm sm:text-base font-medium color-dark sm:text-light-gray'>
					{brandName}
				</span>

				{isMobile && (
					<>
						<ProductStars storeId='113397' productId={productGroupID} />

						<WishlistButtonVtex
							variant='full'
							productID={productID}
							productGroupID={productGroupID}
							isMobile={isMobile}
						/>
					</>
				)}
			</div>
			{/* Divider */}
			<div class='hidden sm:block border-b border-light-gray-200 w-full' />
		</>
	)
}

function ProductInfo({ page, isMobile }: Props) {
	const id = useId()

	if (page === null) {
		throw new Error('Missing Product Details Page Info')
	}

	const { breadcrumbList, product } = page

	const {
		productID,
		brand: {
			// @ts-ignore - brandName exists
			name: brandName,
		},
		offers,
		isVariantOf,
	} = product
	if (!isVariantOf) return null
	const {
		name: productName = '',
		additionalProperty: currentVariantProperties = [],
	} = isVariantOf
	if (!offers) return null
	const { price = 0, listPrice, seller = '1' } = useOffer(offers) || {}
	const productGroupID = isVariantOf?.productGroupID ?? ''
	const breadcrumb = {
		...breadcrumbList,
		itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
		numberOfItems: breadcrumbList.numberOfItems - 1,
	}

	const eventItem = mapProductToAnalyticsItem({
		product,
		breadcrumbList: breadcrumb,
		price,
		listPrice,
	})

	return (
		<div
			class='flex flex-col min-[1000px]:flex-row gap-6 md:gap-8 mb-14'
			id={id}
		>
			<div class='flex-none order-2 sm:order-1 max-[1000px]:w-full max-[1280px]:w-[500px] w-[664px] mx-auto'>
				<GallerySlider page={page} />
			</div>
			{isMobile && (
				<div class='flex flex-col gap-y-4 order-1 sm:order-2 pt-1'>
					<Breadcrumb itemListElement={breadcrumb.itemListElement} />
					<ProductData
						name={productName}
						brandName={brandName}
						productID={productID}
						productGroupID={productGroupID}
						isMobile={isMobile}
					/>
				</div>
			)}
			<div class='flex flex-col gap-y-4 order-3'>
				{!isMobile && (
					<div class='flex flex-col gap-y-4'>
						<Breadcrumb itemListElement={breadcrumb.itemListElement} />
						<ProductData
							name={productName}
							brandName={brandName}
							productID={productID}
							productGroupID={productGroupID}
							isMobile={isMobile}
						/>
					</div>
				)}
				{/* Sku Selector */}
				<ProductSimilars product={product} current={currentVariantProperties} />
				{/* Add to Cart and Favorites button | Prices */}
				<AddToCartArea
					product={product}
					breadcrumbList={breadcrumbList}
					price={price}
					listPrice={listPrice}
				/>
				{/* Shipping Simulation */}
				<ShippingSimulation
					items={[
						{
							id: Number(product.sku),
							quantity: 1,
							seller: seller,
						},
					]}
				/>
				{/* Analytics Event */}
				{
					/* <SendEventOnView
					id={id}
					event={{
						name: "view_item",
						params: {
							item_list_id: "product",
							item_list_name: "Product",
							items: [eventItem],
						},
					}}
				/> */
				}
				<SendEventOnViewIsland
					id={id}
					event={{
						name: 'view_item',
						params: {
							item_list_id: 'product',
							item_list_name: 'Product',
							items: [eventItem],
						},
					}}
				/>
			</div>
		</div>
	)
}

export default ProductInfo
