import { asset } from '$fresh/runtime.ts'
import type { JSX } from 'preact'

export type AvailableIcons =
	| 'Alert'
	| 'AlertError'
	| 'CheckboxCheck'
	| 'AlertInfo'
	| 'ShelfWithImageChevron'
	| 'AlertSuccess'
	| 'AlertWarning'
	| 'ArrowNarrowRight'
	| 'ArrowRight'
	| 'ArrowsPointingOut'
	| 'Asterisk'
	| 'BannerArrowRight'
	| 'Bars3'
	| 'CashBack'
	| 'Cashback'
	| 'Check'
	| 'CheckCircle'
	| 'CheckboxCheck'
	| 'ChevronDown'
	| 'ChevronLeft'
	| 'ChevronRight'
	| 'ChevronUp'
	| 'Close'
	| 'CloseCircle'
	| 'PreviousPage'
	| 'NextPage'
	| 'CloseMobile'
	| 'CreditCards'
	| 'Deco'
	| 'DinersClub'
	| 'Discord'
	| 'Discount'
	| 'Elos'
	| 'FilterList'
	| 'FloatingChat'
	| 'FloatingWhatsApp'
	| 'FloatingX'
	| 'GoogleSeal'
	| 'Heart'
	| 'HeartFill'
	| 'Help'
	| 'IconDesktop'
	| 'IconMobile'
	| 'Instagram'
	| 'Login'
	| 'LogoIcon'
	| 'MagnifyingGlass'
	| 'MapPin'
	| 'Mastercard'
	| 'Mastercards'
	| 'Message'
	| 'Minus'
	| 'MinusCircle'
	| 'NextPage'
	| 'NotCheck'
	| 'OpenMobile'
	| 'Phone'
	| 'Pix'
	| 'Pixs'
	| 'PlayCircle'
	| 'Plus'
	| 'PlusCircle'
	| 'PreviousPage'
	| 'RatingStar'
	| 'Refresh'
	| 'Return'
	| 'Ruler'
	| 'SSLSeal'
	| 'ShelfWithImageChevron'
	| 'ShoppingCart'
	| 'Star'
	| 'StarIcon'
	| 'StarIconWhite'
	| 'StrokeArrowRight'
	| 'ThinShoppingCart'
	| 'ThinUser'
	| 'Tiktok'
	| 'Timeline'
	| 'Trash'
	| 'Truck'
	| 'User'
	| 'Visa'
	| 'Visas'
	| 'Warning'
	| 'WhatsApp'
	| 'WhatsIcon'
	| 'X'
	| 'XMark'
	| 'Youtube'
	| 'Zoom'
	| 'checkSubscription'
	| 'wave'
	| 'share'
	| 'CopyButtonCta'

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
	id: AvailableIcons
	size?: number
}

function Icon(
	{ id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
	return (
		<svg
			{...otherProps}
			width={width ?? size}
			height={height ?? size}
			strokeWidth={strokeWidth}
		>
			<use href={asset(`/sprites.svg#${id}`)} />
			<title>{id}</title>
		</svg>
	)
}

export default Icon
