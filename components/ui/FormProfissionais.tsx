import { useSignal, useSignalEffect } from '@preact/signals'
import type { HTMLWidget } from 'apps/admin/widgets.ts'
import Icon from 'site/components/ui/Icon.tsx'
import Loading from 'site/components/ui/Loading.tsx'
import useAccordion from 'site/components/ui/useAccordion.tsx'
import useCollapsable from 'site/components/ui/useCollapsable.tsx'
import { invoke } from 'site/runtime.ts'
import { clx } from 'site/sdk/clx.ts'
import useCEP from 'site/sdk/useCEP.ts'
import type { JSX } from 'preact'
import { useRef } from 'preact/hooks'
import { debounce } from 'std/async/debounce.ts'

interface Specialty {
	label: string
}

interface Suplement {
	label: string
}

interface Service {
	label: string
}

interface Props {
	/**
	 * @title Texto do topo do formulário
	 */
	topText: HTMLWidget
	specialties: Specialty[]
	supplements: Suplement[]
	services: Service[]
}

const UFs = [
	'AC',
	'AL',
	'AP',
	'AM',
	'BA',
	'CE',
	'DF',
	'ES',
	'GO',
	'MA',
	'MT',
	'MS',
	'MG',
	'PA',
	'PB',
	'PR',
	'PE',
	'PI',
	'RJ',
	'RN',
	'RS',
	'RO',
	'RR',
	'SC',
	'SP',
	'SE',
	'TO',
	'EX',
]

