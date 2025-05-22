import type { ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'
import { Picture, Source } from 'apps/website/components/Picture.tsx'
import { SendEventOnClick, SendEventOnView } from 'site/components/Analytics.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import BannerCarouselJS from 'site/islands/BannerCarouselJS.tsx'
import { useId } from 'site/sdk/useId.ts'
import { isSchedulingActive } from 'site/sdk/contentScheduling.ts'

interface ImageProps {
	/**
	 * @title Imagem
	 */
	src: ImageWidget
	/**
	 * @title Largura
	 * @description Largura da imagem
	 */
	width: number
	/**
	 * @title Altura
	 * @description Altura da imagem
	 */
	height: number
}

/**
 * @title {{alt}}
 */
export interface Banner {
	/**
	 * @description Imagem para desktop
	 */
	desktop: ImageProps
	/**
	 * @description Imagem para mobile
	 */
	mobile: ImageProps
	/**
	 * @description Texto alternativo da imagem
	 */
	alt: string
	/**
	 * @title URL
	 */
	href?: string

	/**
	 * @format datetime
	 */
	start?: string
	/**
	 * @format datetime
	 */
	end?: string
}

export interface Props {
	/**
	 * @title Imagens
	 */
	images: Banner[]
	/**
	 * @title Pré-carregar
	 * @description Ative esta opção quando esse banner é a maior imagem na tela
	 * @default false
	 */
	preload?: boolean
	/**
	 * @title Intervalo
	 * @description Intervalo de tempo que cada imagem ficará na tela, desative deixando o campo vazio
	 */
	interval?: number
}

function BannerItem(
	{ image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
	const {
		alt,
		mobile,
		desktop,
		href,
	} = image

	const Wrapper = href ? 'a' : 'div'
	const props = href ? { href } : {}

	return (
		<Wrapper
			{...props}
			id={id}
			class='relative overflow-clip w-full rounded-[35px]'
		>
			<Picture preload={lcp}>
				<Source
					media='(max-width: 767px)'
					fetchPriority={lcp ? 'high' : 'auto'}
					src={mobile.src}
					width={mobile.width}
					height={mobile.height}
				/>
				<Source
					media='(min-width: 768px)'
					fetchPriority={lcp ? 'high' : 'auto'}
					src={desktop.src}
					width={desktop.width}
					height={desktop.height}
				/>
				<Image
					class='object-cover w-full h-full rounded-[35px]'
					loading={lcp ? 'eager' : 'lazy'}
					src={desktop.src}
					alt={alt}
					width={desktop.width}
					height={desktop.height}
				/>
			</Picture>
		</Wrapper>
	)
}

function BannerCarousel({
	images = [
		{
			alt: 'Mês do consumidor',
			mobile: {
				src: 'https://www.truesource.com.br/arquivos/MOBILE-consumidor.png?v=638452562818730000',
				width: 326,
				height: 313,
			},
			desktop: {
				src: 'https://www.truesource.com.br/arquivos/DESKTOP-consumidor.png?v=638451736675770000',
				width: 1400,
				height: 425,
			},
		},
		{
			alt: 'Mês das mulheres',
			mobile: {
				src: 'https://www.truesource.com.br/arquivos/MOBILE-mulheres.png?v=638449097246330000',
				width: 326,
				height: 313,
			},
			desktop: {
				src: 'https://www.truesource.com.br/arquivos/DESKTOP-mulheres.png?v=638449097253100000',
				width: 1400,
				height: 425,
			},
		},
		{
			alt: 'Assinatura',
			mobile: {
				src: 'https://www.truesource.com.br/arquivos/MOBILE-assinatura-6.png?v=638452558069400000',
				width: 326,
				height: 313,
			},
			desktop: {
				src: 'https://www.truesource.com.br/arquivos/DESKTOP-assinatura-6.png?v=638452558061270000',
				width: 1400,
				height: 425,
			},
		},
		{
			alt: 'Novidades',
			mobile: {
				src: 'https://www.truesource.com.br/arquivos/MOBILE-lancamentos.png?v=638424053075370000',
				width: 326,
				height: 313,
			},
			desktop: {
				src: 'https://www.truesource.com.br/arquivos/DESKTOP-lancamentos.png?v=638424053077700000',
				width: 1400,
				height: 425,
			},
		},
	],
	preload = false,
	interval = 0,
}: Props) {
	const id = useId()

	if (images.length < 1) return

	const imagesFiltred = images.filter((image) => {
		const startTimer = image.start
		const endTimer = image.end

		if (startTimer && endTimer) {
			const active = isSchedulingActive({ start: startTimer, end: endTimer })
			if (active) return image
		} else if (startTimer) {
			const active = isSchedulingActive({ start: startTimer })
			if (active) return image
		} else if (endTimer) {
			const active = isSchedulingActive({ end: endTimer })
			if (active) return image
		} else {
			return image
		}
	})

	return (
		<div class='mx-auto max-w-[1440px]'>
			<div
				id={id}
				class='flex w-full px-4 relative'
			>
				<ul data-slider class='w-full grid grid-cols-1 grid-rows-1'>
					{imagesFiltred.map((image, index) => {
						const params = { promotion_name: image.alt }
						const eventClick = {
							name: 'click_banner_home',
							params: { position: index },
						} as any

						return (
							<li
								id={`${id}::${index}`}
								data-intersecting={index === 0}
								data-item
								class="col-start-1 row-start-1 w-full data-[intersecting='true']:opacity-100 opacity-0 transition-all duration-700 pointer-events-none data-[intersecting='true']:pointer-events-auto"
							>
								<BannerItem
									image={image}
									lcp={index === 0 && preload}
									id={`${id}::${index}`}
								/>
								<SendEventOnClick
									id={`${id}::${index}`}
									event={{ name: 'select_promotion', params }}
								/>

								<SendEventOnClick
									id={`${id}::${index}`}
									event={eventClick}
								/>

								<SendEventOnView
									id={`${id}::${index}`}
									event={{ name: 'view_promotion', params }}
								/>
							</li>
						)
					})}
				</ul>
				<div class='absolute left-10 bottom-4 lg:bottom-6 right-10 flex justify-between lg:justify-end items-center gap-8 z-[1]'>
					<ul class='carousel justify-center gap-3'>
						{imagesFiltred.map((_, index) => (
							<li data-dot={index} class='carousel-item group'>
								<div class='size-1.5 lg:size-2 rounded-full bg-white group-data-[active]:bg-gradient-to-tr from-red to-orange' />
							</li>
						))}
					</ul>
					<div class='flex justify-center items-center gap-2 text-dark'>
						<button
							type='button'
							data-prev={id}
							aria-label='Anterior'
							class='rounded-full bg-white px-2.5 py-1.5 lg:px-4 lg:py-2 flex justify-center items-center'
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
							class='rounded-full bg-white px-2.5 py-1.5 lg:px-4 lg:py-2 flex justify-center items-center'
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
				<BannerCarouselJS
					rootId={id}
					interval={interval && interval * 1e3}
				/>
			</div>
		</div>
	)
}

export default BannerCarousel
