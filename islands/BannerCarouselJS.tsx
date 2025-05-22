import { useEffect } from 'preact/hooks'

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

interface Props {
	rootId: string
	interval?: number
}

const ATTRIBUTES = {
	SLIDER: 'data-slider',
	ITEM: 'data-item',
	PREV: 'data-prev',
	NEXT: 'data-next',
	DOTS: 'data-dots',
	DOT: 'data-dot',
	DOT_TEMPLATE: 'data-dot-template',
	PAGE: 'data-page',
	IS_INTERSECTING: 'data-intersecting',
}

function getElements(rootId: string) {
	const root = document.getElementById(rootId)
	if (!root) {
		throw new Error(`Element with id ${rootId} not found`)
	}
	const carousel = root.querySelector<HTMLElement>(`[${ATTRIBUTES.SLIDER}]`)
	if (!carousel) {
		throw new Error(`Element with ${ATTRIBUTES.SLIDER} not found`)
	}
	const prev = root.querySelector<HTMLElement>(
		`[${ATTRIBUTES.PREV}="${rootId}"]`,
	)
	const next = root.querySelector<HTMLElement>(
		`[${ATTRIBUTES.NEXT}="${rootId}"]`,
	)
	const items = root.querySelectorAll<HTMLElement>(
		`#${rootId} > [${ATTRIBUTES.SLIDER}] > [${ATTRIBUTES.ITEM}]`,
	)

	const dotContainer = root.querySelector<HTMLElement>(`[${ATTRIBUTES.DOTS}]`)
	let dotTemplate: HTMLElement | null = null

	if (dotContainer) {
		dotTemplate = dotContainer.querySelector<HTMLElement>(
			`[${ATTRIBUTES.DOT_TEMPLATE}]`,
		)
		if (!dotTemplate) {
			throw new Error('Element with data-dot-template not found')
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
	for (let i = 0; i < count; i++) {
		const dot = template.cloneNode(true) as HTMLElement
		dot.setAttribute(ATTRIBUTES.DOT, String(i))
		dot.setAttribute('aria-label', `Ir para página ${i + 1}`)
		container.appendChild(dot)
	}
	container.removeChild(template)
}

function setup(
	{
		rootId,
		interval = 0,
	}: Props,
) {
	const {
		root,
		carousel,
		prev,
		next,
		items,
		dotContainer,
		dotTemplate,
	} = getElements(rootId)
	let page = 0
	const pages = items.length

	function computeScroll(index: number) {
		restartTimeout()
		index = Math.max(0, Math.min(index, pages - 1))
		items.forEach((item, i) => {
			item.setAttribute(ATTRIBUTES.IS_INTERSECTING, String(i == index))
		})
		setPage(index)
	}

	function handleNextClick() {
		page = (page + 1) % pages
		computeScroll(page)
	}

	function handlePrevClick() {
		page = (page - 1 + pages) % pages
		computeScroll(page)
	}

	let timeout = interval > 0 && setInterval(handleNextClick, interval)

	if (dotContainer && dotTemplate) {
		generateDots(
			dotContainer,
			dotTemplate,
			items.length,
		)
	}

	const dots = root.querySelectorAll<HTMLLIElement>(`[${ATTRIBUTES.DOT}]`)

	if (dots.length) {
		dots.forEach((dot, index) => {
			dot.addEventListener('click', () => {
				if (!carousel) {
					return
				}
				computeScroll(index)
			})
		})
	}

	function setPage(page: number) {
		for (const dot of dots) {
			dot.getAttribute(ATTRIBUTES.DOT) === String(page)
				? dot.setAttribute('data-active', '')
				: dot.removeAttribute('data-active')
		}
	}

	setPage(0)

	const prevClick = throttle(handlePrevClick, 500)
	const nextClick = throttle(handleNextClick, 500)

	const restartTimeout = () => {
		timeout && clearInterval(timeout)
		timeout = interval > 0 && setInterval(handleNextClick, interval)
	}

	if (prev) {
		prev.addEventListener('click', prevClick)
	}

	if (next) {
		next.addEventListener('click', nextClick)
	}

	let startX = 0
	let lastX = 0
	let isDown = false

	function handleStart(e: TouchEvent) {
		const touch = e.touches[0]
		startX = touch.clientX
		lastX = touch.clientX
		isDown = true
	}

	function handleMove(e: TouchEvent) {
		if (!isDown) return

		const touch = e.touches[0]
		lastX = touch.clientX
	}

	function handleEnd() {
		if (!isDown) return

		isDown = false
		const diffX = startX - lastX

		if (diffX < 0) {
			handlePrevClick()
		} else {
			handleNextClick()
		}
	}

	// carousel.addEventListener('touchmove', handleMove)
	// carousel.addEventListener('touchstart', handleStart)
	// carousel.addEventListener('touchend', handleEnd)

	return () => {
		if (prev) {
			prev.removeEventListener('click', prevClick)
		}

		if (next) {
			next.removeEventListener('click', nextClick)
		}

		timeout && clearInterval(timeout)
	}
}

export default function BannerCarouselJS(props: Props) {
	useEffect(() => setup(props), [])

	return null
}
