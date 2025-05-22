import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'

interface Image {
	desktop: ImageWidget
	tablet?: ImageWidget
	mobile?: ImageWidget
}

export interface Props {
	/**
	 * @title Tipo
	 * @default 1
	 */
	type: '1' | '2' | 'full' | 'full 2'
	/**
	 * @title Título
	 */
	title?: HTMLWidget
	/**
	 * @title Cor do texto
	 * @format color-input
	 */
	color?: string
	/**
	 * @title Imagem
	 */
	image?: Image
	/**
	 * @title Alinhamento do texto
	 * @default left
	 */
	textAlign?: 'left' | 'right'
	/**
	 * @title Descrição
	 * @default false
	 */
	description: HTMLWidget
	/**
	 * @title Cor de fundo
	 * @default #F0F0EE
	 * @format color-input
	 */
	backgroundColor?: string
	/**
	 * @title Arredondado
	 * @default true
	 */
	rounded?: boolean
}

export default function InfoCardHorizontal({
	type = '1',
	title =
		'<p>Complementos alimentares <strong>perfeitos</strong> para quem tem uma rotina de <strong>atividades físicas intensas</strong></p>',
	color = '#3C3C3B',
	image = {
		desktop: 'https://tfcucl.vtexassets.com/arquivos/infocard-2.jpg',
	},
	textAlign = 'left',
	backgroundColor = '#F0F0EE',
	description =
		'Os suplementos ajudam a melhorar a resistência física, auxiliam no ganho de massa magra e também na recuperação muscular, além de diversos outros benefícios para você que busca hipertrofia ou definição muscular.\n\nProduzidos com substâncias naturais, nossos produtos são desenvolvidos por especialistas de peso e formulados com produtos altamente eficientes e, claro, muito saborosos. Para te ajudar a alcançar seus objetivos de treino, a True Source dispõe de tudo o que você precisa em proteínas, aminoácidos, termogênicos e vitaminas e minerais. Venha com a gente e conheça um pouco mais de nossos suplementos!',
	rounded = true,
}: Props) {
	if (type === 'full' || type === 'full 2') {
		return (
			<div class='md:container'>
				<div
					class={`flex lg:items-center relative z-1 overflow-hidden min-h-[580px]` +
						(rounded ? ' rounded-[35px]' : '') +
						(textAlign === 'right' ? ' justify-end' : ' justify-start')}
				>
					<Picture>
						<Source
							media='(min-width:1024px)'
							src={image.desktop}
							alt=''
							width={900}
						/>
						<Source
							media='(min-width:640px)'
							src={image.tablet ? image.tablet : image.desktop}
							alt=''
							width={600}
						/>
						<img
							src={image.mobile ? image.mobile : image.desktop}
							class='absolute-center object-cover object-center w-full max-w-unset h-full'
							alt=''
						/>
					</Picture>
					<div
						class={'w-full lg:w-2/5 relative z-1' +
							(type === 'full' ? ' p-12' : ' py-[56px] px-[48px] md:py-[79px] md:px-[125px]')}
						style={{ color }}
					>
						{title && (
							<h2
								class={'custom-category-title text-left' +
									(type === 'full 2'
										? ' text-[16px] leading-5 md:text-[24px] md:leading-[32px] md:mb-6'
										: type === 'full'
										? ' max-lg:mb-6'
										: '')}
								dangerouslySetInnerHTML={{ __html: title }}
							/>
						)}
						<div
							class={'custom-category-text' +
								(!title
									? ' text-1xl sm:text-2xl  font-bold !leading-6 sm:!leading-7'
									: ' text-sm lg:text-base !leading-6 sm:!leading-7') +
								(type === 'full 2' ? ' md:w-[398px]' : '')}
						>
							<p dangerouslySetInnerHTML={{ __html: description }} />
						</div>
					</div>
				</div>
			</div>
		)
	}
	const cardTextLeft = 'gap-12 flex-col-reverse md:gap-0 md:flex-row'
	const cardTextRight = 'gap-12 flex-col-reverse md:gap-0 md:flex-row-reverse'

	const alignment = textAlign === 'left' ? cardTextLeft : textAlign === 'right' ? cardTextRight : cardTextLeft

	return (
		<div class='md:container'>
			<div
				class={`flex ${alignment} items-stretch p-6 md:p-12` +
					(rounded ? ' rounded-[35px]' : '')}
				style={{ backgroundColor }}
			>
				<div class='w-full md:w-1/2 flex items-center justify-center'>
					<div class='w-full md:w-3/4'>
						{title && (
							<h2
								class={'custom-category-title' +
									(type === '2'
										? ' text-[16px] !leading-[21px] md:text-[24px] md:!leading-[32px]'
										: ' mb-8')}
								style={{ color }}
								dangerouslySetInnerHTML={{ __html: title }}
							/>
						)}
						<div class='custom-category-text text-sm lg:text-base !leading-6 sm:!leading-7'>
							<div dangerouslySetInnerHTML={{ __html: description }} />
						</div>
					</div>
				</div>
				<div class='w-full md:w-1/2'>
					<Picture>
						<Source
							media='(min-width:1024px)'
							src={image.desktop}
							alt=''
							width={900}
						/>
						<Source
							media='(min-width:640px)'
							src={image.tablet ? image.tablet : image.desktop}
							alt=''
							width={600}
						/>
						<img
							src={image.mobile ? image.mobile : image.desktop}
							class='w-full h-auto md:h-full object-cover object-center rounded-[11px]'
							alt=''
						/>
					</Picture>
				</div>
			</div>
		</div>
	)
}
