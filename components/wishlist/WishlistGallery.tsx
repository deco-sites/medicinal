import SearchResult, { type Props as SearchResultProps } from 'site/components/search/SearchResult.tsx'
import type { AppContext } from 'site/apps/site.ts'

export type Props = SearchResultProps

function WishlistGallery(props: ReturnType<typeof loader>) {
	const isEmpty = !props.page || props.page.products.length === 0

	if (isEmpty) {
		return (
			<div class='container mx-4 sm:mx-auto'>
				<div class='mx-10 my-20 flex flex-col gap-4 justify-center items-center'>
					<span class='font-medium text-2xl'>Your wishlist is empty</span>
					<span>
						Log in and add items to your wishlist for later. They will show up here
					</span>
				</div>
			</div>
		)
	}

	return <SearchResult {...props} />
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

export default WishlistGallery
