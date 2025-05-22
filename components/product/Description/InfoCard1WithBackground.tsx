import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'

interface InfoCardImage {
	desktop: ImageWidget
	tablet?: ImageWidget
	mobile?: ImageWidget
}

interface Props {
	textAlign: 'left' | 'right'
	image: InfoCardImage
	description: HTMLWidget
	title?: string
	color?: string
	backgroundColor?: string
}

export default function InfoCard1WithBackground({
	image = {
		desktop: 'https://tfcucl.vtexassets.com/arquivos/infocard-1.jpg',
	},
	textAlign = 'left',
	description =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius arcu, eu facilisis nunc tortor at mi. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
	title = '',
	color = '#3c3c3b',
	backgroundColor = '#9bebac',
}: Props) {
	const cardTextLeft = 'flex-col-reverse md:flex-row'
	const cardTextRight = 'flex-col md:flex-row-reverse'

	const alignment = textAlign === 'left' ? cardTextLeft : cardTextRight

	return (
		<div
			class={`flex ${alignment} items-stretch`}
			style={{ backgroundColor }}
		>
			<div class='w-full md:w-1/2 flex items-center justify-center'>
				<div class='w-full md:w-3/4 py-16 lg:py-0 px-8 md:px-0'>
					<h2
						class='text-2xl lg:text-4xl uppercase mb-3 font-bold font-lemon-milk'
						style={{ color }}
					>
						{title}
					</h2>
					<div
						class='text-sm md:text-base leading-6 sm:leading-5'
						style={{ color }}
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
