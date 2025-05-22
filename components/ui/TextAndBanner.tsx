import { AppContext } from 'site/apps/site.ts'
import { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { useId } from 'site/sdk/useId.ts'
import { SendEventOnClick } from 'site/components/Analytics.tsx'

export interface Props {
	/** @title Título */
	title?: HTMLWidget

	/** @title Texto */
	contentText?: HTMLWidget

	/** @title Banner */
	banner: {
		src: ImageWidget
		alt: string
	}

	/** @title Botão */
	cta?: Button
}

interface Button {
	/** @title Texto do botão */
	label?: string

	/** @title Link do botão */
	link?: string

	/** @title Abrir em nova aba? */
	target?: boolean
}

export default function TextAndBanner({
	contentText,
	banner,
	cta,
	title,
}: Props) {
	const { link = '#', target = false, label } = cta ?? {}

	const id = useId()

	return (
		<div
			class={'flex flex-col lg:flex-row p-6 lg:py-12 lg:px-14 max-w-[1448px] mx-auto bg-ice rounded-[35px] gap-12 lg:gap-24'}
		>
			<div class={'order-1 lg:order-none px-6 lg:px-12'}>
				{title && (
					<h1
						dangerouslySetInnerHTML={{ __html: title }}
						class={'text-dark font-bold mb-6 text-base lg:text-lg uppercase '}
					/>
				)}

				{contentText && (
					<div
						dangerouslySetInnerHTML={{ __html: contentText }}
						class={'text-dark font-medium flex flex-col gap-6 text-sm leading-6 font-inter '}
					/>
				)}

				{label && (
					<div class={'mt-6'}>
						<a
							id={id}
							href={link}
							target={target ? '_blank' : '_self'}
							class={'flex items-center gap-[10px] uppercase  font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full  bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border  border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px] duration-150'}
						>
							<span>{label}</span>
							<Icon
								id='ArrowRight'
								size={16}
								class='text-white group-hover:text-red'
							/>
						</a>

						<SendEventOnClick
							id={id}
							event={{
								name: 'click_banner_home_footer',
							} as unknown}
						/>
					</div>
				)}
			</div>

			<div class={'flex-shrink-0'}>
				<Image src={banner.src} alt={banner.src} width={644} height={371} />
			</div>
		</div>
	)
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
	return {
		...props,
		isMobile: ctx.device !== 'desktop',
	}
}
