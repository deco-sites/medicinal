interface Props {
	/**
	 * @title Espaçamento entre os elementos no desktop
	 */
	desktop?: number
	/**
	 * @title Espaçamento entre os elementos no mobile
	 */
	mobile?: number
}

export default function Space({ desktop = 0, mobile = 0 }: Props) {
	return (
		<div
			style={{
				'--s-d': `${desktop}px`,
				'--s-m': `${mobile}px`,
			}}
			class='pt-[var(--s-m)] md:pt-[var(--s-d)]'
		/>
	)
}
