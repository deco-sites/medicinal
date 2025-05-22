import PriceRange from 'site/components/ui/PriceRange.tsx'
import type { Filter, FilterToggle, FilterToggleValue, ProductListingPage } from 'apps/commerce/types.ts'
import { parseRange } from 'apps/commerce/utils/filters.ts'
import { capitalize } from 'apps/utils/capitalize.ts'
import useCollapsable from 'site/components/ui/useCollapsable.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { useId } from 'site/sdk/useId.ts'
import { clx } from 'site/sdk/clx.ts'

interface Props {
	filters: ProductListingPage['filters']
	url: string
	noCollapsable?: boolean
}

const isToggle = (filter: Filter): filter is FilterToggle => filter['@type'] === 'FilterToggle'

function ValueItem(
	{ url, selected, label }: FilterToggleValue,
) {
	const id = useId()

	return (
		<button
			class='flex items-center gap-4 text-sm text-dark py-4 w-full'
			// @ts-ignore onclick inline
			onclick={`window.location.search = "${url}"`}
		>
			<input type='checkbox' id={id} checked={selected} class='peer hidden' />
			<label
				for={id}
				class={clx(
					'size-[18px] border-2 border-dark rounded-full flex justify-center items-center shrink-0',
					selected && 'bg-dark',
				)}
			>
				{selected && <span class='size-2 absolute bg-white rounded-full' />}
			</label>
			<span class='text-sm text-left'>{label}</span>
		</button>
	)
}

function FilterValues(
	{ key, values, label, noCollapsable, url }: FilterToggle & {
		noCollapsable?: boolean
		url: string
	},
) {
	const collapsable = useCollapsable()
	const categoryCollapsable = useCollapsable()

	const NO_DIVIDER = [/^category/, /^price/]

	if (label === 'Preço') {
		let min = 0
		let max = 0

		const params = new URL(url).searchParams

		if (params.has('filter.price')) {
			const v = params
				.get('filter.price')!.split(':')
				.map((value) => Number(value))

			min = v[0]
			max = v[1]
		} else {
			const v = values.map(({ value }) => parseRange(value) || { from: 0, to: 0 }).reduce((acc, curr) => {
				return [Math.min(acc[0], curr.from), Math.max(acc[1], curr.to)]
			}, [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])

			min = v[0]
			max = v[1]
		}

		if (Math.round(min) === Math.round(max)) {
			return null
		}
	}

	return (
		<li class='flex flex-col gap-4'>
			<collapsable.Collapsable>
				<collapsable.Trigger class='flex items-center gap-3 text-dark font-medium text-sm font-lemon group/trigger'>
					{label.toLowerCase() === 'categoria' ? 'Produtos' : label}
					<Icon
						id='ChevronRight'
						width={16}
						height={16}
						class='rotate-90 peer-checked:group-[]/trigger:-rotate-90 transition-transform'
					/>
				</collapsable.Trigger>
				<collapsable.ContentWrapper class='mt-6'>
					<collapsable.Content
						class={clx(
							'flex flex-col items-start',
							NO_DIVIDER.some((re) => re.test(key)) ? 'gap-2' : 'divide-y divide-light-gray-200',
						)}
					>
						{(() => {
							if (label === 'Preço') {
								let min = 0
								let max = 0

								const params = new URL(url).searchParams

								if (params.has('filter.price')) {
									const v = params
										.get('filter.price')!.split(':')
										.map((value) => Number(value))

									min = v[0]
									max = v[1]
								} else {
									const v = values.map(({ value }) => parseRange(value) || { from: 0, to: 0 }).reduce(
										(acc, curr) => {
											return [
												Math.min(acc[0], curr.from),
												Math.max(acc[1], curr.to),
											]
										},
										[Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
									)

									min = v[0]
									max = v[1]
								}

								return (
									<PriceRange
										min={min}
										max={max}
										params={values[0].url}
									/>
								)
							}

							if (label === 'Categoria') {
								return (
									<div class='border-b border-b-light-gray-200 pb-8 flex flex-col gap-2 items-start'>
										{values.slice(0, 10).map((
											{ url, quantity, label, selected },
										) => (
											<button
												// @ts-ignore onclick inline
												onclick={`window.location.search = "${url}"`}
												class={clx(
													'flex justify-center items-center px-3 py-1.5 rounded-full font-bold text-sm hover:text-white hover:bg-dark hover:border-dark transition-colors',
													selected
														? 'text-white bg-dark'
														: 'text-dark bg-white border-2 border-light-gray-200',
												)}
											>
												{capitalize(label.toLowerCase()).split(' ').map((
													word,
												) => word.length === 1 || word.length === 2 ? word.toLowerCase() : word)
													.join(' ')} ({quantity})
											</button>
										))}
										{values.length > 10 && (
											<categoryCollapsable.Collapsable>
												<categoryCollapsable.ContentWrapper>
													<categoryCollapsable.Content class='flex flex-col gap-2 items-start'>
														{values.slice(10).map((
															{ url, quantity, label },
														) => (
															<button
																// @ts-ignore onclick inline
																onclick={`window.location.search = "${url}"`}
																class='flex justify-center items-center px-3 py-1.5 border-2 border-light-gray-200 rounded-full text-dark font-bold text-sm hover:text-white hover:bg-dark hover:border-dark transition-colors'
															>
																{capitalize(label.toLowerCase()).split(' ').map(
																	(
																		word,
																	) => word.length === 1 || word.length === 2
																		? word.toLowerCase()
																		: word,
																).join(' ')} ({quantity})
															</button>
														))}
													</categoryCollapsable.Content>
												</categoryCollapsable.ContentWrapper>

												<categoryCollapsable.Trigger class='flex items-center gap-3 text-dark font-bold text-sm group/categorytrigger mt-5 font-inter'>
													<span class='block peer-checked:group-[]/categorytrigger:hidden'>
														Ver todas as categorias +
													</span>
													<span class='hidden peer-checked:group-[]/categorytrigger:block'>
														Ver menos categorias -
													</span>
												</categoryCollapsable.Trigger>
											</categoryCollapsable.Collapsable>
										)}
									</div>
								)
							}

							return values.map((item) => {
								return <ValueItem {...item} />
							})
						})()}
					</collapsable.Content>
				</collapsable.ContentWrapper>
			</collapsable.Collapsable>
		</li>
	)
}

function Filters({ filters: f, url, noCollapsable }: Props) {
	const filters = f
		.filter(isToggle)
		.filter(({ values, label }) => values.length > 0 && label !== 'Departamento')
		.sort((a, b) => a.label === 'produtos' ? -1 : 1)

	return (
		<ul class='flex flex-col gap-6 lg:mr-14'>
			{filters
				.map((filter) => {
					if (filter.label === 'Marca') return null
					return <FilterValues {...filter} url={url} noCollapsable={noCollapsable} />
				})}
		</ul>
	)
}

export default Filters
