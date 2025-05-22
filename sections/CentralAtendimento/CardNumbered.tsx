/**
 * @title {{any}}
 */
export interface Props {
	/**
	 * @title Texto
	 * @format html
	 */
	text: string
	/**
	 * @ignore
	 */
	index: number
}

export default function CardNumbered({ text, index }: Props) {
	return (
		<div class='flex flex-col justify-start gap-2 p-6 border border-light-gray rounded-xl w-full h-auto'>
			<div class='flex flex-col gap-4'>
				<div class='flex justify-center items-center bg-gradient-to-r from-[#E4003F] to-[#E9530E] rounded-full w-8 h-8'>
					<p class='font-bold text-inter text-white'>{index + 1}</p>
				</div>
				<div
					class='[&_ol]:pl-6 [&_ul]:pl-6 text-dark text-sm leading-[24px] [&_ol]:list-decimal [&_ul]:list-disc'
					dangerouslySetInnerHTML={{ __html: text }}
				/>
			</div>
		</div>
	)
}
