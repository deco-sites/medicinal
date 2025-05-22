import { effect, useSignal, useSignalEffect } from '@preact/signals'
import type { HTMLWidget } from 'apps/admin/widgets.ts'
import type { AppContext } from 'site/apps/site.ts'
import Icon from 'site/components/ui/Icon.tsx'
import useCollapsable from 'site/components/ui/useCollapsable.tsx'
import useAccordion from 'site/components/ui/useAccordion.tsx'
import { clx } from 'site/sdk/clx.ts'
import useCEP from 'site/sdk/useCEP.ts'
import type { JSX } from 'preact'
import { useRef } from 'preact/hooks'
import { debounce } from 'std/async/debounce.ts'
import Loading from 'site/components/ui/Loading.tsx'
import { invoke } from 'site/runtime.ts'

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
	const formMessage = useSignal<'success' | 'error' | null>(null)

	useSignalEffect(() => {
		if (data.value?.uf) {
			ufSignal.value = data.value?.uf
		}
	})

	async function afterAllForms() {
		function get<T extends HTMLElement>(s: string): T | never {
			const el = document.querySelector<T>(s)

			if (!el) throw new Error(`Element not found: ${s}`)

			return el
		}

		// Form 1
		const socialRatio = get<HTMLInputElement>('[name=social-ratio]').value
		const fantasyName = get<HTMLSelectElement>('[name=fantasy-name]').value
		const cnpj = get<HTMLInputElement>('[name=cnpj]').value
		const federalRegistration = get<HTMLInputElement>('[name=federal-registration]').value
		const contact = get<HTMLInputElement>('[name=contact]').value
		const tel = get<HTMLInputElement>('[name=lojista-tel]').value
		const email = get<HTMLInputElement>('[name=lojista-email]').value
		const instagram = get<HTMLInputElement>('[name=instagram]').value
		const site = get<HTMLInputElement>('[name=site]').value

		// Form 2
		const cep = get<HTMLInputElement>('[name=cep]').value
		const city = get<HTMLInputElement>('[name=city]').value
		const state = get<HTMLSelectElement>('[name=state]').value
		const street = get<HTMLInputElement>('[name=street]').value
		const number = get<HTMLInputElement>('[name=lojista-number]').value
		const complement = get<HTMLInputElement>('[name=complement]').value
		const neighborhood = get<HTMLInputElement>('[name=neighborhood]').value

		await invoke.vtex.actions.masterdata.createDocument({
			acronym: 'LJ',
			data: {
				id: cnpj,
				name: socialRatio,
				fantasyName,
				ie: federalRegistration,
				contact,
				phone: tel,
				email,
				instagram,
				site,
				cep,
				city,
				uf: state,
				street,
				number,
				complement,
				neighborhood,
			},
			isPrivateEntity: true,
		})

		formMessage.value = 'success'

		console.log({
			socialRatio,
			fantasyName,
			cnpj,
			federalRegistration,
			contact,
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
		})
	}

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

							afterAllForms()
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
										name='lojista-number'
										maxLength={10}
										required
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
							ENVIAR SOLICITAÇÃO
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
	{ topText }: Props,
) {
	return (
		<div id='form-lojistas' class='py-36 bg-ice rounded-[40px]'>
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
								SUA EMPRESA
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
											<Input.Input type='text' name='social-ratio' required />
											<Input.Label>Razão Social *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input type='text' name='fantasy-name' required />
											<Input.Label>Nome fantasia *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='text'
												name='cnpj'
												required
												pattern={'[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}'}
												onInput={(e) => {
													e.currentTarget.value = (e.currentTarget.value as string)
														.replace(/\D/g, '')
														.replace(
															/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})(.*)/,
															(all, $1, $2, $3, $4, $5) => {
																let s = ''

																if ($1) s += $1
																if ($2) s += `.${$2}`
																if ($3) s += `.${$3}`
																if ($4) s += `/${$4}`
																if ($5) s += `-${$5}`

																return s
															},
														)
												}}
											/>
											<Input.Label>CNPJ *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='text'
												name='federal-registration'
												required
											/>
											<Input.Label>Inscrição Estadual *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input type='text' name='contact' required />
											<Input.Label>Contato *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='tel'
												name='lojista-tel'
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
											<Input.Label>Telefone *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='email'
												name='lojista-email'
												pattern='^\S+@\S+\.\S+$'
												required
											/>
											<Input.Label>E-mail *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='text'
												name='instagram'
												required
											/>
											<Input.Label>Instagram da loja *</Input.Label>
										</Input.Container>

										<Input.Container>
											<Input.Input
												type='url'
												name='site'
												required
											/>
											<Input.Label>Site *</Input.Label>
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
				</div>
			</div>
		</div>
	)
}
