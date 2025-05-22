import type { ImageWidget } from 'apps/admin/widgets.ts'
import { IconCheck, IconNotCheck } from '../../ui/CustomIcons.tsx'
import { Picture, Source } from 'apps/website/components/Picture.tsx'

interface ComparisonImage {
	desktop: ImageWidget
	tablet?: ImageWidget
	mobile?: ImageWidget
}

interface Props {
	have: string[]
	dontHave: string[]
	image: ComparisonImage
	color?: string
}

export default function Comparison({
	have = ['2,5g Colágeno Verisol®', '22g de Proteína'],
	dontHave = ['Glúten', 'Corantes artificiais'],
	image = {
		desktop: 'https://tfcucl.vtexassets.com/arquivos/whey.png',
	},
	color = '#3C3C3B',
}: Props) {
	return (
		<div class='container flex flex-col gap-8 lg:gap-0 lg:grid grid-cols-7 mt-12'>
			<div class='order-1 lg:order-1 col-span-2'>
				<h3
					class='text-base lg:text-lg font-bold uppercase mb-4 '
					style={{ color }}
				>
					Possui
				</h3>
				<ul>
					{have.map((item) => (
						<li class='text-sm lg:text-base flex items-center gap-4 py-4 border-b border-light-gray-200'>
							<IconCheck color={color} />
							{item.replace(';', '')}
						</li>
					))}
				</ul>
			</div>
			<div class='order-3 lg:order-2 flex justify-center items-baseline col-span-3 px-10 lg:px-0 pt-4 lg:pt-0'>
				<Picture>
					<Source
						media='(min-width:1024px)'
						src={image.desktop}
						alt=''
						width={600}
					/>
					<Source
						media='(min-width:640px)'
						src={image.tablet ? image.tablet : image.desktop}
						alt=''
						width={600}
					/>
					<img
						src={image.mobile ? image.mobile : image.desktop}
						class='w-full h-auto'
						alt=''
					/>
				</Picture>
			</div>
			<div class='order-2 lg:order-3 col-span-2'>
				<h3 class='text-base lg:text-lg lg:text-right text-dark font-bold uppercase mb-4 '>
					Não possui
				</h3>
				<ul>
					{dontHave.map((item) => (
						<li class='text-sm lg:text-base flex flex-row-reverse lg:flex-row justify-end items-center gap-4 py-4 border-b border-light-gray-200'>
							{item.replace(';', '')}
							<IconNotCheck />
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
