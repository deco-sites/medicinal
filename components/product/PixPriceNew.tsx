import { useEffect, useState } from 'preact/hooks'
import { formatPrice } from 'site/sdk/format.ts'
import type { SubscriptionOptions } from 'site/components/product/Subscription.tsx'

export type Props = {
	sellingPrice: number
	productId: string
	listPrice: number
	quantity: number
	subscription?: SubscriptionOptions
}

const PIX_DISCOUNT = 0.03
const KIT_DISCOUNT = 0.03

export default function PixPriceNew({
	sellingPrice,
	productId,
	listPrice,
	quantity,
	subscription = 'none',
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
				<span
					class={`font-lemon-milk leading-none ${
						subscription == 'none' ? 'text-3xl text-dark font-bold' : 'text-sm text-[#A6A6A5] font-semibold'
					}`}
				>
					{formatPrice(price, 'BRL')}
				</span>
			)}
		</>
	)
}
