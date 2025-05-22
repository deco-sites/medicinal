import type { AnalyticsEvent } from 'apps/commerce/types.ts'
// import { useUser } from "apps/vtex/hooks/useUser.ts";
import { useCart } from 'apps/vtex/hooks/useCart.ts'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { useSignal } from '@preact/signals'

export const SendEventOnViewIsland = <E extends AnalyticsEvent>(
	{ event, id }: { event: E; id: string },
) => {
	const done = useSignal(false)

	if (!IS_BROWSER) return null

	const { cart } = useCart()

	const elem = document.getElementById(id)

	// if (!elem || !cart?.value?.clientProfileData) return null
	if (!elem || !cart?.value || done.value) return null

	const user_data = {
		email_address: cart?.value?.clientProfileData?.email ?? undefined,
		phone_number: cart?.value?.clientProfileData?.phone ?? undefined,
	}

	const observer = new IntersectionObserver((items) => {
		for (const item of items) {
			if (!item.isIntersecting) continue

			globalThis.window.DECO.events.dispatch({
				...event,
				params: {
					...event.params,
					user_data,
				},
			})

			observer.unobserve(elem)

			done.value = true
		}
	})

	observer.observe(elem)

	return null
}
