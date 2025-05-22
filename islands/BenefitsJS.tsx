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

const getElementsInsideContainer = (
	rect: DOMRect,
	elements: NodeListOf<HTMLElement>,
) => {
	let count = 0

	for (let index = 0; index < elements.length; index++) {
		const item = elements.item(index)
		const itemRect = item.getBoundingClientRect()

		const ratio = intersectionX(itemRect, rect) / itemRect.width

		if (ratio >= 1) {
			count++
		}
	}

	return count
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
	const items = carousel.querySelectorAll<HTMLElement>(
		`:scope > ${query(ATTRIBUTES.ITEM)}`,
	)

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
		items,
		dotContainer,
		dotTemplate,
	}
}

export default function BenefitsJS({ rootId }: { rootId: string }) {
	if (!globalThis.document) {
		return <></>
	}

	const {
		root,
		carousel,
		items,
		dotContainer,
		dotTemplate,
	} = getElements(rootId)
	const elementsInsideContainer = getElementsInsideContainer(
		carousel.getBoundingClientRect(),
		items,
	)

	function generateDots(
		container: HTMLElement,
		template: HTMLElement,
		count: number,
	) {
		template.removeAttribute(ATTRIBUTES.DOT_TEMPLATE)
		for (let i = 0; i < count; i++) {
			const dot = template.cloneNode(true) as HTMLElement
			dot.setAttribute(ATTRIBUTES.DOT, String(i))
			dot.setAttribute('aria-label', `Ir para página ${i + 1}`)
			container.appendChild(dot)
		}
		container.removeChild(template)
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const isIntersecting = entry.intersectionRatio >= 0.9
				if (isIntersecting) {
					entry.target.setAttribute(ATTRIBUTES.IS_INTERSECTING, 'true')
					const pages = getItemsInViewport().map((el) => parseInt(el.getAttribute(ATTRIBUTES.PAGE) ?? '0'))
					const page = pages.find((page) => pages.filter((p) => p === page).length > (pages.length / 2))
					if (typeof page === 'number') {
						setPage(page)
					}
				} else {
					entry.target.removeAttribute(ATTRIBUTES.IS_INTERSECTING)
				}
			})
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
		const slide = items.item(Math.min(Math.max(index, 0), items.length - 1))
		if (!slide) {
			return
		}
		const carouselMargin = parseInt(
			getComputedStyle(carousel).getPropertyValue('margin-left'),
		) || 0
		const nextPos = slide.offsetLeft - carousel.offsetLeft + carouselMargin
		carousel.scrollTo({
			left: nextPos,
			behavior: 'smooth',
		})
	}

	if (dotContainer && dotTemplate) {
		generateDots(
			dotContainer,
			dotTemplate,
			Math.round(items.length / elementsInsideContainer),
		)
	}

	const dots = Array.from(root.querySelectorAll<HTMLLIElement>(
		query(ATTRIBUTES.DOT),
	)).filter((el) => el.closest('[data-root]')?.id === rootId)

	if (dots.length) {
		dots.forEach((dot) => {
			dot.addEventListener('click', () => {
				if (!carousel) {
					return
				}
				const item = Array.from(items).find((item) =>
					item.getAttribute(ATTRIBUTES.PAGE) ===
						dot.getAttribute(ATTRIBUTES.DOT)
				)
				if (!item) return
				computeScroll(parseInt(item.getAttribute(ATTRIBUTES.ITEM) ?? '0'))
			})
		})
	}

	function setPage(page: number) {
		dots.forEach((dot) =>
			dot.getAttribute(ATTRIBUTES.DOT) === String(page)
				? dot.setAttribute('data-active', '')
				: dot.removeAttribute('data-active')
		)
	}

	let startX = 0
	let scrollLeft = 0
	let lastX = 0
	let lastTime = 0
	let velocity = 0
	let isDown = false

	carousel.addEventListener('mousedown', mouseIsDown)
	carousel.addEventListener('mouseup', mouseUp)
	carousel.addEventListener('mouseleave', mouseLeave)
	carousel.addEventListener('mousemove', mouseMove)

	function mouseIsDown(e: MouseEvent) {
		isDown = true
		startX = e.pageX - carousel.offsetLeft
		scrollLeft = carousel.scrollLeft
		lastX = startX
		lastTime = new Date().getTime()
	}

	function mouseUp() {
		isDown = false
		animateScroll()
	}

	function mouseLeave() {
		isDown = false
	}

	function mouseMove(e: MouseEvent) {
		if (isDown) {
			e.preventDefault()
			const x = e.pageX - carousel.offsetLeft
			const walkX = x - startX
			carousel.scrollLeft = scrollLeft - walkX
			const now = new Date().getTime()
			const timeDiff = now - lastTime
			velocity = (x - lastX) / timeDiff
			lastX = x
			lastTime = now
		}
	}

	function animateScroll() {
		if (Math.abs(velocity) < 0.03) return
		carousel.scrollLeft -= velocity * 10
		velocity *= 0.95
		requestAnimationFrame(animateScroll)
	}

	return <></>
}
