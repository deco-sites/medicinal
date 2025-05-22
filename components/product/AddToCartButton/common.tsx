import Button from 'site/components/ui/Button.tsx'
import { sendEvent } from 'site/sdk/analytics.tsx'
import { useUI } from 'site/sdk/useUI.ts'
import type { AddToCartParams } from 'apps/commerce/types.ts'
import { IconButtonCart } from '../../ui/CustomIcons.tsx'
import { useSignal } from '@preact/signals'
import { useCart } from 'apps/vtex/hooks/useCart.ts'

export interface Props {
	/** @description: sku name */
	eventParams: AddToCartParams
	onAddItem: () => Promise<void>
	buttonSize?: 'full' | 'auto'
}

export const useAddToCart = ({ eventParams, onAddItem }: Props) => {
	const loading = useSignal(false)
	const { displayCart } = useUI()
	const { cart } = useCart()

	const onClick = async (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		try {
			loading.value = true

			await onAddItem()

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

			displayCart.value = true
		} finally {
			loading.value = false
		}
	}

	return { onClick, loading, 'data-deco': 'add-to-cart' }
}

export default function AddToCartButton(props: Props) {
	const { loading, ...btnProps } = useAddToCart(props)

	const { buttonSize = 'auto' } = props

	return (
		<Button
			{...btnProps}
			loading={loading.value}
			class={`btn-cta-add-to-cart-product-page flex items-center justify-center gap-4 bg-green hover:bg-green rounded-md text-xs sm:text-[13px] font-bold uppercase font-lemon-milk text-white border-0 ${
				buttonSize === 'full' && 'w-full'
			} h-12`}
		>
			Comprar
			<IconButtonCart />
		</Button>
	)
}
