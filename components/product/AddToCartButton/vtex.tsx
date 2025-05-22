import { useCart } from 'apps/vtex/hooks/useCart.ts'
import Button, { type Props as BtnProps } from './common.tsx'

export interface Props extends Omit<BtnProps, 'onAddItem'> {
	seller: string
	productID: string
	quantity: number
	buttonSize?: 'full' | 'auto'
}

function AddToCartButton(
	{ seller, productID, eventParams, quantity, buttonSize = 'auto' }: Props,
) {
	const { addItems } = useCart()
	const onAddItem = async () => {
		await addItems({
			orderItems: [{
				id: productID,
				seller: seller,
				quantity,
			}],
		})
	}

	return (
		<Button
			onAddItem={onAddItem}
			eventParams={eventParams}
			buttonSize={buttonSize}
		/>
	)
}

export default AddToCartButton
