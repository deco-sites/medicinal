import { Picture, Source } from 'apps/website/components/Picture.tsx'

import Icon from 'site/components/ui/Icon.tsx'
import Button from 'site/components/ui/VideoModal/Button.tsx'
import Modal from 'site/components/ui/VideoModal/Modal.tsx'
import { useId } from 'site/sdk/useId.ts'

interface PropsBannerInfoWithImage {
	isMobile?: boolean
}

export function BannerInfoWithImage({ isMobile }: PropsBannerInfoWithImage) {
	const id = useId()

	const mobileSrc = null
	const desktopSrc =
		'https://assets.decocache.com/true-source/514c17e5-4310-4b60-8b34-9225d57dfc3b/banner-topo-profissional-de-saude-min.png'

	const desktopHeight = 600
	const mobileHeight = 400

	const heightStyle = isMobile
		? mobileHeight ? `${mobileHeight}px` : 'auto'
		: desktopHeight
		? `${desktopHeight}px`
		: 'auto'

	return (
		<>
			<section className='bg-white'>
				<div className='w-full relative rounded-b-[20px] lg:rounded-b-[77px] overflow-hidden'>
					<Picture preload={true}>
						<Source
							media='(max-width: 767px)'
							fetchPriority='high'
							src={mobileSrc || desktopSrc}
							width={360}
							height={mobileHeight}
						/>
						<Source
							media='(min-width: 768px)'
							fetchPriority='high'
							src={desktopSrc}
							width={1440}
							height={desktopHeight}
						/>
						<img
							className='object-cover w-full h-full'
							loading='eager'
							src={desktopSrc}
							alt='Banner unisul'
							style={{ height: heightStyle }}
						/>
					</Picture>

					<div
						className='absolute top-0 left-0 w-full h-full'
						style='background: linear-gradient(83deg, rgba(47, 15, 0, 0.50) 15.55%, rgba(47, 15, 0, 0.00) 84.56%), linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%);'
					/>

					<div className='absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center px-9 lg:px-0'>
						<h3 className=' text-[12px] lg:text-[24px] leading-none font-bold text-center uppercase fontWithGradient py-1 mb-4 lg:mb-11'>
							magnésio + inositol relief 3.0
						</h3>

						<h2 className='max-w-[758.05px]  text-[24px] lg:text-[40px] leading-none lg:leading-[107%] font-bold text-center uppercase text-ice mb-5 lg:mb-9'>
							Validado pela ciência para transformar a qualidade do sono e o bem-estar dos seus pacientes
						</h2>

						<Button
							modalId={id}
							class='flex items-center gap-[10px] uppercase  font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]'
						>
							<span>assista ao vídeo</span>
							<Icon
								id='ArrowRight'
								size={16}
								class='text-white group-hover:text-red'
							/>
						</Button>

						<Modal
							url='https://www.youtube.com/embed/gc8D53R586c'
							modalId={id}
						/>
					</div>
				</div>
			</section>
		</>
	)
}
