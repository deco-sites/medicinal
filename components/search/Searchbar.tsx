import Icon from 'site/components/ui/Icon.tsx'
import { sendEvent } from 'site/sdk/analytics.tsx'
import { useId } from 'site/sdk/useId.ts'
import { useSuggestions } from 'site/sdk/useSuggestions.ts'
import type { Suggestion } from 'apps/commerce/types.ts'
import { useRef } from 'preact/compat'
import type { Platform } from 'site/apps/site.ts'
import { useSignal } from '@preact/signals'
import { type Resolved } from '@deco/deco'
/** @titleBy term */
export interface Suggestions {
	term: string
}
// Editable props
export interface Props {
	/**
	 * @title Placeholder
	 * @description Mensagem de espaço reservado padrão da barra de pesquisa
	 */
	placeholder?: string
	/**
	 * @title Mobile Placeholder
	 * @description Mensagem de espaço reservado padrão da barra de pesquisa
	 */
	mobilePlaceholder?: string
	/**
	 * @title URL de destino
	 * @description Quando o usuário clicar no botão de pesquisa, navegue para essa página
	 * @default /s
	 */
	action?: string
	/**
	 * @title Nome do termo
	 * @description Parametro de consulta usado ao navegar pelo usuário
	 * @default q
	 */
	name?: string
	/**
	 * @title Interação de sugestão
	 * @todo: improve this typings ({query: string, count: number}) => Suggestions
	 */
	loader: Resolved<Suggestion | null>
	isMobile: boolean
	platform?: Platform
}
function Searchbar({
	placeholder = 'O que você procura?',
	action = '/s',
	name = 'q',
	loader,
	isMobile,
}: Props) {
	const id = useId()
	const searchInputRef = useRef<HTMLInputElement>(null)
	const { setQuery } = useSuggestions(loader)
	const ref = useRef<HTMLDivElement>(null)
	const searchValue = useSignal('')
	const iconSize = isMobile ? 12 : 18
	return (
		<div
			class='flex flex-col flex-1 lg:pb-0 h-full group'
			ref={ref}
			tabIndex={-1}
		>
			<form
				id={id}
				action={action}
				class="relative z-20 flex flex-grow flex-1 items-center bg-white px-[10px] min-[391px]:px-4 md:px-[24px] border border-light-gray-200 rounded-full h-full min-h-[40px] group-data-[micro-header='true']/header:min-h-[30px] md:min-h-[48px] overflow-visible"
			>
				<input
					ref={searchInputRef}
					class='flex-grow bg-transparent w-full h-full max-h-[48px] placeholder:font-semibold text-xs md:text-[13px] text-grey md:placeholder:text-[13px] placeholder:text-grey placeholder:text-[11px] min-[391px]:placeholder:text-xs outline-none'
					name={name}
					onInput={(e) => {
						const value = e.currentTarget.value
						if (value) {
							sendEvent({
								name: 'search',
								params: { search_term: value },
							})
						}
						setQuery(value)
						searchValue.value = value
					}}
					placeholder={placeholder}
					autocomplete='off'
					aria-label='Buscar por produto'
				/>
				<button
					type='submit'
					class='flex justify-center items-center h-full focus:outline-none'
					aria-label='Search'
					htmlFor='searchbar'
					tabIndex={-1}
				>
					<Icon id='MagnifyingGlass' size={iconSize} strokeWidth={0.01} />
				</button>
			</form>
		</div>
	)
}
export default Searchbar
