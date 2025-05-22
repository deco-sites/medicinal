import { type LoaderContext } from '@deco/deco'
import { BannerInfoWithImage } from 'site/components/ui/BannerInfoWithImage.tsx'
import { CardInfoWithImage } from 'site/components/ui/CardInfoWithImage.tsx'
import { BannerImageFullWithInfo } from 'site/components/ui/BannerImageFullWithInfo.tsx'
import { InfoWithSliderGrid } from 'site/components/ui/InfoWithSliderGrid.tsx'
import { AboutGrid } from 'site/components/ui/AboutGrid.tsx'
import { BannerInfoWithImage2 } from 'site/components/ui/BannerInfoWithImage2.tsx'
import { AboutGrid2 } from 'site/components/ui/AboutGrid2.tsx'
import Stories from 'site/islands/Stories.tsx'
import PromoCoupon from 'site/islands/PromoCoupon.tsx'
import CTAFixoCustom from 'site/islands/CTAFixoCustom.tsx'

export interface Props {
	isMobile?: boolean
}

function PageProfessionalsHealth({ isMobile }: Props) {
	return (
		<div className='min-w-[375px] mb-[75px] lg:mb-[192px]'>
			<BannerInfoWithImage isMobile={isMobile} />

			<CardInfoWithImage />

			<BannerImageFullWithInfo isMobile={isMobile} />

			<InfoWithSliderGrid />

			<AboutGrid
				isMobile={isMobile}
				title={() => (
					<>
						por dentro do
						<br />
						<span className='fontWithGradient'>
							magnésio + inositol <br className='lg:hidden' />
							relief 3.0
						</span>
					</>
				)}
			/>

			<BannerInfoWithImage2 isMobile={isMobile} />

			<AboutGrid2 isMobile={isMobile} />

			<Stories
				videos={[
					{
						url: 'https://assets.decocache.com/true-source/f67dd4f0-20ce-4509-91f5-38754d07a4d2/videos_magnesio_01_letterning.mp4',
						thumbs:
							'https://assets.decocache.com/true-source/b44c59db-0ca9-493b-9839-5433f5130d6f/thumb_video_01.jpg',
						user: {
							name: 'Dr. Victor Sorrentino',
							profession: 'Médico, Escritor e Professor',
							instagram: '@drvictorsorrentino',
						},
					},
					{
						url: 'https://assets.decocache.com/true-source/ae959ebd-503b-4a48-a8cd-b3786a54de61/video_magnesio_02_letterning.mp4',
						thumbs:
							'https://assets.decocache.com/true-source/4d5372ce-4be0-4942-b18a-c3ecf883e75f/thumb_video_02.jpg',
						user: {
							name: 'Dr. Victor Sorrentino',
							profession: 'Médico, Escritor e Professor',
							instagram: '@drvictorsorrentino',
						},
					},
					{
						url: 'https://storage.googleapis.com/truesource-files/videos/video_magnesio_03_letterning.mp4',
						thumbs:
							'https://assets.decocache.com/true-source/0788b7ab-6ce1-4eb6-b11e-9f0d6b9d6398/thumb_video_03.jpg',
						user: {
							name: 'Dr. Victor Sorrentino',
							profession: 'Médico, Escritor e Professor',
							instagram: '@drvictorsorrentino',
						},
					},
					{
						url: 'https://assets.decocache.com/true-source/8081bf80-30b4-4fdc-8b9c-f8f57aaf27fc/video_magnesio_04_letterning.mp4',
						thumbs:
							'https://assets.decocache.com/true-source/9646d291-767d-4d9c-8f87-c0f709a34903/thumb_video_04.jpg',
						user: {
							name: 'Dr. Victor Sorrentino',
							profession: 'Médico, Escritor e Professor',
							instagram: '@drvictorsorrentino',
						},
					},
				]}
			>
				<>
					Veja os depoimentos de quem
					<br className='hidden lg:block' />
					prescreve{' '}
					<span className='fontWithGradient'>
						magnésio + inositol relief 3.0
					</span>
				</>
			</Stories>

			<PromoCoupon isMobile={isMobile} coupon='MAGNESIOTRUE' />

			<CTAFixoCustom />
		</div>
	)
}

export default PageProfessionalsHealth

export const loader = (
	{ ...props }: Props,
	_req: Request,
	ctx: LoaderContext,
) => {
	const isMobile = ctx.device === 'mobile' || ctx.device === 'tablet'

	return { ...props, isMobile }
}
