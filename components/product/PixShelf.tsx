import { formatPrice } from 'site/sdk/format.ts'

export type Props = {
	sellingPrice: number
	quantity: number
}

/**
 * PixShelf Component
 * #0624-000223 - On Going
 *
 * This component displays the price with a PIX discount on the shelf.
 *
 * Note: The current discount logic in this code is hardcoded and not linked to promotions.
 * The discount is applied using a fixed discount rate (PIX_DISCOUNT).
 *
 * Warning: The customer may request an improvement to this component in the future
 * to base the price on promotions provided by an API.
 */

const PIX_DISCOUNT = 0.03

function calculatePrice(sellingPrice: number, quantity: number): number {
	const total = (sellingPrice - (sellingPrice * PIX_DISCOUNT)) * quantity
	return total
}

export const PixShelf = ({
	sellingPrice,
	quantity,
}: Props) => {
	const price = calculatePrice(sellingPrice, quantity)

	return (
		<span class='text-dark text-xs lg:text-sm'>
			{formatPrice(price, 'BRL')}
		</span>
	)
}
