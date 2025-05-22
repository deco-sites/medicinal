import Icon from 'site/components/ui/Icon.tsx'
import Button from 'site/components/ui/VideoModal/Button.tsx'
import Modal from 'site/components/ui/VideoModal/Modal.tsx'
import { useId } from 'site/sdk/useId.ts'

interface PropsBannerInfoWithImage3 {
	isMobile?: boolean
}

export function BannerInfoWithImage3({ isMobile }: PropsBannerInfoWithImage3) {
	const id = useId()

	return (
		<>
			<section className='mb-14 lg:mb-16'>
				<div className='w-full relative rounded-[28px] overflow-hidden'>
					<img
						className='object-cover w-full h-full'
						loading='lazy'
						src='https://assets.decocache.com/true-source/358a90ac-fccd-428a-a75b-2a8568ed26ec/em-parceria-com-a-universidade-do-sul-de-santa-catarina-realizamos-um-estudo-inedito-para-entender-os-efeitos-do-magnesio-inositol-relief-3.0-na-qualidade-do-sono.png'
						alt=''
						style={{ height: `${isMobile ? '539px' : '733px'}` }}
					/>

					<div className='absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center'>
						<h2 className='max-w-[1010px]  text-[18px] lg:text-[35px] leading-tight font-bold text-center uppercase text-white mb-10 lg:mb-16 px-9 lg:px-0'>
							em parceria com a Universidade do Sul de Santa Catarina, realizamos um estudo inédito para
							entender os efeitos do magnésio + inositol relief 3.0 na qualidade do sono
						</h2>

						<p className='max-w-[796px] text-[14px] lg:text-[18px] font-medium leading-[1.6] text-center text-white mb-10 lg:mb-16'>
							O estudo foi conduzido com 60 participantes, divididos em dois grupos durante 30 dias.
							<br />
							<br className='hidden lg:block' />
							Os resultados demonstraram melhorias significativas em vários indicadores do{' '}
							<strong className='font-extrabold'>Índice de Pittsburgh</strong>, um dos principais métodos
							de avaliação da qualidade do sono.
							<br />
							<br />
							Além disso, os participantes relataram melhorias na saúde mental e emocional.
						</p>

						<Button
							modalId={id}
							class='flex items-center gap-[10px] uppercase  font-bold text-[13px] leading-none text-white py-[15px] px-6 rounded-full bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]'
						>
							<span>veja o vídeo</span>
							<Icon
								id='ArrowRight'
								size={16}
								class='text-white group-hover:text-red'
							/>
						</Button>

						<Modal
							url='https://www.youtube.com/embed/gc8D53R586c'
							modalId={id}
						/>
					</div>
				</div>
			</section>
		</>
	)
}
