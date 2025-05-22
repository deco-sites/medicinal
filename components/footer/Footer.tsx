import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import Divider from 'site/components/footer/Divider.tsx'
import FooterItems from 'site/components/footer/FooterItems.tsx'
import PaymentMethods from 'site/components/footer/PaymentMethods.tsx'
import Social from 'site/components/footer/Social.tsx'
import TextSEO from 'site/components/footer/TextSEO.tsx.tsx'
import DowloadApp from 'site/components/footer/DowloadApp.tsx'
import Newsletter from 'site/islands/Newsletter.tsx'

export type Item = {
	label: string
	href: string
}

export type Section = {
	label?: string
	items: Item[]
}

export interface SocialItem {
	label:
		| 'Instagram'
		| 'Tiktok'
		| 'Youtube'
	link: string
}

export interface PaymentItem {
	label: 'Visa' | 'Mastercard' | 'Dinners' | 'Boleto' | 'Pix'
}

export interface MobileApps {
	/** @description Link to the app */
	apple?: string
	/** @description Link to the app */
	android?: string
}

export interface RegionOptions {
	currency?: Item[]
	language?: Item[]
}

export interface NewsletterForm {
	placeholder?: string
	buttonText?: string
	/** @format html */
	helpText?: string
}

export interface Layout {
	backgroundColor?:
		| 'Primary'
		| 'Secondary'
		| 'Accent'
		| 'Base 100'
		| 'Base 100 inverted'
	variation?:
		| 'Variation 1'
		| 'Variation 2'
		| 'Variation 3'
		| 'Variation 4'
		| 'Variation 5'
	hide?: {
		logo?: boolean
		newsletter?: boolean
		sectionLinks?: boolean
		socialLinks?: boolean
		paymentMethods?: boolean
		mobileApps?: boolean
		regionOptions?: boolean
		backToTheTop?: boolean
	}
}

export interface Props {
	/** @title Logo */
	logo: ImageWidget
	/** @title Texto SEO */
	seoText: HTMLWidget
	/** @title Newsletter */
	newsletter?: {
		title?: string
		form?: NewsletterForm
	}
	/** @title Redes sociais */
	social?: SocialItem[]
	/** @title Seções */
	sections: Section[]
	/** @title Links institucionais */
	institutionalItems: Item[]
	/** @title Métodos de pagamento */
	payments?: {
		title?: string
		items: PaymentItem[]
	}
	/** @title Texto de direitos reservados */
	copyrightText: string
	/** @title Imagem AppStore */
	imageAppStore: ImageWidget
	/** @title Imagem GooglePlay */
	imageGooglePlay: ImageWidget
	imageURL: string
}

function Footer({
	logo,
	newsletter,
	social,
	sections,
	payments,
	seoText,
	copyrightText,
	institutionalItems,
	imageAppStore,
	imageGooglePlay,
	// imageURL,
}: Props) {
	return (
		<footer class='w-full flex flex-col pt-14 pb-2 lg:pb-10 bg-ice'>
			<div class='lg:container px-4 lg:mx-auto'>
				<div class='flex flex-col items-center'>
					<div class='flex flex-col md:flex-row justify-between items-start md:items-center w-full md:pb-6 lg:px-[72px] gap-x-4'>
						{newsletter && <Newsletter content={newsletter} />}
						<Social content={social} />
					</div>
					<Divider />
					<div class='flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between w-full pt-8 lg:py-10'>
						<FooterItems
							sections={sections}
							institutionalItems={institutionalItems}
						/>
					</div>
					<Divider />
					<div class='flex flex-col lg:flex-row gap-6 lg:gap-10 lg:justify-between w-full lg:px-[72px] py-8 lg:py-10'>
						<PaymentMethods content={payments} />
					</div>
					<div class='w-full px-[72px] pb-10'>
						<DowloadApp imageAppStore={imageAppStore} imageGooglePlay={imageGooglePlay} />

						{/* <DowloadAppTest url={imageURL} /> */}
					</div>
					<TextSEO
						copyrightText={copyrightText}
						logo={logo}
						seoText={seoText}
					/>
				</div>
			</div>
		</footer>
	)
}

export default Footer
