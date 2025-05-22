import { IS_BROWSER } from '$fresh/runtime.ts'
import type { Product, PropertyValue } from 'apps/commerce/types.ts'
import { useEffect, useState } from 'preact/compat'
import { invoke } from '../../runtime.ts'

export interface Props {
	product: Product
}

export interface ExtendedPropertyValue extends PropertyValue {
	url: string
	selected: boolean
	inventory: number
	fullValue: string
}

interface PossibilitiesProps {
	Sabor?: ExtendedPropertyValue[]
	Tamanho?: ExtendedPropertyValue[]
	Versão?: ExtendedPropertyValue[]
	Color?: ExtendedPropertyValue[]
}

const CheckIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='14'
		height='14'
		viewBox='0 0 14 14'
		fill='none'
	>
		<g clip-path='url(#clip0_2871_41320)'>
			<path
				d='M4.37533 7L6.12533 8.75L9.62533 5.25M12.8337 7C12.8337 10.2217 10.222 12.8333 7.00033 12.8333C3.77866 12.8333 1.16699 10.2217 1.16699 7C1.16699 3.77834 3.77866 1.16667 7.00033 1.16667C10.222 1.16667 12.8337 3.77834 12.8337 7Z'
				stroke='white'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</g>
		<defs>
			<clipPath id='clip0_2871_41320'>
				<rect width='14' height='14' fill='white' />
			</clipPath>
		</defs>
	</svg>
)

const splitProperties = (properties: PropertyValue[]) => {
	return properties.filter((property) => {
		if (!property.name) return false
		return DICTIONARY_TYPES.includes(property.name)
	})
}

const filterProperties = (properties: ExtendedPropertyValue[], selectedProperty: ExtendedPropertyValue) => {
	return properties?.filter((item) => {
		const [part1, part2] = item.fullValue.split(' - ')
		if (part1 === selectedProperty?.value || part2 === selectedProperty?.value) return true
		return false
	})
}

const DICTIONARY_TYPES = ['Sabor', 'Tamanho', 'Versão', 'Cor']

