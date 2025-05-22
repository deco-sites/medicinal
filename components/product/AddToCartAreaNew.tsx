import { useOffer } from 'site/sdk/useOffer.ts'
import PixPriceNew from 'site/islands/PixPriceNew.tsx'
import OutOfStock from 'site/islands/OutOfStock.tsx'
import QuantitySelector from '../ui/QuantitySelector.tsx'
import type { BreadcrumbList, Product } from 'apps/commerce/types.ts'
import { mapProductToAnalyticsItem } from 'apps/commerce/utils/productToAnalyticsItem.ts'
import { useState } from 'preact/hooks'
import SellingPriceNew from 'site/islands/Product/SellingPriceNew.tsx'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { useSignal } from '@preact/signals'
import type { SubscriptionOptions, TimelineCalcProps } from 'site/components/product/Subscription.tsx'
import { Timeline } from 'site/components/ui/CustomIcons.tsx'
import Radio from 'site/components/ui/Radio.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { formatPrice } from 'site/sdk/format.ts'
import Loading from 'site/components/ui/Loading.tsx'
import { useCart } from 'apps/vtex/hooks/useCart.ts'
import { sendEvent } from 'site/sdk/analytics.tsx'
import { useUI } from 'site/sdk/useUI.ts'
import { sendSubscriptionChecker } from 'site/sdk/subscriptionChecker.ts'

export interface Props {
	product: Product
	breadcrumbList: BreadcrumbList
	price: number
	listPrice?: number
}

const CheckIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='14'
		height='14'
		viewBox='0 0 14 14'
		fill='none'
	>
		<g clip-path='url(#clip0_1203_31881)'>
			<path
				d='M4.37533 7L6.12533 8.75L9.62533 5.25M12.8337 7C12.8337 10.2217 10.222 12.8333 7.00033 12.8333C3.77866 12.8333 1.16699 10.2217 1.16699 7C1.16699 3.77834 3.77866 1.16667 7.00033 1.16667C10.222 1.16667 12.8337 3.77834 12.8337 7Z'
				stroke='#8CBF3C'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</g>
		<defs>
			<clipPath id='clip0_1203_31881'>
				<rect width='14' height='14' fill='white' />
			</clipPath>
		</defs>
	</svg>
)

