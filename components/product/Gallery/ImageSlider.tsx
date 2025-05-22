import ImageSliderJS from 'site/islands/Product/ImageSliderJS.tsx'
import { useId } from 'site/sdk/useId.ts'
import type { ProductDetailsPage } from 'apps/commerce/types.ts'
import Image from 'apps/website/components/Image.tsx'

export interface Props {
	/** @title Integration */
	page: ProductDetailsPage | null
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
	const id = useId()

	if (!props.page) {
		throw new Error('Missing Product Details Page Info')
	}

	const {
		page: { product: { image: images = [] } },
	} = props

	return (
		<div id={id} class='flex flex-col w-full'>
			{/* Image Slider */}
			<div class='product-images'>
				<div class='glide__track mb-2' data-glide-el='track'>
					<ul class='glide__slides'>
						{images.map((img, index) => {
							if (!img.url) return null
							return (
								<li class='glide__slide'>
									<Image
										class='w-full rounded-2xl'
										sizes='(max-width: 640px) 100vw, 40vw'
										// style={{ aspectRatio }}
										src={img.url}
										alt={img.alternateName}
										width={664}
										height={664}
										// Preload LCP image for better web vitals
										preload={index === 0}
										loading={index === 0 ? 'eager' : 'lazy'}
									/>
								</li>
							)
						})}
					</ul>
				</div>
				<div
					class='glide__bullets grid grid-cols-5 md:grid-cols-4 gap-4 md:gap-2'
					data-glide-el='controls[nav]'
				>
					{images.map((img, index) => {
						if (!img.url) return null
						return (
							<button class='glide__bullet' data-glide-dir={`=${index}`}>
								<Image
									class='border border-light-gray-200 rounded-xl object-cover object-center w-[58px] md:w-[160px] h-[48px] md:h-[90px]'
									src={img.url}
									width={160}
									height={90}
									alt={img.alternateName}
								/>
							</button>
						)
					})}
				</div>
			</div>

			<ImageSliderJS />
			{
				/* <div class="relative mb-2">
        <Slider class="carousel gap-6 w-full rounded-3xl" role="list">
          {images.map((img, index) => {
            if (!img.url) return null;
            return (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
                role="listitem"
              >
                <Image
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  // style={{ aspectRatio }}
                  src={img.url}
                  alt={img.alternateName}
                  width={664}
                  height={664}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            );
          })}
        </Slider>
      </div> */
			}

			{/* Dots */}
			{
				/* {images.length > 1 && (
        <ul class="grid grid-cols-5 md:grid-cols-4 gap-4 md:gap-2">
          {images.map((img, index) => {
            if (!img.url) return null;
            return (
              <Slider.Dot index={index}>
                <Image
                  class="group-disabled:border-light-gray border border-light-gray-200 rounded-xl object-cover object-center w-[58px] md:w-[160px] h-[48px] md:h-[90px]"
                  src={img.url}
                  width={160}
                  height={90}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            );
          })}
        </ul>
      )} */
			}

			{/* <SliderJS rootId={id} /> */}
		</div>
	)
}
