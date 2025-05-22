import Button from 'site/components/ui/Button.tsx'
import { sendEvent } from 'site/sdk/analytics.tsx'
import { formatPrice } from 'site/sdk/format.ts'
import { useUI } from 'site/sdk/useUI.ts'
import type { AnalyticsItem, Product } from 'apps/commerce/types.ts'
import type { OrderFormItem } from 'apps/vtex/utils/types.ts'
import Icon from 'site/components/ui/Icon.tsx'
import CartItem, { type Props as ItemProps } from './CartItem.tsx'
import type { Props as CouponProps } from './Coupon.tsx'
import FreeShippingProgressBar from './FreeShippingProgressBar.tsx'
import { useCart } from 'apps/vtex/hooks/useCart.ts'
import ProductBrainUpSell from 'site/components/minicart/common/ProductBrainUpSell.tsx'

interface Props {
	fullProducts: (Product | undefined)[]
	items: OrderFormItem[]
	loading: boolean
	total: number
	subtotal: number
	discounts: number
	locale: string
	currency: string
	coupon?: string
	freeShippingTarget: number
	checkoutHref: string
	onAddCoupon?: CouponProps['onAddCoupon']
	onUpdateQuantity: ItemProps['onUpdateQuantity']
	itemToAnalyticsItem: ItemProps['itemToAnalyticsItem']
	onClose?: () => void
}

function Cart({
	fullProducts,
	items,
	total,
	subtotal,
	locale,
	coupon,
	loading,
	currency,
	discounts,
	freeShippingTarget,
	checkoutHref,
	itemToAnalyticsItem,
	onUpdateQuantity,
	onAddCoupon,
}: Props) {
	const { displayCart } = useUI()
	const { cart } = useCart()
	const isEmtpy = items.length === 0
	const addItemsID = 'add_more_items'
	const finishPurchaseID = 'finish_purchase'

	const onClose = () => {
		displayCart.value = false
	}

	return (
		<>
			<div class='flex justify-between items-center border-Stroke px-6 py-4 border-b font-lemon-milk'>
				<div class='flex items-center gap-2 font-medium text-black text-lg uppercase'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
					>
						<g clip-path='url(#clip0_887_10823)'>
							<path
								d='M1.5 1.5H2.47962C2.66414 1.5 2.75639 1.5 2.83064 1.53393C2.89606 1.56383 2.95151 1.61192 2.99036 1.67246C3.03445 1.74116 3.0475 1.83249 3.07359 2.01515L3.42857 4.5M3.42857 4.5L4.21749 10.2986C4.3176 11.0344 4.36766 11.4023 4.54357 11.6793C4.69858 11.9233 4.92081 12.1173 5.18352 12.238C5.48165 12.375 5.85296 12.375 6.59558 12.375H13.014C13.7209 12.375 14.0744 12.375 14.3632 12.2478C14.6179 12.1357 14.8364 11.9549 14.9942 11.7257C15.1732 11.4657 15.2393 11.1185 15.3716 10.4241L16.3643 5.21227C16.4109 4.96786 16.4342 4.84565 16.4004 4.75012C16.3708 4.66633 16.3124 4.59576 16.2357 4.55101C16.1481 4.5 16.0237 4.5 15.7749 4.5H3.42857ZM7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15C7.16421 15 7.5 15.3358 7.5 15.75ZM13.5 15.75C13.5 16.1642 13.1642 16.5 12.75 16.5C12.3358 16.5 12 16.1642 12 15.75C12 15.3358 12.3358 15 12.75 15C13.1642 15 13.5 15.3358 13.5 15.75Z'
								stroke='#E4003F'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</g>
						<defs>
							<clipPath id='clip0_887_10823'>
								<rect width='18' height='18' fill='white' />
							</clipPath>
						</defs>
					</svg>
					<span class='font-bold text-[13px] uppercase'>
						CARRINHO ({items.length})
					</span>
				</div>

				<button type='button' class='text-black' onClick={onClose}>
					<Icon id='XMark' size={24} strokeWidth={2} />
				</button>
			</div>

			<div class='flex flex-col justify-between items-center overflow-hidden'>
				{isEmtpy
					? (
						<div class='flex flex-col justify-center items-center gap-8 w-full h-full text-center outline'>
							<span class='max-w-[210px] font-bold font-lemon-milk text-sm uppercase'>
								Seu carrinho ainda está vazio. Aceita algumas sugestões?
							</span>
							<Button
								class='bg-green hover:bg-green border-none rounded-[6px] w-full max-w-[219px] h-[40px] font-lemon-milk text-white text-xs uppercase'
								onClick={() => {
									displayCart.value = false
								}}
							>
								COMEÇAR A COMPRAR
							</Button>
						</div>
					)
					: (
						<>
							{/* Cart Items */}
							<ul class='flex flex-col w-full h-full overflow-y-auto grow shrink'>
								{items.map((item, index) => (
									<li class='pr-3'>
										<CartItem
											key={Math.random()}
											fullProduct={fullProducts[index]}
											item={item}
											index={index}
											locale={locale}
											currency={currency}
											onUpdateQuantity={onUpdateQuantity}
											itemToAnalyticsItem={itemToAnalyticsItem}
										/>
									</li>
								))}
							</ul>

							<footer
								class='flex flex-col justify-center items-center bg-Ice shadow-xl p-6 w-full'
								style='box-shadow: 0px -4px 44px 0px rgba(0, 0, 0, 0.35)'
							>
								{
									/* <FreeShippingProgressBar
				  total={total}
				  locale={locale}
				  currency={currency}
				  target={freeShippingTarget}
				/> */
								}
                <ProductBrainUpSell />
                
								<Button
									id={addItemsID}
									class='border-dark mt-0 border rounded-md w-full h-[40px] md:h-[50px] font-bold font-lemon text-dark text-xs md:text-[13px] uppercase md:leading-[17px]'
									href='/promocoes'
									onClick={onClose}
								>
                  ADICIONAR OUTROS ITENS
								</Button>
								<a href={checkoutHref} class='flex justify-center mt-2 w-full'>
									<Button
										id={finishPurchaseID}
										data-deco='buy-button'
										class='border-green bg-green border rounded-md w-full h-[40px] md:h-[50px] font-bold font-lemon text-white text-xs md:text-[13px] uppercase md:leading-[17px]'
										disabled={loading || isEmtpy}
										onClick={() => {
											const user_data = {
												email_address: cart?.value
													?.clientProfileData
													?.email ?? undefined,
												phone_number: cart?.value
													?.clientProfileData
													?.phone ?? undefined,
											}

											sendEvent({
												name: 'begin_checkout',
												params: {
													coupon,
													currency,
													value: subtotal + discounts,
													items: items
														.map((_, index) =>
															itemToAnalyticsItem(
																index,
															)
														)
														.filter((
															x,
														): x is AnalyticsItem => Boolean(x)),
													user_data,
												},
											})
										}}
									>
										FINALIZAR COMPRA - {formatPrice(
											subtotal + discounts,
											currency,
											locale,
										)}
									</Button>
								</a>
							</footer>
						</>
					)}
			</div>
		</>
	)
}

export default Cart
