import Icon from 'site/components/ui/Icon.tsx'

export interface Props {
	phone?: number
}

function WhatsApp({ phone }: Props) {
	if (!phone) {
		return null
	}

	return (
		<a
			href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
			class='fixed bottom-6 right-6 z-40'
			aria-label='Chat on WhatsApp'
		>
			<button
				type='button'
				class='bg-[#45D268] text-white p-2 rounded-full shadow-lg'
				aria-label='Chat on WhatsApp'
			>
				<Icon id='WhatsApp' size={32} stroke='0.01' />
			</button>
		</a>
	)
}

export default WhatsApp
