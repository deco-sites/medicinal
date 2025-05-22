import type { HTMLWidget } from 'apps/admin/widgets.ts'
import Icon from 'site/components/ui/Icon.tsx'

interface CTA {
	label: string
	link: string
}

export interface Props {
	/** @default 1 */
	columns: '1' | '2'
	title: HTMLWidget
	/**
	 * @title O título é um h1?
	 */
	titleIsH1?: boolean
	description: HTMLWidget
	background?: string
	cta?: CTA
}

export default function OnlyText({
	columns = '1',
	title =
		'<p>Complementos alimentares <strong>perfeitos</strong> para quem tem uma rotina de <strong>atividades físicas intensas</strong></p>',
	description =
		'Os suplementos ajudam a melhorar a resistência física, auxiliam no ganho de massa magra e também na recuperação muscular, além de diversos outros benefícios para você que busca hipertrofia ou definição muscular.\n\nProduzidos com substâncias naturais, nossos produtos são desenvolvidos por especialistas de peso e formulados com produtos altamente eficientes e, claro, muito saborosos. Para te ajudar a alcançar seus objetivos de treino, a True Source dispõe de tudo o que você precisa em proteínas, aminoácidos, termogênicos e vitaminas e minerais. Venha com a gente e conheça um pouco mais de nossos suplementos!',
	background = '#fff',
	cta,
	titleIsH1,
}: Props) {
	const Title = titleIsH1 ? 'h1' : 'h2'

	return (
		<div className='md:container'>
			<div
				class={`flex flex-col ${
					columns === '1' ? 'items-center gap-8' : 'md:flex-row items-stretch gap-6 md:gap-10'
				} rounded-[35px] px-8 py-12 md:px-12 md:py-12`}
				style={{ background }}
			>
				<div
					class={`w-full ${
						columns === '1' ? 'text-center w-full max-w-[740px]' : 'text-left w-full md:w-2/5'
					}`}
				>
					<div
						class={`${columns === '1' ? 'flex' : 'hidden'} flex-col items-center`}
					>
						<div class='w-20 h-[3px] bg-brand' />
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='38'
							height='39'
							viewBox='0 0 38 39'
							fill='none'
							class='block my-6 lg:my-10'
						>
							<path
								d='M34.2749 30.0191L26.5035 22.2277L23.372 19.0881L26.5035 15.9484L34.2749 8.15703C33.6744 7.31301 32.9998 6.51022 32.2457 5.75418C31.4916 4.99813 30.6881 4.32182 29.849 3.71973L22.0776 11.5111L18.9461 14.6508L15.8145 11.5111L8.04309 3.71698C7.20124 4.31907 6.40052 4.99538 5.64641 5.75143C4.89231 6.50748 4.21773 7.31301 3.61719 8.15428L11.3886 15.9457L14.5202 19.0853L11.3886 22.225L3.61719 30.0164C4.21773 30.8604 4.89231 31.6632 5.64641 32.4192C6.40052 33.1753 7.20398 33.8516 8.04309 34.4537L15.8145 26.6623L18.9461 23.5226L22.0776 26.6623L29.849 34.4537C30.6909 33.8516 31.4916 33.1753 32.2457 32.4192C32.9998 31.6632 33.6744 30.8576 34.2749 30.0164V30.0191Z'
								fill='#E4003F'
							/>
							<path
								d='M37.72 15.866H22.1608V0.263929C21.1325 0.0907255 20.0795 0 19.0018 0C17.9241 0 16.8711 0.0907255 15.8428 0.263929V15.8632H0.280829C0.108071 16.8942 0.0175781 17.9499 0.0175781 19.0304C0.0175781 20.1108 0.108071 21.1665 0.280829 22.1975H15.84V37.7968C16.8684 37.97 17.9214 38.0607 18.999 38.0607C20.0767 38.0607 21.1297 37.97 22.1581 37.7968V22.1975H37.7173C37.89 21.1665 37.9805 20.1108 37.9805 19.0304C37.9805 17.9499 37.89 16.8942 37.7173 15.8632L37.72 15.866Z'
								fill='#E9530E'
							/>
						</svg>
					</div>
					<Title
						class={`custom-category-title static md:sticky md:top-28 mb-0`}
						dangerouslySetInnerHTML={{ __html: title }}
					/>
				</div>
				<div
					class={`${columns === '1' ? 'hidden' : 'hidden md:flex'} w-[1.5px] bg-brand`}
				/>
				<div
					class={`custom-category-text !leading-6 sm:!leading-7 ${
						!title ? 'text-1xl sm:text-2xl  font-bold' : 'text-sm lg:text-base'
					} ${
						columns === '1'
							? 'text-center w-full max-w-[620px]'
							: 'mt-8 md:mt-0 text-left w-full md:w-3/5 pl-6 md:pl-0 border-l-[1.5px] border-red md:border-0'
					}`}
				>
					<div dangerouslySetInnerHTML={{ __html: description }} />
				</div>

				{cta && (
					<a
						href={cta.link}
						class='flex items-center gap-2 py-3 px-6 text-sm font-bold font-lemon text-white bg-blue rounded-full'
					>
						{cta.label}
						<Icon id='ArrowRight' width={16} height={16} class='text-white' />
					</a>
				)}
			</div>
		</div>
	)
}
