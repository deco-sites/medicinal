import Icon from 'site/components/ui/Icon.tsx'
import { sendEvent } from 'site/sdk/analytics.tsx'
import { useUI } from 'site/sdk/useUI.ts'
import type { AnalyticsItem } from 'apps/commerce/types.ts'
import Loading from 'site/components/ui/Loading.tsx'
import Button from 'site/components/ui/Button.tsx'

interface Props {
	loading: boolean
	currency: string
	total: number
	items: AnalyticsItem[]
	type?: 'menu' | 'header'
	size?: 'sm' | 'md' | 'lg'
}

function CartButton(
	{ loading, currency, total, items, type = 'header', size = 'lg' }: Props,
) {
	const {
		displayCart,
		displayMenu,
		displaySearchPopup,
		displaySearchDrawer,
	} = useUI()
	const totalItems = items.length

	const onClick = () => {
		sendEvent({
			name: 'view_cart',
			params: { currency, value: total, items },
		})
		displayCart.value = true
		displayMenu.value = false
		displaySearchPopup.value = false
		displaySearchDrawer.value = false
	}

	const sizeMapping = {
		sm: 16,
		md: 20,
		lg: 24,
	}

	const iconSize = sizeMapping[size]

	return (
		<div class={`indicator ${type === 'menu' ? 'w-full' : ''}`}>
			<span
				class={`flex pointer-events-none justify-center items-center indicator-item font-medium top-[5px] bg-brand text-white h-5 w-5 md:h-6 md:w-6 rounded-full badge-xs ${
					totalItems === 0 ? 'hidden' : ''
				}`}
			>
				{totalItems > 9 ? '9+' : totalItems}
			</span>

			<Button
				class={`${type === 'menu' ? 'flex text-[11px] uppercase w-full' : ' btn-ghost hover:bg-transparent'}`}
				aria-label='Abrir carrinho de compras'
				data-deco={displayCart.value && 'open-cart'}
				loading={type === 'menu' ? false : loading}
				onClick={onClick}
			>
				{type === 'menu'
					? (
						<div class='flex justify-between items-center w-full'>
							<p>Carrinho de Compras</p>
							<Icon id='ShoppingCart' size={iconSize} class='text-red' />
						</div>
					)
					: <Icon id='ShoppingCart' size={iconSize} class='text-red' />}
			</Button>
		</div>
	)
}

export default CartButton
