import Card, { Props as CardProps } from 'site/sections/CentralAtendimento/CardNumbered.tsx'

interface Props {
	/**
	 * @title Cards
	 */
	cards: CardProps[]
}

export default function CardNumbered({ cards }: Props) {
	return (
		<div class='flex sm:flex-row flex-col gap-2 w-full h-full'>
			{cards.map((props, index) => (
				<Card
					{...props}
					key={index}
					index={index}
				/>
			))}
		</div>
	)
}
