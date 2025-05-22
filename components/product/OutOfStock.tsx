import { useSignal } from '@preact/signals'
import type { Product } from 'apps/commerce/types.ts'
import { invoke } from 'site/runtime.ts'
import { clx } from 'site/sdk/clx.ts'
import type { JSX } from 'preact'

export interface Props {
	productID: Product['productID']
}

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

type State = 'error' | 'success' | null | 'loading'

function Notify({ productID }: Props) {
	const state = useSignal<State>(null)

	const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()

		try {
			state.value = 'loading'

			const name = (e.currentTarget.elements.namedItem('name') as RadioNodeList)
				?.value
			const email = (e.currentTarget.elements.namedItem('email') as RadioNodeList)?.value

			await invoke.vtex.actions.notifyme({ skuId: productID, name, email })
			state.value = 'success'
		} catch (error) {
			console.error(error)
			state.value = 'error'
		}
	}

	return (
		<form
			class='form-control justify-start gap-2'
			onSubmit={handleSubmit}
			onFocus={() => state.value = null}
		>
			<span class='font-lemon text-dark text-[14px] md:text-base leading-[17px] uppercase font-bold'>
				Este produto está indisponivel no momento
			</span>
			<span class='text-xs md:text-sm text-dark'>
				Avise-me quando estiver disponivel
			</span>

			<Input.Container>
				<Input.Input
					type='name'
					name='name'
					required
				/>
				<Input.Label>Nome *</Input.Label>
			</Input.Container>
			<Input.Container>
				<Input.Input
					type='email'
					name='email'
					pattern='^\S+@\S+\.\S+$'
					required
				/>
				<Input.Label>E-mail *</Input.Label>
			</Input.Container>

			<button
				type='submit'
				disabled={state.value === 'loading'}
				class='h-[50px] w-full bg-gradient-to-r from-[#E4003F] to-[#E9530E] rounded-md text-white font-bold font-lemon text-[13px] leading-[17px]'
			>
				{state.value === 'loading' ? <span class='loading'></span> : 'Avise-me'}
			</button>
			{state.value === 'error' && <span class='text-red text-sm'>Erro ao enviar notificação</span>}
			{state.value === 'success' && <span class='text-green text-sm'>Registrado com sucesso!</span>}
		</form>
	)
}

export default Notify
