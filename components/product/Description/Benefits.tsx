import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'
import { useId } from 'site/sdk/useId.ts'
import BenefitsJS from 'site/islands/BenefitsJS.tsx'

/**
 * @titleBy text
 */
export interface Benefit {
	icon: ImageWidget
	text: HTMLWidget
}

export interface BenefitsType {
	/**
	 * @title Benefícios
	 */
	benefits: Benefit[]
	/**
	 * @title Cor
	 * @format color-input
	 */
	color?: string
}

export default function Benefits({
	benefits = [{
		icon:
			'https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/b6b56684-9e26-4280-aab8-e403c28dd229',
		text: 'Lorem ipsum dolor sit amet, **consectetur adipiscing** elit.',
	}, {
		icon:
			'https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/1b9160f6-359c-4db7-aec3-38cd90c952d8',
		text: 'Lorem ipsum dolor sit amet, **consectetur adipiscing** elit.',
	}, {
		icon:
			'https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/1447a4af-bff0-4129-bae3-bbef83c72b74',
		text: 'Lorem ipsum dolor sit amet, **consectetur adipiscing** elit.',
	}, {
		icon:
			'https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/5eef14d7-2499-43c9-88b3-e2afc3374604',
		text: 'Lorem ipsum dolor sit amet, **consectetur adipiscing** elit.',
	}],
	color = '#3C3C3B',
}: BenefitsType) {
	const id = useId()

	return (
		<div class='w-full flex flex-col items-center' data-root id={id}>
			<h2
				class='w-full uppercase text-center text-base lg:text-lg font-bold mb-10 font-lemon-milk'
				style={{ color: color }}
			>
				Principais benefícios
			</h2>
			<ul
				data-carousel
				class='flex no-scrollbar gap-4 overflow-x-scroll max-w-full'
			>
				{benefits.map(({ icon, text }, index) => (
					<li
						data-item={index}
						class='w-[238px] sm:w-[350px] h-auto first:ml-4 last:mr-4 flex flex-none items-center gap-6 bg-ice px-4 py-3 rounded-lg text-sm lg:text-base'
					>
						<Image
							class='w-[48px] sm:w-[80px] h-auto shrink-0'
							alt='Icon'
							width={80}
							height={80}
							src={icon}
							fetchPriority='low'
							loading='lazy'
						/>
						<div dangerouslySetInnerHTML={{ __html: text }} />
					</li>
				))}
			</ul>
			<ul data-dots class='flex mt-10 gap-3 items-center justify-center'>
				<li
					data-dot-template
					class='size-2 bg-ice rounded-full data-[active]:bg-dark'
				>
				</li>
			</ul>
			<BenefitsJS rootId={id} />
		</div>
	)
}
