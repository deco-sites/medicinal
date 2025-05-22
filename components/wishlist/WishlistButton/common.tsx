import { useSignal } from '@preact/signals'
import Icon from 'site/components/ui/Icon.tsx'
import Button from 'site/components/ui/Button.tsx'
import { sendEvent } from 'site/sdk/analytics.tsx'

export interface Props {
	productID: string
	productGroupID?: string
	variant?: 'icon' | 'full'
	removeItem: () => Promise<void>
	addItem: () => Promise<void>
	loading: boolean
	inWishlist: boolean
	isUserLoggedIn: boolean
	isMobile: boolean
}

function ButtonCommon({
	productGroupID,
	productID,
	loading,
	inWishlist,
	isUserLoggedIn,
	removeItem,
	addItem,
	isMobile,
}: Props) {
	const fetching = useSignal(false)

	return (
		<Button
			class='text-gray bg-transparent p-0 h-auto min-h-unset w-auto border-0 hover:bg-transparent'
			style={{ minHeight: 'unset' }}
			loading={fetching.value}
			aria-label='Add to wishlist'
			onClick={async (e) => {
				e.stopPropagation()
				e.preventDefault()

				if (!isUserLoggedIn) {
					globalThis.window.alert(
						'Por favor, faça o login e depois adicione à wishlist',
					)

					return
				}

				if (loading) {
					return
				}

				try {
					fetching.value = true

					if (inWishlist) {
						await removeItem()
					} else if (productID && productGroupID) {
						await addItem()

						sendEvent({
							name: 'add_to_wishlist',
							params: {
								items: [
									{
										item_id: productID,
										item_group_id: productGroupID,
										quantity: 1,
									},
								],
							},
						})
					}
				} finally {
					fetching.value = false
				}
			}}
		>
			{inWishlist
				? <Icon id='HeartFill' size={isMobile ? 20 : 24} class='text-orange' />
				: <Icon id='Heart' size={isMobile ? 20 : 24} class='text-gray' />}
		</Button>
	)
}

export default ButtonCommon
