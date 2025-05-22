import { Product, ProductListingPage } from 'apps/commerce/types.ts'
import { canonicalFromBreadcrumblist } from 'apps/commerce/utils/canonical.ts'
import Seo, { Props as SeoProps } from 'apps/website/components/Seo.tsx'
// import Logger from 'site/islands/Logger.tsx'

export type Props = {
	jsonLD: ProductListingPage | null
} & Partial<Omit<SeoProps, 'jsonLDs'>>

const middlewares = [
	// Remove "products"
	(props: Props, _req: Request): Props => {
		const { jsonLD } = props

		return {
			...props,
			jsonLD: jsonLD
				? {
					...jsonLD,
					products: [] as Product[],
					seo: jsonLD.seo
						? {
							...jsonLD?.seo,
							noIndexing: false,
						}
						: undefined,
				}
				: null,
		}
	},

	// Modifica noindex
	(props: Props, req: Request): Props => {
		const { jsonLD } = props

		if (!req?.url?.includes('filter.')) return props

		return {
			...props,
			jsonLD: jsonLD
				? {
					...jsonLD,
					seo: jsonLD.seo
						? {
							...jsonLD?.seo,
							noIndexing: true,
						}
						: undefined,
				}
				: null,
		}
	},
]

export const loader = (
	props: Props,
	req: Request,
) => {
	return middlewares.reduce((props, middleware) => {
		return middleware(props, req)
	}, props)
}

function SeoPLPMiddleware(
	{ jsonLD, ...props }: Awaited<ReturnType<typeof loader>>,
) {
	const title = jsonLD?.seo?.title
	const description = jsonLD?.seo?.description
	const canonical = props.canonical
		? props.canonical
		: jsonLD?.seo?.canonical
		? jsonLD.seo.canonical
		: jsonLD?.breadcrumb
		? canonicalFromBreadcrumblist(jsonLD?.breadcrumb)
		: undefined

	const noIndexing = props.noIndexing ??
		jsonLD?.seo?.noIndexing ??
		!jsonLD ??
		!jsonLD.products.length

	return (
		// <>
		// 	<Logger data={{ jsonLD }} />
		<Seo
			{...props}
			title={title || props.title}
			description={description || props.description}
			canonical={canonical}
			jsonLDs={[jsonLD]}
			noIndexing={noIndexing}
		/>
		// </>
	)
	// return (
	// 	<>
	// 		<Logger data={{ jsonLD }} />
	// 		<SeoPLP jsonLD={jsonLD} {...props} />
	// 	</>
	// )
}

export default SeoPLPMiddleware
