import Slider from 'site/components/ui/Slider.tsx'
import SliderJS from 'site/islands/SliderJS.tsx'
import { useId } from 'site/sdk/useId.ts'
import type { Theme } from './Header.tsx'
import type { ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'

interface AlertIcon {
	icon: ImageWidget
	width: number
	height: number
}

/** @titleBy text */
export interface AlertProps {
	text: string
	icons?: AlertIcon
	link?: string
}

interface Props {
	alerts: AlertProps[]
	theme: Theme
	isMobile: boolean
}

function Alert({ alerts = [], isMobile }: Props) {
	const id = useId()

	return (
		<>
			{isMobile
				? (
					<div
						id={id}
						className={'lg:hidden flex mx-auto border-t-4 border-t-red '}
					>
						<Slider className={'carousel carousel-center w-screen'}>
							{alerts.map((alert, index) => (
								<Slider.Item index={index} className='carousel-item'>
									<div className='text-sm flex justify-center mx-auto items-center w-screen h-[38px] py-2 border-b border-solid border-Stroke border-opacity-100'>
										{alert.icons && (
											<Image
												src={alert.icons.icon}
												alt=''
												width={alert.icons.width}
												height={alert.icons.height}
												class='block mr-2'
											/>
										)}
										<p className='text-xs md:text-sm sm:text-base'>
											{alert.text}
										</p>
									</div>
								</Slider.Item>
							))}
						</Slider>
						<SliderJS rootId={id} interval={5000} />
					</div>
				)
				: (
					<div>
						<div id={id} className='hidden lg:flex container'>
							{alerts.map((alert) => (
								<div
									className={'text-sm flex items-center h-[38px] py-2 w-full justify-center group'}
								>
									<ul class={'flex items-center w-full alertul'}>
										<li class={'list-none '}>
											<a class='flex' href={alert.link}>
												{alert.icons && (
													<Image
														src={alert.icons.icon}
														alt=''
														width={alert.icons.width}
														height={alert.icons.height}
														class='block mr-2'
													/>
												)}
												<p className='text-xs font-medium'>{alert.text}</p>
											</a>
										</li>
										<li class={'benefitdot list-none group-last:hidden'} />
									</ul>
								</div>
							))}
						</div>
					</div>
				)}
		</>
	)
}

export default Alert
