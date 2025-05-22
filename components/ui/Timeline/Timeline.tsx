import Icon from 'site/components/ui/Icon.tsx'
import Step, { type Props as StepProps } from 'site/components/ui/Timeline/Step.tsx'

interface Props {
	/**
	 * @title Título
	 * @description Título da seção
	 */
	title: string
	/**
	 * @title Passos
	 * @maxItems 3
	 * @minItems 1
	 */
	steps: StepProps[]
	/**
	 * @title Texto Rodapé
	 * @description Texto que aparece no rodapé
	 */
	footer?: string
}

export default function Timeline({ title, steps, footer }: Props) {
	return (
		<div class='flex flex-col items-center gap-6 px-5'>
			<h2 class='text-sm leading-[18px] md:text-lg md:leading-6 font-bold font-lemon text-center'>
				{title}
			</h2>
			<div class='flex justify-between w-full max-w-[1100px] flex-col md:flex-row'>
				{steps.map((step, index) => <Step {...step} index={index + 1} />)}
			</div>
			{footer && (
				<div class='max-w-[950px] w-full flex gap-8 justify-center items-center border-t border-t-light-gray-200 pt-8 pb-6 md:pt-14 md:pb-10'>
					<Icon
						id='Warning'
						strokeWidth={2}
						size={24}
						class='shrink-0 text-red'
					/>
					<p class='max-w-[549px] text-sm leading-6 font-medium text-dark'>
						{footer}
					</p>
				</div>
			)}
		</div>
	)
}