export default function AddToCartAreaNew({
	product,
	breadcrumbList,
	price,
	listPrice = 0,
}: Props) {
	if (!IS_BROWSER) return null

	const { displayCart } = useUI()
	const { addItems, cart, updateItems, addItemAttachment } = useCart()

	const [quantity, setQuantity] = useState(1)

	const loading = useSignal(false)
	const selected = useSignal<SubscriptionOptions>('none')

	const { additionalProperty, productID, offers } = product

	const {
		offers: {
			// @ts-ignore offers exists
			offers: [
				{
					inventoryLevel: { value: inventoryLevelValue },
				},
			],
		},
	} = product

	const activeSubscription = additionalProperty?.find(
		(p) => p.name === 'activeSubscriptions',
	)?.value

	const { seller = '1', availability } = useOffer(offers) || {}

	const [discountSubscriptions, setDiscountSubscriptions] = useState(
		listPrice * quantity * 0.2,
	)
	const [aboutSubscription, setAboutSubscription] = useState(false)

	const breadcrumb = {
		...breadcrumbList,
		itemListElement: breadcrumbList.itemListElement.slice(0, -1),
		numberOfItems: breadcrumbList.numberOfItems - 1,
	}

	const eventItem = mapProductToAnalyticsItem({
		product,
		breadcrumbList: breadcrumb,
		price,
		listPrice,
	})

	// @ts-ignore all inputs are checked
	const changeHandler = (e) => {
		const target = e.target as HTMLInputElement
		// @ts-ignore all inputs are checked
		if (target.checked) {
			selected.value = target.value as SubscriptionOptions

			setAboutSubscription(false)
		}
	}

	async function optionProductRegular() {
		await addItems({
			orderItems: [
				{
					id: productID,
					seller: seller,
					quantity,
				},
			],
		})

		const user_data = {
			email_address: cart?.value?.clientProfileData?.email ?? undefined,
			phone_number: cart?.value?.clientProfileData?.phone ?? undefined,
		}

		const eventParams = { items: [eventItem] }
		sendEvent({
			name: 'add_to_cart',
			params: { ...eventParams, user_data },
		})
	}

	async function optionProductSubscriptions() {
		const SUBSCRIPTION_KEY = 'vtex.subscription.assinatura'

		// @ts-ignore all inputs are checked
		const SUBSCRIPTION_PLAN = subscriptionOptions[selected.value]

		// Gets the current day of the month, capped at 28. This is to avoid issues with months that have less than 28 days.
		const currentDay = Math.min(new Date().getDate(), 28)

		const SUBSCRIPTION_VALUE = {
			'vtex.subscription.key.frequency': SUBSCRIPTION_PLAN,
			'vtex.subscription.key.purchaseday': `${currentDay}`,
		}

		const orderItems = [
			{
				id: productID,
				seller,
				quantity: 1,
			},
		]

		for (let i = 0; i < quantity; i++) {
			await addItems({ orderItems })

			const items = cart.value?.items || []

			const index = items.findLastIndex((i) => {
				return i.id === productID && i.attachments.length === 0
			})

			if (index === -1) return null

			await updateItems({
				orderItems: [
					{
						index,
						quantity: 1,
					},
				],
			})

			await addItemAttachment({
				index,
				attachment: SUBSCRIPTION_KEY,
				content: SUBSCRIPTION_VALUE,
				noSplitItem: true,
			})
		}

		sendSubscriptionChecker()
	}

	async function AddToCartButton(e: MouseEvent) {
		e.preventDefault()
		e.stopPropagation()

		try {
			loading.value = true

			if (selected.value == 'none') {
				await optionProductRegular()
			}

			if (selected.value != 'none') {
				await optionProductSubscriptions()

				sendEvent({
					name: 'add_to_cart_subscription',
					params: {},
				})
			}

			displayCart.value = true
		} finally {
			loading.value = false
		}
	}

	return (
		<div id='product-page-new-option-01'>
			<div className='flex flex-col max-w-[484px] w-full gap-6 mb-2'>
				{availability === 'https://schema.org/InStock'
					? (
						<>
							<div className='flex flex-col bg-ice rounded-3xl p-6 flex-none gap-4'>
								<div
									className={`flex gap-4 ${
										selected.value != 'none' ? 'flex-col-reverse' : 'flex-col'
									}`}
								>
									<div className='flex flex-col gap-2 justify-between items-stretch'>
										<span
											className={`font-bold normal-case ${
												selected.value == 'none'
													? 'text-sm text-dark'
													: 'text-xs text-[#A6A6A5]'
											}`}
										>
											Sem Assinatura:
										</span>
										<span
											className={`flex items-end ${
												selected.value == 'none' ? 'text-dark' : 'text-[#A6A6A5]'
											}`}
										>
											<PixPriceNew
												productId={productID}
												quantity={quantity}
												sellingPrice={price}
												listPrice={listPrice}
												subscription={selected.value}
											/>
											<span
												className={`font-regular leading-none ${
													selected.value == 'none' ? 'text-sm' : 'text-xs'
												}`}
											>
												&nbsp; à <span className='font-semibold'>vista no Pix</span>
											</span>
										</span>
										<SellingPriceNew
											productId={productID}
											quantity={quantity}
											sellingPrice={price}
											listPrice={listPrice}
											subscription={selected.value}
										/>
									</div>
									{activeSubscription && (
										<span
											className={`flex flex-col gap-2 text-green font-regular`}
										>
											<span
												className={`normal-case leading-none font-bold ${
													selected.value != 'none' ? 'text-sm' : 'text-xs'
												}`}
											>
												Com assinatura:
											</span>
											<span className='leading-none'>
												<span
													className={` leading-none ${
														selected.value != 'none'
															? 'text-3xl font-bold'
															: 'text-sm font-semibold'
													}`}
												>
													{formatPrice(
														listPrice * quantity - discountSubscriptions,
														'BRL',
													)}
												</span>
												<span
													className={`leading-none ${
														selected.value != 'none' ? 'text-sm' : 'text-xs'
													}`}
												>
													&nbsp; à <span className='font-semibold'>vista no Cartão</span>
												</span>
											</span>
										</span>
									)}
								</div>

								<div className='flex items-center gap-4 border-2 border-light-gray rounded-md'>
									<QuantitySelector
										type='pdp'
										quantity={quantity}
										disabled={productID === '3810'}
										onChange={(quantity) => {
											if (
												quantity < 1 ||
												quantity > 9 ||
												quantity > inventoryLevelValue
											) {
												return
											}

											setQuantity(quantity)
											setDiscountSubscriptions(listPrice * quantity * 0.2)
										}}
									/>
									<span
										class={`flex items-center gap-3 text-sm ${
											quantity >= 3 ? 'text-green font-bold' : 'text-gray font-regular'
										}`}
									>
										{quantity >= 3 && (
											<span class='inline max-[400px]:hidden'>
												<CheckIcon />
											</span>
										)}
										{productID === '3810' ? <span>válido apenas 1 unidade por CPF.</span> : (
											<>
												<span class='hidden sm:inline'>
													<strong>3% OFF</strong> para <strong>3 ou mais</strong> unidades
												</span>
												<span class='inline sm:hidden text-xs'>
													<strong>3% OFF</strong> para <strong>3 ou mais</strong> un.
												</span>
											</>
										)}
									</span>
								</div>

								<div className={productID === '3810' ? 'hidden' : ''}>
									<span className='text-sm text-dark font-bold block mb-2'>
										Selecione a Frequência de entrega
									</span>
									<div class='flex flex-col gap-y-2'>
										<Radio
											selected={selected.value}
											changeHandler={changeHandler}
											name='subscription_option'
											value='none'
											text='Comprar apenas uma vez'
											type='product'
										/>
										<Radio
											selected={selected.value}
											changeHandler={changeHandler}
											name='subscription_option'
											value='1M'
											text={renderTextRadioSubscription('1 mês')}
											type='product'
										/>
										<Radio
											selected={selected.value}
											changeHandler={changeHandler}
											name='subscription_option'
											value='2M'
											text={renderTextRadioSubscription('2 meses')}
											type='product'
										/>
										<Radio
											selected={selected.value}
											changeHandler={changeHandler}
											name='subscription_option'
											value='3M'
											text={renderTextRadioSubscription('3 meses')}
											type='product'
										/>
									</div>
								</div>

								{activeSubscription && selected.value != 'none' && (
									<TimelineCalc selected={selected.value} />
								)}

								{((activeSubscription && selected.value != 'none') ||
									(activeSubscription && aboutSubscription)) && (
									<div>
										<h4 className='text-sm font-bold text-dark leading-none mb-3'>
											Benefícios da Assinatura
										</h4>
										<ul className='flex flex-col gap-3 mb-3'>
											<li class='flex items-center gap-5 py-1'>
												<span className='text-green'>
													<Icon id='CheckboxCheck' size={16} />
												</span>
												<span className='text-gray text-xs font-normal leading-none'>
													<strong>Receba Recorrente:</strong>{' '}
													liberte-se da preocupação de ficar sem seus suplementos
												</span>
											</li>
											<li class='flex items-start gap-5 py-1'>
												<span className='text-green'>
													<Icon id='CheckboxCheck' size={16} />
												</span>
												<span className='text-gray text-xs font-normal leading-none'>
													<strong>20% OFF + Frete Grátis*</strong>
													<br />
													<span className='text-[8px] text-[#A6A6A5]'>
														Em produtos assinados, durante todo o período da assinatura
													</span>
													<br />
													<span className='text-[8px] text-[#A6A6A5]'>
														*Para assinaturas acima de R$ 150 de uma mesma frequência
													</span>
												</span>
											</li>
											<li class='flex items-center gap-5 py-1'>
												<span className='text-green'>
													<Icon id='CheckboxCheck' size={16} />
												</span>
												<span className='text-gray text-xs font-normal leading-none'>
													Converse com nossos nutricionistas <strong>gratuitamente</strong>
												</span>
											</li>
											<li class='flex items-center gap-5 py-1'>
												<span className='text-green'>
													<Icon id='CheckboxCheck' size={16} />
												</span>
												<span className='text-gray text-xs font-normal leading-none'>
													Edite sua assinatura a <strong>qualquer momento</strong>
												</span>
											</li>
											<li class='flex items-center gap-5 py-1'>
												<span className='text-green'>
													<Icon id='CheckboxCheck' size={16} />
												</span>
												<span className='text-gray text-xs font-normal leading-none'>
													Cancele <strong>quando quiser, sem multas ou taxas</strong>
												</span>
											</li>
										</ul>
										<a
											className='text-xs leading-none	 underline font-bold py-4'
											href='/assinatura'
											onClick={() => {
												sendEvent({
													name: 'view_subscription_details',
													params: {},
												})
											}}
										>
											Quero entender mais
										</a>
									</div>
								)}

								{!aboutSubscription && selected.value == 'none' && (
									<button
										className={`flex text-xs leading-none	font-bold text-[#44682E] underline ${
											productID === '3810' ? 'hidden' : ''
										}`}
										onClick={() => {
											setAboutSubscription(true)
										}}
									>
										Ver benefícios de assinatura
									</button>
								)}
							</div>

							<button
								disabled={!selected.value}
								className={`btn-cta-add-to-cart-product-page ${
									selected.value != 'none' ? 'type-subscription' : ''
								} disabled:bg-light-gray flex items-center justify-center gap-6 w-full bg-green rounded-md text-white font-bold border-0 h-14 shrink-0 text-[13px]  uppercase`}
								onClick={AddToCartButton}
							>
								{loading.value ? <Loading /> : (
									<>
										COMPRAR
										<Icon
											id='ShoppingCart'
											width={16}
											height={16}
											class='text-white'
										/>
									</>
								)}
							</button>
						</>
					)
					: <OutOfStock productID={productID} />}
			</div>
			<div
				id='fixed-add-to-cart-button-01'
				class='flex items-center justify-center p-4 bg-white w-full z-[2] sm:hidden fixed bottom-0 left-0'
			>
				<button
					disabled={!selected.value}
					className={`btn-cta-add-to-cart-product-page ${
						selected.value != 'none' ? 'type-subscription' : ''
					} disabled:bg-light-gray flex items-center justify-center gap-6 w-full bg-green rounded-md text-white font-bold border-0 h-14 shrink-0 text-[13px]  uppercase`}
					onClick={AddToCartButton}
				>
					{loading.value ? <Loading /> : (
						<>
							COMPRAR
							<Icon
								id='ShoppingCart'
								width={16}
								height={16}
								class='text-white'
							/>
						</>
					)}
				</button>
			</div>
		</div>
	)
}

