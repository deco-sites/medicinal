import Image from 'apps/website/components/Image.tsx'
import type { AppContext } from 'site/apps/site.ts'

/**
 * @title {{alt}}
 */
interface ImageProps {
	/**
	 * @title Imagem
	 * @format image-uri
	 */
	src: string
	/**
	 * @title Largura
	 */
	width: number
	/**
	 * @title Altura
	 */
	height: number
	/**
	 * @title Alt
	 * @description Texto alternativo para a imagem
	 */
	alt: string
}

export interface Props {
	/**
	 * @title Imagens
	 * @description Imagens para dispositivos móveis
	 */
	mobileImages: ImageProps[]
	/**
	 * @title Imagens
	 * @description Imagens para desktop
	 */
	desktopImages: ImageProps[]
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
	return { ...props, isMobile: ctx.device !== 'desktop' }
}

export default function ImageGrid(
	{ desktopImages, mobileImages, isMobile }: ReturnType<typeof loader>,
) {
	const images = isMobile ? mobileImages : desktopImages

	return (
		<ul class='max-w-[1400px] mx-auto flex justify-center items-center gap-2 px-4 w-full'>
			{images.map((image) => (
				<li key={image.src} class='w-full'>
					<Image
						class='rounded-[15px] object-cover w-full'
						style={{ height: `${image.height}px` }}
						{...image}
					/>
				</li>
			))}
		</ul>
	)
}
