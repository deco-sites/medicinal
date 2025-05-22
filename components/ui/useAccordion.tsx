import { clx } from 'site/sdk/clx.ts'
import { useId } from 'site/sdk/useId.ts'
import type { JSX } from 'preact'

export default function (id_?: string) {
	const name = id_ || useId()

	return {
		Accordion: ({
			children,
			open,
			disabled,
			id,
			...props
		}: JSX.IntrinsicElements['div'] & {
			open?: boolean
			id: string
		}) => (
			<div {...props}>
				<input
					type='radio'
					name={name}
					id={id}
					class='hidden peer'
					checked={open}
					disabled={disabled}
				/>
				{children}
			</div>
		),

		Trigger: (props: JSX.IntrinsicElements['label'] & { for: string }) => (
			<label
				{...props}
				class={clx('cursor-pointer select-none', props.class as string)}
			/>
		),

		ContentWrapper: ({
			customTransition,
			...props
		}: JSX.IntrinsicElements['div'] & {
			customTransition?: boolean
		}) => (
			<div
				{...props}
				class={clx(
					'group grid transition-all',
					!customTransition && 'grid-rows-[0fr] peer-checked:grid-rows-[1fr]',
					props.class as string,
				)}
			/>
		),

		Content: (
			props: JSX.IntrinsicElements['div'] & { noOverflow?: boolean },
		) => (
			<div
				{...props}
				class={clx(
					'[grid-row:1_/_span_2]',
					!props.noOverflow && 'overflow-hidden',
					props.class as string,
				)}
			/>
		),
	}
}
