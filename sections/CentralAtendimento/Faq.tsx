import { useId } from 'site/sdk/useId.ts'
import Icon from 'site/components/ui/Icon.tsx'
import { scriptAsDataURI } from 'apps/utils/dataURI.ts'

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
	/**
	 * @title Tag
	 * @description Tag para filtrar a pergunta
	 */
	tag?: string
}

export interface Props {
	/**
	 * @title Perguntas
	 * @description Perguntas e respostas do FAQ
	 */
	questions: Question[]
	/**
	 * @title Tags
	 * @description Tags para filtrar as perguntas
	 */
	tags?: string[]
}

function CloseButton({ id }: { id: string }) {
	return (
		<label
			htmlFor={`close-${id}`}
			class='peer-checked/open:block z-10 hidden col-start-1 row-start-1 cursor-pointer'
		/>
	)
}

function OpenButton({ id, index }: { id: string; index: number }) {
	return (
		<label
			htmlFor={`open-${id}-${index}`}
			style={{ display: 'var(--close-all, block)' }}
			class='z-10 peer-checked/open:!hidden col-start-1 row-start-1 cursor-pointer'
		/>
	)
}

function CloseRadioState({ id }: { id: string }) {
	return (
		<input
			type='radio'
			id={`close-${id}`}
			name={id}
			class='hidden peer/close'
		/>
	)
}

function OpenRadioState({ id, index }: { id: string; index: number }) {
	return (
		<input
			type='radio'
			id={`open-${id}-${index}`}
			name={id}
			class='hidden peer/open'
		/>
	)
}

export default function FAQ({
	questions = [
		{
			question: 'Como faço para acompanhar o meu pedido?',
			answer:
				'Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.',
		},
		{
			question: 'Qual é a política de devolução?',
			answer:
				'Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.',
		},
	],
	tags = ['Produtos True Source', 'Entrega', 'Devolução'],
}: Props) {
	const id = useId()
	const rootId = useId()
	tags = tags.length ? ['Todas as perguntas', ...tags] : []

	return (
		<div id={rootId}>
			{tags && tags.length > 0 && (
				<div class='flex flex-row gap-2 mb-6 md:mb-10 w-full overflow-x-scroll no-scrollbar'>
					{tags?.map((tag, index) => (
						<button
							data-tag={index === 0 ? 'none' : tag}
							data-active={index === 0}
							type='button'
							class="bg-white hover:bg-ice data-[active='true']:hover:bg-[#2A2A2A] data-[active='true']:bg-[#3C3C3B] shadow-sm px-3 h-[34px] rounded-full font-bold text-[14px] data-[active='true']:text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 capitalize shrink-0 border border-ice"
						>
							{tag}
						</button>
					))}
				</div>
			)}
			<div class='flex flex-col justify-center gap-2'>
				<CloseRadioState id={id} />
				{questions.map(({ question, answer, tag = 'none' }, index) => (
					<div
						data-tag={tag}
						class="relative peer-checked/close:[--close-all:hidden] grid grid-rows-[auto_0fr] [&:has(>input[type='radio']:checked)]:grid-rows-[auto_1fr] bg-ice rounded-[15px] text-xs md:text-sm leading-[18px] md:leading-[25px] transition-[grid-template-rows] duration-200 overflow-hidden group"
					>
						<OpenRadioState id={id} index={index} />
						<CloseButton id={id} />
						<OpenButton id={id} index={index} />
						<div
							class={'w-full h-fit col-start-1 row-start-1 cursor-pointer flex justify-between gap-3 items-center px-6 py-4 md:px-8 md:py-[34px] md:leading-[16px]' +
								' peer-checked/open:[&_[data-closed-icon]]:opacity-0 peer-checked/open:[&_[data-closed-icon]]:rotate-90' +
								' peer-checked/open:[&_[data-opened-icon]]:opacity-100 peer-checked/open:[&_[data-opened-icon]]:rotate-180'}
						>
							<h3 class='font-bold md:leading-4'>{question}</h3>
							<div class='relative text-red shrink-0 size-5'>
								<Icon
									data-closed-icon
									id='PlusCircle'
									strokeWidth={1.5}
									size={20}
									class='absolute inset-0 transition-all'
								/>
								<Icon
									data-opened-icon
									id='MinusCircle'
									strokeWidth={1.5}
									size={20}
									class='absolute inset-0 opacity-100 transition-all rotate-90'
								/>
							</div>
						</div>
						<div
							class='col-start-1 row-start-2 px-4 md:px-8 peer-checked/open:pb-6 [&_ul]:pl-6 max-w-[900px] min-h-0 peer-checked/open:min-h-fit transition-all invisible peer-checked/open:visible [&_ul]:list-disc'
							dangerouslySetInnerHTML={{ __html: answer }}
						>
						</div>
					</div>
				))}
			</div>
			<script defer src={scriptAsDataURI(script, rootId)} />
		</div>
	)
}

const script = (rootId: string) => {
	const root = document.getElementById(rootId)
	if (!root) return

	const buttonTags = root.querySelectorAll<HTMLButtonElement>(
		'button[data-tag]',
	)
	const questions = root.querySelectorAll<HTMLDivElement>('div[data-tag]')

	buttonTags.forEach((button) => {
		button.addEventListener('click', () => {
			const tag = button.getAttribute('data-tag')
			buttonTags.forEach((button) => {
				const isActive = button.getAttribute('data-tag') === tag
				button.setAttribute('data-active', `${isActive}`)
			})
			questions.forEach((question) => {
				if (tag === 'none') {
					question.style.display = 'grid'
					return
				}
				if (question.getAttribute('data-tag') !== tag) {
					question.style.display = 'none'
				} else {
					question.style.display = 'grid'
				}
			})
		})
	})
}
