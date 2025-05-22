import type { ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'

interface GalleryImages {
	desktop: ImageWidget
	tablet?: ImageWidget
	mobile?: ImageWidget
}

interface Props {
	images: GalleryImages[]
}

export default function Gallery({
	images = [
		{
			desktop: 'https://tfcucl.vtexassets.com/arquivos/infocard-3.jpg',
		},
		{
			desktop: 'https://tfcucl.vtexassets.com/arquivos/infocard-4.jpg',
		},
		{
			desktop: 'https://tfcucl.vtexassets.com/arquivos/infocard-3.jpg',
		},
	],
}: Props) {
	return (
		<div class={`grid grid-cols-${images.length}`}>
			{images.map((image) => (
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
						class='w-full h-[240px] sm:h-[425px] object-cover object-center'
						alt=''
					/>
				</Picture>
			))}
		</div>
	)
}
