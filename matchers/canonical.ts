import { testCanonical } from 'site/sdk/matcher.ts'
import { type MatchContext } from '@deco/deco/blocks'
/**
 * @title Configuração de URL canônica
 * @titleBy value
 */
export interface URLPattern {
	/**
	 * @title URL canônica
	 */
	value: string
	/**
	 * @title Evitar propagação para sub URLs?
	 */
	stopPropagation?: boolean
}
export interface Props {
	/**
	 * @title Lista de URLs
	 * @description Cada URL informada aqui, será testada contra a URL da página, levando em considerado o modo escolhido ('whitelist' ou 'blacklist').
	 */
	urlPatterns?: URLPattern[]
	/**
	 * @title Modo de teste
	 * @description whitelist - O conteúdo será aceito se ALGUMA das URLs canônicas combinar com a URL da página | blacklist - O conteúdo será aceito se NENHUMA das URLs canônicas combinar com a URL da página
	 * @default whitelist
	 */
	listType?: 'whitelist' | 'blacklist'
}
/**
 * @title URLs canônicas
 * @description Define URLs canônicas onde o conteúdo deverá ser exibido/permitido
 * @icon dummy
 */
export default function MultipleCanonicalMatcher(
	{ listType = 'blacklist', urlPatterns = [] }: Props,
	{ request }: MatchContext,
) {
	// If no url pattern is given, matches any canonical path
	if (urlPatterns.length === 0) {
		return true
	}
	const isWhiteList = listType === 'whitelist'
	// Algum padrão de URL combina com a URL da página
	const matches = urlPatterns.some((urlPattern) => testCanonical(urlPattern, request.url))
	// A lógica é um pouco complicada, mas dá certo ;)
	// O conteúdo só será aceito em 2 ocasiões:
	// Ou é whitelist e deu match
	// ou é blacklist e NÃO deu match
	return isWhiteList && matches || !isWhiteList && !matches
}
