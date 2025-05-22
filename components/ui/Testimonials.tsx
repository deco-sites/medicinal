import Icon from 'site/components/ui/Icon.tsx'
import { useId } from 'site/sdk/useId.ts'
import { scriptAsDataURI } from 'apps/utils/dataURI.ts'
import { AppContext } from 'site/apps/site.ts'
import Image from 'apps/website/components/Image.tsx'

/**
 * @title {{authorName}} - Assinante há {{subscriptionTime}}
 */
interface Testimonial {
	/**
	 * @title Texto
	 * @format textarea
	 */
	text: string
	/**
	 * @title Autor
	 */
	authorName: string
	/**
	 * @title Ícone do autor
	 * @format image-uri
	 */
	authorIcon?: string
	/**
	 * @title Tempo de assinatura
	 * @description Ex: 1 ano, 6 meses... etc
	 */
	subscriptionTime: string

  subscriptionTimeCustom?: boolean
}

interface Props {
	/**
	 * @title Título
	 */
	title: string
	/**
	 * @title Depoimentos
	 */
	testimonials: Testimonial[]
	/**
	 * @title Texto do botão
	 */
	button?: string
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
	return { ...props, isMobile: ctx.device === 'mobile' }
}

export default function Testimonials(
	{ title, testimonials, button, isMobile }: ReturnType<typeof loader>,
) {
	const id = useId()

	return (
		<div
			id={id}
			class='bg-gradient-to-r from-red to-orange py-12 md:py-32 text-white relative rounded-b-[35px]'
		>
			<div class='mx-auto w-[83px] h-px bg-current' />
			<h2 class='font-lemon text-sm leading-[18px] md:text-lg md:leading-[24px] font-bold uppercase text-center w-[282px] md:w-[498px] mt-8 mx-auto'>
				{title}
			</h2>
			<ul data-carousel class='carousel carousel-center mt-12 gap-28 w-full'>
				{testimonials.map((testimonial, index) => (
					<li
						data-item={index}
						data-active={index === 0 ? 'true' : 'false'}
						class="border-l border-current w-[293px] md:w-[484px] pl-8 carousel-item flex-col data-[active='false']:opacity-60 transition-all first:ml-[50%] last:mr-[50%]"
					>
						<p class='text-sm leading-[22px] md:text-base md:leading-7 font-medium mb-12'>
							{testimonial.text}
						</p>
						<div class='flex items-center gap-6'>
              {testimonial.authorIcon && (
                <Image
                  src={testimonial.authorIcon}
                  alt={testimonial.authorName}
                  width={58}
                  height={58}
                  class='size-[58px] rounded-full shrink-0'
                />
              )}
							<div>
								<p class='text-sm leading-[18px] md:text-base md:leading-5 font-lemon font-bold'>
									{testimonial.authorName}
								</p>
								<p class='text-sm leading-4 mt-3'>
                  {testimonial?.subscriptionTimeCustom ? (
                    <>{testimonial.subscriptionTime}</>
                  ): (
                    <>Assinante há {testimonial.subscriptionTime}</>
                  )}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
			<button
				data-prev={id}
				class='hidden md:flex absolute justify-center items-center left-[calc(50%-340px)] top-1/2 -translate-y-1/2 size-14 rounded-full bg-ice text-dark'
			>
				<Icon
					id='BannerArrowRight'
					strokeWidth={2}
					strokeLinejoin='round'
					strokeLinecap='round'
					class='rotate-180'
					size={18}
				/>
			</button>
			<button
				data-next={id}
				class='hidden md:flex absolute justify-center items-center right-[calc(50%-340px)] top-1/2 -translate-y-1/2 size-14 rounded-full bg-ice text-dark'
			>
				<Icon
					strokeLinejoin='round'
					strokeLinecap='round'
					id='BannerArrowRight'
					strokeWidth={2}
					size={18}
				/>
			</button>
			<ul
				data-dots
				class='carousel gap-3 justify-center items-center h-2 w-full mt-8 md:mt-12'
			>
				{testimonials.map((_, index) => (
					<li
						data-dot={index}
						data-active={index === 0}
						class="size-2 bg-[#CCCCCA] rounded-full data-[active='true']:bg-white transition-all duration-300 cursor-pointer data-[active='true']:cursor-auto"
					/>
				))}
			</ul>
      {button && (
        <a
          class='flex justify-center items-center gap-2 px-6 py-3 border-2 border-white rounded-full w-fit mt-8 md:mt-12 mx-auto font-lemon font-bold text-[13px] leading-[18px]'
          href='/assinaturas'
        >
          {button}{' '}
          <Icon
            id='BannerArrowRight'
            strokeLinecap='round'
            strokeLinejoin='round'
            size={16}
            strokeWidth={3}
          />
        </a>
      )}
			<script defer src={scriptAsDataURI(script, { rootId: id, isMobile })} />
		</div>
	)
}

interface ScriptProps {
	rootId: string
	isMobile?: boolean
}

function script({ rootId, isMobile }: ScriptProps) {
	const throttle = <R, A extends unknown[]>(
		fn: (...args: A) => R,
		delay: number,
	): (...args: A) => R | undefined => {
		let wait = false

		return ((...args: A) => {
			if (wait) return

			const val = fn(...args)

			wait = true

			setTimeout(() => {
				wait = false
			}, delay)

			return val
		})
	}

	const ATTRIBUTES = {
		CAROUSEL: 'data-carousel',
		ITEM: 'data-item',
		PREV: 'data-prev',
		NEXT: 'data-next',
		DOTS: 'data-dots',
		DOT: 'data-dot',
	}

	const query = (attribute: string, value?: string) => value ? `[${attribute}="${value}"]` : `[${attribute}]`

	function getElements(rootId: string) {
		const root = document.getElementById(rootId)
		if (!root) {
			throw new Error(`Element with id ${rootId} not found`)
		}

		const carouselQuery = query(ATTRIBUTES.CAROUSEL)
		const carousel = root.querySelector<HTMLElement>(carouselQuery)
		if (!carousel) {
			throw new Error(`Element with ${carouselQuery} not found`)
		}
		const prev = root.querySelector<HTMLElement>(query(ATTRIBUTES.PREV))
		const next = root.querySelector<HTMLElement>(query(ATTRIBUTES.NEXT))
		const dotsContainer = root.querySelector<HTMLElement>(
			query(ATTRIBUTES.DOTS),
		)
		const items = carousel.querySelectorAll<HTMLElement>(
			`:scope > ${query(ATTRIBUTES.ITEM)}`,
		)
		const dots = dotsContainer?.querySelectorAll<HTMLElement>(
			query(ATTRIBUTES.DOT),
		)

		return {
			carousel,
			prev,
			next,
			items,
			dots,
		}
	}

	const {
		carousel,
		prev,
		next,
		items,
		dots,
	} = getElements(rootId)
	let index = 0

	if (isMobile) {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				const index = parseInt(entry.target.getAttribute('data-item') || '0')
				for (const [i, item] of items.entries()) {
					item.dataset.active = `${i === index}`

					if (dots && dots.item(i)) {
						dots.item(i).dataset.active = `${i === index}`
					}
				}
			}
		})

		for (const item of items) {
			observer.observe(item)
		}
	}

	function computeScroll() {
		const slide = items.item(Math.min(Math.max(index, 0), items.length - 1))
		if (!slide) {
			return
		}

		for (const [i, item] of items.entries()) {
			item.dataset.active = `${i === index}`

			if (dots && dots.item(i)) {
				dots.item(i).dataset.active = `${i === index}`
			}
		}

		const carouselMargin = parseInt(
			getComputedStyle(carousel).getPropertyValue('margin-left'),
		) || 0
		const carouselWidth = carousel.offsetWidth
		const slideWidth = slide.offsetWidth
		const centerPos = (carouselWidth - slideWidth) / 2
		const nextPos = slide.offsetLeft - carousel.offsetLeft + carouselMargin
		const adjustedPos = nextPos - centerPos
		carousel.scrollTo({
			left: adjustedPos,
			behavior: 'smooth',
		})
	}

	if (dots) {
		for (const dot of dots) {
			dot.addEventListener('click', () => {
				index = parseInt(dot.dataset.dot || '0')
				computeScroll()
			})
		}
	}

	function handleNextClick() {
		index = (index + 1) % items.length
		computeScroll()
	}

	function handlePrevClick() {
		index = (index - 1 + items.length) % items.length
		computeScroll()
	}

	const prevClick = throttle(handlePrevClick, 500)
	const nextClick = throttle(handleNextClick, 500)

	if (prev) {
		prev.addEventListener('click', prevClick)
	}
	if (next) {
		next.addEventListener('click', nextClick)
	}

	computeScroll()
}
