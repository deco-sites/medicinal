import { useId } from 'site/sdk/useId.ts'
import Icon from 'site/components/ui/Icon.tsx'

interface Titles {
	/**
	 * @title Título superior
	 * @description Título superior, com a coloração avermelhada
	 * @format textarea
	 */
	upper?: string
	/**
	 * @title Título inferior
	 * @description Título inferior, com a coloração preta
	 * @format textarea
	 */
	lower?: string
}

/**
 * @title {{question}}
 */
interface Question {
	/**
	 * @title Pergunta
	 * @description Pergunta do FAQ
	 */
	question: string
	/**
	 * @title Resposta
	 * @description Resposta do FAQ
	 * @format html
	 */
	answer: string
}

interface Props {
	/**
	 * @title Títulos
	 * @description Títulos do FAQ
	 */
	titles: Titles
	/**
	 * @title Perguntas
	 * @description Perguntas e respostas do FAQ
	 */
	questions: Question[]
}

function CloseButton({ id }: { id: string }) {
	return (
		<label
			htmlFor={`close-${id}`}
			class='cursor-pointer col-start-1 row-start-1 hidden peer-checked/open:block z-10'
		/>
	)
}

function OpenButton({ id, index }: { id: string; index: number }) {
	return (
		<label
			htmlFor={`open-${id}-${index}`}
			style={{ display: 'var(--close-all, block)' }}
			class='cursor-pointer col-start-1 row-start-1 peer-checked/open:!hidden z-10'
		/>
	)
}

function CloseRadioState({ id }: { id: string }) {
	return (
		<input
			type='radio'
			id={`close-${id}`}
			name={id}
			class='peer/close hidden'
		/>
	)
}

function OpenRadioState({ id, index }: { id: string; index: number }) {
	return (
		<input
			type='radio'
			id={`open-${id}-${index}`}
			name={id}
			class='peer/open hidden'
		/>
	)
}

export default function FAQ({ titles, questions }: Props) {
	const id = useId()

	return (
		<div class='px-6 max-w-5xl mx-auto'>
			{titles.upper || titles.lower
				? (
					<h2 class='text-sm leading-[18px] md:text-lg md:leading-6 font-bold font-lemon mb-8 text-center'>
						{titles.upper
							? (
								<span class='bg-blue text-transparent bg-clip-text'>
									{titles.upper}
								</span>
							)
							: null}
						<br />
						{titles.lower || null}
					</h2>
				)
				: null}
			<div class='flex flex-col gap-2 justify-center'>
				<CloseRadioState id={id} />
				{questions.map(({ question, answer }, index) => (
					<div class="peer-checked/close:[--close-all:hidden] grid grid-rows-[auto_0fr] [&:has(>input[type='radio']:checked)]:grid-rows-[auto_1fr] transition-[grid-template-rows] duration-200 overflow-hidden relative group bg-ice rounded-[15px] text-xs leading-[18px] md:text-sm md:leading-[25px]">
						<OpenRadioState id={id} index={index} />
						<CloseButton id={id} />
						<OpenButton id={id} index={index} />
						<div
							class={'w-full h-fit col-start-1 row-start-1 cursor-pointer flex justify-between gap-3 items-center px-6 py-4 md:p-8 md:leading-[16px]' +
								' peer-checked/open:[&_[data-closed-icon]]:opacity-0 peer-checked/open:[&_[data-closed-icon]]:rotate-90' +
								' peer-checked/open:[&_[data-opened-icon]]:opacity-100 peer-checked/open:[&_[data-opened-icon]]:rotate-180'}
						>
							<h3 class='font-bold md:leading-4'>{question}</h3>
							<div class='relative size-5 shrink-0 text-red'>
								<Icon
									data-closed-icon
									id='PlusCircle'
									strokeWidth={1.5}
									size={20}
									class='transition-all absolute inset-0'
								/>
								<Icon
									data-opened-icon
									id='MinusCircle'
									strokeWidth={1.5}
									size={20}
									class='transition-all absolute inset-0 opacity-100 rotate-90'
								/>
							</div>
						</div>
						<div
							class='px-4 md:px-8 peer-checked/open:pb-6 invisible col-start-1 row-start-2 min-h-0 peer-checked/open:visible peer-checked/open:min-h-fit transition-all [&_ul]:list-disc [&_ul]:pl-6 max-w-[900px]'
							dangerouslySetInnerHTML={{ __html: answer }}
						>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
