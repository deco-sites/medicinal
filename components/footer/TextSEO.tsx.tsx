import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'
import RenderHTML from 'site/components/ui/RenderHTML.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { VtexSeal } from 'site/components/ui/CustomIcons.tsx'

export default function TextSEO(
	{ seoText, logo, copyrightText }: {
		seoText: HTMLWidget
		logo: ImageWidget
		copyrightText: string
	},
) {
	return (
		<div class='flex flex-col items-start gap-10 lg:px-[72px] w-full pb-[117px]'>
			<div class='flex flex-col md:flex-row items-start md:items-center gap-5'>
				<Image src={logo} alt='logo' width={140} height={64} />
				<RenderHTML
					html={seoText}
					class='max-w-[527px] text-dark text-[11px] leading-[18px]'
				/>
			</div>
			<div class='flex flex-col gap-10 md:flex-row justify-between items-center w-full'>
				<p class=' text-dark text-[11px] leading-[13px] text-center sm:text-left'>
					{copyrightText}
				</p>
				<span className='flex items-center gap-2 h-auto'>
          <a href="https://www.wavecommerce.com.br/?utm_source=rodape&utm_medium=site+truesource" target="_blank">
					  <Icon id='wave' width='128' height='23' />
          </a>
					<VtexSeal />
				</span>
			</div>
		</div>
	)
}
