import { itemToAnalyticsItem, useCart } from 'apps/vtex/hooks/useCart.ts'
import Button from './common.tsx'

export interface Props {
	type?: 'menu' | 'header'
	size?: 'sm' | 'md' | 'lg'
}

function CartButton({ type = 'header', size = 'md' }: Props) {
	const { loading, cart } = useCart()
	const {
		totalizers = [],
		items = [],
		marketingData,
		storePreferencesData,
	} = cart.value ?? {}
	const coupon = marketingData?.coupon ?? undefined
	const currency = storePreferencesData?.currencyCode ?? 'BRL'
	const total = totalizers.find((item) => item.id === 'Items')?.value ?? 0
	const discounts = totalizers.find((item) => item.id === 'Discounts')?.value ??
		0

	return (
		<Button
			type={type}
			size={size}
			currency={currency}
			loading={loading.value}
			total={(total - discounts) / 100}
			items={items.map((item, index) => itemToAnalyticsItem({ ...item, coupon }, index))}
		/>
	)
}

export default CartButton
