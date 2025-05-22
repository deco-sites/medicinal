import { IS_BROWSER } from '$fresh/runtime.ts'
import type { ComponentChildren } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

export interface Props {
	children?: ComponentChildren
}

export default function NavbarWrapper({ children }: Props) {
	if (!IS_BROWSER) return null

	const [pos, setPos] = useState(0)

	const navbarRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		globalThis.onscroll = () => {
			setPos(globalThis.scrollY)
		}
	}, [])

	return (
		<div
			id='navBarW'
			ref={navbarRef}
			class={pos > 38 ? 'fixed z-40 top-0 w-full isSticky' : ''}
		>
			{children}
		</div>
	)
}
