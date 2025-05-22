import { useSignal } from '@preact/signals'
import { invoke } from 'site/runtime.ts'
import type { JSX } from 'preact'
import Icon from 'site/components/ui/Icon.tsx'

export interface Form {
	placeholder?: string
	buttonText?: string
	/** @format html */
	helpText?: string
}

export interface Props {
	content: {
		title?: string
		/** @format textarea */
		description?: string
		form?: Form
	}
}

type State = 'loading' | 'success' | 'error' | 'idle'

function Newsletter(
	{ content }: Props,
) {
	const state = useSignal<State>('idle')

	const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()

		try {
			state.value = 'loading'

			const input = e.currentTarget.elements.namedItem(
				'email',
			) as RadioNodeList
			if (!input) throw new Error('Email input not found')
			const email = input.value

			await invoke.vtex.actions.masterdata.createDocument({
				acronym: 'CL',
				data: {
					email,
					isNewsletterOptIn: true,
				},
				isPrivateEntity: true,
			})
			state.value = 'success'
			input.value = ''
		} catch (err) {
			console.error(err)
			state.value = 'error'
		}
	}

	return (
		<div class='flex flex-col items-center gap-4 md:flex-row w-full md:justify-between'>
			<div class='flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:max-w-full'>
				{content?.title && (
					<p
						style={'line-height:normal;'}
						class='text-lg w-full max-w-[206px] font-bold font-lemon-milk'
					>
						{content?.title}
					</p>
				)}
				<form
					class='form-control w-full'
					onSubmit={handleSubmit}
				>
					<div class='relative w-full bg-white rounded-full max-w-[326px] md:max-w-[480px] border border-light-gray-200'>
						<input
							name='email'
							class='pr-0 pl-[32px] flex-1 text-base-content bg-transparent outline-none border-none w-full h-12'
							placeholder={content?.form?.placeholder || 'seu@email.com.br'}
						/>
						<button
							type='submit'
							class='rounded-full font-bold uppercase px-6 py-3 bg-brand text-white text-[13px] h-12 font-lemon-milk flex items-center gap-[10px] absolute top-0 right-0'
							disabled={state.value === 'loading'}
						>
							{state.value === 'loading' ? <label class='loading loading-spinner'></label> : (
								<>
									{content?.form?.buttonText || 'assinar'}
									<Icon id='BannerArrowRight' size={16} class='text-white' />
								</>
							)}
						</button>
					</div>
					{state.value === 'success'
						? (
							<span class='text-xs text-green pt-2'>
								Assinatura realizada com sucesso!
							</span>
						)
						: state.value === 'error'
						? (
							<span class='text-xs text-red pt-2'>
								Ocorreu um erro ao realizar a assinatura. Tente novamente
							</span>
						)
						: null}
				</form>
			</div>
		</div>
	)
}

export default Newsletter