// obs. dev: cuidado com esses cadastros abaixo - esses nomes são vinculados a anexos
export const subscriptionOptions = {
	'2W': '2 week',
	'1M': ' 1 month',
	'2M': ' 2 month',
	'3M': ' 3 month',
}

function renderTextRadioSubscription(frequency: string) {
	return `
    <div class="flex items-center justify-between">
      <span>
        Receba a cada <strong>${frequency}</strong>
      </span>
      <span class="bg-green py-[2px] px-[7px] rounded-full text-[11px] sm:text-xs font-bold text-white uppercase">
        20% off
      </span>
    </div>
  `
}

function TimelineCalc({ selected }: TimelineCalcProps) {
	if (!selected) return null

	const today = new Date()
	const actualDay = today.getDate()
	const actualMonth = today.getMonth()
	const actualYear = today.getFullYear()
	const daySimulation = [actualDay, actualDay, actualDay]

	let cumulativeMonth = actualMonth

	return (
		<div class='flex flex-col py-2'>
			<p class='text-sm text-dark font-bold mb-6'>Simulação de envios*</p>

			<div class='flex items-center justify-between mb-3'>
				{daySimulation.map((_, i) => {
					const shippingDay = ++i

					if (selected === '2W') {
						const actualDate = new Date(
							actualYear,
							i === 3 ? cumulativeMonth + 1 : cumulativeMonth,
							i === 2 ? actualDay + 15 : actualDay,
						)

						const day = actualDate.getDate()
						const month = actualDate.getMonth() + 1
						const year = actualDate.getFullYear()

						return (
							<div class='flex flex-col font-bold text-xs sm:text-sm text-red'>
								{shippingDay}º ENVIO
								<span class='text-dark font-bold'>
									{day <= 9 ? `0${day}` : day}/
									{month <= 9 ? `0${month}` : month}/{year}
								</span>
							</div>
						)
					}

					if (i > 1 && selected === '1M') {
						cumulativeMonth = cumulativeMonth + 1
					}

					if (i > 1 && selected === '2M') {
						cumulativeMonth = cumulativeMonth + 2
					}

					if (i > 1 && selected === '3M') {
						cumulativeMonth = cumulativeMonth + 3
					}

					const actualDate = new Date(
						cumulativeMonth > 11 ? actualYear + 1 : actualYear,
						cumulativeMonth > 11 ? cumulativeMonth - 12 : cumulativeMonth,
						actualDay,
					)

					const day = actualDate.getDate()
					const month = actualDate.getMonth() + 1
					const year = actualDate.getFullYear()

					return (
						<div class='flex flex-col font-bold text-xs sm:text-sm text-red'>
							{shippingDay}º ENVIO
							<span class='text-dark font-bold'>
								{day <= 9 ? `0${day}` : day}/{month <= 9 ? `0${month}` : month}/
								{year}
							</span>
						</div>
					)
				})}
			</div>

			<Timeline lineColor='#FFFFFF' />

			<p class='text-xs sm:text-sm font-light text-right pt-4 pb-6'>
				E assim por diante...
			</p>

			<p class='text-xs sm:text-sm font-light'>
				*As datas acima são as datas em que os pedidos são renovados no site, não representando a data real de
				entrega.
			</p>
		</div>
	)
}
