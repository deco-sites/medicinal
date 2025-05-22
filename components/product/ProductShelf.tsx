import type { Product } from 'apps/commerce/types.ts'
import type { AppContext } from 'site/apps/site.ts'
import ProductCard, { productToProductCardProps } from 'site/components/product/ProductCard.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import Slider from 'site/components/ui/Slider.tsx'
import SliderJS from 'site/islands/SliderJS.tsx'
import { useId } from 'site/sdk/useId.ts'

export interface Props {
	products: Product[] | null
	/**
	 * @title Mostrar apenas produtos com assinatura
	 */
	showOnlySubscription?: boolean
	/**
	 * @title Remover espaçamento no topo
	 * @default false
	 */
	removePaddingTop?: boolean
	title?: string
}

function ProductShelf({
	products,
	title,
	isMobile,
	showOnlySubscription,
	removePaddingTop = false,
}: ReturnType<typeof loader>) {
	const id = useId()

	if (!products || products.length === 0) {
		return null
	}

	return (
		<div
			class={`flex flex-col gap-8 mx-auto pb-[85px] md:pb-24 w-full max-w-[1440px]${
				removePaddingTop ? '' : ' pt-16'
			}`}
		>
			<h2 class='font-bold font-lemon text-center text-dark text-sm md:text-lg uppercase leading-5 md:leading-6 tracking-[-0.01em]'>
				{title}
			</h2>

			<div id={id} class='relative mx-auto w-[95%]'>
				<Slider class='gap-4 w-full carousel'>
					{products?.map((product, index) => {
						return (
							<Slider.Item
								index={index}
								class='last:mr-auto first:ml-auto w-[calc(50%-18px+(18px/2))] sm:w-[calc(42.5%-18px+(18px/3))] md:w-[calc(33.333333%-18px+((18px)/3))] lg:w-[calc(25%-18px+((18px)/4))] xl:w-[calc(20%-18px+((18px)/5))] carousel-item'
							>
								<ProductCard
									{...productToProductCardProps({
										product,
										isMobile,
										showOnlySubscription,
									})}
								/>
							</Slider.Item>
						)
					})}
				</Slider>

				<Slider.PrevButton class='top-1/2 -left-8 absolute lg:flex justify-center items-center border-2 border-Stroke hidden bg-white disabled:opacity-0 rounded-full w-14 h-14 transition-opacity -translate-y-1/2 disabled:pointer-events-none'>
					<Icon size={24} id='ArrowRight' class='text-dark rotate-180' />
				</Slider.PrevButton>

				<Slider.NextButton class='top-1/2 -right-4 absolute lg:flex justify-center items-center border-2 border-Stroke hidden bg-white disabled:opacity-0 rounded-full w-14 h-14 transition-opacity -translate-y-1/2 disabled:pointer-events-none'>
					<Icon size={24} id='ArrowRight' class='text-dark' />
				</Slider.NextButton>

				<div class='top-[calc(100%+48px)] left-1/2 absolute flex items-center gap-3 -translate-x-1/2'>
					{products.map((_, index) => (
						<Slider.Dot index={index} class='group'>
							<div class='group-data-[active]:bg-dark bg-ice rounded-full size-[5px] md:size-2 transition-colors' />
						</Slider.Dot>
					))}
				</div>

				<SliderJS rootId={id} dotIsPage />
			</div>
		</div>
	)
}

export function loader(props: Props, req: Request, ctx: AppContext) {
	return {
		...props,
		isMobile: ctx.device !== 'desktop',
	}
}

export default ProductShelf
