import { useSignal } from '@preact/signals'
import { useCart } from 'apps/vtex/hooks/useCart.ts'
import type { AddToCartParams } from 'apps/commerce/types.ts'
import { sendEvent } from 'site/sdk/analytics.tsx'

type Props = {
	seller: string
	productID: string
	quantity: number
	eventParams: AddToCartParams
	onError?: () => void
	onSuccess?: () => void
	onFinally?: () => void
}

const { addItems, updateItems, cart } = useCart()

export default function useBuyProduct(
	{ seller, productID, quantity, onError, onSuccess, onFinally, eventParams }: Props,
) {
	const loading = useSignal(false)

	async function add() {
		try {
			loading.value = true

			await addItems({
				orderItems: [{
					id: productID,
					seller: seller,
					quantity,
				}],
			})

			const user_data = {
				email_address: cart?.value?.clientProfileData?.email ??
					undefined,
				phone_number: cart?.value?.clientProfileData?.phone ??
					undefined,
			}

			sendEvent({
				name: 'add_to_cart',
				params: { ...eventParams, user_data },
			})

			onSuccess?.()
		} catch {
			onError?.()
		} finally {
			loading.value = false
			onFinally?.()
		}
	}

	return {
		add,
		loading,
		remove: (productID: string) => {
			return async () => {
				if (!cart.value?.items.length) return

				loading.value = true

				const index = cart.value?.items.findIndex((item) => item.id === productID)

				await updateItems({
					orderItems: [{
						index,
						quantity: 0,
					}],
				})

				loading.value = false
			}
		},
	}
}
