import { useEffect } from 'preact/hooks'

function ImageSliderJS() {
	// @ts-ignore Glide exists
	useEffect(() => new Glide('.product-images').mount(), [])

	return null
}

export default ImageSliderJS
