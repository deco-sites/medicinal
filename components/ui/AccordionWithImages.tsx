import Image from 'apps/website/components/Image.tsx'
import { Picture, Source } from 'apps/website/components/Picture.tsx'
import type { AppContext } from 'site/apps/site.ts'
import Icon from 'site/components/ui/Icon.tsx'
import BannerCarouselJS from 'site/islands/BannerCarouselJS.tsx'
import { GrayBackgroundProps } from 'site/sdk/types.ts'
import { useId } from 'site/sdk/useId.ts'
import { SendEventOnClick } from 'site/components/Analytics.tsx'

interface DesktopImage {
	/**
	 * @title Imagem
	 * @format image-uri
	 */
	src: string
	/**
	 * @title Largura
	 * @description É recomendado uma largura de 864px
	 */
	width: number
	/**
	 * @title Altura
	 * @description É recomendado uma altura de 600px
	 */
	height: number
}

interface MobileImage {
	/**
	 * @title Imagem
	 * @format image-uri
	 */
	src: string
	/**
	 * @title Largura
	 * @description É recomendado uma largura de 390px
	 */
	width: number
	/**
	 * @title Altura
	 * @description É recomendado uma altura de 442px
	 */
	height: number
}

interface ImageProps {
	/**
	 * @title Desktop
	 * @description Imagem otimizada para telas maiores
	 */
	desktop: DesktopImage
	/**
	 * @title Mobile
	 * @description Imagem otimizada para telas menores
	 */
	mobile: MobileImage
	/**
	 * @title Alt
	 * @description Texto alternativo para a imagem
	 */
	alt: string
}

interface Button {
	/**
	 * @title Texto
	 */
	text: string
	/**
	 * @title Link
	 */
	href: string
}

/**
 * @title {{title}} - {{description}}
 */
interface Section {
	/**
	 * @title Título
	 */
	title: string
	/**
	 * @title Descrição
	 */
	description: string
	/**
	 * @title Texto da Tag
	 * @description Texto que será exibido na tag do canto superior esquerdo da imagem
	 */
	tag: string
	/**
	 * @title Botão
	 */
	button: Button
	image: ImageProps
}

interface Props extends GrayBackgroundProps {
	sections: Section[]
	/**
	 * @title Pré-carregar imagens
	 * @description Ative esta opção quando esse banner é a maior imagem na tela
	 */
	preload?: boolean
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
	return { ...props, isMobile: ctx.device !== 'desktop' }
}

