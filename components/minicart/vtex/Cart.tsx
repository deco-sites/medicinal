import { invoke } from 'site/runtime.ts'
import { useSignal } from '@preact/signals'
import type { Product } from 'apps/commerce/types.ts'
import { itemToAnalyticsItem, useCart } from 'apps/vtex/hooks/useCart.ts'
import BaseCart from '../common/Cart.tsx'

interface Props {
	freeShippingTarget: number
}

function Cart({ freeShippingTarget }: Props) {
	const fullProducts = useSignal<Product[]>([])
	const { cart, loading, updateItems, addCouponsToCart } = useCart()
	const { items = [], totalizers = [] } = cart.value ?? {}
	const cartItemsLength = useSignal(0)
	const total = totalizers?.find((item) => item.id === 'Items')?.value || 0
	const discounts = totalizers?.find((item) => item.id === 'Discounts')?.value || 0
	const locale = cart.value?.clientPreferencesData.locale ?? 'pt-BR'
	const currency = cart.value?.storePreferencesData.currencyCode ?? 'BRL'
	const coupon = cart.value?.marketingData?.coupon ?? undefined

	if (items.length !== cartItemsLength.value) {
		cartItemsLength.value = items.length

		if (items.length > 0) {
			invoke.vtex.loaders.intelligentSearch.productList({
				props: {
					ids: items.map((item) => item.id),
				},
			}).then((products) => {
				fullProducts.value = products || [] as Product[]
			})
		}
	}

	return (
		<BaseCart
			fullProducts={fullProducts.value}
			items={items}
			total={(total - discounts) / 100}
			subtotal={total / 100}
			discounts={discounts / 100}
			locale={locale}
			currency={currency}
			loading={loading.value}
			freeShippingTarget={freeShippingTarget}
			coupon={coupon}
			onAddCoupon={(text) => addCouponsToCart({ text })}
			onUpdateQuantity={(quantity, index) => updateItems({ orderItems: [{ index, quantity }] })}
			itemToAnalyticsItem={(index) => {
				const item = items[index]

				return item && itemToAnalyticsItem({ ...item, coupon }, index)
			}}
			checkoutHref='/checkout'
		/>
	)
}

export default Cart
