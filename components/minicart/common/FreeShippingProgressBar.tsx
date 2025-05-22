import { formatPrice } from 'site/sdk/format.ts'

interface Props {
	total: number
	target: number
	locale: string
	currency: string
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
	const remaining = target - total
	const percent = Math.floor((total / target) * 100)

	return (
		<div class='flex flex-col gap-4 w-full'>
			<div class='w-full h-2 rounded-full bg-[#8e8e8d] overflow-hidden'>
				<div
					class='h-2 rounded-full bg-[#8cbf3c]'
					style={{ width: `${percent}%` }}
				/>
			</div>
			<div class='flex justify-center items-center gap-2 text-primary'>
				{remaining > 0
					? (
						<span class='font-bold text-dark text-xs md:text-sm md:leading-4'>
							Faltam {formatPrice(remaining, currency, locale)} para frete grátis!
						</span>
					)
					: (
						<span class='font-bold text-dark text-xs md:text-sm md:leading-4'>
							Você ganhou frete grátis!
						</span>
					)}
			</div>
		</div>
	)
}

export default FreeShippingProgressBar