export default function AccordionWithImages({
	sections,
	preload,
	isMobile,
	bottomRounded,
	grayBackground,
	topRounded,
}: ReturnType<typeof loader>) {
	const id = useId()

	if (isMobile) {
		return (
			<div class='mx-auto max-w-[1440px]'>
				<div id={id} class='relative flex w-full'>
					<ul data-slider class='grid grid-cols-1 grid-rows-1 w-full h-[442px]'>
						{sections.map((section, index) => (
							<li
								id={`${id}::${index}`}
								data-intersecting={index === 0}
								data-item
								class="col-start-1 row-start-1 opacity-0 data-[intersecting='true']:opacity-100 w-full transition-all duration-700 pointer-events-none data-[intersecting='true']:pointer-events-auto group"
							>
								<a
									href={section.button.href}
									id={id}
									class='relative block w-full h-full overflow-hidden'
								>
									<span class='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0' />
									<span class='top-8 left-8 absolute bg-ice px-3 py-2 rounded-full font-bold font-lemon text-[13px] text-dark uppercase leading-[18px] transition-all'>
										{section.tag}
									</span>
									<div class='bottom-[72px] left-8 absolute text-ice'>
										<h2 class='mb-2 font-bold font-lemon text-lg leading-6'>
											{section.title}
										</h2>
										<p class='mb-2 text-sm leading-4'>{section.description}</p>
										<span class='flex justify-center items-center gap-4 bg-blue px-6 py-3 rounded-full w-fit font-bold font-lemon text-[13px] leading-[18px] transition-all'>
											{section.button.text}
											<Icon id='BannerArrowRight' strokeWidth={2} size={16} />
										</span>
									</div>
									<Picture preload={preload}>
										<Source
											media='(max-width: 767px)'
											fetchPriority={preload ? 'high' : 'auto'}
											src={section.image.mobile.src}
											width={section.image.mobile.width}
											height={section.image.mobile.height}
										/>
										<Source
											media='(min-width: 768px)'
											fetchPriority={preload ? 'high' : 'auto'}
											src={section.image.desktop.src}
											width={section.image.desktop.width}
											height={section.image.desktop.height}
										/>
										<img
											class='w-full h-full object-center object-cover'
											loading={preload ? 'eager' : 'lazy'}
											src={section.image.desktop.src}
											alt={section.image.alt}
										/>
									</Picture>
								</a>

								<SendEventOnClick
									id={`${id}::${index}`}
									event={{
										name: 'click_banner_central',
										params: {
											position: index,
										},
									} as unknown}
								/>
							</li>
						))}
					</ul>
					<div class='right-8 bottom-8 left-8 z-[1] absolute flex justify-between items-center gap-8'>
						<ul class='justify-center gap-3 carousel'>
							{sections.map((_, index) => (
								<li data-dot={index} class='carousel-item group'>
									<div class='size-1.5 lg:size-2 bg-white group-data-[active]:bg-gradient-to-tr from-red to-orange rounded-full' />
								</li>
							))}
						</ul>
						<div class='flex justify-center items-center gap-2 text-dark'>
							<button
								type='button'
								data-prev={id}
								aria-label='Anterior'
								class='flex justify-center items-center bg-white px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full'
							>
								<Icon
									class='rotate-180 size-4 lg:size-6'
									id='BannerArrowRight'
									strokeWidth={2}
									strokeLinecap='round'
								/>
							</button>
							<button
								type='button'
								data-next={id}
								aria-label='Próximo'
								class='flex justify-center items-center bg-white px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full'
							>
								<Icon
									class='size-4 lg:size-6'
									id='BannerArrowRight'
									strokeWidth={2}
									strokeLinecap='round'
								/>
							</button>
						</div>
					</div>
					<BannerCarouselJS rootId={id} />
				</div>
			</div>
		)
	}

	return (
		<ul
			style={{
				'--flex': `${sections.length}`,
			}}
			class={'flex p-10 text-ice max-w-[1448px] mx-auto h-[600px]' +
				(bottomRounded ? ' rounded-b-[35px] md:rounded-b-[40px]' : '') +
				(grayBackground ? ' bg-ice' : '') +
				(topRounded ? ' rounded-t-[35px] md:rounded-t-[40px]' : '')}
		>
			{sections.map((section, index) => (
				<li
					id={`${id}::${index}`}
					class={`relative transition-all duration-500 group first:rounded-l-[20px] last:rounded-r-[20px] overflow-hidden${
						index === 0
							? ' has-[~:hover]:flex-[1] flex-[var(--flex)]'
							: ' flex-[1] hover:flex-[var(--flex)]'
					}`}
				>
					<a
						href={section.button.href}
						aria-label={section.button.text}
						class='absolute inset-0 block'
					/>
					<span
						class={`absolute pointer-events-none bg-ice font-bold text-[13px] uppercase text-dark leading-[18px] px-3 py-2 rounded-full top-10 left-10 font-lemon transition-all z-[1]${
							index === 0
								? ' group-has-[~:hover]:opacity-0 opacity-100'
								: ' opacity-0 group-hover:opacity-100'
						}`}
					>
						{section.tag}
					</span>
					<div
						class={`absolute bottom-10 z-[1] transition-all pointer-events-none${
							index === 0
								? ' group-has-[~:hover]:left-[25px] left-10 group-has-[~:hover]:max-w-[185px] max-w-full'
								: ' left-[25px] max-w-[185px] group-hover:max-w-full group-hover:left-10'
						}`}
					>
						<h2 class='mb-2 font-bold font-lemon text-lg leading-6'>
							{section.title}
						</h2>
						<p class='text-sm leading-4'>{section.description}</p>
					</div>
					<span
						class={`bg-blue font-lemon font-bold text-[13px] leading-[18px] flex items-center justify-center gap-4 absolute right-10 bottom-10 transition-all z-[1] py-3 px-6 rounded-full pointer-events-none${
							index === 0
								? ' group-has-[~:hover]:opacity-0 opacity-100'
								: ' opacity-0 group-hover:opacity-100'
						}`}
					>
						{section.button.text}
						<Icon id='BannerArrowRight' strokeWidth={2} size={16} />
					</span>
					<span
						class={`bg-gradient-to-t from-black/30 inset-0 absolute pointer-events-none${
							index === 0
								? ' group-has-[~:hover]:to-black/50 group-has-[~:hover]:from-black/50 to-transparent'
								: ' to-black/50 group-hover:from-black/50 group-hover:to-transparent'
						}`}
					/>
					<Image
						class='w-full h-full object-center object-cover'
						src={section.image.desktop.src}
						width={section.image.desktop.width}
						height={section.image.desktop.height}
						alt={section.image.alt}
					/>

					<SendEventOnClick
						id={`${id}::${index}`}
						event={{
							name: 'click_banner_central',
							params: {
								position: index,
							},
						} as unknown}
					/>
				</li>
			))}
		</ul>
	)
}
