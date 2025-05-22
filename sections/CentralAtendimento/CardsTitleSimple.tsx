interface CardProps {
	/**
	 * @title Título simples
	 */
	contentTitleSimple: string
}

export default function CardsTitle({ contentTitleSimple }: CardProps) {
	return (
		<>
			<h1 class='font-lemon-milk text-[18px] font-bold text-dark leading-[24px]'>
				{contentTitleSimple}
			</h1>
		</>
	)
}
