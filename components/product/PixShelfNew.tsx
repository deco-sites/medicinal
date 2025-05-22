import { formatPrice } from 'site/sdk/format.ts'

export type Props = {
	sellingPrice: number
	quantity: number
	layout?: '01' | '02'
}

const PIX_DISCOUNT = 0.03

function calculatePrice(sellingPrice: number, quantity: number): number {
	const total = (sellingPrice - (sellingPrice * PIX_DISCOUNT)) * quantity
	return total
}

export const PixShelfNew = ({
	sellingPrice,
	quantity,
	layout = '01',
}: Props) => {
	const price = calculatePrice(sellingPrice, quantity)

	if (layout == '01') {
		return (
			<span class='text-dark text-xs leading-none'>
				{formatPrice(price, 'BRL')} sem assinatura
			</span>
		)
	}

	if (layout == '02') {
		return (
			<span class='text-dark text-xs leading-none'>
				<span className='text-base leading-none font-semibold'>{formatPrice(price, 'BRL')}</span> sem assinatura
			</span>
		)
	}

	return null
}
