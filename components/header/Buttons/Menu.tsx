import { useUI } from 'site/sdk/useUI.ts'
import Icon from 'site/components/ui/Icon.tsx'

export default function MenuButton() {
	const { displayMenu } = useUI()

	return (
		<button
			type='button'
			class="bg-brand rounded-full flex justify-center items-center size-[36px] group-data-[micro-header='true']/header:size-[24px]"
			aria-label='open menu'
			onClick={() => {
				displayMenu.value = !displayMenu.value
			}}
		>
			<Icon
				id='Bars3'
				size={16}
				class="size-[16px] group-data-[micro-header='true']/header:size-[12px] "
			/>
		</button>
	)
}
