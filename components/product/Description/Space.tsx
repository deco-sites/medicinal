interface Props {
	size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
	backgroundColor?: 'white' | 'gray'
}

export default function Space({
	size = 'small',
	backgroundColor = 'white',
}: Props) {
	const sizes = {
		small: '1rem',
		medium: '2rem',
		large: '3.25rem',
		xlarge: '4rem',
		xxlarge: '6rem',
	}

	const backgroundColors = {
		white: 'bg-white',
		gray: 'bg-ice',
	}

	return (
		<div
			class={`${backgroundColors[backgroundColor]}`}
			style={{ height: sizes[size] }}
		/>
	)
}
