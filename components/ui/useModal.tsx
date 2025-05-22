import type { JSX } from 'preact'
import { useId } from 'site/sdk/useId.ts'

export default function (_id?: string) {
	const id = _id ?? useId()

	return {
		Toggle: (props: JSX.HTMLAttributes<HTMLLabelElement>) => <label for={id} {...props} />,
		Modal: (props: JSX.HTMLAttributes<HTMLDivElement>) => (
			<>
				<input type='checkbox' id={id} class='peer hidden' />
				<div {...props} class={props.class} />
			</>
		),
		open() {
			const e = document.getElementById(id) as HTMLInputElement

			if (!e) throw new Error(`Collapsable ${id} not found`)

			e.checked = true
		},
		close() {
			const e = document.getElementById(id) as HTMLInputElement

			if (!e) throw new Error(`Collapsable ${id} not found`)

			e.checked = false
		},
		isOpen() {
			const e = document.getElementById(id) as HTMLInputElement

			if (!e) throw new Error(`Collapsable ${id} not found`)

			return e.checked
		},
		id,
	}
}
