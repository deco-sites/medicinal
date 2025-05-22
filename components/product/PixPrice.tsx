import { useCart } from 'apps/vtex/hooks/useCart.ts'
import { useEffect, useState } from 'preact/hooks'
import { formatPrice } from 'site/sdk/format.ts'

export type Props = {
	sellingPrice: number
	productId: string
	listPrice: number
	quantity: number
}

const PIX_DISCOUNT = 0.03
const KIT_DISCOUNT = 0.03

export default function PixPrice({
	sellingPrice,
	productId,
	listPrice,
	quantity,
}: Props) {
	const [price, setPrice] = useState<number | null>(null)

	useEffect(() => {
		let pixTotal = (sellingPrice - (sellingPrice * PIX_DISCOUNT)) * quantity
		if (quantity >= 3) {
			const aux = pixTotal
			pixTotal = aux - (aux * KIT_DISCOUNT)
		}
		setPrice(pixTotal)
	}, [quantity])

	return (
		<>
			{price !== null && (
				<span class='font-bold text-base sm:text-2xl font-lemon-milk'>
					{formatPrice(price, 'BRL')}
				</span>
			)}
		</>
	)
}
