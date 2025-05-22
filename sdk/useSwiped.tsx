import { useEffect } from 'preact/hooks'

type Props = {
	onSwipeLeft?: (delta: number) => void
	onSwipeRight?: (delta: number) => void
	delta?: number
	deltaTime?: number
}

export default function (
	{ onSwipeLeft, onSwipeRight, delta = 50, deltaTime = 100 }: Props,
) {
	useEffect(() => {
		let touchStartX = 0
		let touchEndX = 0
		let timeStampStart = 0
		let timeStampEnd = 0

		function checkDirection() {
			if (touchEndX < touchStartX - delta) {
				onSwipeLeft?.(touchStartX - touchEndX)
			}
			if (touchEndX > touchStartX + delta) {
				onSwipeRight?.(touchEndX - touchStartX)
			}
		}

		const handleTouchStart = (e: TouchEvent) => {
			touchStartX = e.changedTouches[0].screenX
			timeStampStart = performance.now()
		}

		const handleTouchEnd = (e: TouchEvent) => {
			touchEndX = e.changedTouches[0].screenX

			timeStampEnd = performance.now()
			if (timeStampEnd - timeStampStart > deltaTime) {
				return
			}

			checkDirection()
		}

		addEventListener('touchstart', handleTouchStart)
		addEventListener('touchend', handleTouchEnd)

		return () => {
			removeEventListener('touchstart', handleTouchStart)
			removeEventListener('touchend', handleTouchEnd)
		}
	}, [])

	return null
}
