import type { ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'

interface ImgProps {
	/**
	 * @title Imagem
	 */
	img: ImageWidget
	/**
	 * @title Icone
	 */
	icon: ImageWidget
}

interface Props {
	/**
	 * @title Título
	 */
	title: string
	/**
	 * @title Email
	 */
	email: string
}

export default function CardEmail(
	{ img, icon, title, email }: ImgProps & Props,
) {
	return (
		<div class='flex flex-row justify-start items-center gap-4 bg-white drop-shadow-md p-6 border border-light-gray rounded-xl w-full'>
			<div class='flex flex-col gap-4'>
				<div class='flex flex-col justify-center'>
					<div class='flex flex-row items-center gap-4 text-nowrap'>
						<Image
							src={img}
							width={48}
							height={48}
						/>

						<p class='bg-clip-text bg-gradient-to-r from-[#E4003F] to-[#E9530E] font-extrabold font-lemon-milk text-[12px] text-transparent sm:text-[14px]'>
							{title}
						</p>
					</div>
				</div>
				<div class='flex flex-row gap-2 w-full h-full'>
					<Image
						src={icon}
						width={16}
						height={16}
					/>

					<a
						href={`mailto:${email}`}
						class='font-lemon-milk text-[10px] sm:text-[14px] underline uppercase'
					>
						{email}
					</a>
				</div>
			</div>
		</div>
	)
}
