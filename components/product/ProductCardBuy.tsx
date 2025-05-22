import { useCart } from 'apps/vtex/hooks/useCart.ts'
import { clx } from 'site/sdk/clx.ts'
import useBuyProduct from 'site/sdk/useBuyProduct.ts'
import { useUI } from 'site/sdk/useUI.ts'
import Icon from 'site/components/ui/Icon.tsx'
import Loading from 'site/components/ui/Loading.tsx'
import type { AnalyticsItem } from 'apps/commerce/types.ts'

type Props = {
	productID: string
	seller: string
	listPrice: number
	price: number
	canBuyWithSubscription?: boolean
	isAvailable?: boolean
	isMobile?: boolean

	eventItems: AnalyticsItem
}

export default function ({
	productID,
	seller,
	listPrice,
	price,
	canBuyWithSubscription,
	isAvailable,
	isMobile,
	eventItems,
}: Props) {
	const { displayCart, currentSubscription } = useUI()
	const { cart } = useCart()

	const isInCart = cart.value?.items.some((item) => item.id === productID)

	const buyProduct = useBuyProduct({
		eventParams: {
			items: [eventItems],
		},
		productID,
		seller,
		quantity: 1,
		onSuccess: () => {
			displayCart.value = true
		},
	})

	return (
		<button
			type='button'
			disabled={buyProduct.loading.value || !isAvailable}
			onClick={isInCart ? buyProduct.remove(productID) : canBuyWithSubscription
				? () => {
					currentSubscription.value = {
						productID,
						seller,
						quantity: 1,
						listPrice,
						price,
					}
				}
				: buyProduct.add}
			class={clx(
				'btn-cta-add-to-cart-product-card flex justify-center items-center gap-4 rounded text-xs sm:text-sm font-bold h-10 group/card',
				!isAvailable
					? 'text-[#666] bg-[#ccc]'
					: isInCart
					? 'bg-green text-white'
					: 'text-green hover:bg-green hover:text-white transition-colors duration-[200ms] border-2 border-green',
			)}
		>
			{buyProduct.loading.value ? <Loading /> : (
				<>
					{isInCart ? <Icon id='CheckCircle' width={16} height={16} class='text-white' /> : (
						!!isAvailable &&
						// Show in desktop if product have subscription
						!canBuyWithSubscription && (
							<Icon
								id='ShoppingCart'
								width={16}
								height={16}
								class='text-green group-hover/card:text-white delay-75'
							/>
						)
					)}

					{!isAvailable
						? 'Em breve'
						: isInCart
						? 'Adicionado'
						: canBuyWithSubscription
						? 'Assinar com desconto'
						: isMobile
						? 'Comprar'
						: 'Adicionar ao carrinho'}
				</>
			)}
		</button>
	)
}
