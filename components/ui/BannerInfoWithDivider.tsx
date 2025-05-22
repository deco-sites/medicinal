import type { ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { type LoaderContext } from '@deco/deco'
/**  @titleBy alt */
export interface Banner {
	/** @description Imagem para desktop */
	desktopSrc: ImageWidget
	/** @description Altura da imagem para desktop */
	desktopHeight?: number
	/** @description Imagem para mobile */
	mobileSrc?: ImageWidget
	/** @description Altura da imagem para mobile */
	mobileHeight?: number
	/** @description Texto alternativo da imagem */
	alt: string
}
export interface Content {
	/** @title Texto de destaque acima do título */
	tag?: string
	/**
	 * @title Título
	 * @format textarea
	 */
	title?: string
	/**
	 * @title Descrição
	 * @format textarea
	 */
	description?: string
	/** @title Botão de cta */
	cta?: {
		text: string
		link: string
	}
}
export interface Props {
	/** @title Imagens  */
	banner: Banner
	/** @title Conteúdo do banner */
	content?: Content
	/** @description Check this option when this banner is the biggest image on the screen for image optimizations */
	preload?: boolean
	isMobile?: boolean
}
function BannerInfoWithDivider({ banner, preload, isMobile, content }: Props) {
	const { mobileSrc, desktopSrc, alt, mobileHeight, desktopHeight } = banner
	const heightStyle = isMobile
		? mobileHeight ? `${mobileHeight}px` : 'auto'
		: desktopHeight
		? `${desktopHeight}px`
		: 'auto'
	return (
		<div class='w-full relative'>
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
					class='object-cover w-full'
					loading={preload ? 'eager' : 'lazy'}
					src={desktopSrc}
					alt={alt}
					style={{ height: heightStyle }}
				/>
			</Picture>

			<div class='absolute top-0 w-full max-w-[1440px] mx-auto h-full flex items-end md:items-center pb-10 md:pb-0 right-0 left-0 px-[30px] md:px-20 lg:px-[182px]'>
				<div class='flex flex-col w-full max-w-[475px]'>
					{content?.tag && (
						<span class='font-inter mb-6  font-bold text-sm md:text-[18px] text-ice'>
							{content.tag}
						</span>
					)}

					<div class='w-full max-w-[475] border-b border-light-gray mb-8' />

					{content?.title && (
						<h2 class=' font-bold text-ice mb-8 text-[24px] md:text-[40px] leading-[25px] md:leading-[42px]'>
							{content.title}
						</h2>
					)}

					{content?.description && (
						<p class='font-inter text-sm font-medium leading-[22px] md:leading-[27px] text-ice mb-8'>
							{content.description}
						</p>
					)}

					{content?.cta && (
						<a
							href={content.cta.link}
							class='flex items-center gap-[10px] uppercase  font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
                bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
                border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]'
						>
							{content.cta.text}
							<Icon
								id='ArrowNarrowRight'
								width={14}
								height={10}
								class='text-white group-hover:text-red'
							/>
						</a>
					)}
				</div>
			</div>
		</div>
	)
}
export default BannerInfoWithDivider
export const loader = (
	{ ...props }: Props,
	_req: Request,
	ctx: LoaderContext,
) => {
	const isMobile = ctx.device === 'mobile'
	return { ...props, isMobile }
}
