interface CardProps {
	/**
	 * @title Título
	 */
	contentTitle: string
	/**
	 * @title Subtítulo
	 */
	contentSubtitle: string
}

export default function CardsTitle(
	{ contentTitle, contentSubtitle }: CardProps,
) {
	return (
		<>
			<h1 class='font-lemon-milk text-[18px] font-bold text-dark leading-[24px]'>
				{contentTitle}
			</h1>
			<p class='font-inter text-[14px] font-medium text-gray max-w-full leading-[25px] mt-4'>
				{contentSubtitle}
			</p>
		</>
	)
}