function ProductSimilars({ product }: Props) {
	if (!IS_BROWSER) return null

	const [possibilities, setPossibilities] = useState<PossibilitiesProps | null>(null)

	useEffect(() => {
		const getData = async () => {
			const relatedProducts = await invoke.vtex.loaders.legacy
				.relatedProductsLoader({ crossSelling: 'similars', id: product.inProductGroupWithID })
			if (!relatedProducts?.length) return null

			console.log({ productsGrade: [product, ...relatedProducts] })

			const properties = [product, ...relatedProducts].map((productRelated) => {
				const url = productRelated.url
				const additionalProperty = productRelated.isVariantOf?.additionalProperty
				if (!url || !additionalProperty?.length) return []

				const split = splitProperties(additionalProperty)
				const fullValue = `${split?.map((property) => property.value).join(' - ')}`

				return additionalProperty.reduce((acc, property) => {
					if (!property.name) return acc
					if (!DICTIONARY_TYPES.includes(property.name)) return acc

					return [...acc, {
						...property,
						url,
						selected: productRelated.sku === product.sku,
						inventory: productRelated.offers?.offers?.[0]?.inventoryLevel?.value ?? 0,
						fullValue,
					}]
				}, [] as ExtendedPropertyValue[]).flat()
			}).flat()

			if (!properties?.length) return null

			const propertyGroups = properties.reduce((acc, property) => {
				if (property.propertyID === 'allSpecifications') return acc
				const name = property.name
				if (!name) return acc
				if (!acc[name]) return { ...acc, [name]: [property] }
				return { ...acc, [name]: [...acc[name], property] }
			}, {} as Record<string, ExtendedPropertyValue[]>)

			if (!propertyGroups) return null

			function getFilteredOptions(propertyGroups: Record<string, ExtendedPropertyValue[]>) {
				let propertyFlavor = propertyGroups.Sabor
				const propertySize = propertyGroups.Tamanho
				const propertyVersion = propertyGroups.Versão
				const propertyColor = propertyGroups.Cor

				if (propertyColor) propertyFlavor = []

				const selectedProperty = propertyFlavor?.length
					? propertyFlavor?.find((flavor) => flavor.selected)
					: propertySize?.find((size) => size.selected)

				const selectedType = propertyFlavor?.length ? propertyFlavor : propertySize
				const selectedTypeOpposition = propertyFlavor?.length ? propertySize : propertyFlavor

				const seenValues = new Set()
				const selectedPrimary = selectedType?.filter((item) => {
					if (!!item.value && !seenValues.has(item.value)) {
						seenValues.add(item.value)
						return true
					}
					return false
				})?.sort((a, b) => {
					if (!a.value || !b.value) return 0
					if (a.value < b.value) return -1
					if (a.value > b.value) return 1
					return 0
				})

				if (!selectedProperty) return {}

				const seenValuesTamanho = new Set()
				const Tamanho = filterProperties(selectedTypeOpposition, selectedProperty)?.filter((item) => {
					if (!!item.value && !seenValuesTamanho.has(item.value)) {
						seenValuesTamanho.add(item.value)
						return true
					}
					return false
				})?.sort((a, b) => {
					const valueA = Number.parseInt(a.value ? a.value.replace(/[^0-9]/gi, '') : '')
					const valueB = Number.parseInt(b.value ? b.value.replace(/[^0-9]/gi, '') : '')
					if (valueA < valueB) return -1
					if (valueA > valueB) return 1
					return 0
				})

				const seenValuesCor = new Set()
				const Cor = filterProperties(propertyColor, selectedProperty)?.filter((item) => {
					if (!!item.value && !seenValuesCor.has(item.value)) {
						seenValuesCor.add(item.value)
						return true
					}
					return false
				})?.sort((a, b) => {
					if (!a.value || !b.value) return 0
					if (a.value < b.value) return -1
					if (a.value > b.value) return 1
					return 0
				})

				const seenValuesVersão = new Set()
				const Versão = filterProperties(propertyVersion, selectedProperty)?.filter((item) => {
					if (!!item.value && !seenValuesVersão.has(item.value)) {
						seenValuesVersão.add(item.value)
						return true
					}
					return false
				})?.sort((a, b) => {
					if (!a.value || !b.value) return 0
					if (a.value < b.value) return -1
					if (a.value > b.value) return 1
					return 0
				})

				if (propertyFlavor?.length) {
					return {
						Sabor: selectedPrimary,
						Tamanho,
						Versão,
					}
				}

				return {
					Tamanho: selectedPrimary,
					Cor,
					Versão,
				}
			}

			const results = getFilteredOptions(propertyGroups)
			if (!results) return null

			setPossibilities(results)
		}

		getData()
	}, [product])

	if (!possibilities) return null

	return (
		<div class='flex flex-col gap-6'>
			{Object.entries(possibilities).map((possibility, index) => {
				if (!possibility[1]?.length) return null

				return (
					<div key={`similar-${possibility[0]}-${index}`}>
						<span class='block font-lemon-milk text-[13px] font-bold uppercase mb-2'>
							{possibility[0]}
						</span>

						<ul
							id='selector-options'
							class='flex flex-wrap flex-row gap-2 pb-2 sm:pb-0'
						>
							{possibility[1].map((item: ExtendedPropertyValue, i: number) => {
								if (!item.name || !item.value) return null

								if (!item.selected && item.inventory === 0) {
									return (
										<li
											key={`similar-item-${item.value}-${i}`}
											class='bg-white text-light-gray border-2 border-light-gray rounded-full flex-none'
										>
											<a
												class='flex items-center gap-2 py-2 px-3 text-sm font-bold'
												href={item.url}
											>
												{item.value}
											</a>
										</li>
									)
								}

								return (
									<li
										key={`similar-item-${item.value}-${i}`}
										class={`${
											item.selected
												? 'bg-brand !border-0 text-white flex items-center justify-center'
												: 'bg-ice border-light-gray text-dark'
										} border-2 rounded-full flex-none`}
									>
										<a class='flex items-center gap-2 py-2 px-3 text-sm font-bold' href={item.url}>
											{item.selected && <CheckIcon />}
											{item.value}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
				)
			})}
		</div>
	)
}

export default ProductSimilars
