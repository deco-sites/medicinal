interface ScriptProps {
	rootId: string
}

export default function desktopScript({ rootId }: ScriptProps) {
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

	const query = (attribute: string, value?: string) => value ? `[${attribute}="${value}"]` : `[${attribute}]`

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
		const items = carousel.querySelectorAll<HTMLElement>(
			`:scope > ${query(ATTRIBUTES.ITEM)}`,
		)

		return {
			carousel,
			prev,
			next,
			items,
		}
	}

	const {
		carousel,
		prev,
		next,
		items,
	} = getElements(rootId)

	const carouselRect = carousel.getBoundingClientRect()
	const getElementsInsideContainer = () => {
		const el: HTMLElement[] = []

		for (let index = 0; index < items.length; index++) {
			const item = items.item(index)
			const itemRect = item.getBoundingClientRect()

			const ratio = intersectionX(itemRect, carouselRect) / itemRect.width

			if (ratio >= 1) {
				el.push(item)
			}
		}

		return el
	}
	const elementsInsideContainer = getElementsInsideContainer().length

	function computeScroll(index: number) {
		const slide = items.item(Math.min(Math.max(index, 0), items.length - 1))
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
		const item = getElementsInsideContainer()[0]
		if (!item) return

		const nextIndex = Number.parseInt(item.getAttribute(ATTRIBUTES.ITEM) ?? '0') + 1
		if (nextIndex > items.length - elementsInsideContainer) {
			computeScroll(0)
			return
		}

		computeScroll(nextIndex)
	}

	function handlePrevClick() {
		const item = getElementsInsideContainer()[0]
		if (!item) return

		const index = Number.parseInt(item.getAttribute(ATTRIBUTES.ITEM) ?? '0') -
			1

		if (index < 0) {
			const lastIndex = items.length - 1
			computeScroll(lastIndex)
			return
		}

		computeScroll(index)
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
