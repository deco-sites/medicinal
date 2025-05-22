import type { ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'
import Slider from 'site/components/ui/Slider.tsx'
import SliderJS from 'site/components/ui/SliderJS.tsx'
import { useId } from 'site/sdk/useId.ts'
import Icon from 'site/components/ui/Icon.tsx'

/**
 * @title {{name}}
 */
export interface Category {
	/**
	 * @title Imagem
	 */
	image: ImageWidget
	/**
	 * @title Categoria
	 */
	name: string
	/**
	 * @title Descrição
	 * @format textarea
	 */
	description: string
	/**
	 * @title URL da categoria
	 */
	url: string
}

export interface Props {
	/**
	 * @title Título
	 */
	title?: string
	/**
	 * @title Categorias
	 */
	categories: Category[]
}

function CategoryCarousel({
	title = 'NAVEGUE NAS CATEGORIAS',
	categories = [
		{
			name: 'COLÁGENO',
			url: '#',
			description: 'Concentrados, isolados eManter a beleza da sua pele e cabelos sempre radiantes hidrolisados',
			image:
				'https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/94c09be4-c2ce-4119-b387-9444ab455605',
		},
		{
			name: 'EMAGRECEDORES',
			url: '#',
			description: 'Chegar ao peso ideal e manter o perfil físico',
			image:
				'https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/5b3bae1d-180e-468b-99ba-4d1d42a2cb3f',
		},
		{
			name: 'WHEY PROTEIN',
			url: '#',
			description: 'Concentrados, isolados e hidrolisados',
			image:
				'https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/f967cede-8165-41c6-aa59-34a6231b93c2',
		},
		{
			name: 'VITAMINAS E MINERAIS',
			url: '#',
			description: 'Saúde para a pele, unhas e cabelos',
			image:
				'https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/b6b439d0-e335-4c11-8955-6f42d66a5577',
		},
	],
}: Props) {
	const id = useId()

	return (
		<div
			id={id}
			class='w-full max-w-[1440px] py-6 mx-auto'
		>
			{title && (
				<h2 class='text-center font-lemon text-dark font-bold text-[14px] leading-[18px] md:text-[18px] md:leading-6 mb-8 uppercase'>
					{title}
				</h2>
			)}
			<div class='relative w-full max-w-[1232px] mx-auto'>
				<Slider class='carousel carousel-center gap-4 max-w-full md:max-w-[1232px] mx-auto text-ice w-full'>
					{categories.map(({ image, name, description, url }, index) => (
						<Slider.Item
							index={index}
							class='flex carousel-item group first:pl-4 last:pr-4'
						>
							<a
								href={url}
								class='relative w-[250px] h-[340px] md:w-[330px] md:h-[440px] p-10 rounded-[20px] overflow-clip flex flex-col justify-end'
							>
								<Image
									src={image}
									alt={name}
									width={330}
									height={440}
									class='rounded-[20px] object-cover absolute inset-0 z-[0] h-full w-full'
								/>
								<span class='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-[1] rounded-[20px]' />
								<h3 class='text-sm leading-[18px] font-lemon font-bold md:text-lg md:leading-6 z-[2]'>
									{name}
								</h3>
								<p class='text-sm leading-[16px] mt-4 z-[2]'>
									{description}
								</p>
							</a>
						</Slider.Item>
					))}
				</Slider>

				<Slider.PrevButton class='hidden md:flex absolute top-[calc(50%-16px)] left-3 xl:left-[-60px] size-14 bg-white border-2 border-Stroke rounded-full justify-center items-center disabled:pointer-events-none transition-all ease-in-out duration-[400ms] cursor-pointer z-20'>
					<Icon size={24} id='ArrowRight' class='text-dark rotate-180' />
				</Slider.PrevButton>

				<Slider.NextButton class='hidden md:flex absolute top-[calc(50%-16px)] right-3 xl:right-[-60px] size-14 bg-white border-2 border-Stroke rounded-full justify-center items-center disabled:pointer-events-none transition-all ease-in-out duration-[400ms] cursor-pointer z-20'>
					<Icon size={24} id='ArrowRight' class='text-dark' />
				</Slider.NextButton>

				<div class='mt-8 w-full h-fit grid place-items-center'>
					<ul class='carousel z-10 justify-center gap-3 flex-wrap'>
						{categories?.map((_, i) => (
							<li
								class='carousel-item group'
								data-dot={i}
								aria-label={`Ir para página ${i}`}
							>
								<div
									id={`${id}--${i}`}
									class='w-[5px] h-[5px] bg-ice rounded-full group-data-[active]:bg-dark duration-300'
								/>
							</li>
						))}
					</ul>
				</div>
				<SliderJS rootId={id} dotIsPage />
			</div>
		</div>
	)
}

export default CategoryCarousel
