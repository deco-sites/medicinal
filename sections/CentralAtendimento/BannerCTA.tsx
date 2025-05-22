import type { ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'
import Image from 'apps/website/components/Image.tsx'

interface TextImgProps {
	/**
	 * @title Imagem Mobile
	 */
	srcMobile: ImageWidget
	/**
	 * @title Imagem Desktop
	 */
	srcDesktop?: ImageWidget
}

interface BannerCTAProps {
	/**
	 * @title Título
	 */
	title: string
	/**
	 * @title Descrição
	 * @format textarea
	 */
	description: string
	/**
	 * @title Texto do botão
	 */
	button: string
	/**
	 * @title Link do botão
	 */
	link: string
}

export default function BannerCTA(
	{ srcMobile, srcDesktop, title, description, button, link }:
		& TextImgProps
		& BannerCTAProps,
) {
	return (
		<>
			<div class='flex w-full flex-col items-center justify-center md:flex-row'>
				<div class='flex flex-col w-full h-auto md:order-last'>
					<Picture>
						<Source
							width={342}
							height={200}
							media='(max-width: 767px)'
							src={srcMobile}
						/>
						<Source
							width={526.5}
							height={400}
							media='(min-width: 768px)'
							src={srcDesktop || srcMobile}
						/>
						<Image
							width={640}
							className='w-full h-[200px] sm:h-[400px] object-cover md:rounded-r-2xl md:rounded-l-none rounded-t-2xl'
							src={srcMobile}
							alt='Banner'
							decoding='async'
							loading='lazy'
						/>
					</Picture>
				</div>

				<div class='flex w-full h-[400px] items-center justify-center gap-2 bg-gradient-to-r from-red to-orange md:rounded-l-2xl md:rounded-r-none rounded-b-2xl'>
					<div class='flex gap-6 h-auto w-[283px] flex-col'>
						<h2 class='font-lemon-milk text-[16px] font-bold text-white leading-[21.61px]'>
							{title}
						</h2>

						<p class='font-inter text-[14px] font-medium text-[#CCCCCA] leading-[25.2px]'>
							{description}
						</p>
						<a
							href={link}
							class='inline-flex w-[223px] h-[48px] justify-start items-center gap-2 px-6 rounded-3xl py-3 bg-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 '
						>
							<span class='block text-[13px] font-bold font-lemon-milk bg-clip-text text-transparent bg-gradient-to-r from-red to-orange'>
								{button}
							</span>
							<svg
								width='14'
								height='10'
								viewBox='0 0 14 10'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1.41663 5H12.0833M12.0833 5L8.08329 1M12.0833 5L8.08329 9'
									stroke='url(#paint0_linear_290_987)'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<defs>
									<linearGradient
										id='paint0_linear_290_987'
										x1='12.0833'
										y1='5'
										x2='1.41663'
										y2='5'
										gradientUnits='userSpaceOnUse'
									>
										<stop stop-color='#E9530E' />
										<stop offset='1' stop-color='#E4003F' />
									</linearGradient>
								</defs>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</>
	)
}
