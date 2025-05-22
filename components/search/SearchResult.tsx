import type { ProductListingPage } from 'apps/commerce/types.ts'
import { mapProductToAnalyticsItem } from 'apps/commerce/utils/productToAnalyticsItem.ts'
import { renderSection } from 'apps/website/pages/Page.tsx'
import type { AppContext } from 'site/apps/site.ts'
import { SendEventOnView } from 'site/components/Analytics.tsx'
import ProductCard, { productToProductCardProps } from 'site/components/product/ProductCard.tsx'
import SearchControls from 'site/components/search/Controls.tsx'
import Filters from 'site/components/search/Filters.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import Pagination from 'site/components/ui/Pagination.tsx'
import type { ReturnCustomPLPTitle } from 'site/loaders/CustomPLPTitle.ts'
import type { ReturnSectionSEO } from 'site/loaders/PLPSectionsSEO.ts'
import { SealConfig } from 'site/loaders/seals.tsx'
import { useId } from 'site/sdk/useId.ts'
import { useOffer } from 'site/sdk/useOffer.ts'

export interface Props {
	/** @title Integration */
	page: ProductListingPage | null
	/**
	 * @title Mostrar apenas produtos com assinatura
	 */
	showOnlySubscription?: boolean
	/** @description 0 for ?page=0 as your first page */
	startingPage?: 0 | 1
	sectionsSEO: ReturnSectionSEO
	titles: ReturnCustomPLPTitle

	/**
	 * @title Selos
	 */
	seals: SealConfig[]
}

function NotFound() {
	return (
		<>
			<div class='w-full flex flex-col gap-8 justify-center items-center py-6 max-w-[432px] mx-auto'>
				<strong class='text-dark font-bold text-lg font-lemon text-center'>
					Ops, não encontramos nenhum resultado para a sua busca.
				</strong>

				<span class='text-center text-sm text-dark'>
					Experimente explorar todos os produtos
				</span>

				<a
					href='/produtos'
					class='flex items-center gap-2 py-3 px-6 text-sm font-bold font-lemon text-white bg-gradient-to-r from-red to-orange rounded-full'
				>
					VER TODOS OS PRODUTOS
					<Icon id='ArrowRight' width={16} height={16} class='text-white' />
				</a>
			</div>
		</>
	)
}

function SearchResult(
	{
		page,
		startingPage = 0,
		sectionsSEO,
		url,
		isMobile,
		title: _title,
		showOnlySubscription,
		seals = [],
	}: ReturnType<typeof loader>,
) {
	if (!page) {
		return <NotFound />
	}

	const { products, filters, breadcrumb, pageInfo, sortOptions } = page
	const perPage = pageInfo.recordPerPage || products.length

	const id = useId()

	const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage
	const offset = zeroIndexedOffsetPage * perPage

	const URLi = new URL(url)

	let title = _title ?? URLi.searchParams.get('q') ??
		URLi.pathname.split('/').pop() ?? ''

	const isSearchPage = breadcrumb.itemListElement.length === 0

	title = isSearchPage && !_title ? `Buscando por "${title}"` : title

	if (!page || products.length === 0) {
		return (
			<div class='max-w-[1440px] w-[95%] mx-auto mt-6'>
				<h1 class='text-sm lg:text-2xl font-bold text-dark font-lemon'>
					{decodeURIComponent(title).replaceAll('-', ' ')}{' '}
					<span class='font-light'>({pageInfo.records})</span>
				</h1>

				<div class='w-full h-px bg-light-gray-200 my-6' />

				<div class='w-full flex flex-col gap-8 justify-center items-center my-16 max-w-[432px] mx-auto'>
					<strong class='text-dark font-bold text-sm lg:text-lg font-lemon text-center'>
						Ops, não encontramos nenhum resultado para a sua busca.
					</strong>

					<span class='text-center text-sm text-dark'>
						Experimente explorar todos os produtos
					</span>

					<a
						href='/produtos'
						class='flex items-center gap-2 py-3 px-6 text-sm font-bold font-lemon text-white bg-gradient-to-r from-red to-orange rounded-full'
					>
						VER TODOS OS PRODUTOS
						<Icon id='ArrowRight' width={16} height={16} class='text-white' />
					</a>
				</div>
			</div>
		)
	}

	return (
		<>
			<div class='container px-4 sm:py-10'>
				<SearchControls
					sortOptions={sortOptions}
					filters={filters}
					breadcrumb={breadcrumb}
					url={url}
					title={title}
					isMobile={isMobile}
					productsCount={pageInfo.records ?? 0}
				/>

				<div class='flex'>
					{filters.length > 0 && !isMobile && (
						<aside class='w-min min-w-[250px]'>
							<Filters filters={filters} url={url} />
						</aside>
					)}
					<div class='mx-auto'>
						<div class='flex-grow' id={id}>
							<div class='gap-x-3.5 gap-y-6 grid grid-cols-2 lg:grid-cols-4 items-center'>
								{products?.map((product) => (
									<ProductCard
										{...productToProductCardProps({
											product,
											isMobile,
											showOnlySubscription,
											seals,
										})}
									/>
								))}
							</div>
						</div>
						<div class='flex justify-center my-8'>
							{(pageInfo.records ?? 0) > (pageInfo.recordPerPage ?? 0) && (
								<Pagination pageInfo={pageInfo} url={url} />
							)}
						</div>
					</div>
				</div>

				<div class='flex flex-col w-full gap-6'>
					{sectionsSEO.map(renderSection)}
				</div>
			</div>
			<SendEventOnView
				id={id}
				event={{
					name: 'view_item_list',
					params: {
						// TODO: get category name from search or cms setting
						item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
						item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
						items: page.products?.map((product, index) =>
							mapProductToAnalyticsItem({
								...(useOffer(product.offers)),
								index: offset + index,
								product,
								breadcrumbList: page.breadcrumb,
							})
						),
					},
				}}
			/>
		</>
	)
}

export function loader(props: Props, req: Request, ctx: AppContext) {
	const sectionsSEO = props.sectionsSEO.sections?.find(
		(section) => new URLPattern({ pathname: section.matcher }).test(req.url),
	)?.sections ?? []

	const title = props.titles.titles?.find(
		(section) => new URLPattern({ pathname: section.matcher }).test(req.url),
	)?.title

	return {
		...props,
		sectionsSEO,
		url: req.url,
		isMobile: ctx.device !== 'desktop',
		title,
	}
}

export default SearchResult
