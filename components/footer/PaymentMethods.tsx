import {
	GoogleSeal,
	IconBoleto,
	IconDinnersClub,
	IconMastercard,
	IconPix,
	IconVisa,
	RaSeal,
	SslSeal,
} from 'site/components/ui/CustomIcons.tsx'
import type { JSX } from 'preact'

export interface PaymentItem {
	label: 'Visa' | 'Mastercard' | 'Dinners' | 'Boleto' | 'Pix'
}

export default function PaymentMethods(
	{ content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
	return (
		<>
			{content?.items && content.items.length > 0 && (
				<div class='flex flex-row w-full space-x-4'>
					<div class='flex flex-col lg:flex-row items-center gap-4 lg:justify-between w-full'>
						<div class='flex gap-4'>
							{content.items.map((item) => {
								let iconComponent: JSX.Element | null = null
								switch (item.label) {
									case 'Visa':
										iconComponent = <IconVisa />
										break
									case 'Mastercard':
										iconComponent = <IconMastercard />
										break
									case 'Dinners':
										iconComponent = <IconDinnersClub />
										break
									case 'Boleto':
										iconComponent = <IconBoleto />
										break
									case 'Pix':
										iconComponent = <IconPix />
										break
									default:
										iconComponent = null
								}
								return (
									<ul class='list-none' key={item.label}>
										<li class='block'>
											{iconComponent}
										</li>
									</ul>
								)
							})}
						</div>

						{content.title && (
							<h3 class='text-xs font-bold text-center w-full'>
								{content.title}
							</h3>
						)}

						<div class='flex gap-6 lg:gap-[34px] list-none w-full flex-wrap lg:flex-nowrap'>
							<li class='flex items-center'>
								<span class='block h-auto'>
									<SslSeal />
								</span>
							</li>
							<li class='flex items-center'>
								<span class='block h-auto'>
									<GoogleSeal />
								</span>
							</li>
							<li class='flex items-center'>
								<span class='block h-auto'>
									<RaSeal />
								</span>
							</li>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
