import type { ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'
import Image from 'apps/website/components/Image.tsx'

interface IconProps {
	/**
	 * @title Ícone
	 */
	srcIcon: ImageWidget
	/**
	 * @title Largura do ícone
	 */
	iconWidth: number
	/**
	 * @title Altura do ícone
	 */
	iconHeight: number
}

interface InfoCardProps {
	/**
	 * @title Título
	 */
	titleInfoCard: string
	/**
	 * @title Descrição
	 * @format textarea
	 */
	descriptionInfoCard: string
}

export default function InfoCard(
	{ srcIcon, iconWidth, iconHeight, titleInfoCard, descriptionInfoCard }:
		& InfoCardProps
		& IconProps,
) {
	return (
		<div class='flex flex-col gap-7 md:gap-0 h-full w-full rounded-xl border border-light-gray p-8 md:p-16'>
			<div class='flex items-center w-full max-w-[925px] gap-6'>
				<Image
					src={srcIcon}
					width={iconHeight}
					height={iconWidth}
					class='h-fit'
				/>
				<h2 class='font-lemon-milk flex w-full justify-start text-nowrap tracking-tight text-[16px] font-bold text-dark sm:text-[16px] leading-[21.61px]'>
					{titleInfoCard}
				</h2>
			</div>
			<p class='font-inter text-[14px] font-normal text-dark leading-[24.36px] md:ml-[65px]'>
				{descriptionInfoCard}
			</p>
		</div>
	)
}
