import type { ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'

interface ImageProps {
	/**
	 * @title Imagem
	 */
	src: ImageWidget
	/**
	 * @title Largura da imagem
	 */
	width: number
	/**
	 * @title Altura da imagem
	 */
	height: number
}

/**
 * @title {{number}}
 */
interface Number {
	/**
	 * @title Número
	 */
	number: string
	/**
	 * @title Ícone
	 * @description Um ícone 16x16
	 */
	icon: ImageWidget
	/**
	 * @title Link
	 */
	href?: string
}

/**
 * @title {{title}}
 */
interface Props {
	/**
	 * @title Título
	 */
	title: string
	/**
	 * @title Ícone
	 */
	icon: ImageProps
	/**
	 * @title Números
	 */
	numbers: Number[]
}

export default function CardPhone(
	{ title, icon, numbers }: Props,
) {
	return (
		<div class='flex w-full'>
			<div class='flex flex-row justify-center items-center gap-4 bg-white drop-shadow-md p-6 border border-light-gray rounded-xl w-full h-[107px]'>
				<Image
					src={icon.src}
					width={icon.width}
					height={icon.height}
				/>
				<div class='flex flex-col justify-start w-full h-full'>
					<p class='bg-clip-text bg-gradient-to-r from-[#E4003F] to-[#E9530E] font-extrabold font-lemon-milk text-[12px] text-nowrap text-transparent sm:text-[14px]'>
						{title}
					</p>
					{numbers.map(({ icon, number, href }) => {
						const Wrapper = href ? 'a' : 'span'
						const props = href ? { href } : {}
						return (
							<Wrapper
								{...props}
								class='flex flex-row gap-2'
							>
								<Image
									src={icon}
									width={16}
									height={16}
								/>
								<span class='left-[24px] font-lemon-milk text-[14px] underline'>
									{number}
								</span>
							</Wrapper>
						)
					})}
				</div>
			</div>
		</div>
	)
}
