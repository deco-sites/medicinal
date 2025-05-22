import { useCart } from 'apps/vtex/hooks/useCart.ts'
import { useEffect } from 'preact/hooks'
import { setInsiderBasket } from 'site/sections/Insider/InsiderTracking.tsx'
import { useUI } from 'site/sdk/useUI.ts'

const OrderTracking = () => {
	const { displayCart } = useUI()
	const { cart } = useCart()

	useEffect(() => {
		if (cart.value && displayCart.value === true) setInsiderBasket(cart.value)
		if (!displayCart.value) {
			const localPageType = localStorage.getItem('insider_object_page_type') ?? 'Content'
			if (!globalThis.window.insider_object) globalThis.window.insider_object = {}
			globalThis.window.insider_object.page = { type: localPageType }
		}
	}, [cart.value, displayCart.value])

	return null
}

export default OrderTracking
