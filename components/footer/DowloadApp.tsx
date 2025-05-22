import Image from 'apps/website/components/Image.tsx'
import { ImageWidget } from 'apps/admin/widgets.ts'
import { QRCodeAppStore, QRCodePlayStore } from 'site/components/ui/CustomIcons.tsx'

interface Props {
	imageAppStore: ImageWidget
	imageGooglePlay: ImageWidget
}

export default function DowloadApp({ imageAppStore, imageGooglePlay }: Props) {
	return (
		<div class='flex flex-col w-full'>
			<div class='text-[13px] color-dark font-bold  leading-4 uppercase'>
				<p>Baixe agora o nosso aplicativo</p>
			</div>
			<div class='flex  mt-[10px] gap-3 flex-row max-lg:flex-col max-lg:items-center '>
				<div class='flex gap-[10px] p-[10px] bg-[#FFF] rounded-[10px] items-center w-[324px] max-w-[324px] max-h-[90px]'>
					<div>
						<a href='https://apps.apple.com/br/app/true-source/id1627773172' target='_blank'>
							<Image
								loading='lazy'
								src={imageAppStore}
								alt='IOS App Store'
								width={147}
								height={42}
							/>
						</a>
					</div>
					<div>
						<QRCodeAppStore />
					</div>
					<div class='h-full flex items-end text-xs font-normal color-dark max-w-[71px] shrink-0 '>
						<p>Ou escaneie o QR Code</p>
					</div>
				</div>
				<div class='flex gap-[10px] p-[10px] bg-[#FFF] rounded-[10px] items-center w-[324px] max-w-[324px] max-h-[90px]'>
					<div>
						<a
							href={'https://play.google.com/store/search?q=true+source&amp;c=apps&amp;hl=pt_BR&c=apps'}
							target='_blank'
						>
							<Image
								loading='lazy'
								src={imageGooglePlay}
								alt='Android Play Store'
								width={147}
								height={42}
							/>
						</a>
					</div>
					<div>
						<QRCodePlayStore />
					</div>
					<div class='h-full flex items-end text-xs font-normal color-dark max-w-[71px] shrink-0'>
						<p>Ou escaneie o QR Code</p>
					</div>
				</div>
			</div>
		</div>
	)
}
