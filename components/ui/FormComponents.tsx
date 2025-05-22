import Icon from 'site/components/ui/Icon.tsx'
import useCollapsable from 'site/components/ui/useCollapsable.tsx'
import { clx } from 'site/sdk/clx.ts'
import type { JSX } from 'preact'
import { useRef } from 'preact/hooks'

const Input = {
	Container: ({ children, ...props }: JSX.IntrinsicElements['div']) => (
		<div {...props} class={clx('relative', props.class as string)}>
			{children}
		</div>
	),
	Input: ({ children, ...props }: JSX.IntrinsicElements['input']) => (
		<input
			placeholder=' '
			{...props}
			class={clx(
				'peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full [&:valid:not(:placeholder-shown)]:border-green [&:not(:focus):invalid:not(:placeholder-shown)]:border-red',
				props.class as string,
			)}
		/>
	),
	Label: ({ children, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			class={clx(
				'font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all',
			)}
			{...props}
		>
			{children}
		</label>
	),
}

const TextArea = {
	Container: ({ children, ...props }: JSX.IntrinsicElements['div']) => (
		<div {...props} class={clx('relative w-full', props.class as string)}>
			{children}
		</div>
	),
	Input: ({ children, ...props }: JSX.IntrinsicElements['textarea']) => (
		<textarea
			placeholder=' '
			{...props}
			class={clx(
				'peer rounded-md border border-Stroke pt-7 pb-2 px-4 shadow-md outline-0 focus:border-dark text-sm w-full min-h-[200px] valid:border-green [&:not(:focus):invalid:not(:placeholder-shown)]:border-red',
				props.class as string,
			)}
		/>
	),
	Label: ({ children, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			class={clx(
				'font-medium absolute text-gray left-4 text-sm top-4 pointer-events-none peer-focus:text-[11px] peer-focus:top-2 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all',
			)}
			{...props}
		>
			{children}
		</label>
	),
}

const File = {
	Container: ({ children, name, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			class={clx(
				'font-medium p-4 text-gray text-sm bg-white border border-Stroke rounded-md shadow cursor-pointer transition-all flex items-center h-12 truncate',
			)}
			{...props}
		>
			{children}
		</label>
	),
	Input: (props: JSX.IntrinsicElements['input']) => (
		<input
			{...props}
			type='file'
			class='hidden'
		/>
	),
}

const Radio = {
	Container: ({ children, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			{...props}
			class={clx(
				'text-sm font-medium text-dark flex items-center gap-2 cursor-pointer',
				props.class as string,
			)}
		>
			{children}
		</label>
	),
	Input: ({ name, required, value }: {
		name: string
		value: string
		required?: boolean
	}) => (
		<>
			<input
				type='radio'
				name={name}
				required={required}
				class='peer sr-only w-[250px] h-6'
				value={value}
			/>
			<div class='size-[18px] border border-gray rounded-full flex justify-center items-center peer-checked:bg-dark group relative peer-checked:border-0'>
				<span class='size-2 absolute bg-white rounded-full peer-checked:group-[]:block hidden' />
			</div>
		</>
	),
}

const Checkbox = {
	Container: ({ children, ...props }: JSX.IntrinsicElements['label']) => (
		<label
			{...props}
			class={clx(
				'text-sm font-medium text-dark flex items-center gap-2 cursor-pointer',
				props.class as string,
			)}
		>
			{children}
		</label>
	),
	Input: (
		{ name, value, ...props }: Omit<JSX.IntrinsicElements['input'], 'class'>,
	) => (
		<>
			<input
				type='checkbox'
				name={name}
				class='peer sr-only w-[250px] h-5'
				value={value}
				{...props}
			/>
			<span class='border-2 border-gray/80 w-5 h-5 rounded-md flex justify-center items-center peer-checked:border-0 peer-checked:bg-dark group shrink-0'>
				<Icon
					id='CheckboxCheck'
					width={10}
					height={8}
					class='text-white hidden peer-checked:group-[]:block'
				/>
			</span>
		</>
	),
}

function Select({
	placeholder,
	items,
	name,
	class: class_,
	value,
	onChange,
}: {
	placeholder: string
	items: string[]
	name: string
	class?: string
	value: string
	onChange: (value: string) => void
}) {
	const { Collapsable, Content, Trigger, ContentWrapper, close } = useCollapsable()
	const hiddenSelect = useRef<HTMLSelectElement>(null)

	return (
		<Collapsable
			class={clx(
				'relative group/select-collapsable bg-white shadow rounded-md',
				class_,
			)}
		>
			<Trigger class='group/select'>
				<div class='rounded-md border border-Stroke group-has-[select:valid]:border-green group-has-[+select:focus]/select:border-dark outline-0 text-sm w-full h-12 flex items-center pointer-events-none'>
					<label class='font-medium text-gray text-sm left-4 absolute top-1/2 -translate-y-1/2 [&:has(+:not(:empty))]:top-3.5 [&:has(+:not(:empty))]:text-[11px] transition-all'>
						{placeholder}
					</label>
					<span class='font-medium text-dark text-sm pl-3.5 translate-y-1.5 empty:opacity-0 delay-1000 transition-opacity'>
						{value}
					</span>
					<span class='ml-auto border-l border-Stroke group-has-[select:valid]:border-green h-full w-12 flex items-center justify-center transition-transform peer-checked:group-[]/select:rotate-180'>
						<Icon
							id='ChevronDown'
							width={16}
							height={16}
						/>
					</span>
				</div>
			</Trigger>

			<select
				ref={hiddenSelect}
				class='sr-only w-full peer/select'
				required
				name={name}
				onChange={(e) => {
					onChange(e.currentTarget.value)
				}}
			>
				<option value=''>{placeholder}</option>
				{items.map((i) => <option value={i} selected={i === value}>{i}</option>)}
			</select>

			<ContentWrapper class='absolute top-full left-0 z-10 bg-white w-full rounded-bl-md rounded-br-md shadow-lg text-gray text-sm border border-Stroke'>
				<Content class='flex flex-col items-start max-h-[300px] overflow-y-auto overscroll-contain'>
					{items.map((i) => (
						<button
							type='button'
							onClick={(e) => {
								hiddenSelect.current!.value = i
								hiddenSelect.current!.dispatchEvent(
									new Event('change', { bubbles: true }),
								)

								close()
							}}
							class={clx(
								'w-full text-start pl-4 py-2 hover:bg-ice cursor-pointer',
								hiddenSelect.current?.textContent === i && 'bg-ice',
							)}
						>
							{i}
						</button>
					))}
				</Content>
			</ContentWrapper>
		</Collapsable>
	)
}

export default {
	Input,
	Checkbox,
	Select,
	Radio,
	TextArea,
	File,
}
