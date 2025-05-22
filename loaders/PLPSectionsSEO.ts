import { type Section } from '@deco/deco/blocks'
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
	 * @title Seções
	 */
	sections: Section[]
}
export interface ReturnSectionSEO {
	/**
	 * @title Seções
	 */
	sections: O[]
}
export interface SectionSEO {
	/**
	 * @title Seções
	 */
	sections: O[]
}
export default function PLPSectionsSEO(props: SectionSEO): ReturnSectionSEO {
	return props
}
