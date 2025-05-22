import type { AggregateOffer, UnitPriceSpecification } from 'apps/commerce/types.ts'
import { formatPrice } from './format.ts'

const bestInstallment = (
	acc: UnitPriceSpecification | null,
	curr: UnitPriceSpecification,
	price: number,
) => {
	if (curr.priceComponentType !== 'https://schema.org/Installment') {
		return acc
	}

	if (!acc) {
		return curr
	}

	if (acc.price < price) return curr
	if (curr.price < price) return acc

	if (acc.price > curr.price) {
		return curr
	}

	if (acc.price < curr.price) {
		return acc
	}

	if (acc.billingDuration && curr.billingDuration) {
		if (acc.billingDuration < curr.billingDuration) {
			return curr
		}
	}

	return acc
}

const installmentToString = (
	installment: UnitPriceSpecification,
	sellingPrice: UnitPriceSpecification,
) => {
	const { billingDuration, billingIncrement, price } = installment

	if (!billingDuration || !billingIncrement) {
		return ''
	}

	const withTaxes = sellingPrice.price < price

	return `${billingDuration}x de ${formatPrice(billingIncrement, 'BRL')} ${withTaxes ? 'com juros' : 'sem juros'}`
}

export const useOffer = (aggregateOffer?: AggregateOffer) => {
	const offer = aggregateOffer?.offers[0]
	const listPrice = offer?.priceSpecification.find((spec) => spec.priceType === 'https://schema.org/ListPrice')
	const price = offer?.priceSpecification.find((spec) =>
		spec.priceType === 'https://schema.org/SalePrice' &&
		!spec.priceComponentType
	)
	if (!price) {
		return null
	}
	const installment = offer?.priceSpecification.reduce((
		acc: UnitPriceSpecification | null,
		curr: UnitPriceSpecification,
	) => bestInstallment(acc, curr, price.price), null)
	const seller = offer?.seller
	const availability = offer?.availability

	return {
		price: price?.price,
		listPrice: listPrice?.price,
		availability,
		seller,
		installments: installment && price ? installmentToString(installment, price) : null,
	}
}
