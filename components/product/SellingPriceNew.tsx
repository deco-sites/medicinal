import { useCart } from 'apps/vtex/hooks/useCart.ts'
import { formatPrice } from 'site/sdk/format.ts'
import { useEffect, useState } from 'preact/hooks'
import type { SubscriptionOptions } from 'site/components/product/Subscription.tsx'

export type Props = {
	sellingPrice: number
	listPrice: number
	productId: string
	quantity: number
	type?: 'subscription' | 'productInfo'
	subscription?: SubscriptionOptions
}

interface Installment {
	value: number
	price: number
	installments: Array<{
		value: number
	}>
	paymentGroupName: string
}

const installmentToString = (
	installment: Installment,
	sellingPrice: number,
	productId?: string,
) => {
	const billingDuration = installment.installments.length
	const billingIncrement = installment.installments[billingDuration - 1].value
	const price = installment.value

	const withTaxes = sellingPrice < price

	const priceFormat = productId === '3810' ? 0.01 : billingIncrement / 100

	return `<strong>${billingDuration}x</strong> de <strong>${formatPrice(priceFormat, 'BRL')}</strong> ${
		withTaxes ? 'com juros' : 'sem juros'
	}`
}

export default function SellingPriceNew({
	sellingPrice,
	listPrice,
	productId,
	quantity,
	type = 'productInfo',
	subscription = 'none',
}: Props) {
	const { simulate } = useCart()
	const [price, setPrice] = useState<number | null>(null)
	const [installment, setInstallment] = useState(null)

	useEffect(() => {
		const getData = async () => {
			const id = Number.parseInt(productId)
			const response = await simulate({
				items: [{
					id,
					quantity,
					seller: '1',
				}],
				postalCode: '89218220',
				country: 'BRA',
				RnbBehavior: 0,
			})

			const total = response.totals.reduce((prev, curr) => {
				return prev + curr.value
			}, 0)
			// console.log("response", response);
			if (productId === '3810') {
				setPrice(0.01)
			} else {
				setPrice(total / 100)
			}

			// @ts-ignore Type InstallmentOptions is not assignable to type Installment
			const installmentOptions: Installment[] = response.paymentData.installmentOptions

			const installments = installmentOptions.reduce((
				prev: null | Installment,
				curr: Installment,
			) => {
				if (curr.paymentGroupName !== 'creditCardPaymentGroup') {
					return prev
				}

				if (!prev) {
					return curr
				}

				if (prev.value < total) return curr
				if (curr.value < total) return prev

				if (prev.value > curr.value) {
					return curr
				}

				if (prev.price < curr.price) {
					return prev
				}

				if (prev.installments.length && curr.installments.length) {
					if (prev.installments.length < curr.installments.length) {
						return curr
					}
				}

				return prev
			}, null)
			// @ts-ignore installments is checked

			const installmentString = installmentToString(installments, total, productId)
			// @ts-ignore installments is checked
			setInstallment(installmentString)
		}
		getData()
	}, [quantity])

	if (!price || !installment) return null
	if (type === 'subscription') {
		if (listPrice > sellingPrice) {
			return (
				<span class='text-xs sm:text-sm text-gray line-through'>
					<span class='font-bold'>{quantity} unidades</span>
					<br />
					{/* @ts-ignore price is checked */}
					De <span>{formatPrice(listPrice * quantity, 'BRL')}</span> por{' '}
					<span>{formatPrice(price, 'BRL')}</span>
					<br />
					ou{' '}
					<span
						class='text-xs sm:text-sm text-gray'
						// @ts-ignore installment is checked
						dangerouslySetInnerHTML={{ __html: installment }}
					/>{' '}
					ou
				</span>
			)
		}
		return (
			<span>
				{/* @ts-ignore price is checked */}
				<span className={`font-semibold ${subscription != 'none' ? 'text-[32px]' : 'text-[12px]'}`}>
					{formatPrice(price, 'BRL')}
				</span>
				<span className={`font-normal ${subscription != 'none' ? 'text-[14px]' : 'text-[8px]'}`}>
					{' '}à <span className='font-semibold'>vista no Cartão</span>
				</span>
			</span>
		)
	}

	if (listPrice > sellingPrice) {
		return (
			<span
				className={`leading-[120%] font-normal ${
					subscription == 'none' ? 'text-xs text-dark' : 'text-[10px] text-[#A6A6A5]'
				}`}
			>
				{/* @ts-ignore price is checked */}
				De{' '}
				<span class='line-through'>
					{formatPrice(listPrice * quantity, 'BRL')}
				</span>{' '}
				por <strong>{formatPrice(price, 'BRL')}</strong> em{'  '}
				<span
					// @ts-ignore installment is checked
					dangerouslySetInnerHTML={{ __html: installment }}
				/>
			</span>
		)
	}
	return (
		<span
			className={`leading-[120%] font-normal ${
				subscription == 'none' ? 'text-xs text-dark' : 'text-[10px] text-[#A6A6A5]'
			}`}
		>
			{/* @ts-ignore price is checked */}
			ou <strong>{formatPrice(price, 'BRL')}</strong> em até{'  '}
			<span
				// @ts-ignore installment is checked
				dangerouslySetInnerHTML={{ __html: installment }}
			/>
		</span>
	)
}
