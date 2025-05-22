import { ImageWidget } from 'apps/admin/widgets.ts'
import { matchCanonical } from 'site/utils/matchCanonical.ts'

/** @titleBy label */
export interface SealConfig {
	/** @title Texto do selo */
	label?: string

	/** @title Imagem (substitui o texto do selo) */
	image?: ImageWidget

	/**
	 * @title Tamanho da imagem do selo
	 * @description Defina o tamanho como <largura>x<altura>, por exemplo, 32x32
	 * @pattern \d+x\d+
	 */
	size?: string

	/**
	 * @title Cor de fundo do selo
	 * @format color
	 */
	bgColor?: string

	/**
	 * @title Cor do texto do selo
	 * @format color
	 */
	color?: string

	/** @title Matcher de URL */
	urlMatcher?: string

	/**
	 * @title Condições de exibição do selo - Tipo de lista
	 * @description Selecione se o selo aparecerá em todos os produtos de uma categoria (category), em todos os produtos de uma coleção (cluster) ou em um SKU específico (product)
	 */
	matcherType?: 'category' | 'cluster' | 'product'

	/**
	 * @title Condições de exibição - ID
	 * @description Informe o ID da categoria, o ID da coleção ou o ID do SKU do produto específico
	 */
	matcherTypeId?: number
}

export interface Props {
	seals: SealConfig[]
}

const loader = (props: Props, request: Request): SealConfig[] => {
	const { seals = [] } = props

	const url = new URL(request.url)
	const canonicalPath = url.pathname

	return seals.filter((seal) => {
		const { urlMatcher } = seal

		const urlMatches = !urlMatcher || matchCanonical(urlMatcher, canonicalPath)

		return urlMatches
	})
}

export default loader
