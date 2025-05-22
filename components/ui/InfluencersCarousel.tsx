import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { useId } from 'site/sdk/useId.ts'
import Slider from 'site/components/ui/Slider.tsx'
import SliderJS from 'site/components/ui/SliderJS.tsx'
import RenderHTML from 'site/components/ui/RenderHTML.tsx'

/** @titleBy name */
export interface Card {
	/** @title Imagem */
	image: ImageWidget
	/** @title Nome do influenciador */
	name: string
	/** @title Profissão do influenciador  */
	occupation: string
	/** @title Texto de descrição do influenciador  */
	description: HTMLWidget
	user: string
}

export interface Props {
	/** @title Título */
	title?: string
	/** @title Cards */
	cards: Card[]
}

function InfluencersCarousel({ title, cards }: Props) {
	const id = useId()

	return (
		<div
			id={id}
			class='flex flex-col mx-auto py-6 w-full max-w-[1440px]'
		>
			{title && (
				<div class='flex flex-col items-center gap-5'>
					<div class='flex items-center gap-0.5'>
						{[...Array(5)].map(() => <Icon id='RatingStar' size={13} class='' />)}
					</div>
					<h2 class='max-w-[228px] md:max-w-full font-bold font-lemon text-[18px] text-center text-dark leading-[24px]'>
						{title}
					</h2>
				</div>
			)}

			<div class='flex items-center gap-3 mx-auto w-full'>
				<Slider.PrevButton class='md:flex justify-center items-center border-2 border-Stroke hidden bg-white rounded-full transition-all duration-[400ms] cursor-pointer disabled:pointer-events-none ease-in-out shrink-0 size-14 disabled:opacity-0'>
					<Icon size={24} id='ArrowRight' class='text-dark rotate-180' />
				</Slider.PrevButton>
				<Slider class='gap-2 mt-[32px] w-full carousel'>
					{cards.map((
						{ image, name, occupation, user, description },
						index,
					) => (
						<Slider.Item
							index={index}
							class='flex md:last:pr-0 last:pr-3 md:first:pl-0 first:pl-3 w-[calc((100%/2)-8px+(8px/2))] md:w-[calc((100%/3)-8px+(8px/3))] lg:w-[calc((100%/4)-8px+(8px/4))] carousel-item group'
						>
							<div class='relative'>
								<Image
									src={image}
									alt={name}
									width={302}
									height={450}
									class='group-hover:brightness-100 brightness-90 rounded-[10px] w-full h-full object-cover'
								/>
								<div class='bottom-0 left-0 absolute flex flex-col gap-4 group-hover:opacity-0 p-6 text-white transition-all duration-150 ease-in-out'>
									<strong class='text-sm'>{name}</strong>
									<span class='md:block hidden font-medium text-xs'>
										{occupation}
									</span>
									<span class='md:hidden font-medium text-xs'>
										{occupation.split(' ')[0]}
									</span>
									<span class='bg-gradient-to-r from-35% from-red to-90% to-orange p-2 rounded-full max-w-fit font-medium text-xs'>
										{user}
									</span>
								</div>
								<div class='bottom-0 left-0 absolute opacity-0 group-hover:opacity-100 p-6 font-medium text-white text-xs md:text-sm transition-all duration-150 ease-in-out'>
									<RenderHTML html={description} />
								</div>
							</div>
						</Slider.Item>
					))}
				</Slider>

				<Slider.NextButton class='md:flex justify-center items-center border-2 border-Stroke hidden bg-white rounded-full transition-all duration-[400ms] cursor-pointer disabled:pointer-events-none ease-in-out shrink-0 size-14 disabled:opacity-0'>
					<Icon size={24} id='ArrowRight' class='text-dark' />
				</Slider.NextButton>
			</div>
			<div class='place-items-center grid mt-8 mb-2 lg:mb-20 w-full h-fit'>
				<ul class='z-10 flex-wrap justify-center gap-1 carousel'>
					{cards?.map((_, i) => (
						<li class='carousel-item'>
							<Slider.Dot index={i}>
								<div
									id={`${id}--${i}`}
									class='group-data-[active]:bg-dark bg-ice rounded-full size-[5px] md:size-2 duration-300'
								/>
							</Slider.Dot>
						</li>
					))}
				</ul>
			</div>
			<SliderJS rootId={id} dotIsPage />
		</div>
	)
}

export default InfluencersCarousel
