import type { ComponentChildren, JSX } from 'preact'
import { useId } from 'site/sdk/useId.ts'

function Select({
	title,
	class: _class = '',
	children,
	id: _id,
	...rest
}: Omit<JSX.IntrinsicElements['label'], 'title'> & {
	title: ComponentChildren
}) {
	const id = _id ?? useId()

	return (
		<>
			<label
				for={id}
				class={`group relative cursor-pointer select-none ${_class}`}
				{...rest}
			>
				<input id={id} type='checkbox' class='hidden peer' />
				{title}
				{children}
			</label>
		</>
	)
}

function Options({
	children,
	activeId,
	subClass = '',
	class: _class = '',
	...rest
}: JSX.IntrinsicElements['div'] & {
	activeId: string
	subClass?: string
}) {
	return (
		<div
			role='listbox'
			aria-labelledby='label'
			aria-expanded='true'
			aria-activedescendant={activeId}
			tabIndex={0}
			class={`grid peer-checked:grid-rows-[1fr] z-50 w-full grid-rows-[0fr] transition-all duration-300 ${_class} `}
			{...rest}
		>
			<div class={`flex w-full flex-col overflow-y-auto ${subClass}`}>
				{children}
			</div>
		</div>
	)
}

// https://www.24a11y.com/2019/select-your-poison/

Select.Options = Options

export default Select
