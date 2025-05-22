import type { ProductListingPage } from 'apps/commerce/types.ts'
import Icon from 'site/components/ui/Icon.tsx'
import { clx } from 'site/sdk/clx.ts'

interface Props {
	pageInfo?: ProductListingPage['pageInfo']
	url: string
}

export const MAX_VISIBLE_PAGES = 5
// https://developers.vtex.com/docs/api-reference/search-api?endpoint=get-/api/catalog_system/pub/products/search
// see _from param
export const MAX_FROM_PARAM_VTEX = 2500

export default function Pagination({ pageInfo, url: rawUrl }: Props) {
	const {
		records = 0,
		recordPerPage = 1,
		currentPage = 0,
		previousPage,
		nextPage,
	} = pageInfo ??
		{}

	const pages = Math.ceil(records / (recordPerPage ?? records)) || 0
	const offset = Math.floor(MAX_VISIBLE_PAGES / 2)
	const missingLeft = Math.max(0, offset - (currentPage - 1))
	const missingRight = Math.max(0, offset - (pages - currentPage))

	let lastPage = 0

	for (let i = pages; i >= currentPage; i--) {
		const reached = i * recordPerPage - recordPerPage > MAX_FROM_PARAM_VTEX

		if (!reached) {
			lastPage = i
			break
		}
	}

	const previousUrl = new URL(rawUrl)
	const nextUrl = new URL(rawUrl)
	const firstUrl = new URL(rawUrl)
	const lastUrl = new URL(rawUrl)

	if (previousPage) {
		if (currentPage > 2) {
			previousUrl.searchParams.set('page', (currentPage - 1).toString())
		} else {
			previousUrl.searchParams.delete('page')
		}
	}

	if (nextPage && currentPage < lastPage) {
		nextUrl.searchParams.set('page', (currentPage + 1).toString())
		lastUrl.searchParams.set('page', lastPage.toString())
	}

	if (previousPage) {
		firstUrl.searchParams.delete('page')
	}

	return (
		<div className='flex justify-center'>
			<div className='join gap-1'>
				{previousPage && (
					<>
						<a
							aria-label='Ir para primeira página'
							href={firstUrl.href}
							className='btn btn-ghost no-animation font-medium text-sm join-item btn-xs text-dark'
						>
							<Icon id='PreviousPage' size={14} />
						</a>
						<a
							rel='prev'
							href={previousUrl.href}
							className='btn btn-ghost no-animation font-medium text-sm join-item btn-xs text-dark normal-case'
						>
							Anterior
						</a>
					</>
				)}
				{new Array(pages).fill(null).filter((_, index) => index < lastPage).map(
					(_, index) => {
						const page = index + 1
						const url = new URL(rawUrl)

						if (
							page > pages ||
							page > offset + currentPage + missingLeft ||
							page < currentPage - offset - missingRight
						) {
							return <></>
						}

						if (page > 1) {
							url.searchParams.set('page', `${page}`)
						} else {
							url.searchParams.delete('page')
						}

						return (
							<a
								key={page}
								aria-label={`Ir para a página ${page}`}
								href={url.href}
								className={clx(
									'btn btn-ghost no-animation btn-xs',
									page === currentPage &&
										'bg-green border border-green text-white',
								)}
							>
								{page}
							</a>
						)
					},
				)}
				{nextPage && currentPage < lastPage && (
					<a
						rel='next'
						href={nextUrl.href}
						className='btn btn-ghost join-item btn-xs font-medium text-sm no-animation text-dark normal-case'
					>
						Próximo
					</a>
				)}
				{nextPage && currentPage < lastPage && (
					<a
						aria-label='Ir para última página'
						href={lastUrl.href}
						className='btn btn-ghost join-item font-medium text-sm btn-xs no-animation text-dark'
					>
						<Icon id='NextPage' size={14} />
					</a>
				)}
			</div>
		</div>
	)
}
