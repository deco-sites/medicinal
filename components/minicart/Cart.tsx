import CartVTEX from 'site/components/minicart/vtex/Cart.tsx'

function Cart({ freeShippingTarget }: { freeShippingTarget: number }) {
	return <CartVTEX freeShippingTarget={freeShippingTarget} />
}

export default Cart
