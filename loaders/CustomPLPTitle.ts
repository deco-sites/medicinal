/**
 * @titleBy matcher
 */
interface O {
	/**
	 * @title Pathname da URL
	 * @description Ex: /produtos
	 */
	matcher: string
	/**
	 * @title Titulo
	 */
	title: string
}

export interface ReturnCustomPLPTitle {
	/**
	 * @title Títulos
	 */
	titles: O[]
}

export interface CustomPLPTitle {
	/**
	 * @title Títulos
	 */
	titles: O[]
}

export default function PLPSectionsSEO(
	props: CustomPLPTitle,
): ReturnCustomPLPTitle {
	return props
}
