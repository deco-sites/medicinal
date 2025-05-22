import Icon from 'site/components/ui/Icon.tsx'
import type { AppContext } from 'site/apps/site.ts'
import { getDepartmentCategories } from 'site/sdk/getCategory.ts'
import { type SectionProps } from '@deco/deco'
/**
 * @titleBy title
 */
export interface WhatsAppFlutuanteProps {
	/**
	 * @title Pagina
	 * @description Url da pagina que o botão de WhatsApp irá ser exibido (para exibir em todas as páginas deixar all, para pagina de produto deixar product, para pagina de categoria deixar category ou para uma página específica deixar a url da página)
	 */
	matcher: string
	/**
	 * @title Titulo
	 * @description Titulo para identificar a página
	 */
	title?: string
	/**
	 * @title Domingo
	 * @description Horário de funcionamento no Domingo
	 */
	Sunday: {
		/**
		 * @title Ativo
		 * @description Se o horário de funcionamento está ativo
		 */
		active?: boolean
		/**
		 * @title Início
		 * @description Horário de início de funcionamento
		 */
		start: string
		/**
		 * @title Fim
		 * @description Horário de fim de funcionamento
		 */
		end: string
	}
	/**
	 * @title Segunda-feira
	 * @description Horário de funcionamento na Segunda-feira
	 */
	Monday: {
		/**
		 * @title Ativo
		 * @description Se o horário de funcionamento está ativo
		 */
		active?: boolean
		/**
		 * @title Início
		 * @description Horário de início de funcionamento
		 */
		start: string
		/**
		 * @title Fim
		 * @description Horário de fim de funcionamento
		 */
		end: string
	}
	/**
	 * @title Terça-feira
	 * @description Horário de funcionamento na Terça-feira
	 */
	Tuesday: {
		/**
		 * @title Ativo
		 * @description Se o horário de funcionamento está ativo
		 */
		active?: boolean
		/**
		 * @title Início
		 * @description Horário de início de funcionamento
		 */
		start: string
		/**
		 * @title Fim
		 * @description Horário de fim de funcionamento
		 */
		end: string
	}
	/**
	 * @title Quarta-feira
	 * @description Horário de funcionamento na Quarta-feira
	 */
	Wednesday: {
		/**
		 * @title Ativo
		 * @description Se o horário de funcionamento está ativo
		 */
		active?: boolean
		/**
		 * @title Início
		 * @description Horário de início de funcionamento
		 */
		start: string
		/**
		 * @title Fim
		 * @description Horário de fim de funcionamento
		 */
		end: string
	}
	/**
	 * @title Quinta-feira
	 * @description Horário de funcionamento na Quinta-feira
	 */
	Thursday: {
		/**
		 * @title Ativo
		 * @description Se o horário de funcionamento está ativo
		 */
		active?: boolean
		/**
		 * @title Início
		 * @description Horário de início de funcionamento
		 */
		start: string
		/**
		 * @title Fim
		 * @description Horário de fim de funcionamento
		 */
		end: string
	}
	/**
	 * @title Sexta-feira
	 * @description Horário de funcionamento na Sexta-feira
	 */
	Friday: {
		/**
		 * @title Ativo
		 * @description Se o horário de funcionamento está ativo
		 */
		active?: boolean
		/**
		 * @title Início
		 * @description Horário de início de funcionamento
		 */
		start: string
		/**
		 * @title Fim
		 * @description Horário de fim de funcionamento
		 */
		end: string
	}
	/**
	 * @title Sábado
	 * @description Horário de funcionamento no Sábado
	 */
	Saturday: {
		/**
		 * @title Ativo
		 * @description Se o horário de funcionamento está ativo
		 */
		active?: boolean
		/**
		 * @title Início
		 * @description Horário de início de funcionamento
		 */
		start: string
		/**
		 * @title Fim
		 * @description Horário de fim de funcionamento
		 */
		end: string
	}
	/**
	 * @title Url
	 * @description Url do WhatsApp
	 */
	url: string
}
function WhatsAppFlutuante({
	...props
}: SectionProps<ReturnType<typeof loader>> & WhatsAppFlutuanteProps) {
	const date = new Date()
	const day = date.getDay()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
	const currentDay = days[day]
	const dayHours = props[currentDay]
	if (!dayHours) {
		return null
	}
	/** as strings vem ex: 09:00 */
	if (!dayHours?.active === undefined) {
		return null
	}
	if (dayHours?.active === false) {
		return null
	}
	const start = dayHours.start?.split(':')
	const end = dayHours.end?.split(':')
	if (!start || !end) {
		return null
	}
	const startHour = parseInt(start[0])
	const startMinute = parseInt(start[1])
	const endHour = parseInt(end[0])
	const endMinute = parseInt(end[1])
	if (hours < startHour || hours > endHour) {
		return null
	}
	if (hours === startHour && minutes < startMinute) {
		return null
	}
	if (hours === endHour && minutes > endMinute) {
		return null
	}
	return (
		<a
			href={props.url}
			target={'_blank'}
			class='flex items-center w-[64px] h-[64px] fixed rounded-full justify-center bottom-[25px] right-[25px] bg-[#25d366] z-[51]'
		>
			<Icon id='WhatsIcon' width={34} height={34} />
		</a>
	)
}
export interface Props {
	pagina: WhatsAppFlutuanteProps[]
}
export const loader = async (props: Props, req: Request, _ctx: AppContext) => {
	const productPage = props.pagina.find((page) => page.matcher === 'product')
	const url = new URL(req.url)
	/** quando tiver /p no final */
	const product = url.pathname.split('/')
	if (product[product.length - 1] === 'p') {
		return {
			...productPage,
		}
	}
	const categoryPage = props.pagina.find((page) => page.matcher === 'category')
	const categories = await getDepartmentCategories(req.url)
	const iscategory = categories.find((departament) => {
		const urlDepartament = departament?.url as string
		if (!urlDepartament) {
			return null
		}
		const urlDepartamentPath = new URL(urlDepartament)?.pathname
		if (urlDepartamentPath === url.pathname) {
			return departament
		}
		const children = departament.children
		if (!children) {
			return null
		}
		const category = children.find((category) => {
			const urlCategory = category.url
			const urlCategoryPath = new URL(urlCategory).pathname
			return urlCategoryPath === url.pathname
		})
		return category
	})
	if (categories && iscategory) {
		return {
			...categoryPage,
		}
	}
	const urlSearch = url.searchParams.get('q')
	if (urlSearch) {
		return {
			...categoryPage,
		}
	}
	const page = props.pagina.find((page) => new URLPattern({ pathname: page.matcher }).test(req.url))
	if (page) {
		return {
			...page,
		}
	}
	const allPage = props.pagina.find((page) => page.matcher === 'all')
	return {
		...allPage,
	}
}
export default WhatsAppFlutuante
