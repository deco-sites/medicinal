/**
 * @titleBy name
 */
interface Items {
	value: string
	name: string
}

interface Props {
	items?: Items[]
	youtubeUrl?: string
	/**
   @default true
   */
	showItems: boolean
	/**
   @default true
   */
	showYoutubeIframe: boolean
	color?: string
}

export default function NutritionalHighlights({
	items = [
		{
			value: '2,5g',
			name: 'Colágeno Verisol®',
		},
		{
			value: '22g',
			name: 'Proteína',
		},
		{
			value: '5g',
			name: 'Carboidratos',
		},
		{
			value: '5g',
			name: 'Vitamina C',
		},
	],
	showItems = true,
	showYoutubeIframe = true,
	youtubeUrl = 'https://www.youtube.com/embed/A3ZfPWDMMDI?si=ZkTy5fqyF1BAT8zU',
	color = '#3C3C3B',
}: Props) {
	return (
		<div class='container flex flex-col lg:flex-row items-center justify-center'>
			{showItems && items.length > 0 && (
				<div
					class={`${!showYoutubeIframe ? 'w-full' : 'w-full lg:w-1/2'} flex justify-center`}
				>
					<div
						class={`${
							!showYoutubeIframe ? 'w-full gap-8' : 'w-80 gap-y-8'
						} flex flex-wrap items-center justify-center`}
					>
						{items.map((highlight) => (
							<div
								class={`flex gap-y-2 flex-col items-center justify-center text-center text-sm lg:text-base ${
									!showYoutubeIframe ? 'w-auto' : 'w-1/2'
								}`}
							>
								<div
									class='w-24 h-24 flex items-center justify-center p-2 font-bold text-base text-dark border  rounded-full'
									style={{ borderColor: color }}
								>
									{highlight.value}
								</div>
								{highlight.name}
							</div>
						))}
					</div>
				</div>
			)}
			{showYoutubeIframe && (
				<div class='w-full lg:w-1/2'>
					<iframe
						class='w-full h-96 rounded-3xl overflow-hidden shadow-[5px_5px_20px_rgba(0,0,0,0.3)]'
						src={youtubeUrl}
						frameBorder='0'
						allowFullScreen={true}
						allowTransparency={true}
						title='YouTube video player'
					/>
				</div>
			)}
		</div>
	)
}