const Input = {
	Container: ({ children, ...props }: JSX.IntrinsicElements['div']) => (
		<div {...props} class={clx('relative', props.class as string)}>
			{children}
		</div>
	),
	Input: ({ children, ...props }: JSX.IntrinsicElements['input']) => (
		<input
			placeholder=' '
			{...props}
			class={clx(
				'peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full [&:valid:not(:placeholder-shown)]:border-green [&:not(:focus):invalid:not(:placeholder-shown)]:border-red',
				props.class as string,
			)}
		/>
	),
	Label: ({ children, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			class={clx(
				'font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all',
			)}
			{...props}
		>
			{children}
		</label>
	),
}

const TextArea = {
	Container: ({ children, ...props }: JSX.IntrinsicElements['div']) => (
		<div {...props} class={clx('relative w-full', props.class as string)}>
			{children}
		</div>
	),
	Input: ({ children, ...props }: JSX.IntrinsicElements['textarea']) => (
		<textarea
			placeholder=' '
			{...props}
			class={clx(
				'peer rounded-md border bg-white border-Stroke pt-7 pb-2 px-4 shadow-md outline-0 focus:border-dark text-sm w-full min-h-[200px] valid:border-green [&:not(:focus):invalid:not(:placeholder-shown)]:border-red',
				props.class as string,
			)}
		/>
	),
	Label: ({ children, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			class={clx(
				'font-medium absolute text-gray left-4 text-sm top-4 pointer-events-none peer-focus:text-[11px] peer-focus:top-2 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all',
			)}
			{...props}
		>
			{children}
		</label>
	),
}

const Radio = {
	Container: ({ children, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			{...props}
			class={clx(
				'text-sm font-medium text-dark flex items-center gap-2 cursor-pointer bg-white',
				props.class as string,
			)}
		>
			{children}
		</label>
	),
	Input: ({ name, required, value }: {
		name: string
		value: string
		required?: boolean
	}) => (
		<>
			<input
				type='radio'
				name={name}
				required={required}
				class='peer sr-only w-[250px] h-6'
				value={value}
			/>
			<div class='size-[18px] border border-gray rounded-full flex justify-center items-center peer-checked:bg-dark group relative peer-checked:border-0'>
				<span class='size-2 absolute bg-white rounded-full peer-checked:group-[]:block hidden' />
			</div>
		</>
	),
}

const Checkbox = {
	Container: ({ children, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			{...props}
			class={clx(
				'text-sm font-medium text-dark flex items-center gap-2 cursor-pointer',
				props.class as string,
			)}
		>
			{children}
		</label>
	),
	Input: ({ name, value }: {
		name: string
		value: string
	}) => (
		<>
			<input
				type='checkbox'
				name={name}
				class='peer hidden'
				value={value}
			/>
			<span class='border-2 border-gray/80 w-5 h-5 rounded-md flex justify-center items-center peer-checked:border-0 peer-checked:bg-dark group bg-white'>
				<Icon
					id='CheckboxCheck'
					width={10}
					height={8}
					class='text-white hidden peer-checked:group-[]:block'
				/>
			</span>
		</>
	),
}

function Select({
	placeholder,
	items,
	name,
	class: class_,
	value,
	onChange,
}: {
	placeholder: string
	items: string[]
	name: string
	class?: string
	value: string
	onChange: (value: string) => void
}) {
	const { Collapsable, Content, Trigger, ContentWrapper, close } = useCollapsable()
	const hiddenSelect = useRef<HTMLSelectElement>(null)

	return (
		<>
			<Collapsable
				class={clx('relative group/select-collapsable bg-white', class_)}
			>
				<Trigger class='group/select'>
					<div class='rounded-md border border-Stroke group-has-[select:valid]:border-green group-has-[+select:focus]/select:border-dark shadow outline-0 text-sm w-full h-12 flex items-center pointer-events-none'>
						<label class='font-medium text-gray text-sm left-4 absolute top-1/2 -translate-y-1/2 [&:has(+:not(:empty))]:top-3.5 [&:has(+:not(:empty))]:text-[11px] transition-all'>
							{placeholder}
						</label>
						<span class='font-medium text-dark text-sm pl-3.5 translate-y-1.5 empty:opacity-0 delay-1000 transition-opacity'>
							{value}
						</span>
						<span class='ml-auto border-l border-Stroke group-has-[select:valid]:border-green h-full w-12 flex items-center justify-center transition-transform peer-checked:group-[]/select:rotate-180'>
							<Icon
								id='ChevronDown'
								width={16}
								height={16}
							/>
						</span>
					</div>
				</Trigger>

				<select
					ref={hiddenSelect}
					class='sr-only w-full peer/select'
					required
					name={name}
					onChange={(e) => {
						onChange(e.currentTarget.value)
					}}
				>
					<option value=''>{placeholder}</option>
					{items.map((i) => <option value={i} selected={i === value}>{i}</option>)}
				</select>

				<ContentWrapper class='absolute top-full left-0 z-10 bg-white w-full rounded-bl-md rounded-br-md shadow-lg text-gray text-sm border border-Stroke'>
					<Content class='flex flex-col items-start max-h-[300px] overflow-y-auto overscroll-contain'>
						{items.map((i) => (
							<button
								type='button'
								onClick={(e) => {
									hiddenSelect.current!.value = i
									hiddenSelect.current!.dispatchEvent(
										new Event('change', { bubbles: true }),
									)

									close()
								}}
								class={clx(
									'w-full text-start pl-4 py-2 hover:bg-ice cursor-pointer',
									hiddenSelect.current?.textContent === i && 'bg-ice',
								)}
							>
								{i}
							</button>
						))}
					</Content>
				</ContentWrapper>
			</Collapsable>
		</>
	)
}

function Form2() {
	const { cep, loading, data, error } = useCEP()

	const cepDebounced = debounce((s: number) => {
		cep.value = s
	}, 300)

	const ufSignal = useSignal('')

	useSignalEffect(() => {
		if (data.value?.uf) {
			ufSignal.value = data.value?.uf
		}
	})

	return (
		<formAccordions.Accordion
			id='2'
			class='bg-white p-6 rounded-xl shadow-md'
		>
			<formAccordions.Trigger for='2' class='flex items-center gap-4 group'>
				<span class='w-8 h-8 border-2 border-dark bg-white text-dark peer-checked:group-[]:bg-dark peer-checked:group-[]:text-white flex justify-center items-center font-lemon font-bold rounded-full transition-colors'>
					2
				</span>
				<span class='text-dark font-lemon font-bold'>
					SUA LOCALIZAÇÃO
				</span>
			</formAccordions.Trigger>
			<formAccordions.ContentWrapper>
				<formAccordions.Content>
					<form
						class='bg-white rounded-xl'
						onSubmit={(e) => {
							e.preventDefault()

							const form3 = document.querySelectorAll<HTMLInputElement>(
								'[name=forms]',
							)
								.item(2)

							form3.checked = true
						}}
					>
						<div class='mt-6 w-full'>
							<div class='flex items-center gap-4'>
								<Input.Container class='w-1/2 sm:max-w-[150px]'>
									<Input.Input
										type='text'
										name='cep'
										required
										pattern='[0-9]{5}-[0-9]{3}'
										onInput={(e) => {
											e.currentTarget.value = e.currentTarget.value.replace(
												/\D/,
												'',
											).replace(
												/(\d{5})(\d{0,3})(.*)/,
												(all, $1, $2) => {
													let s = ''

													if ($1) s += $1
													if ($2) s += `-${$2}`

													return s
												},
											)

											error.value = null

											if (/^\d{5}-\d{3}$/.test(e.currentTarget.value)) {
												cepDebounced(
													Number(e.currentTarget.value.replace('-', '')),
												)
											}
										}}
									/>
									<Input.Label>CEP *</Input.Label>
								</Input.Container>
								{loading.value ? <Loading /> : error.value
									? (
										<span class='text-red font-sm'>
											{error.value === 'NOT_FOUND'
												? 'Não encontramos esse CEP :/'
												: 'Tivemos um problema inesperado :0'}
										</span>
									)
									: null}
							</div>

							<div class='text-gray font-sm font-medium my-4'>
								Complete as informações do seu endereço
							</div>

							<div class='flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full'>
								<Input.Container class='w-full sm:w-[70%]'>
									<Input.Input
										type='text'
										name='city'
										required
										defaultValue={data.value?.localidade}
									/>
									<Input.Label>Cidade *</Input.Label>
								</Input.Container>

								<Select
									placeholder='Estado *'
									items={UFs}
									class='w-full sm:w-[calc(30%-8px)]'
									name='state'
									value={ufSignal.value}
									onChange={(s) => {
										ufSignal.value = s
									}}
								/>

								<Input.Container class='w-full sm:w-[70%]'>
									<Input.Input
										type='text'
										name='street'
										required
										defaultValue={data.value?.logradouro}
									/>
									<Input.Label>Rua *</Input.Label>
								</Input.Container>

								<Input.Container class='w-full sm:w-[calc(30%-8px)]'>
									<Input.Input
										type='text'
										name='profissional-number'
										required
										maxLength={10}
										onInput={(e) => {
											e.currentTarget.value = e.currentTarget.value
												.replace(/\D/g, '')
										}}
									/>
									<Input.Label>Número *</Input.Label>
								</Input.Container>

								<Input.Container class='w-full sm:w-1/2'>
									<Input.Input
										type='text'
										name='complement'
										defaultValue={data.value?.complemento}
									/>
									<Input.Label>Complemento</Input.Label>
								</Input.Container>

								<Input.Container class='w-full sm:w-[calc(50%-8px)]'>
									<Input.Input
										type='text'
										name='neighborhood'
										required
										defaultValue={data.value?.bairro}
									/>
									<Input.Label>Bairro *</Input.Label>
								</Input.Container>
							</div>
						</div>

						<button
							type='submit'
							class='h-[50px] w-full bg-gradient-to-r from-[#E4003F] to-[#E9530E] rounded-md text-white font-bold font-lemon text-sm mt-6'
						>
							Avançar
						</button>
					</form>
				</formAccordions.Content>
			</formAccordions.ContentWrapper>
		</formAccordions.Accordion>
	)
}

function Form3({ supplements, services }: {
	supplements: Suplement[]
	services: Service[]
}) {
	const formMessage = useSignal<'success' | 'error' | null>(null)

	async function afterAllForms() {
		function get<T extends HTMLElement>(s: string): T | never {
			const el = document.querySelector<T>(s)

			if (!el) throw new Error(`Element not found: ${s}`)

			return el
		}

		function getAll<T extends HTMLElement>(s: string): T[] | never {
			return [...document.querySelectorAll<T>(s)]
		}

		// Form 1
		const name = get<HTMLInputElement>('[name=name]').value
		const specialty = get<HTMLSelectElement>('[name=specialty]').value
		const area = get<HTMLInputElement>('[name=area]').value
		const cpf = get<HTMLInputElement>('[name=cpf]').value
		const email = get<HTMLInputElement>('[name=profissional-email]').value
		const tel = get<HTMLInputElement>('[name=profissional-tel]').value
		const instagram = get<HTMLInputElement>('[name=instagram]').value

		// Form 2
		const cep = get<HTMLInputElement>('[name=cep]').value
		const city = get<HTMLInputElement>('[name=city]').value
		const state = get<HTMLSelectElement>('[name=state]').value
		const street = get<HTMLInputElement>('[name=street]').value
		const number = get<HTMLInputElement>('[name=profissional-number]').value
		const complement = get<HTMLInputElement>('[name=complement]').value
		const neighborhood = get<HTMLInputElement>('[name=neighborhood]').value

		// Form 3
		const prescribe = get<HTMLInputElement>('[name=prescribe]:checked').value
		const supplements = getAll<HTMLInputElement>('[name=supplements]:checked')
			.map(({ value }) => value)
		const service = get<HTMLInputElement>('[name=service]:checked').value
		const stores = get<HTMLTextAreaElement>('[name=stores]').value
		const partnerships = get<HTMLInputElement>('[name=partnerships]').value
		const meet = get<HTMLTextAreaElement>('[name=meet]').value

		await invoke.vtex.actions.masterdata.createDocument({
			acronym: 'PR',
			data: {
				name,
				specialty,
				occupationArea: area,
				id: cpf,
				email,
				whatsapp: tel,
				instagram,
				cep,
				city,
				uf: state,
				street,
				number,
				complement,
				neighborhood,
				prescribe: prescribe === 'true' ? 'Sim' : 'Não',
				supplements: !supplements.length ? 'Nenhum' : supplements.join(', '),
				services: service,
				nearbyStores: stores || 'Nenhum',
				partnerships: partnerships || 'Nenhum',
				howDidYouMeet: meet,
			},
			isPrivateEntity: true,
		})

		formMessage.value = 'success'

		console.log({
			name,
			specialty,
			area,
			cpf,
			email,
			tel,
			instagram,
			cep,
			city,
			state,
			street,
			number,
			complement,
			neighborhood,
			prescribe,
			supplements,
			service,
			stores,
			partnerships,
			meet,
		})
	}

	return (
		<formAccordions.Accordion
			id='3'
			class='bg-white p-6 rounded-xl shadow-md'
		>
			<formAccordions.Trigger
				for='3'
				class='flex items-center gap-4 group'
			>
				<span class='w-8 h-8 border-2 border-dark bg-white text-dark peer-checked:group-[]:bg-dark peer-checked:group-[]:text-white flex justify-center items-center font-lemon font-bold rounded-full transition-colors'>
					3
				</span>
				<span class='text-dark font-lemon font-bold'>
					SOBRE SEU ATENDIMENTO
				</span>
			</formAccordions.Trigger>
			<formAccordions.ContentWrapper>
				<formAccordions.Content>
					<form
						class='bg-white rounded-xl flex flex-col gap-6'
						onSubmit={(e) => {
							e.preventDefault()

							afterAllForms()
						}}
					>
						<div class='w-full flex flex-col gap-6 mt-6'>
							<div>
								<span class='text-sm text-dark font-medium'>
									Você já prescreve nossa marca? *
								</span>

								<div class='flex items-center gap-2 mt-4'>
									<Radio.Container class='flex items-center justify-start gap-2 h-12 px-4 border border-Stroke rounded-md shadow cursor-pointer has-[:checked]:border-dark'>
										<Radio.Input value='true' required name='prescribe' />
										Sim
									</Radio.Container>

									<Radio.Container class='flex items-center justify-start gap-2 h-12 px-4 border border-Stroke rounded-md shadow cursor-pointer has-[:checked]:border-dark'>
										<Radio.Input
											value='false'
											required
											name='prescribe'
										/>
										Não
									</Radio.Container>
								</div>
							</div>
						</div>

						<div class='grid sm:grid-cols-2 gap-4'>
							<div class='flex flex-col gap-6 max-w-[350px] w-full'>
								<span class='text-sm text-dark font-medium'>
									Quais suplementos mais prescreve?
								</span>

								<div class='grid grid-cols-2 gap-4'>
									{supplements.map(({ label }) => (
										<Checkbox.Container>
											<Checkbox.Input value={label} name='supplements' />
											{label}
										</Checkbox.Container>
									))}
								</div>
							</div>
							<div class='flex flex-col gap-6'>
								<span class='text-sm text-dark font-medium'>
									Qual sua média de atendimentos mensal? *
								</span>

								<div class='flex flex-col gap-4'>
									{services.map(({ label }) => (
										<Radio.Container>
											<Radio.Input
												value={label}
												name='service'
												required
											/>
											{label}
										</Radio.Container>
									))}
								</div>
							</div>
						</div>

						<TextArea.Container>
							<TextArea.Input name='stores' />
							<TextArea.Label>
								Quais lojas de suplementos tem perto da sua localidade?
							</TextArea.Label>
						</TextArea.Container>

						<div class='flex flex-col gap-6'>
							<span class='text-sm text-dark font-medium'>
								Possui parceria com alguma loja?
							</span>

							<div class='flex flex-col gap-4'>
								<Input.Container>
									<Input.Input name='partnerships' />
									<Input.Label>Se sim, qual(is) loja(s)?</Input.Label>
								</Input.Container>
							</div>
						</div>

						<TextArea.Container>
							<TextArea.Input required name='meet' />
							<TextArea.Label>
								Conta pra gente! Como conheceu nossa marca? *
							</TextArea.Label>
						</TextArea.Container>

						<button
							type='submit'
							class='h-[50px] w-full bg-gradient-to-r from-[#E4003F] to-[#E9530E] rounded-md text-white font-bold font-lemon text-sm mt-6'
						>
							Finalizar
						</button>

						{formMessage.value === 'success' && (
							<span class='block mt-5 text-green'>
								Sua solicitação foi enviada com sucesso!
							</span>
						)}
						{formMessage.value === 'error' && (
							<span class='block mt-5 text-red'>
								Ocorreu um erro ao enviar sua solicitação, tente novamente mais tarde!
							</span>
						)}
					</form>
				</formAccordions.Content>
			</formAccordions.ContentWrapper>
		</formAccordions.Accordion>
	)
}

const formAccordions = useAccordion('forms')

export default function (
	{ topText, specialties, supplements, services }: Props,
) {
	const specialtySignal = useSignal('')

	return (
		<div id='form-profissionais' class='py-36 bg-ice rounded-[40px]'>
			<div class='max-w-[848px] mx-auto px-6'>
				<div
					dangerouslySetInnerHTML={{ __html: topText }}
					class='[&_:is(h1,h2)]:font-lemon [&_:is(h1,h2)]:text-dark [&_:is(h1,h2)]:text-2xl md:[&_:is(h1,h2)]:text-[40px] [&_:is(h1,h2)]:font-bold [&_:is(h1,h2)]:leading-[1.1] text-gray font-medium leading-7 mb-16'
				/>

				<div class='flex flex-col gap-2 w-full mx-auto'>
					<formAccordions.Accordion
						id='1'
						open
						class='bg-white p-6 rounded-xl shadow-md'
					>
						<formAccordions.Trigger
							for='1'
							class='flex items-center gap-4 group'
						>
							<span class='w-8 h-8 border-2 border-dark bg-white text-dark peer-checked:group-[]:bg-dark peer-checked:group-[]:text-white flex justify-center items-center font-lemon font-bold rounded-full transition-colors'>
								1
							</span>
							<span class='text-dark font-lemon font-bold'>
								SOBRE VOCÊ
							</span>
						</formAccordions.Trigger>

						<formAccordions.ContentWrapper>
							<formAccordions.Content>
								<form
									class='bg-white rounded-xl'
									onSubmit={(e) => {
										e.preventDefault()

										const form2 = document.querySelectorAll<HTMLInputElement>(
											'[name=forms]',
										)
											.item(1)

										form2.checked = true
									}}
								>
									<div class='grid sm:grid-cols-2 gap-2 mt-6 w-full'>
										<Input.Container class='sm:col-span-2'>
											<Input.Input type='text' name='name' required />
											<Input.Label>Seu nome completo *</Input.Label>
										</Input.Container>

										<Select
											placeholder='Especialidade *'
											name='specialty'
											items={specialties.map(({ label }) => label)}
											value={specialtySignal.value}
											onChange={(s) => {
												specialtySignal.value = s
											}}
										/>

										<Input.Container>
											<Input.Input type='text' name='area' required />
											<Input.Label>Área de atuação *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='text'
												name='cpf'
												required
												pattern='[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}'
												onInput={(e) => {
													e.currentTarget.value = (e.currentTarget.value as string)
														.replace(/\D/g, '')
														.replace(
															/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})(.*)/,
															(all, $1, $2, $3, $4) => {
																let s = ''

																if ($1) s += $1
																if ($2) s += `.${$2}`
																if ($3) s += `.${$3}`
																if ($4) s += `-${$4}`

																return s
															},
														)
												}}
											/>
											<Input.Label>CPF *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='email'
												name='profissional-email'
												pattern='^\S+@\S+\.\S+$'
												required
											/>
											<Input.Label>E-mail *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='tel'
												name='profissional-tel'
												required
												pattern='\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}'
												onInput={(e) => {
													e.currentTarget.value = e.currentTarget.value
														.replace(/\D/g, '')
														.replace(
															/^(\d?)(\d?)(\d{0,5})(\d{0,4})(.*)$/,
															(all, $1, $2, $3, $4) => {
																let s = ''

																if ($1) s += `(${$1}${$2}`
																if ($3) s += `) ${$3}`
																if ($4) s += `-${$4}`

																return s
															},
														)
												}}
											/>
											<Input.Label>Telefone com WhatsApp *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='text'
												name='instagram'
												required
											/>
											<Input.Label>Instagram *</Input.Label>
										</Input.Container>
									</div>

									<button
										type='submit'
										class='h-[50px] w-full bg-gradient-to-r from-[#E4003F] to-[#E9530E] rounded-md text-white font-bold font-lemon text-sm mt-6'
									>
										Avançar
									</button>
								</form>
							</formAccordions.Content>
						</formAccordions.ContentWrapper>
					</formAccordions.Accordion>

					<Form2 />

					<Form3 supplements={supplements} services={services} />
				</div>
			</div>
		</div>
	)
}
