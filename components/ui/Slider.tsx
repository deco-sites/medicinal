import type { JSX } from 'preact'
import { clx } from 'site/sdk/clx.ts'

function Dot({ children, index, ...props }: JSX.IntrinsicElements['button'] & {
	index: number
}) {
	return (
		<button
			type='button'
			data-dot={index}
			aria-label={`go to slider item ${index}`}
			{...props}
			class={clx('focus:outline-none group', props.class as string)}
		>
			{children}
		</button>
	)
}

function Slider(props: JSX.IntrinsicElements['ul']) {
	return <ul data-slider {...props} />
}

function Item({
	index,
	...props
}: JSX.IntrinsicElements['li'] & { index: number }) {
	return <li data-slider-item={index} {...props} />
}

function NextButton(props: JSX.IntrinsicElements['button']) {
	return <button type='button' data-slide='next' aria-label='Next item' {...props} />
}

function PrevButton(props: JSX.IntrinsicElements['button']) {
	return (
		<button
			type='button'
			data-slide='prev'
			aria-label='Previous item'
			{...props}
		/>
	)
}

Slider.Dot = Dot
Slider.Item = Item
Slider.NextButton = NextButton
Slider.PrevButton = PrevButton

export default Slider
