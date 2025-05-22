import { Picture, Source } from 'apps/website/components/Picture.tsx'
import { JSX } from 'preact'
import useBuyProduct from 'site/sdk/useBuyProduct.ts'
import { useUI } from 'site/sdk/useUI.ts'
import Loading from 'site/components/ui/Loading.tsx'
import { useState } from 'preact/hooks'

interface PropsPromoCoupon {
	isMobile?: boolean
	coupon: string
}

function PromoCoupon({ isMobile, coupon }: PropsPromoCoupon) {
	const [copiado, setCopiado] = useState(false)

	const { displayCart } = useUI()

	const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false)

	const [selectedOption, setSelectedOption] = useState<string>('')
	const [selectedOptionName, setSelectedOptionName] = useState<string>('')

	const buyProduct = useBuyProduct({
		eventParams: { items: [] },
		productID: selectedOption,
		seller: '1',
		quantity: 1,
		onSuccess: () => {
			displayCart.value = true
		},
	})

	function addProductToCart(event: JSX.TargetedEvent<HTMLFormElement, Event>) {
		event.preventDefault()

		buyProduct.add()
	}

	function handleSelectedOption() {
		setIsOptionsVisible(!isOptionsVisible)
	}

	function handleChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
		setSelectedOption(event.currentTarget.value)

		setSelectedOptionName(
			event.currentTarget.parentNode?.querySelector('span')?.innerText || '',
		)

		setIsOptionsVisible(false)
	}

	const copy = () => {
		navigator.clipboard.writeText(coupon)
		setCopiado(true)

		setTimeout(() => {
			setCopiado(false)
		}, 5000)
	}

	return (
		<div id='cupom'>
			<h2 className=' text-[24px] leading-tight text-center font-bold text-dark mb-4 lg:mb-20'>
				transforme sua <br />
				rotina agora
			</h2>

			<div
				style='background: linear-gradient(79.53deg, #FFEDDE 38.82%, #FFD798 82.81%);'
				className='relative rounded-[35px] overflow-hidden flex flex-col lg:items-start lg:justify-center max-w-[1340px] mx-auto'
			>
				<Picture>
					<Source
						media='(min-width: 1024px)'
						fetchPriority='low'
						src='https://assets.decocache.com/true-source/31a5cce5-79ba-4a99-93ad-fd36ea6fba0f/cupom-truemagnesio-2-d.jpg'
						width={1340}
						height={660}
					/>
					<img
						className='object-cover w-full h-full'
						loading='lazy'
						src='https://assets.decocache.com/true-source/247cf839-e74c-407b-bf8f-273435b2e87c/cupom-truemagnesio-2-b.jpg'
						alt=''
						style={{ height: `${isMobile ? '836px' : '660px'}` }}
					/>
				</Picture>

				<div className='absolute w-full lg:w-fit pt-[77px] lg:pt-0 lg:pl-[120px] flex flex-col gap-3.5 lg:gap-8 z-10'>
					<h2 className=' text-[24px] lg:text-[40px] font-bold leading-tight text-center lg:text-left text-[#3C3C3B]'>
						ganhe{' '}
						<span className='fontWithGradient'>
							15%OFF e <br /> mini copo térmico
						</span>
						<br />
						na compra de duas
						<br />
						unidades de{' '}
						<span className='fontWithGradient'>
							magnésio <br /> + inositol relief 3.0
						</span>
					</h2>

					<div className='flex flex-col items-center justify-center gap-5 lg:gap-7 lg:justify-start'>
						<div className='flex flex-col items-center justify-center gap-3 lg:flex-row lg:gap-5 lg:justify-start'>
							<span className='text-[14px] lg:text-[18px] leading-none font-medium text-dark'>
								Use o Cupom:
							</span>

							<span className=' fontWithGradient text-[24px] leading-none font-bold text-center border-2 border-dashed border-black rounded-xl flex items-center justify-center  w-[256px] lg:w-[243px] h-[63px]'>
								{coupon}
							</span>

							<button
								type='button'
								className='flex items-center justify-center text-[14px] lg:text-[16px] leading-none font-bold text-dark w-[148px] lg:w-[179px] h-[47px] lg:h-[63px] rounded-xl bg-white'
								onClick={copy}
							>
								{copiado ? 'Copiado!' : 'Copiar cupom'}
							</button>
						</div>

						<form
							onSubmit={addProductToCart}
							className='w-full flex flex-col lg:flex-row px-8 lg:px-0 items-center gap-3 lg:gap-5'
						>
							<div className='w-full relative'>
								<button
									type='button'
									className={`w-full h-[47px] lh:h-[63px] flex items-center justify-center gap-4 bg-[#B6B6B6] rounded-[28px] relative z-10 ${
										isOptionsVisible ? 'border-t border-solid border-white' : ''
									}`}
									onClick={handleSelectedOption}
								>
									<span className=' text-[10px] lg:text-[13px] font-bold leading-none uppercase text-white line-clamp-1'>
										{selectedOption ? selectedOptionName : 'selecione o sabor'}
									</span>

									<svg
										width='11'
										height='6'
										viewBox='0 0 11 6'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fill-rule='evenodd'
											clip-rule='evenodd'
											d='M4.81143 5.74637L0.63664 1.57159L1.68015 0.528076L5.33318 4.18111L8.98621 0.528076L10.0297 1.57159L5.85494 5.74637C5.71655 5.88472 5.52887 5.96245 5.33318 5.96245C5.1375 5.96245 4.94982 5.88472 4.81143 5.74637Z'
											fill='white'
										/>
									</svg>
								</button>

								<div
									className={`flex flex-col gap-3 absolute bottom-[56px] left-0 w-full bg-[#B6B6B6] px-4 pt-6 pb-10 rounded-t-[28px] -mb-8 ${
										!isOptionsVisible ? 'hidden' : ''
									}`}
								>
									<label className='flex items-center gap-1.5'>
										<input
											type='radio'
											name='productVariant'
											value='3208'
											onChange={handleChange}
											className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
										/>
										<span className='text-[12px] lg:text-[14px] leading-tight font-medium text-white flex-1'>
											Maracujá 3.0
										</span>
									</label>

									<label className='flex items-center gap-1.5'>
										<input
											type='radio'
											name='productVariant'
											value='3652'
											onChange={handleChange}
											className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
										/>
										<span className='text-[12px] lg:text-[14px] leading-tight font-medium text-white flex-1'>
											Camomila, laranja e lavanda 3.0
										</span>
									</label>
								</div>
							</div>

							<button
								type='submit'
								className='bg-[#25D366] rounded-[28px] w-[148px] lg:w-[179px] h-[47px] lh:h-[63px] flex items-center justify-center gap-3 flex-shrink-0 disabled:opacity-60'
								disabled={selectedOption ? false : true}
							>
								{buyProduct.loading.value ? <Loading style={{ color: '#FFFFFF' }} /> : (
									<>
										<span className=' text-[10px] lg:text-[13px] leading-none font-bold text-white uppercase'>
											Comprar
										</span>

										<svg
											width='17'
											height='16'
											viewBox='0 0 17 16'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<g clip-path='url(#clip0_722_27)'>
												<path
													d='M1.40472 1.33334H2.2755C2.43951 1.33334 2.52152 1.33334 2.58751 1.3635C2.64567 1.39008 2.69495 1.43283 2.72949 1.48664C2.76868 1.54771 2.78028 1.62889 2.80347 1.79125L3.11901 4.00001M3.11901 4.00001L3.82027 9.15428C3.90926 9.80836 3.95376 10.1354 4.11012 10.3816C4.24791 10.5985 4.44545 10.771 4.67896 10.8783C4.94397 11 5.27402 11 5.93413 11H11.6394C12.2678 11 12.5819 11 12.8387 10.887C13.0651 10.7873 13.2593 10.6266 13.3996 10.4228C13.5587 10.1918 13.6175 9.88312 13.735 9.26585L14.6175 4.63314C14.6588 4.41588 14.6795 4.30725 14.6495 4.22234C14.6232 4.14786 14.5713 4.08513 14.5031 4.04536C14.4253 4.00001 14.3147 4.00001 14.0935 4.00001H3.11901ZM6.73806 14C6.73806 14.3682 6.43958 14.6667 6.07139 14.6667C5.7032 14.6667 5.40472 14.3682 5.40472 14C5.40472 13.6318 5.7032 13.3333 6.07139 13.3333C6.43958 13.3333 6.73806 13.6318 6.73806 14ZM12.0714 14C12.0714 14.3682 11.7729 14.6667 11.4047 14.6667C11.0365 14.6667 10.7381 14.3682 10.7381 14C10.7381 13.6318 11.0365 13.3333 11.4047 13.3333C11.7729 13.3333 12.0714 13.6318 12.0714 14Z'
													stroke='white'
													stroke-width='1.5'
													stroke-linecap='round'
													stroke-linejoin='round'
												/>
											</g>
											<defs>
												<clipPath id='clip0_722_27'>
													<rect
														width='16'
														height='16'
														fill='white'
														transform='translate(0.0714111)'
													/>
												</clipPath>
											</defs>
										</svg>
									</>
								)}
							</button>
						</form>

						{
							/* <a href="#" className="flex items-center justify-center text-[14px] lg:text-[16px] leading-none font-bold text-white w-[234px] lg:w-full h-[47px] lh:h-[63px] rounded-xl bg-[#25D366]">
              Compre pelo Whatsapp
            </a> */
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PromoCoupon
