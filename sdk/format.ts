const formatter = (currency: string, locale: string, noDecimals = false) => {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		maximumFractionDigits: noDecimals ? 0 : undefined,
	})
}

export const formatPrice = (
	price: number | undefined,
	currency = 'BRL',
	locale = 'pt-BR',
	noDecimals = false,
) => price ? formatter(currency, locale, noDecimals).format(price) : null
