import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'
import RenderHTML from 'site/components/ui/RenderHTML.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import Image from 'apps/website/components/Image.tsx'
import { type LoaderContext } from '@deco/deco'
/**  @titleBy alt */
export interface Banner {
	/**
	 * @description Imagem para desktop
	 * @title Imagem para desktop
	 */
	desktopSrc: ImageWidget
	/**
	 * @description Altura da imagem para desktop
	 * @title Altura da imagem
	 */
	desktopHeight: number
	/**
	 * @description Imagem para mobile
	 * @title Imagem para mobile
	 */
	mobileSrc: ImageWidget
	/**
	 * @description Altura da imagem para mobile
	 * @title Altura da imagem
	 */
	mobileHeight: number
	/**
	 * @description Texto alternativo da imagem
	 * @title Texto alternativo
	 */
	alt: string
}
const textPositionMapping = {
	left: 'md:text-left md:justify-start',
	center: 'md:text-center md:justify-center',
	right: 'md:text-left md:justify-end',
}
const tagSizeMapping = {
	small: 'text-[14px] md:text-[16px]',
	medium: 'text-[14px] md:text-[18px]',
}
const tagColorMapping = {
	white: 'text-ice',
	gradientRed: 'fontWithGradient',
}
const titleSizeMapping = {
	medium: 'text-[24px] md:text-[40px] leading-[24px] md:leading-[42px]',
	large: 'text-[28px] md:text-[50px] leading-[29px] md:leading-[52px]',
}
export interface Content {
	/** @title Texto de destaque acima do título */
	tag?: {
		text?: string
		color?: 'white' | 'gradientRed'
		size?: 'small' | 'medium'
		/** @title Letras em caixa alta */
		upperCase?: boolean
		/** @title Letras em caixa alta */
		divider?: boolean
	}
	/** @title Imagem acima do título */
	image?: {
		src?: ImageWidget
		width?: number
		height?: number
	}
	/** @title Título */
	title?: HTMLWidget
	/** @title Tamanho do título */
	titleSize?: 'medium' | 'large'
	/** @title Centralizar título no mobile */
	centerTitleOnMobile?: boolean
	/** @title Descrição */
	description?: HTMLWidget
	/** @title Botão de cta */
	cta?: {
		text: string
		link: string
	}
}
export interface Props {
	/** @title Imagens  */
	banner: Banner
	/** @title Posição do texto */
	textPosition?: 'left' | 'center' | 'right'
	/** @title Conteúdo do banner */
	content?: Content
	/** @description Check this option when this banner is the biggest image on the screen for image optimizations */
	preload?: boolean
	/**
	 * @ignore
	 */
	isMobile?: boolean
}
function BannerInfoContainer({
	banner,
	preload,
	isMobile,
	content,
	textPosition,
}: Props) {
	const { mobileSrc, desktopSrc, alt, mobileHeight, desktopHeight } = banner
	const height = isMobile ? mobileHeight : desktopHeight
	const Wrapper = content?.cta?.link ? 'a' : 'div'
	const props = content?.cta?.link ? { href: content.cta.link } : {}
	return (
		<Wrapper
			{...props}
			class='w-full block max-w-[1448px] mx-auto relative px-[17px] md:px-10'
		>
			<Picture preload={preload}>
				<Source
					media='(max-width: 767px)'
					fetchPriority={preload ? 'high' : 'auto'}
					src={mobileSrc}
					width={360}
					height={mobileHeight}
				/>
				<Source
					media='(min-width: 768px)'
					fetchPriority={preload ? 'high' : 'auto'}
					src={desktopSrc}
					width={1440}
					height={600}
				/>
				<img
					class='object-cover w-full rounded-[35px]'
					loading={preload ? 'eager' : 'lazy'}
					src={desktopSrc}
					alt={alt}
					style={{ height: `${height}px` }}
				/>
			</Picture>

			<div
				class={`absolute top-0 w-full h-full flex items-end md:items-center right-0 left-0 px-[30px] md:px-20 lg:px-[126px] text-center justify-center
        ${textPosition && textPositionMapping[textPosition]}`}
			>
				<div class='flex flex-col items-center md:items-start mb-10 md:mb-0'>
					{content?.tag && (
						<span
							class={`font-inter font-medium mb-6 
                ${content.tag.upperCase && ' font-bold'}
                ${content.tag.size ? tagSizeMapping[content.tag.size] : 'text-[18px]'}
                ${content.tag.color ? tagColorMapping[content.tag.color] : 'text-ice'}
              `}
						>
							{content.tag.text}
						</span>
					)}

					{content?.image && (
						<Image
							src={content?.image.src || ''}
							width={content?.image.width || 0}
							height={content?.image.height || 0}
							alt=''
							class={'mb-6'}
						/>
					)}

					{content?.tag?.divider && <div class='w-full max-w-[475] border-b border-light-gray mb-8' />}

					{content?.title && (
						<RenderHTML
							html={content.title}
							class={` font-bold text-ice mb-8 
                ${
								content.titleSize
									? titleSizeMapping[content.titleSize]
									: 'text-[24px] md:text-[40px] leading-[24px] md:leading-[42px]'
							} ${content.centerTitleOnMobile ? 'text-center md:text-left' : ''}`}
						/>
					)}

					{content?.description && (
						<RenderHTML
							html={content.description}
							class='font-inter text-sm md:text-[16px] font-medium leading-[22px] md:leading-[27px] text-ice mb-8'
						/>
					)}

					{content?.cta && (
						<span class='flex items-center gap-[10px] uppercase  font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
                bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
                border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]'>
							{content.cta.text}
							<Icon
								id='ArrowRight'
								size={16}
								class='text-white group-hover:text-red'
							/>
						</span>
					)}
				</div>
			</div>
		</Wrapper>
	)
}
export default BannerInfoContainer
export const loader = (
	{ ...props }: Props,
	_req: Request,
	ctx: LoaderContext,
) => {
	const isMobile = ctx.device === 'mobile'
	return { ...props, isMobile }
}
