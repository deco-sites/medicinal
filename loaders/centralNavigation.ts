interface Navigation {
	/**
	 * @title URL
	 */
	url: string
	/**
	 * @title Texto
	 */
	label: string
	/**
	 * @title Ícone
	 * @description Um ícone 16x16 para ser exibido ao lado do texto
	 * @format image-uri
	 */
	icon: string
	/**
	 * @title Ícone Ativo
	 * @description Um ícone 16x16 para ser exibido ao lado do texto quando a navegação estiver ativa
	 * @format image-uri
	 */
	activeIcon?: string
}

interface Props {
	/**
	 * @title Navegações
	 */
	navigations: Navigation[]
}

export type NavigationLoader = {
	navigations: Navigation[]
	activeIndex: number
}

export default function loader(
	{ navigations }: Props,
	req: Request,
): NavigationLoader {
	const activeIndex = navigations.findIndex((nav) => {
		const pattern = new URLPattern({ pathname: nav.url })
		return pattern.test(req.url)
	})

	return {
		navigations,
		activeIndex,
	}
}
