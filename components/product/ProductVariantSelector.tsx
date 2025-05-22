import Avatar from 'site/components/ui/Avatar.tsx'
import { useVariantPossibilities } from 'site/sdk/useVariantPossiblities.ts'
import type { Product } from 'apps/commerce/types.ts'
import { relative } from 'site/sdk/url.ts'

interface Props {
	product: Product
}

const notAllowed = [
	'activeSubscriptions',
]

function VariantSelector({ product }: Props) {
	const { url, isVariantOf } = product
	const hasVariant = isVariantOf?.hasVariant ?? []
	const possibilities = useVariantPossibilities(hasVariant, product)
	// console.log("possibilities", possibilities);

	const filtered = Object.keys(possibilities).filter((name) => {
		return !notAllowed.includes(name)
	})
	// console.log("filtered", filtered);

	if (filtered.length === 0) return null
	return (
		<ul class='flex flex-col gap-4'>
			{Object.keys(possibilities).map((name) => {
				return (
					<li class='flex flex-col gap-2'>
						<span class='text-sm'>{name}</span>
						<ul class='flex flex-row gap-3'>
							{Object.entries(possibilities[name]).map(([value, link]) => {
								const relativeUrl = relative(url)
								const relativeLink = relative(link)
								return (
									<li>
										<button type='button' f-partial={relativeLink} f-client-nav>
											<Avatar
												content={value}
												variant={relativeLink === relativeUrl
													? 'active'
													: relativeLink
													? 'default'
													: 'disabled'}
											/>
										</button>
									</li>
								)
							})}
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

export default VariantSelector
