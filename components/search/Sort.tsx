import { useMemo } from 'preact/hooks'
import type { ProductListingPage } from 'apps/commerce/types.ts'
import { useId } from 'site/sdk/useId.ts'
import { clx } from 'site/sdk/clx.ts'
import Icon from 'site/components/ui/Icon.tsx'
import useCollapsable from 'site/components/ui/useCollapsable.tsx'

const SORT_QUERY_PARAM = 'sort'

const useSort = () =>
	useMemo(() => {
		const urlSearchParams = new URLSearchParams(
			globalThis.window.location?.search,
		)
		return urlSearchParams.get(SORT_QUERY_PARAM) ?? ''
	}, [])

// TODO: Replace with "search utils"
const applySort = (sort: string) => {
	const urlSearchParams = new URLSearchParams(
		globalThis.window.location.search,
	)

	urlSearchParams.set(SORT_QUERY_PARAM, sort)
	globalThis.window.location.search = urlSearchParams.toString()
}

export type Props = Pick<ProductListingPage, 'sortOptions'> & {
	isMobile: boolean
}

// TODO: move this to the loader
const portugueseMappings = {
	'relevance:desc': 'Relevância',
	'price:desc': 'Maior Preço',
	'price:asc': 'Menor Preço',
	'orders:desc': 'Mais vendidos',
	'name:desc': 'Z - A',
	'name:asc': 'A - Z',
	'release:desc': 'Data de Lançamento',
	'discount:desc': 'Maior desconto',
}

function Sort({ sortOptions, isMobile }: Props) {
	const sort = useSort()
	const sortCollapsable = useCollapsable()

	const options = sortOptions.map(({ value, label }) => ({
		value,
		label: portugueseMappings[label as keyof typeof portugueseMappings] ??
			label,
	})).filter(({ label }) => label)

	if (isMobile) {
		return (
			<div class='flex flex-col items-start divide-y divide-light-gray-200'>
				{options.map(({ value, label }) => {
					const selected = value === sort
					const id = useId()

					return (
						<button
							type='button'
							onClick={() => applySort(value)}
							class='flex items-center gap-4 text-sm text-dark p-3 w-full'
						>
							<input
								type='checkbox'
								id={id}
								checked={selected}
								class='peer hidden'
							/>
							<label
								for={id}
								class={clx(
									'size-[18px] border-2 border-dark rounded-full flex justify-center items-center shrink-0',
									selected && 'bg-dark',
								)}
							>
								{selected && <span class='size-2 absolute bg-white rounded-full' />}
							</label>
							<span class='text-sm'>{label}</span>
						</button>
					)
				})}
			</div>
		)
	}

	return (
		<sortCollapsable.Collapsable class='relative z-20 w-[200px]'>
			<sortCollapsable.Trigger class='px-3 py-2 rounded-full bg-ice flex justify-center items-center gap-2 text-sm font-bold text-dark relative z-10'>
				Ordenar por
				<Icon id='ChevronDown' width={16} height={16} />
			</sortCollapsable.Trigger>

			<sortCollapsable.ContentWrapper class='absolute left-0 top-[calc(100%-20px)] bg-ice rounded-bl-xl rounded-br-xl w-full'>
				<sortCollapsable.Content>
					<div class='pt-4'>
						{options.map(({ value, label }) => {
							const selected = value === sort
							const id = useId()

							return (
								<button
									type='button'
									onClick={() => applySort(value)}
									class='flex items-center gap-4 text-sm text-dark p-3 w-full'
								>
									<input
										type='checkbox'
										id={id}
										checked={selected}
										class='peer hidden'
									/>
									<label
										for={id}
										class={clx(
											'size-[18px] border-2 border-dark rounded-full flex justify-center items-center shrink-0',
											selected && 'bg-dark',
										)}
									>
										{selected && <span class='size-2 absolute bg-white rounded-full' />}
									</label>
									<span class='text-sm'>{label}</span>
								</button>
							)
						})}
					</div>
				</sortCollapsable.Content>
			</sortCollapsable.ContentWrapper>
		</sortCollapsable.Collapsable>
	)
}

export default Sort
