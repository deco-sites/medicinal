import Icon from 'site/components/ui/Icon.tsx'

interface Props {
	quantity: number
	disabled?: boolean
	loading?: boolean
	onChange?: (quantity: number) => void
	type?: 'pdp' | 'cart'
}

const QUANTITY_MAX_VALUE = 100

function QuantitySelector({
	onChange,
	quantity,
	disabled,
	type = 'cart',
}: Props) {
	const min = 1

	const decrement = () => onChange?.(Math.max(0, quantity - 1))

	const increment = () => onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE))

	if (type === 'pdp') {
		return (
			<div
				class='join bg-white border-2 border-light-gray rounded-md p-[10px]'
				style={{
					height: 'calc(100% + 4px)',
					margin: '-2px 0 -2px -2px',
				}}
			>
				<button
					type='button'
					class='join-item py-0 pl-1 sm:pl-2 pr-0 font-bold group/minus'
					onClick={decrement}
					disabled={disabled}
				>
					<Icon
						id='Minus'
						width={6}
						height={3}
						class='text-dark group-disabled/minus:text-gray'
					/>
				</button>
				<input
					class='text-sm sm:text-base text-center p-0 font-bold outline-none w-[40px] sm:w-auto text-dark disabled:text-gray'
					type='number'
					inputMode='numeric'
					pattern='[0-9]*'
					max={QUANTITY_MAX_VALUE}
					min={1}
					value={quantity}
					disabled={disabled}
					onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
					maxLength={3}
					size={1}
				/>
				<button
					type='button'
					class='join-item py-0 pr-1 sm:pr-2 pl-0 font-bold group/plus'
					onClick={increment}
					disabled={disabled}
				>
					<Icon
						id='Plus'
						width={8}
						height={8}
						class='text-dark group-disabled/plus:text-gray'
					/>
				</button>
			</div>
		)
	}

	if (type === 'cart') {
		return (
			<div
				class={`join border border-1 border-solid border-Stroke rounded-full py-2 px-[14px] ${disabled && ''}`}
			>
				<button
					type='button'
					class='join-item py-0 pl-1 pr-0 font-bold group/minus'
					onClick={decrement}
					disabled={disabled || quantity <= min}
				>
					<Icon
						id='Minus'
						width={6}
						height={3}
						class='text-dark group-disabled/minus:text-gray'
					/>
				</button>
				<input
					class='text-center text-xs p-0 font-bold outline-none w-[30px] text-dark disabled:text-gray'
					type='number'
					inputMode='numeric'
					pattern='[0-9]*'
					max={QUANTITY_MAX_VALUE}
					min={min}
					value={quantity}
					disabled={disabled}
					onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
					maxLength={2}
					size={2}
				/>
				<button
					type='button'
					class='join-item py-0 pr-1 pl-0 font-bold group/plus'
					onClick={increment}
					disabled={disabled}
				>
					<Icon
						id='Plus'
						width={8}
						height={8}
						class='text-dark group-disabled/plus:text-gray'
					/>
				</button>
			</div>
		)
	}

	return null
}

export default QuantitySelector
