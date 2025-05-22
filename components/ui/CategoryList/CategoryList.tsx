import { useId } from 'site/sdk/useId.ts'
import Icon from 'site/components/ui/Icon.tsx'
import { scriptAsDataURI } from 'apps/utils/dataURI.ts'
import desktopScript from 'site/components/ui/CategoryList/DesktopScript.ts'
import mobileScript from 'site/components/ui/CategoryList/MobileScript.ts'
import type { AppContext } from 'site/apps/site.ts'
import { SendEventOnClick } from 'site/components/Analytics.tsx'

interface Category {
	/**
	 * @title Text
	 */
	label: string
	/**
	 * @title Link
	 */
	href: string
}

interface Props {
	/**
	 * @title Título
	 * @description Título da seção
	 * @format textarea
	 */
	title: string
	/**
	 * @title Categorias
	 * @description Lista de categorias
	 */
	categories: Category[]
}

const DEFAULT: ReturnType<typeof loader> = {
	title: 'SUPLEMENTOS PARA TODAS AS FASES DA SUA VIDA',
	categories: [
		{
			label: 'Todos os produtos',
			href: '/produtos?O=OrderByTopSaleDESC',
		},
		{
			label: 'Whey Protein',
			href: '/produtos/whey-protein?O=OrderByTopSaleDESC',
		},
		{
			label: 'Proteína Vegana',
			href: '/produtos/proteina-vegana?O=OrderByTopSaleDESC',
		},
	],
	isMobile: false,
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
	return {
		...props,
		isMobile: ctx.device !== 'desktop',
	}
}

export default function CategoryList({
	title,
	categories,
	isMobile,
}: ReturnType<typeof loader> = DEFAULT) {
	const id = useId()

	return (
		<div
			id={id}
			data-root
			class='flex flex-col items-center mx-auto w-full max-w-[1264px]'
		>
			<h2 class='max-w-[228px] md:max-w-full font-bold font-lemon text-center text-dark text-sm md:text-lg uppercase leading-5 md:leading-6 tracking-[-0.01em]'>
				{title}
			</h2>
			<div class='flex justify-center items-center gap-4 mt-6 md:mt-8 w-full h-[73px] md:h-[88px] overflow-y-clip'>
				{!isMobile && (
					<button
						type='button'
						data-prev
						aria-label='Categoria Anterior'
						class='lg:flex justify-center items-center hidden size-12'
					>
						<Icon
							size={24}
							class='rotate-180'
							id='StrokeArrowRight'
							strokeLinecap='round'
							strokeWidth={2}
						/>
					</button>
				)}
				<ul
					data-carousel
					class='[--gap:8px] lg:[--gap:24px] items-center gap-[var(--gap,8px)] font-medium md:font-bold text-center text-dark text-xs md:text-sm leading-[14px] md:leading-[17px] carousel'
					style={{
						'--items': Math.min(categories.length, 3),
						'--items-md': Math.min(categories.length, 5),
						'--items-lg': Math.min(categories.length, 6),
						'--items-xl': Math.min(categories.length, 7),
					}}
				>
					{categories.map((category, index) => (
						<li
							id={`${id}::${index}`}
							data-item={index}
							key={category.href}
							class='carousel-item first:pl-4 last:pr-4 lg:first:pl-0 lg:last:pr-0 min-[769px]:[--items:var(--items-md)] min-[1100px]:[--items:var(--items-lg)] xl:[--items:var(--items-xl)] w-[calc((100%/var(--items,3))-var(--gap,8px)+(var(--gap,8px)/var(--items,3)))] h-[73px] md:h-[88px] transition-all duration-300 group/item shrink-0'
						>
							<div class='flex justify-center items-center bg-light-gray-200 hover:bg-blue rounded-full w-full'>
								<a
									class='group-hover/item:bg-white float-left flex justify-center items-center bg-ice px-3 md:px-6 rounded-full w-[calc(100%_-_4px)] h-[calc(100%_-_4px)] transition-all duration-300 cursor-pointer'
									href={category.href}
								>
									{category.label}
								</a>
							</div>

							<SendEventOnClick
								id={`${id}::${index}`}
								event={{
									name: 'click_category_list',
									params: {
										position: index,
									},
								} as unknown}
							/>
						</li>
					))}
				</ul>
				{!isMobile && (
					<button
						type='button'
						data-next
						aria-label='Próxima Categoria'
						class='lg:flex justify-center items-center hidden size-12'
					>
						<Icon
							size={24}
							id='StrokeArrowRight'
							strokeLinecap='round'
							strokeWidth={2}
						/>
					</button>
				)}
			</div>
			{isMobile && (
				<ul
					data-dots
					class='justify-center items-center gap-3 mt-6 w-full h-2 carousel'
				>
					<li
						data-dot-template
						class='bg-ice data-[active]:bg-dark rounded-full w-[5px] h-[5px] transition-all duration-300'
					/>
				</ul>
			)}
			<script
				defer
				src={scriptAsDataURI(isMobile ? mobileScript : desktopScript, {
					rootId: id,
				})}
			/>
		</div>
	)
}
