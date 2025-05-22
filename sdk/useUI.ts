import { type Signal, signal } from '@preact/signals'
import type { Props } from '../components/product/SubscriptionModal.tsx'
import { IS_BROWSER } from '$fresh/runtime.ts'

let state = {
	displayCart: { value: false } as Signal<boolean>,
	displayMenu: { value: false } as Signal<boolean>,
	displaySearchPopup: { value: false } as Signal<boolean>,
	displaySearchDrawer: { value: false } as Signal<boolean>,
	displaySubscriptionPopup: { value: false } as Signal<boolean>,
	displayVideoModal: { value: null } as Signal<null | string>,
	currentSubscription: { value: null } as Signal<Props | null>,
}

if (IS_BROWSER) {
	const displayCart = signal(false)
	const displayMenu = signal(false)
	const displaySearchPopup = signal(false)
	const displaySearchDrawer = signal(false)
	const displaySubscriptionPopup = signal(false)
	const displayVideoModal = signal<null | string>(null)

	const currentSubscription = signal<Props | null>(null)

	state = {
		displayCart,
		displayMenu,
		displaySearchPopup,
		displaySearchDrawer,
		displaySubscriptionPopup,
		displayVideoModal,
		currentSubscription,
	}

	// Keyboard event listeners
	addEventListener('keydown', (e: KeyboardEvent) => {
		const isK = e.key === 'k' || e.key === 'K' || e.keyCode === 75

		// Open Searchbar on meta+k
		if (e.metaKey === true && isK) {
			displaySearchPopup.value = true
		}
	})
}

export const useUI = () => state
