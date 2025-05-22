import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'

interface InfoCardImage {
	desktop: ImageWidget
	tablet?: ImageWidget
	mobile?: ImageWidget
}

interface Props {
	type: '1' | '2' | 'full'
	textAlign: 'left' | 'right' | 'center'
	image: InfoCardImage
	description: HTMLWidget
	title?: string
	color?: string
}

export default function InfoCard({
	type = '1',
	image = {
		desktop: 'https://tfcucl.vtexassets.com/arquivos/infocard-1.jpg',
	},
	textAlign = 'left',
	description =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius arcu, eu facilisis nunc tortor at mi. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
	title = '',
	color = '#3C3C3B',
}: Props) {
	if (type === '1') {
		const cardTextLeft = 'flex-col-reverse md:flex-row'
		const cardTextRight = 'flex-col md:flex-row-reverse'

		const alignment = textAlign === 'left' ? cardTextLeft : textAlign === 'right' ? cardTextRight : cardTextLeft

		return (
			<div class={`flex ${alignment} items-stretch bg-ice`}>
				<div class='w-full md:w-1/2 flex items-center justify-center'>
					<div class='w-full md:w-3/4 py-16 lg:py-0 px-8 md:px-0'>
						<h2
							class='text-2xl lg:text-4xl uppercase mb-3 font-bold '
							style={{ color }}
						>
							{title}
						</h2>
						<div
							class='text-sm md:text-base leading-6 sm:leading-5'
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</div>
				</div>
				<div class='w-full md:w-1/2'>
					<Picture>
						<Source
							media='(min-width:1024px)'
							src={image.desktop}
							alt=''
							width={900}
						/>
						<Source
							media='(min-width:640px)'
							src={image.tablet ? image.tablet : image.desktop}
							alt=''
							width={600}
						/>
						<img
							src={image.mobile ? image.mobile : image.desktop}
							class='w-full h-auto md:h-full object-cover object-center'
							alt=''
						/>
					</Picture>
				</div>
			</div>
		)
	}

	if (type === '2') {
		const cardTextLeft = 'flex-col-reverse md:flex-row'
		const cardTextRight = 'flex-col md:flex-row-reverse'

		const alignment = textAlign === 'left' ? cardTextLeft : textAlign === 'right' ? cardTextRight : cardTextLeft

		return (
			<div
				class={`w-full px-6 md:max-w-[70vw] md:px-0 flex ${alignment} items-center gap-8 sm:gap-24 mx-auto`}
			>
				<div>
					<h2
						class='text-2xl lg:text-4xl uppercase mb-3 font-bold '
						style={{ color }}
					>
						{title}
					</h2>
					<div
						class='text-sm md:text-base leading-7 sm:leading-6'
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</div>
				<div class='overflow-hidden w-full md:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-3xl flex-none'>
					<Picture>
						<Source
							media='(min-width:1024px)'
							src={image.desktop}
							alt=''
							width={900}
						/>
						<Source
							media='(min-width:640px)'
							src={image.tablet ? image.tablet : image.desktop}
							alt=''
							width={600}
						/>
						<img
							src={image.mobile ? image.mobile : image.desktop}
							class='w-full h-auto max-h-[471px] object-cover object-center'
							alt=''
						/>
					</Picture>
				</div>
			</div>
		)
	}

	if (type === 'full') {
		const cardTextLeft = 'absolute-center lg:absolute-top-center lg:right-[unset] lg:!left-0'
		const cardTextRight = 'absolute-center lg:absolute-top-center lg:left-[unset] lg:!right-0'
		const cardTextCenter = 'absolute-center'

		const alignment = textAlign === 'left' ? cardTextLeft : textAlign === 'right' ? cardTextRight : cardTextCenter

		const textAlignment = textAlign === 'left' ? 'text-left' : textAlign === 'right' ? 'text-left' : 'text-center'

		return (
			<div class='relative z-1'>
				<Picture>
					<Source
						media='(min-width:1024px)'
						src={image.desktop}
						alt=''
						width={900}
					/>
					<Source
						media='(min-width:640px)'
						src={image.tablet ? image.tablet : image.desktop}
						alt=''
						width={600}
					/>
					<img
						src={image.mobile ? image.mobile : image.desktop}
						class='object-cover object-center w-full h-[712px] max-w-unset'
						alt=''
					/>
				</Picture>
				<div
					class={`${alignment} w-full lg:max-w-[680px] px-10`}
					style={{ color }}
				>
					{title && (
						<h2
							class={`text-2xl lg:text-4xl uppercase font-bold  mb-8 ${textAlignment}`}
						>
							{title}
						</h2>
					)}
					<div
						class={`${
							!title ? 'text-1xl sm:text-2xl  font-bold' : 'text-base leading-6 sm:leading-5'
						}  ${textAlignment}`}
					>
						<p dangerouslySetInnerHTML={{ __html: description }} />
					</div>
				</div>
			</div>
		)
	}

	return null
}
