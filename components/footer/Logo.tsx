import type { ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'

export interface Props {
	logo?: {
		image: ImageWidget
		description?: string
	}
}

export default function Logo({ logo }: Props) {
	return (
		<>
			{logo?.image && (
				<div class='flex flex-col gap-3'>
					<div class='w-28 max-h-16'>
						<Image
							loading='lazy'
							src={logo?.image}
							alt={logo?.description}
							width={200}
							height={200}
						/>
					</div>
					<div class=''>
						{logo?.description}
					</div>
				</div>
			)}
		</>
	)
}
