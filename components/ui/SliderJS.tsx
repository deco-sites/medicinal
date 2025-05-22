import { useEffect } from 'preact/hooks'

export interface Props {
	rootId: string
	interval?: number
	infinite?: boolean
	dotIsPage?: boolean
	startFrom?: number
}

const ATTRIBUTES = {
	'data-slider': 'data-slider',
	'data-slider-item': 'data-slider-item',
	'data-slide="prev"': 'data-slide="prev"',
	'data-slide="next"': 'data-slide="next"',
	'data-dot': 'data-dot',
}

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6

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

const setup = ({ rootId, interval, infinite, dotIsPage, startFrom }: Props) => {
	const root = document.getElementById(rootId)

	if (!root) throw new Error(`Element with id ${rootId} not found`)

	const slider = root.querySelector(`[${ATTRIBUTES['data-slider']}]`)
	const items = root.querySelectorAll<HTMLElement>(
		`[${ATTRIBUTES['data-slider-item']}]`,
	)
	const prev = root.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`)
	const next = root.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`)
	const dots = root.querySelectorAll<HTMLElement>(
		`[${ATTRIBUTES['data-dot']}]`,
	)

	if (!slider) {
		throw new Error(`Element with ${ATTRIBUTES['data-slider']} not found`)
	}

	const getElementsInsideContainer = () => {
		const indices: number[] = []
		const sliderRect = slider.getBoundingClientRect()

		for (let index = 0; index < items.length; index++) {
			const item = items.item(index)
			const rect = item.getBoundingClientRect()

			const ratio = intersectionX(
				rect,
				sliderRect,
			) / rect.width

			if (ratio > THRESHOLD) {
				indices.push(index)
			}
		}

		return indices
	}

	const goToItem = (index: number) => {
		const item = items.item(index)

		slider.scrollTo({
			top: 0,
			behavior: 'smooth',
			left: item.offsetLeft - root.offsetLeft,
		})
	}

	const onClickPrev = () => {
		const indices = getElementsInsideContainer()
		const itemsPerPage = indices.length
		const isShowingFirst = indices[0] === 0

		goToItem(
			isShowingFirst ? items.length - 1 : Math.max(0, indices[0] - itemsPerPage),
		)
	}

	const onClickNext = () => {
		const indices = getElementsInsideContainer()
		const isShowingLast = indices[indices.length - 1] === items.length - 1

		goToItem(
			Math.min(
				isShowingLast ? 0 : indices.at(-1) as number + 1,
				items.length - 1,
			),
		)
	}

	const visibleSlides = getElementsInsideContainer()
	const removeAllDots = items.length <= visibleSlides.length

	const dotsIndexes = [] as number[]
	for (let i = 0; i < (dots?.length ?? 0); i += visibleSlides.length) {
		dotsIndexes.push(i)
	}

	// Remove dots
	if (dotIsPage) {
		for (const dot of [...dots ?? []]) {
			const index = Number(dot.getAttribute('data-dot'))

			if (removeAllDots || !dotsIndexes.includes(index)) {
				dot.remove()
			}
		}
	}

	const observer = new IntersectionObserver(
		(elements) => {
			for (const item of elements) {
				const index = Number(item.target.getAttribute('data-slider-item'))
				const dot = dots?.item(index)

				if (dotsIndexes.includes(index) && dot) {
					if (item.isIntersecting) {
						dot.setAttribute('data-active', '')
					} else {
						dot.removeAttribute('data-active')
					}
				}

				if (!infinite) {
					if (index === 0) {
						if (item.isIntersecting) {
							prev?.setAttribute('disabled', '')
						} else {
							prev?.removeAttribute('disabled')
						}
					}
					if (index === items.length - 1) {
						if (item.isIntersecting) {
							next?.setAttribute('disabled', '')
						} else {
							next?.removeAttribute('disabled')
						}
					}
				}
			}
		},
		{ threshold: THRESHOLD, root: slider },
	)

	for (const item of items) {
		observer.observe(item)
	}

	for (let it = 0; it < (dots?.length ?? 0); it++) {
		dots?.item(it).addEventListener('click', () => goToItem(it))
	}

	prev?.addEventListener('click', onClickPrev)
	next?.addEventListener('click', onClickNext)

	interval && setInterval(onClickNext, interval)

	if (typeof startFrom === 'number') {
		goToItem(startFrom)
	}
}

function Slider(props: Props) {
	useEffect(() => setup(props), [])

	return null
}

export default Slider
