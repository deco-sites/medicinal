import { useSignal } from '@preact/signals'
import { formatPrice } from 'site/sdk/format.ts'
import { useEffect } from 'preact/hooks'
import { debounce } from 'std/async/debounce.ts'

export type RangeProps = {
	max: number
	min: number
	params: string
}

type RangeValue = {
	max: number
	min: number
	pl: string
	pr: string
	width: string
}

export const Range = ({
	max,
	min,
	params: _params,
}: RangeProps) => {
	const price = useSignal<RangeValue>({
		max: Number.isFinite(max) ? max : 1000,
		min: Number.isFinite(min) ? min : 0,
		pl: '0%',
		pr: '0%',
		width: '100%',
	})

	const nearest = (max - min) / 10
	const interval = max - min

	useEffect(() => {
		let lastValue = price.value
		let isDown = false

		const debouncedPost = debounce(() => {
			if (
				(lastValue.min === price.value.min &&
					lastValue.max === price.value.max) || isDown
			) return

			const params = new URLSearchParams(_params)
			params.set(
				'filter.price',
				`${price.value.min}:${price.value.max}`,
			)

			location.search = params.toString()
		}, 1500)

		function updateLastValue(e: MouseEvent | TouchEvent) {
			isDown = true

			let x = 0
			let y = 0

			if (e.type === 'touchstart' || e.type === 'touchend') {
				x = (e as TouchEvent).touches[0].clientX
				y = (e as TouchEvent).touches[0].clientY
			} else {
				x = (e as MouseEvent).clientX
				y = (e as MouseEvent).clientY
			}

			const wasInInputRange = document.elementFromPoint(x, y)?.matches(
				'input[type=range]',
			)

			if (wasInInputRange) {
				lastValue = price.value
			}
		}

		function doPost() {
			isDown = false
			debouncedPost()
		}

		addEventListener('mousedown', updateLastValue)
		addEventListener('touchstart', updateLastValue)
		addEventListener('mouseup', doPost)
		addEventListener('touchend', doPost)

		return () => {
			removeEventListener('mousedown', updateLastValue)
			removeEventListener('touchstart', updateLastValue)
			removeEventListener('mouseup', doPost)
			removeEventListener('touchend', doPost)
		}
	}, [])

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
input[type="range"] {
    -webkit-appearance: none;
    align-items: center;
    appearance: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    height: 0;
  }
  
  /* Removes default focus */
  input[type="range"]:focus {
    outline: none;
  }

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
  background-color: transparent;
  height: 0;
}

/* slider thumb */
input[type="range"]::-webkit-slider-thumb {
  /* Override default look */
  appearance: none;
  /* Centers thumb on the track */
  background-color: #3C3C3B;
  border-radius: 50%;
  height: 16px;
  transform: translateY(-50%);
  width: 16px;
}

input[type="range"]:focus::-webkit-slider-thumb {
  outline: none;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"]::-moz-range-track {
  background-color: transparent;
  height: 0;
}

/* slider thumb */
input[type="range"]::-moz-range-thumb {
  /* Override default look */
  appearance: none;
  /* Centers thumb on the track */
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 0 0 0.625rem #00000033;
  height: 1.25rem;
  transform: translateY(-50%);
  width: 1.25rem;
}

input[type="range"]:focus::-moz-range-thumb {
  outline: none;
}
        `,
				}}
			/>
			<div className='flex flex-col gap-[1.25rem] w-full'>
				<span />
				<div className='flex items-center relative w-full'>
					<div className='bg-light-gray-200 flex h-0.5 items-center relative w-full'>
						<div
							className='absolute bg-dark h-full flex'
							style={{
								left: `${100 * (price.value.min - min) / interval}%`,
								right: `${100 * (price.value.max - min) / interval}%`,
								width: `${100 * (price.value.max - price.value.min) / interval}%`,
							}}
						/>
					</div>

					<label className='absolute flex w-full'>
						<input
							aria-label='Ranger de preço'
							className='w-full'
							max={max}
							min={min}
							onChange={(event) => {
								const target = event.target as HTMLInputElement
								const float = Number.parseFloat(target.value)

								if (float >= price.value.max - nearest) {
									price.value = {
										...price.value,
										min: price.value.max - nearest,
									}

									return
								}

								price.value = {
									...price.value,
									min: float,
								}
							}}
							step={(max - min) / 100}
							type='range'
							value={price.value.min}
						/>
					</label>

					<label className='absolute flex w-full'>
						<input
							aria-label='Ranger de preço'
							className='w-full'
							max={max}
							min={min}
							onChange={(event) => {
								const target = event.target as HTMLInputElement
								const float = Number.parseFloat(target.value)

								if (float <= price.value.min + nearest) {
									price.value = {
										...price.value,
										max: price.value.min + nearest,
									}

									return
								}

								price.value = {
									...price.value,
									max: float,
								}
							}}
							step={(max - min) / 100}
							type='range'
							value={price.value.max}
						/>
					</label>
				</div>

				<div class='flex items-center justify-between text-sm text-black font-inter'>
					<span>
						{formatPrice(price.value.min, 'BRL', 'pt-BR', true)}
					</span>
					<span>
						{formatPrice(price.value.max, 'BRL', 'pt-BR', true)}
					</span>
				</div>
			</div>
		</>
	)
}

export default Range
