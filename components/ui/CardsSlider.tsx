import Slider from 'site/components/ui/Slider.tsx'
import { useId } from 'site/sdk/useId.ts'
import SliderJS from 'site/components/ui/SliderJS.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { type LoaderContext } from '@deco/deco'
export interface Card {
	title?: string
	description?: string
}
export interface Props {
	/** @title Título */
	title?: string
	/** @title Conteúdo dos cards */
	cards: Card[]
	/** @title Possui fundo cinza */
	hasBackgroundColor?: boolean
	isMobile?: boolean
}
function CardsSlider({ title, cards, isMobile, hasBackgroundColor }: Props) {
	const id = useId()
	return (
		<div
			id={id}
			class={`w-full bg-ice flex flex-col items-center py-16 ${hasBackgroundColor ? 'bg-ice' : 'bg-white'}`}
		>
			{title && (
				<h2 class='text-dark font-bold text-[18px] leading-6  text-center px-6 md:px-0'>
					{title}
				</h2>
			)}
			<div class='relative w-full max-w-[1440px] mx-auto pl-4 md:pl-[40px] overflow-x-hidden'>
				<Slider class='carousel gap-6 md:gap-[12px] col-span-full max-w-full md:max-w-[1440px] mx-auto mt-[32px] md:mt-[40px]'>
					{cards.map((card, index) => (
						<Slider.Item index={index} class='flex carousel-item group'>
							<div class='w-[266px] md:w-[400px] flex flex-col p-10 gap-6 rounded-[10px] bg-white border border-light-gray'>
								<span class='text-red font-bold '>0{index + 1}.</span>
								{card.title && (
									<h2 class='text-dark  font-bold text-[18px] leading-[24px]'>
										{card.title}
									</h2>
								)}
								{card.description && (
									<p class='text-dark font-inter leading-[27px]'>
										{card.description}
									</p>
								)}
							</div>
						</Slider.Item>
					))}
				</Slider>

				<>
					<Slider.PrevButton>
						<div class='hidden md:flex absolute top-[calc(50%-16px)] left-[13px] w-14 h-14 bg-white border border-light-gray hover:bg-light-gray-200 justify-center items-center rounded-full transition-all ease-in-out duration-[400ms] cursor-pointer'>
							<Icon
								class='rotate-180'
								width={16}
								height={12}
								id='ArrowNarrowRight'
								strokeWidth={3}
							/>
						</div>
					</Slider.PrevButton>
					<Slider.NextButton>
						<div class='hidden md:flex absolute top-[calc(50%-16px)] right-[13px] w-14 h-14 bg-white border border-light-gray hover:bg-light-gray-200 justify-center items-center rounded-full transition-all ease-in-out duration-[400ms] cursor-pointer'>
							<Icon
								class=''
								width={16}
								height={12}
								id='ArrowNarrowRight'
								strokeWidth={3}
							/>
						</div>
					</Slider.NextButton>

					<div class='mt-8 md:mt-0 w-full h-fit grid place-items-center'>
						<ul class='carousel z-10 justify-center gap-1 flex-wrap'>
							{cards?.map((_, i) => (
								<li class='carousel-item'>
									<Slider.Dot index={i}>
										<div
											id={`${id}--${i}`}
											class={`w-[5px] h-[5px] rounded-full group-data-[active]:bg-dark duration-300 ${
												hasBackgroundColor ? 'bg-light-gray' : 'bg-ice'
											}`}
										/>
									</Slider.Dot>
								</li>
							))}
						</ul>
					</div>
				</>
				<SliderJS rootId={id} dotIsPage={!isMobile} />
			</div>
		</div>
	)
}
export default CardsSlider
export const loader = (
	{ ...props }: Props,
	_req: Request,
	ctx: LoaderContext,
) => {
	const isMobile = ctx.device === 'mobile'
	return { ...props, isMobile }
}
