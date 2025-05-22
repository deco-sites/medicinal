import Icon from 'site/components/ui/Icon.tsx'

/**
 * @title {{{label}}}
 */
export interface Props {
	/**
	 * @title Texto
	 * @format html
	 */
	label: string
	/**
	 * @ignore
	 */
	index: number
}

export default function Step({ label, index }: Props) {
	return (
		<>
			{index > 1 && (
				<div class='border-x-[12px] ml-[3px] md:ml-0 min-h-3 md:mt-2 md:border-y-[21px] md:border-x-0 w-[26px] h-full md:h-[43px] md:w-full border-ice bg-gray/30' />
			)}
			<div
				class={'flex gap-8 relative min-h-40 last:min-h-0 md:min-h-0 z-0' +
					' before:absolute before:z-[0] before:left-[3px] before:top-0 first:before:rounded-t-full last:before:h-4' +
					' before:border-x-[12px] before:border-ice' +
					' before:h-full before:w-[26px] before:bg-gray/30' +
					' md:flex-col md:gap-[53px] md:items-center' +
					' md:before:top-2 md:before:h-[43px] md:before:w-auto md:before:right-0 md:first:before:rounded-t-none md:before:left-0 md:first:before:left-1/2 md:last:before:right-1/2 md:before:border-x-0 md:before:border-y-[21px] md:last:before:h-[43px]'}
			>
				<div
					style={{
						'box-shadow':
							'0px 2.767256498336792px 2.2138051986694336px 0px #00000009, 0px 6.650102138519287px 5.32008171081543px 0px #0000000D, 0px 12.521552085876465px 10.017241477966309px 0px #00000011, 0px 22.3363094329834px 17.869047164916992px 0px #00000014, 0px 41.777610778808594px 33.422088623046875px 0px #00000018, 0px 100px 80px 0px #00000021',
					}}
					class='p-1 md:p-2 bg-ice rounded-full size-[32px] md:size-[59px] shrink-0 z-0'
				>
					<div class='size-full bg-blue flex justify-center items-center text-white rounded-full'>
						<Icon id='Check' strokeWidth={2} class='size-3 md:size-6' />
					</div>
				</div>
				<div class='flex flex-col gap-6 md:items-center'>
					<h3 class='text-transparent bg-blue bg-clip-text uppercase font-bold font-lemon text-sm leading-[18px] md:text-lg md:leading-6'>
						{index.toString().padStart(2, '0')}.
					</h3>
					<div
						class='font-medium md:w-[246px] md:text-center text-sm leading-[22px] md:text-base md:leading-[27px]'
						dangerouslySetInnerHTML={{ __html: label }}
					>
					</div>
				</div>
			</div>
		</>
	)
}
