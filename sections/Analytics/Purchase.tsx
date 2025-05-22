import { SendEventOnLoad } from 'site/components/Analytics.tsx'

function Purchase() {
	return (
		<>
			<SendEventOnLoad
				event={{
					name: 'purchase',
					params: {},
				}}
			/>
		</>
	)
}

export default Purchase
