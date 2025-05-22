import { useEffect } from 'preact/hooks'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { AppContext } from 'site/apps/site.ts'
import { ProductDetailsPage } from 'apps/commerce/types.ts'

export interface Props {
	storeId: string
	page: ProductDetailsPage | null
}

const productStarsId = 'trustvox-script-stars'
const productRatingsId = 'trustvox-script-ratings'

export function loader(props: Props, _req: Request, _ctx: AppContext) {
	return {
		...props,
	}
}

export default function Trustvox({ storeId, page }: ReturnType<typeof loader>) {
	if (!IS_BROWSER || !page?.product) return null

	const {
		image,
		inProductGroupWithID,
		isVariantOf: {
			// @ts-expect-error - name exists
			name: productName,
		},
	} = page.product

	useEffect(() => {
		// @ts-ignore _trustvox exists
		globalThis.window._trustvox = [
			['_storeId', storeId],
			['_productId', inProductGroupWithID ?? ''],
			['_productName', productName],
			['_productPhotos', [!image ? '' : image[0].url ?? '']],
		]

		const productRatings = document.getElementById(productRatingsId)

		if (productRatings === null) {
			const script = document.createElement('script')

			script.id = productRatingsId
			script.async = true
			script.type = 'text/javascript'
			script.src = '//static.trustvox.com.br/sincero/sincero.js'

			document.head.append(script)
		}

		// @ts-ignore _trustvox_shelf_rate exists
		const _trustvox_shelf_rate = globalThis.window._trustvox_shelf_rate || []
		_trustvox_shelf_rate.push(['_storeId', storeId])

		const productStars = document.getElementById(productStarsId)

		if (productStars === null) {
			const script = document.createElement('script')

			script.id = productStarsId
			script.async = true
			script.type = 'text/javascript'
			script.src = '//rate.trustvox.com.br/widget.js'

			document.head.append(script)
		}
	}, [])

	return (
		<div class='container mb-8'>
			<div id='_trustvox_widget' />
		</div>
	)
}
