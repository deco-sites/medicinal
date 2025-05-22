export interface Item {
	label: string
	href: string
}

interface Props {
	content?: Item[]
}

export default function ExtraLinks({ content = [] }: Props) {
	return (
		<>
			{content && content?.length > 0 && (
				<div class='flex flex-col gap-5 lg:gap-10'>
					{content.map((item) => <a class='uppercase text-sm' href={item.href}>{item.label}</a>)}
				</div>
			)}
		</>
	)
}
