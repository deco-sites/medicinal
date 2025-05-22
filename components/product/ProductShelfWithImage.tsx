import type { ImageWidget } from 'apps/admin/widgets.ts'
import type { Product } from 'apps/commerce/types.ts'
import Image from 'apps/website/components/Image.tsx'
import type { AppContext } from 'site/apps/site.ts'
import ProductCard, { productToProductCardProps } from 'site/components/product/ProductCard.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import ProductShelfWithImageJS from 'site/islands/ProductShelfWithImageJS.tsx'
import { GrayBackgroundProps } from 'site/sdk/types.ts'
import { useId } from 'site/sdk/useId.ts'

interface ImageProps {
	/**
	 * @title Imagem
	 */
	src: ImageWidget
	/**
	 * @title Titulo
	 */
	title: string
}

export interface Props extends GrayBackgroundProps {
	/**
	 * @title Produtos
	 */
	products: Product[] | null
	/**
	 * @title Mostrar apenas produtos com assinatura
	 */
	showOnlySubscription?: boolean
	desktop: ImageProps
	mobile: ImageProps
	/**
	 * @title Banner URL
	 * @description URL do banner
	 */
	bannerUrl?: string
	/**
	 * @title Remover espaçamento do topo
	 * @default false
	 */
	removePaddingTop?: boolean
}

function ProductShelf({
	products,
	isMobile,
	desktop,
	mobile,
	bannerUrl,
	bottomRounded,
	grayBackground,
	topRounded,
	removePaddingTop = false,
	showOnlySubscription,
}: ReturnType<typeof loader>) {
	const id = useId()

	if (!products || products.length === 0) {
		return null
	}

	const Wrapper = bannerUrl ? 'a' : 'div'
	const props = bannerUrl ? { href: bannerUrl } : {}

	return (
		<div
			class={`grid items-center justify-start md:px-10 gap-x-4 gap-y-6 pb-24 max-w-[1448px] mx-auto md:grid-cols-[328px,1fr]${
				grayBackground ? ' bg-ice' : ''
			}${topRounded ? ' rounded-t-[20px] md:rounded-t-[40px]' : ''}${
				bottomRounded ? ' rounded-b-[20px] md:rounded-b-[40px]' : ''
			}${removePaddingTop ? ' pt-0' : ' pt-16'}`}
			id={id}
			data-root
		>
			<Wrapper
				{...props}
				class='block relative mx-4 md:mx-0 rounded-[20px] md:h-full overflow-hidden'
			>
				<Icon
					id='ShelfWithImageChevron'
					width={30}
					height={60}
					class='top-1/2 right-10 absolute text-white -translate-y-1/2'
				/>
				<Image
					src={isMobile ? mobile.src : desktop.src}
					alt={isMobile ? mobile.title : desktop.title}
					width={isMobile ? 450 : 320}
					height={isMobile ? 260 : 450}
					class='w-full h-[260px] md:h-full lg:h-[450px] object-cover'
				/>
				<span class='bottom-10 left-10 absolute max-w-[200px] font-bold font-lemon text-lg text-white leading-6'>
					{isMobile ? mobile.title : desktop.title}
				</span>
			</Wrapper>

			<div class='relative grid mx-auto w-full md:w-[95%]'>
				<ul data-carousel class='gap-4 w-full carousel'>
					{products?.map((product, index) => (
						<li
							data-item={index}
							class='md:last:pr-0 last:pr-4 pl-4 md:pl-0 w-[calc(75%-16px+(8px))] sm:w-[calc(42.5%-16px+(16px/2))] md:w-[calc((100%/1.5)-16px+(16px/1.5))] lg:w-[calc((100%/2)-16px+(16px/2))] min-[1180px]:w-[calc((100%/3)-16px+((16px)/3))] xl:w-[calc((100%/3.5)-16px+((16px)/3.5))] carousel-item'
						>
							<ProductCard
								{...productToProductCardProps({
									product,
									isMobile,
									showOnlySubscription,
								})}
							/>
						</li>
					))}
				</ul>

				<button
					data-prev
					class='top-1/2 -left-8 absolute lg:flex justify-center items-center border-2 border-Stroke hidden bg-white disabled:opacity-0 rounded-full w-14 h-14 transition-opacity -translate-y-1/2 disabled:pointer-events-none z-[1]'
					disabled
				>
					<Icon size={24} id='ArrowRight' class='text-dark rotate-180' />
				</button>

				<button
					data-next
					class='top-1/2 -right-4 absolute lg:flex justify-center items-center border-2 border-Stroke hidden bg-white disabled:opacity-0 rounded-full w-14 h-14 transition-opacity -translate-y-1/2 disabled:pointer-events-none z-[1]'
				>
					<Icon size={24} id='ArrowRight' class='text-dark' />
				</button>

				<ul
					data-dots
					class='top-[calc(100%+48px)] left-1/2 absolute flex items-center gap-3 -translate-x-1/2'
				>
					<li data-dot-template class='group' role='button'>
						<div
							class={`size-[5px] md:size-2 rounded-full group-data-[active]:bg-dark transition-colors cursor-pointer${
								grayBackground ? ' bg-gray' : ' bg-ice'
							}`}
						/>
					</li>
				</ul>

				<ProductShelfWithImageJS rootId={id} />
			</div>
		</div>
	)
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
	return {
		...props,
		isMobile: ctx.device !== 'desktop',
	}
}

export default ProductShelf
