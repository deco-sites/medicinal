interface CardProps {
	/**
	 * @title Título simples
	 */
	contentTitleSimple: string
}

export default function CardsTitle({ contentTitleSimple }: CardProps) {
	return (
		<>
			<h1 class='font-lemon-milk text-[16px] font-bold text-dark'>
				{contentTitleSimple}
			</h1>
		</>
	)
}
