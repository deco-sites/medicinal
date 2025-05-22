import Icon from 'site/components/ui/Icon.tsx'

interface PropsBannerInfoWithImage2 {
	isMobile?: boolean
}

export function BannerInfoWithImage2({ isMobile }: PropsBannerInfoWithImage2) {
	return (
		<>
			<section className='mb-12 lg:mb-14'>
				<div className='w-full relative rounded-[28px] lg:rounded-none overflow-hidden'>
					<img
						className='object-cover w-full h-full'
						loading='lazy'
						src='https://assets.decocache.com/true-source/0813fd3d-24c9-4f60-b2b5-6162f99c2c08/este-suplemento-ideal-para-mulheres-e-homens-que-enfrentam-noites-mal-dormidas.png'
						alt=''
						style={{ height: `${isMobile ? '443px' : '712px'}` }}
					/>

					<div className='absolute left-0 top-0 z-[1] w-full h-full flex flex-col items-center justify-center'>
						<h2 className='max-w-[666px]  text-[18px] lg:text-[24px] leading-tight font-bold text-center uppercase text-ice lg:text-[#F0E9E9] mb-8 px-9 lg:px-0'>
							Este suplemento é ideal para mulheres e homens que desejam ter um sono de qualidade e
							reparador, além de fortalecer a saúde óssea, muscular, cardiovascular e intestinal. Uma
							opção natural, segura e eficaz para promover mais equilíbrio e bem-estar no dia a dia.
						</h2>

						<a
							href='#cupom'
							class='flex items-center gap-[10px] uppercase  font-bold text-[13px] leading-none text-white py-[15px] px-6 rounded-full bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]'
						>
							<span>quero melhorar minha saúde</span>
							<Icon
								id='ArrowRight'
								size={16}
								class='text-white group-hover:text-red'
							/>
						</a>
					</div>
				</div>
			</section>
		</>
	)
}
