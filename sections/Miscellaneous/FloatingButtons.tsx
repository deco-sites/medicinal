// import { Head } from '$fresh/runtime.ts'
import { scriptAsDataURI } from 'apps/utils/dataURI.ts'
import Icon from 'site/components/ui/Icon.tsx'
import useModal from 'site/components/ui/useModal.tsx'
import { clx } from 'site/sdk/clx.ts'

export interface Props {
	/**
	 * @title Número do WhatsApp
	 * @description 00 12345 6789
	 */
	zapzap: number
	/**
	 * @title Esconder botão do WhatsApp
	 */
	hiddenWhatsApp?: boolean
}

export default function FloatingButtons({ zapzap, hiddenWhatsApp }: Props) {
	const zapzapModal = useModal()
	const floatingMobileModal = useModal('floating-mobile-modal')

	return (
		<>
			{
				/* <script
				src={scriptAsDataURI(() => {
					// neoasssist iframe make a big space on top of the page while is loading
					// so i make hidden by default
					// and show after window load
					globalThis.onload = () => {
						const iframe = document.querySelector(
							'.neoasssist-widget-frame',
						) as HTMLIFrameElement

						if (!iframe) throw new Error('iframe not found')

						setTimeout(() => {
							iframe.classList.remove('neoasssist-widget-frame')
							iframe.classList.add('neoasssist-widget-frame--loaded')
						}, 0)
					}
				})}
			>
			</script> */
			}
			{
				/* <Head>
				<script
					type='text/javascript'
					async
					src='https://cdn.atendimen.to/n.js?ntag=0&amp;d=truebrands.neoassist.com&amp;p=https%3A%2F%2Fwww.truesource.com.br%2F'
				>
				</script>
				<script
					defer
					dangerouslySetInnerHTML={{
						__html: `
            window.NeoAssistTag = {};
            NeoAssistTag.querystring = true;
            NeoAssistTag.pageid = '';
            NeoAssistTag.clientdomain = 'truebrands.neoassist.com';
            NeoAssistTag.initialize = {};
            var na = document.createElement('script');
            na.type = 'text/javascript';
            na.async = true;
            na.src = 'https://cdn.atendimen.to/n.js';
            var s = document.getElementsByTagName('script')[0];
            setTimeout(() => s.parentNode.insertBefore(na, s), 1000);
            `,
					}}
				/>
			</Head> */
			}

			<zapzapModal.Modal class='group transition-opacity peer-checked:z-[100] w-full h-full fixed left-0 top-0 pointer-events-none peer-checked:pointer-events-auto flex justify-center items-center'>
				<zapzapModal.Toggle class='absolute left-0 top-0 w-full h-full bg-black/30 opacity-0 peer-checked:group-[]:opacity-100' />

				<div class='lg:fixed lg:right-6 lg:bottom-20 max-w-[400px] w-[95%] mx-auto opacity-0 peer-checked:group-[]:opacity-100 z-10'>
					<div class='bg-[image:url("/image/fundo-zapzap.webp")] py-5'>
						<div class='text-white text-center text-[17px] font-semibold leading-5 max-w-[300px] mx-auto'>
							Olá! Preencha os campos abaixo para iniciar conversa no WhatsApp
						</div>
					</div>
					<form
						id='zapzapForm'
						class='p-6 bg-[#ededed] flex flex-col gap-3 items-center'
					>
						<input
							type='text'
							placeholder='Nome'
							required
							id='wpp-client-name'
							class='rounded-full bg-white text-black text-italic outline-[transparent] focus:outline-[#ea6426] outline-1 invalid:text-[#ea6426] transition-all py-2 px-4 h-12 text-sm w-full'
						/>
						<input
							type='email'
							placeholder='E-mail'
							required
							id='wpp-client-email'
							class='rounded-full bg-white text-black text-italic outline-[transparent] focus:outline-[#ea6426] outline-1 invalid:text-[#ea6426] transition-all py-2 px-4 h-12 text-sm w-full'
						/>
						<input
							type='tel'
							placeholder='Telefone com DDD'
							required
							// pattern="\(\d{2}\) [0-9]{5}-[0-9]{4}"
							id='wpp-client-phone'
							class='rounded-full bg-white text-black text-italic outline-[transparent] focus:outline-[#ea6426] outline-1 invalid:text-[#ea6426] transition-all py-2 px-4 h-12 text-sm w-full'
						/>

						<div class='flex items-center gap-2'>
							<label class='flex items-center gap-1 text-dark text-sm'>
								<input
									type='radio'
									name='typeOfClientWpp'
									value='medico-cupom'
									class='bg-white'
									required
								/>
								Médico
							</label>
							<label class='flex items-center gap-1 text-dark text-sm'>
								<input
									type='radio'
									name='typeOfClientWpp'
									value='nutricionista-cupom'
									class='bg-white'
									required
								/>
								Nutricionista
							</label>
							<label class='flex items-center gap-1 text-dark text-sm'>
								<input
									type='radio'
									name='typeOfClientWpp'
									value='consumidor-cupom'
									class='bg-white'
									required
								/>
								Consumidor
							</label>
						</div>

						<label class='flex items-center gap-1 text-dark text-sm'>
							<input
								type='checkbox'
								id='wpp-checkbox'
								class='bg-white'
								required
							/>
							Estou ciente que poderei receber e-mails
						</label>

						<button
							type='submit'
							class='bg-[#09d261] rounded-full py-2 px-4 text-white mt-4 font-medium'
						>
							INICIAR A CONVERSA
						</button>
					</form>
				</div>
			</zapzapModal.Modal>

			{!hiddenWhatsApp && (
				<floatingMobileModal.Modal
					id='zapzap-buttom-toggle'
					class={clx(
						'[body[data-mobilepdp]_&]:bottom-[150px] fixed right-5 bottom-[72px] lg:bottom-3 flex-col lg:flex-row justify-center items-center gap-2 z-40 max-lg:hidden max-lg:peer-checked:flex lg:flex',
					)}
				>
					<zapzapModal.Toggle class='shadow bg-white lg:bg-green h-10 flex items-center gap-2 px-6 rounded-full text-dark lg:text-white font-bold text-sm cursor-pointer select-none'>
						Dúvidas de pedidos
						<Icon
							id='FloatingWhatsApp'
							width={18}
							height={18}
							class='text-green lg:text-white'
						/>
					</zapzapModal.Toggle>
				</floatingMobileModal.Modal>
			)}

			<floatingMobileModal.Toggle
				id='floating-mobile-modal-toggle'
				class='md:hidden w-12 h-12 rounded-full bg-blue fixed bottom-3 right-5 group flex justify-center items-center z-10 [body[data-mobilepdp]_&]:bottom-[90px]'
			>
				<Icon
					id='FloatingChat'
					width={20}
					height={20}
					class='peer-checked:group-[]:hidden block'
				/>
				<Icon
					id='FloatingX'
					width={20}
					height={20}
					class='hidden peer-checked:group-[]:block'
				/>
			</floatingMobileModal.Toggle>

			<script
				src={scriptAsDataURI(() => {
					const isPDP = /\/.+?\/p/.test(globalThis.document.location.pathname)
					const isMobile = globalThis.innerWidth < 768

					if (isPDP && isMobile) {
						globalThis.document.body.dataset.mobilepdp = 'true'
					}
				})}
			/>
			<script
				dangerouslySetInnerHTML={{ __html: `const zapzap = ${zapzap}` }}
			/>
			<script
				src={scriptAsDataURI(() => {
					const phoneInput = document.querySelector<HTMLInputElement>(
						'input#wpp-client-phone',
					)
					const form = document.querySelector<HTMLFormElement>('form#zapzapForm')

					if (!phoneInput) throw new Error('Phone input not found')
					if (!form) throw new Error('Form not found')

					phoneInput.oninput = (e) => {
						// @ts-ignore trust me
						e.currentTarget.value = (e.currentTarget.value as string)
							.replace(/\D/g, '')
							.replace(
								/^(\d?)(\d?)(\d{0,5})(\d{0,4})(.*)$/,
								(_all, $1, $2, $3, $4) => {
									let s = ''

									if ($1) s += `(${$1}${$2}`
									if ($3) s += `) ${$3}`
									if ($4) s += `-${$4}`

									return s
								},
							)
					}

					form.onsubmit = (e) => {
						e.preventDefault()

						const url = new URL(location.href)

						url.searchParams.set(
							'typeOfClientWpp',
							document.querySelector<HTMLInputElement>(
								'input[name=typeOfClientWpp]:checked',
							)!.value,
						)

						open(`https://api.whatsapp.com/send?phone=55${zapzap}`, '_blank')

						location.href = url.href
					}
				})}
			/>
		</>
	)
}
