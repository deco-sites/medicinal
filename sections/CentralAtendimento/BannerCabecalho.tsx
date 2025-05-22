import type { ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'
import Image from 'apps/website/components/Image.tsx'

export interface BannerProps {
	/**
	 * @title Imagem do Mobile
	 */
	srcMobile: ImageWidget
	/**
	 * @title Imagem do Desktop
	 */
	srcDesktop?: ImageWidget
	/**
	 * @title Título
	 */
	title: string
}

export default function CabecalhoCentralAtendimento(
	{ srcMobile, srcDesktop, title }: BannerProps,
) {
	return (
		<div class='relative flex flex-col justify-center items-center mx-auto w-full max-w-[1400px] h-[170px] md:h-[240px]'>
			<Picture class='w-full h-full' preload={true}>
				<Source
					width={390}
					height={170}
					media='(max-width: 767px)'
					src={srcMobile}
				/>
				<Source
					width={1440}
					height={240}
					media='(min-width: 768px)'
					src={srcDesktop || srcMobile}
				/>
				<Image
					width={640}
					class='rounded-3xl w-full h-full object-cover'
					src={srcMobile}
					alt='Banner'
					loading='eager'
					fetchPriority='high'
				/>
			</Picture>

			<p class='z-20 absolute w-[188px] sm:w-auto h-[44px] sm:h-auto font-bold font-lemon-milk text-2xl text-center text-ice sm:text-4xl'>
				{title}
			</p>

			<svg
				class='bottom-0 absolute w-[50px] sm:w-[91px] h-[30px] sm:h-[52px]'
				viewBox='0 0 91 52'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M81.373 70.4903L63.1244 52.1947L55.7708 44.8223L63.1244 37.4498L81.373 19.1542C79.9628 17.1723 78.3788 15.2872 76.608 13.5119C74.8372 11.7365 72.9505 10.1484 70.9801 8.73461L52.7315 27.0302L45.378 34.4027L38.0245 27.0302L19.7759 8.72815C17.7991 10.142 15.9188 11.7301 14.148 13.5054C12.3773 15.2807 10.7932 17.1723 9.38306 19.1477L27.6317 37.4433L34.9852 44.8158L27.6317 52.1883L9.38306 70.4839C10.7932 72.4658 12.3773 74.3509 14.148 76.1262C15.9188 77.9015 17.8055 79.4896 19.7759 80.9035L38.0245 62.6079L45.378 55.2354L52.7315 62.6079L70.9801 80.9035C72.957 79.4896 74.8372 77.9015 76.608 76.1262C78.3788 74.3509 79.9628 72.4593 81.373 70.4839V70.4903Z'
					fill='#E4003F'
				/>
				<path
					d='M89.4604 37.2562H52.9245V0.619752C50.5098 0.21304 48.0372 0 45.5066 0C42.976 0 40.5034 0.21304 38.0887 0.619752V37.2497H1.54638C1.14072 39.6706 0.928223 42.1496 0.928223 44.6867C0.928223 47.2238 1.14072 49.7028 1.54638 52.1237H38.0822V88.7537C40.4969 89.1604 42.9696 89.3734 45.5001 89.3734C48.0307 89.3734 50.5034 89.1604 52.9181 88.7537V52.1237H89.4539C89.8596 49.7028 90.0721 47.2238 90.0721 44.6867C90.0721 42.1496 89.8596 39.6706 89.4539 37.2497L89.4604 37.2562Z'
					fill='#E9530E'
				/>
			</svg>
		</div>
	)
}
