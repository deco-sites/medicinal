import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import RenderHTML from 'site/components/ui/RenderHTML.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import Image from 'apps/website/components/Image.tsx'
import Slider from 'site/components/ui/Slider.tsx'
import SliderJS from 'site/components/ui/SliderJS.tsx'
import { useId } from 'site/sdk/useId.ts'

/** @titleBy text */
export interface Card {
	/** @title Título */
	text?: string
	/** @title Descrição */
	description?: string
	/** @title Imagem */
	image: {
		src: ImageWidget
		width: number
		height: number
	}
}

export interface Props {
	/** @title Título */
	title?: HTMLWidget
	/** @title Descrição */
	description?: string
	/** @title Conteúdo do card */
	cards: Card[]
	/** @title Botão de ação */
	cta?: {
		text?: string
		url?: string
	}
}

function CardsWithImageCta({ title, cta, cards, description }: Props) {
	const id = useId()

	return (
		<div id={id} class='flex flex-col items-center py-16'>
			{title && (
				<RenderHTML
					html={title}
					class='text-dark font-bold text-2xl md:text-[40px] uppercase font-lemon-milk md:leading-[42px] [&_strong]:text-red text-center'
				/>
			)}
			{description && (
				<h2 class='font-lemon-milk text-dark font-bold text-center text-[18px] leading-[24px] mt-6'>
					{description}
				</h2>
			)}

			<div class='flex items-center flex-col gap-6 mt-8 md:mt-14 w-full'>
				<Slider className='carousel gap-4 max-w-full' role='list'>
					{cards?.map((card, index) => (
						<Slider.Item
							index={index}
							className='carousel-item group flex items-center justify-center first:pl-[37px] last:pr-[37px]'
							role='listitem'
						>
							<div class='w-[315px] h-full flex flex-col justify-between bg-ice rounded-[20px] p-6'>
								<div class='flex flex-col gap-6 justify-start items-start'>
									<span class='text-light-gray rounded-full text-[18px] font-bold font-lemon-milk h-10 w-10 flex items-center justify-center bg-white'>
										0{index + 1}
									</span>
									<h2 class='uppercase font-bold font-lemon-milk fontWithGradient text-[14px] md:text-[18px]'>
										{card.text}
									</h2>
									{card.description && (
										<p class='text-dark text-sm md:text-base font-medium leading-[27px]'>
											{card.description}
										</p>
									)}
								</div>
								<Image
									src={card.image.src}
									width={card.image.width}
									height={card.image.height}
									alt='icon'
								/>
							</div>
						</Slider.Item>
					))}
				</Slider>

				<div class='w-full h-fit grid place-items-center md:hidden'>
					<ul class='carousel z-10 justify-center gap-2 flex-wrap'>
						{cards?.map((_, i) => (
							<li class='carousel-item'>
								<Slider.Dot index={i}>
									<div
										id={`${id}--${i}`}
										class='w-[5px] h-[5px] bg-light-gray rounded-full group-data-[active]:bg-dark duration-300'
									/>
								</Slider.Dot>
							</li>
						))}
					</ul>
				</div>
			</div>

			{cta && (
				<a
					href={cta.url}
					class='flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
          bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
          border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px] mt-6 md:mt-10'
				>
					{cta.text}
					<Icon
						id='ArrowRight'
						size={16}
						class='text-white group-hover:text-red'
					/>
				</a>
			)}
			<SliderJS rootId={id} />
		</div>
	)
}

export default CardsWithImageCta
