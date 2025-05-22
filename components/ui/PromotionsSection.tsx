import type { HTMLWidget, ImageWidget } from 'apps/admin/widgets.ts'
import Image from 'apps/website/components/Image.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import { useState } from 'preact/hooks'
import { AppContext } from 'site/apps/site.ts'
import { filterByMatcher } from 'site/sdk/matcher.ts'
import { type SectionProps } from '@deco/deco'
import { type Matcher } from '@deco/deco/blocks'
export interface Promotion {
	/**
	 * @title Imagem
	 * @description Imagem usada no card da promoção
	 */
	image?: ImageWidget
	/**
	 * @title Ocultar Imagem?
	 * @description Ativar caso deseje ocultar a imagem
	 */
	showImage?: boolean
	/**
	 * @title Título Promoção
	 * @description Título principal do card de promoção
	 */
	titlePromotion?: string
	/**
	 * @title Ocultar Título?
	 * @description Caso queira ocultar o título principal do card de promoção
	 */
	showTitle?: boolean
	/**
	 * @title Texto Tag
	 * @description Colocar o texto que você quer que apareça na tag. Ex: COMPRE E GANHE
	 */
	tag?: string
	/**
	 * @title Ocultar Tag?
	 * @description Caso queira ocultar a tag
	 */
	showTag?: boolean
	/**
	 * @title Texto Descrição
	 * @description Está é a descrição da sua promoção, consegue por links, underline, e negrito.
	 */
	text?: HTMLWidget
	/**
	 * @title Ocultar Descrição?
	 * @description Caso queira ocultar a descrição
	 */
	showText?: boolean
	/**
	 * @title Texto Cta
	 * Este é o texto do botão vermelho
	 */
	cta?: string
	/**
	 * @title Link Cta
	 * @description Caso haja botão, colocar o link que você quer direcionar o cliente
	 */
	ctaLink?: string
	/**
	 * @title Ocultar Botão de CTA?
	 * @description Caso não haja botão, ocultar o botão
	 */
	showCtaButton?: boolean
	/**
	 * @title Nome do cupom?
	 * @description É necessário escrever o nome do cupom que você quer que o cliente copie, caso não haja o nome do cupom, ele não irá aparecer. Ex: MESDOCLIENTE
	 */
	ctaCopyButton?: string
	/**
	 * @title Ocultar Botão de copiar Cupom?
	 * @description Caso você queira ocultar o botão de copiar Cupom
	 */
	showCtaCopyButton?: boolean
	/**
	 * @title Texto Regra
	 * @description A regra da sua promoção que aparece em cinza de baixo do Card
	 */
	ruleTextPromotion?: string
	/**
	 * @title Ocultar Texto Regra?
	 * @description Caso você não queira que a regra apareça
	 */
	showRuleTextPromotion?: boolean
	/**
	 * @title Data e hora da promoção
	 * @description Adicione os matchers de "Date and Time", as regras
	 */
	rule?: Matcher
	/**
	 * @title Data e hora da promoção formatada
	 * @description Adicione a data final da promoção que irá aparecer no CARD, ex: 31/10/2024
	 */
	ruleDateHourFormatted?: string
	/**
	 * @title Deseja ocultar a data Final da promoção no Card?
	 * @description Caso queira ocultar a data Final da Promoção no Card
	 */
	showRuleDateHourFormatted?: boolean
	/**
	 * @title Desativar esta promoção?
	 */
	notActive?: boolean
}
export interface Props {
	/**
	 * @title Título da Sessão
	 */
	title?: string
	/**
	 * @title Promoções
	 */
	promotions?: Promotion[]
}
export const loader = async (
	{ title, promotions = [] }: Props,
	request: Request,
	context: AppContext,
) => {
	const filteredPromotions = await filterByMatcher({
		items: promotions,
		context,
		request,
	})
	return {
		title,
		promotions: filteredPromotions.filter(({ notActive }) => !notActive),
	}
}
export default function PromotionsSection({
	title,
	promotions,
}: SectionProps<typeof loader>) {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
	const copyCoupon = (couponName: string | undefined, index: number) => {
		const couponCode = couponName?.toUpperCase()
		const tempInput = document.createElement('input')
		document.body.appendChild(tempInput)
		if (couponCode) {
			tempInput.value = couponCode
			tempInput.select()
			document.execCommand('copy')
			document.body.removeChild(tempInput)
			setCopiedIndex(index)
		}
	}
	return (
		<div class='flex flex-col gap-6 h-full w-full rounded-xl border border-light-gray p-6 md:p-16'>
			{title && <h2 class='text-dark text-base font-extrabold uppercase'>{title}</h2>}

			{promotions.map((promotion, index) => {
				console.log('promotion', promotion)
				const {
					cta,
					ctaLink,
					ctaCopyButton,
					image,
					ruleDateHourFormatted,
					showRuleDateHourFormatted,
					showCtaButton,
					showCtaCopyButton,
					showImage,
					showRuleTextPromotion,
					showTag,
					showText,
					showTitle,
					tag,
					text,
					titlePromotion,
					ruleTextPromotion,
				} = promotion
				const isCopied = copiedIndex === index
				return (
					<div
						key={index}
						class='flex flex-col h-full w-full rounded-xl border border-light-gray p-6 gap-4'
					>
						<div class='flex gap-4 flex-col lg:flex-row'>
							{!showImage && image && (
								<Image
									src={image}
									width={200}
									height={200}
									class='max-h-[200px] max-w-[200px]'
								/>
							)}
							<div></div>
							<div class='flex flex-col gap-5 relative lg:w-[663px]'>
								<div class='flex flex-col gap-[6px]'>
									{!showTitle && (
										<p class='text-dark font-lemon text-sm font-bold uppercase'>
											{titlePromotion}
										</p>
									)}
									{!showRuleDateHourFormatted && ruleDateHourFormatted && (
										<p class='text-gray text-xs font-normal'>
											Validade: {ruleDateHourFormatted}
										</p>
									)}
								</div>
								{!showTag && (
									<div class='max-lg:max-w-[140px] whitespace-nowrap min-w-[120px] h-[21px] p-[6px] absolute right-0 top-0 bg-gradient-to-r text-transparent bg-clip-text border border-red uppercase text-xs font-semibold flex items-center rounded-[5px] from-red from-35% to-orange to-90% justify-center max-lg:static'>
										{tag}
									</div>
								)}

								{!showText && text && (
									<div
										class='text-sm text-dark font-normal'
										dangerouslySetInnerHTML={{ __html: text }}
									/>
								)}

								<div class='flex gap-4 flex-col lg:flex-row'>
									{!showCtaButton && (
										<div class='group'>
											<a
												class='flex h-10 items-center gap-2 justify-center font-bold text-[11px] md:text-[13px] leading-[14px] md:leading-[17.5px] uppercase  md:h-[40px] rounded-full  text-dark group-first:text-white bg-blue group-first:px-2 md:group-first:px-6 group-hover:bg-gradient-to-r transition-all group-hover:text-transparent group-hover:bg-clip-text border border-transparent group-first:hover:border-red'
												href={ctaLink}
											>
												{cta}
												<Icon
													id='ArrowRight'
													size={20}
													class='text-white group-hover:text-red'
												/>
											</a>
										</div>
									)}
									{!showCtaCopyButton && ctaCopyButton && (
										<div
											onClick={() => {
												copyCoupon(ctaCopyButton, index)
											}}
											class={`cursor-pointer flex justify-center text-dark text-sm font-semibold h-11 py-3 px-6 items-center gap-2 rounded-[300px] border transition-all
                                                 ${isCopied ? 'border border-dark bg-ice' : 'border-light-gray'}
                                            `}
										>
											<Icon id='CopyButtonCta' size={16} />
											<span>{isCopied ? 'Cupom copiado' : 'Copiar cupom'}</span>
										</div>
									)}
								</div>
							</div>
						</div>
						{!showRuleTextPromotion && (
							<div class='flex p-[10px] justify-center items-center rounded-[3px] bg-ice'>
								<p class='text-[#696968] font-normal text-xs'>
									{ruleTextPromotion}
								</p>
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
