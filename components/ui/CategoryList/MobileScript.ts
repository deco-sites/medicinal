interface ScriptProps {
	rootId: string
}

export default function mobileScript({ rootId }: ScriptProps) {
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
		DOT_TEMPLATE: 'data-dot-template',
		PAGE: 'data-page',
		IS_INTERSECTING: 'data-intersecting',
	}

	const intersectionX = (element: DOMRect, container: DOMRect): number => {
		const delta = container.width / 1_000

		if (element.right < container.left - delta) {
			return 0.0
		}

		if (element.left > container.right + delta) {
			return 0.0
		}

		if (element.left < container.left - delta) {
			return element.right - container.left + delta
		}

		if (element.right > container.right + delta) {
			return container.right - element.left + delta
		}

		return element.width
	}

	const getElementsInsideContainer = (
		rect: DOMRect,
		elements: HTMLElement[],
	) => {
		let count = 0

		for (let index = 0; index < elements.length; index++) {
			const item = elements[index]
			const itemRect = item.getBoundingClientRect()

			const ratio = intersectionX(itemRect, rect) / itemRect.width

			if (ratio >= 1) {
				count++
			}
		}

		return count
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
		const prev = Array.from(
			root.querySelectorAll<HTMLElement>(query(ATTRIBUTES.PREV)),
		).find((el) => el.closest('[data-root]')?.id === rootId)
		const next = Array.from(
			root.querySelectorAll<HTMLElement>(query(ATTRIBUTES.NEXT)),
		).find((el) => el.closest('[data-root]')?.id === rootId)
		const items = Array.from(carousel.querySelectorAll<HTMLElement>(
			`:scope > ${query(ATTRIBUTES.ITEM)}`,
		))

		const dotContainer = Array.from(root.querySelectorAll<HTMLElement>(
			query(ATTRIBUTES.DOTS),
		)).find((el) => el.closest('[data-root]')?.id === rootId)
		let dotTemplate: HTMLElement | null = null

		if (dotContainer) {
			dotTemplate = dotContainer.querySelector<HTMLElement>(
				query(ATTRIBUTES.DOT_TEMPLATE),
			)
			if (!dotTemplate) {
				throw new Error(`Element with ${ATTRIBUTES.DOT_TEMPLATE} not found`)
			}
		}

		return {
			root,
			carousel,
			prev,
			next,
			items,
			dotContainer,
			dotTemplate,
		}
	}

	function generateDots(
		container: HTMLElement,
		template: HTMLElement,
		count: number,
	) {
		template.removeAttribute(ATTRIBUTES.DOT_TEMPLATE)
		if (count >= 1) {
			for (let i = 0; i < count; i++) {
				const dot = template.cloneNode(true) as HTMLElement
				dot.setAttribute(ATTRIBUTES.DOT, String(i))
				dot.setAttribute('aria-label', `Ir para página ${i + 1}`)
				container.appendChild(dot)
			}
		}
		container.removeChild(template)
	}

	const {
		root,
		carousel,
		prev,
		next,
		items,
		dotContainer,
		dotTemplate,
	} = getElements(rootId)
	const elementsInsideContainer = getElementsInsideContainer(
		carousel.getBoundingClientRect(),
		items,
	)

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const isIntersecting = entry.intersectionRatio >= 0.9
				if (isIntersecting) {
					entry.target.setAttribute(ATTRIBUTES.IS_INTERSECTING, 'true')
					const pages = getItemsInViewport().map((el) =>
						Number.parseInt(el.getAttribute(ATTRIBUTES.PAGE) ?? '0')
					)
					const page = pages.find((page) => pages.filter((p) => p === page).length > (pages.length / 2))
					if (typeof page === 'number') {
						setPage(page)
					}
				} else {
					entry.target.removeAttribute(ATTRIBUTES.IS_INTERSECTING)
				}
			}
		},
		{ root: carousel, threshold: [0, 0.9, 1] },
	)
	items.forEach((item, index) => {
		const itemPage = Math.floor(index / elementsInsideContainer)
		item.setAttribute(ATTRIBUTES.PAGE, String(itemPage))
		observer.observe(item)
	})

	function getItemsInViewport() {
		return Array.from(items).filter((item) => item.hasAttribute(ATTRIBUTES.IS_INTERSECTING))
	}

	function computeScroll(index: number) {
		const slide = items[Math.min(Math.max(index, 0), items.length - 1)]
		if (!slide) {
			return
		}
		const carouselMargin = Number.parseInt(
			getComputedStyle(carousel).getPropertyValue('margin-left'),
		) || 0
		const nextPos = slide.offsetLeft - carousel.offsetLeft + carouselMargin
		carousel.scrollTo({
			left: nextPos,
			behavior: 'smooth',
		})
	}

	function handleNextClick() {
		if (
			carousel.scrollWidth - carousel.clientWidth - carousel.scrollLeft <= 5
		) {
			carousel.scrollTo({ left: 0, behavior: 'smooth' })
			return
		}

		const item = getItemsInViewport()[0]
		if (!item) return
		computeScroll(
			Number.parseInt(item.getAttribute(ATTRIBUTES.ITEM) ?? '0') +
				elementsInsideContainer,
		)
	}

	function handlePrevClick() {
		if (carousel.scrollLeft === 0) {
			carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' })
			return
		}

		const item = getItemsInViewport()[0]
		if (!item) return
		computeScroll(
			Number.parseInt(item.getAttribute(ATTRIBUTES.ITEM) ?? '0') -
				elementsInsideContainer,
		)
	}

	console.log({
		dotContainer,
		dotTemplate,
		il: items.length,
		elementsInsideContainer,
	})
	if (dotContainer && dotTemplate) {
		generateDots(
			dotContainer,
			dotTemplate,
			Math.round(items.length / (elementsInsideContainer || 1)),
		)
	}

	const dots = root.querySelectorAll<HTMLLIElement>(`[${ATTRIBUTES.DOT}]`)

	if (dots.length) {
		for (const dot of dots) {
			dot.addEventListener('click', () => {
				if (!carousel) {
					return
				}
				const item = Array.from(items).find((item) =>
					item.getAttribute(ATTRIBUTES.PAGE) ===
						dot.getAttribute(ATTRIBUTES.DOT)
				)
				if (!item) return
				computeScroll(
					Number.parseInt(item.getAttribute(ATTRIBUTES.ITEM) ?? '0'),
				)
			})
		}
	}

	function setPage(page: number) {
		for (const dot of dots) {
			dot.getAttribute(ATTRIBUTES.DOT) === String(page)
				? dot.setAttribute('data-active', '')
				: dot.removeAttribute('data-active')
		}
	}

	const prevClick = throttle(handlePrevClick, 500)
	const nextClick = throttle(handleNextClick, 500)

	if (prev) {
		prev.addEventListener('click', prevClick)
	}
	if (next) {
		next.addEventListener('click', nextClick)
	}
}
