import { useUI } from 'site/sdk/useUI.ts'
import type { JSX } from 'preact'

export type Props = Omit<JSX.IntrinsicElements['button'], 'onClick'> & {
	modalId: string
}

export default function VideoButton({ children, modalId, ...props }: Props) {
	const { displayVideoModal } = useUI()

	return (
		<button
			type='button'
			{...props}
			aria-haspopup={true}
			onClick={() => {
				displayVideoModal.value = modalId
			}}
		>
			{children}
		</button>
	)
}
