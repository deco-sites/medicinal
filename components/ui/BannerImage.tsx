import { ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'
import { type LoaderContext } from '@deco/deco'
const roundedMapping = {
	bottom: 'rounded-b-[20px]',
	top: 'rounded-t-[20px]',
	full: 'rounded-[20px]',
}
export interface Props {
	/**
	 * @title Imagem para desktop
	 */
	desktopSrc: ImageWidget
	/**
	 * @title Altura da imagem para desktop
	 * @description Deixar vazio para altura máxima da imagem
	 */
	desktopHeight?: number
	/**
	 * @title Imagem para mobile
	 * @description Imagem para mobile caso seja diferente da imagem para desktop
	 */
	mobileSrc?: ImageWidget
	/**
	 * @title Altura da imagem para mobile
	 * @description Deixar vazio para altura máxima da imagem
	 */
	mobileHeight?: number
	/** @title Texto alternativo da imagem */
	alt: string
	/** @title Banner é arredondado? */
	rounded?: 'bottom' | 'top' | 'full'
	/** @title Possui container */
	isContainer?: boolean
	/** @description Check this option when this banner is the biggest image on the screen for image optimizations */
	preload?: boolean
	isMobile?: boolean
}
function BannerImage({
	desktopSrc,
	desktopHeight,
	mobileSrc,
	mobileHeight,
	alt,
	preload,
	isContainer,
	rounded,
	isMobile,
}: Props) {
	const heightStyle = isMobile
		? mobileHeight ? `${mobileHeight}px` : 'auto'
		: desktopHeight
		? `${desktopHeight}px`
		: 'auto'
	return (
		<div class={`w-full mx-auto ${isContainer && 'max-w-[1440px]'}`}>
			<Picture preload={preload}>
				<Source
					media='(max-width: 767px)'
					fetchPriority={preload ? 'high' : 'auto'}
					src={mobileSrc || desktopSrc}
					width={360}
					height={mobileHeight || 600}
				/>
				<Source
					media='(min-width: 768px)'
					fetchPriority={preload ? 'high' : 'auto'}
					src={desktopSrc}
					width={1440}
					height={desktopHeight || 600}
				/>
				<img
					class={`object-cover w-full h-full 
          ${rounded && roundedMapping[rounded]} 
          `}
					loading={preload ? 'eager' : 'lazy'}
					src={desktopSrc}
					alt={alt}
					style={{ height: heightStyle }}
				/>
			</Picture>
		</div>
	)
}
export default BannerImage
export const loader = (
	{ ...props }: Props,
	_req: Request,
	ctx: LoaderContext,
) => {
	const isMobile = ctx.device === 'mobile'
	return { ...props, isMobile }
}
