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
	/**
	 * @title Ícone do link
	 */
	linkIcon: ImageWidget
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
	/**
	 * @title Link
	 */
	link: string
	/**
	 * @title Texto do link
	 */
	linkText: string
}

export default function CardEmailLinked(
	{ img, icon, linkIcon, title, email, link, linkText }: ImgProps & Props,
) {
	return (
		<div class='flex flex-row justify-start items-center gap-4 bg-white drop-shadow-md p-6 border border-light-gray rounded-xl w-full'>
			<div class='flex flex-col gap-4'>
				<div class='flex flex-col justify-center'>
					<div class='flex flex-row items-center gap-4'>
						<Image
							src={img}
							width={32}
							height={40}
						/>

						<div>
							<p class='bg-clip-text bg-gradient-to-r from-[#E4003F] to-[#E9530E] font-extrabold font-lemon-milk text-[12px] text-transparent sm:text-[14px]'>
								{title}
							</p>

							<div class='flex flex-row items-center gap-4'>
								<Image
									src={linkIcon}
									width={16}
									height={16}
								/>
								<div class='flex w-full'>
									<a
										href={link}
										class='flex-wrap bg-clip-text bg-gradient-to-r from-[#E4003F] to-[#E9530E] font-bold font-inter text-[14px] text-transparent'
									>
										{linkText}
									</a>
								</div>
							</div>
						</div>
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
