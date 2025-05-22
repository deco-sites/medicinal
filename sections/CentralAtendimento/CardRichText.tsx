import type { HTMLWidget } from 'apps/admin/widgets.ts'

export interface Props {
	/**
	 * @title Texto
	 * @format html
	 */
	text: HTMLWidget
	/**
	 * @title Largura do container
	 */
	containerWidth?: number
}

const DEFAULT_TEXT =
	'<p><span style="font-size: 36pt;" data-mce-style="font-size: 36pt;"><strong>Rich Text</strong></span></p><p><span style="font-size: 24pt;" data-mce-style="font-size: 24pt;"><strong>Rich Text</strong></span></p><p><span style="font-size: 18pt;" data-mce-style="font-size: 18pt;"><strong>Rich Text</strong></span></p><p><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;"><strong>Rich Text</strong></span></p>'

export default function RichText(
	{ text = DEFAULT_TEXT, containerWidth }: Props,
) {
	return (
		<div class='flex flex-col gap-6 p-8 lg:p-16 border border-light-gray rounded-xl w-full h-auto text-[14px] text-dark text-sm leading-[24.36px]'>
			<div
				class='break-words'
				dangerouslySetInnerHTML={{ __html: text }}
				style={{
					maxWidth: containerWidth ? containerWidth : 1440,
					margin: '0 auto',
				}}
			>
			</div>
		</div>
	)
}
