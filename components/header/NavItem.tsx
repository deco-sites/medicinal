import Image from 'apps/website/components/Image.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import type { ImageWidget } from 'apps/admin/widgets.ts'
import { SendEventOnClick } from 'site/components/Analytics.tsx'
import { useId } from 'site/sdk/useId.ts'

/** @titleBy name */
export interface Children {
	name: string
	url: string
	isBold?: boolean
}

/** @titleBy name */
export interface INavItem {
	/** @title Texto */
	name: string
	/** @title Link */
	url: string
	/** @title Filhos */
	children?: Children[]
	/** @title Imagem */
	image?: {
		src: ImageWidget
		alt: string
	}
	/** @title Item possui destaque? */
	ishighlighted?: boolean
}

interface Props {
	item: INavItem
}

function NavItem({ item }: Props) {
	const { url, name, children, image, ishighlighted } = item
	const id = useId()

	const event = {
		name: 'click_menu',
		params: {
			category: name,
		},
	} as unknown

	return (
		<li class='flex items-center md:last:pr-0 last:pr-4 md:first:pl-0 first:pl-4 group'>
			<ul class='flex justify-between items-center nav-item-custom'>
				<a
					id={id}
					href={url}
					class={`flex items-center gap-2 font-bold text-xs md:text-sm uppercase h-[25px] md:h-[40px] rounded-full text-dark border border-transparent whitespace-nowrap ${
						children && children.length > 0
							? 'has-submenu px-6 group-hover:border-blue group-hover:bg-white group-hover:text-blue'
							: ''
					} ${ishighlighted ? 'bg-blue px-6 text-white group-hover:text-blue' : ''}`}
				>
					{name}
					{children && children.length > 0 && (
						<Icon
							id='ChevronDown'
							size={20}
							class='group-hover:text-blue group-hover:rotate-180 group-first:text-white md:block hidden text-dark'
						/>
					)}
				</a>

				<SendEventOnClick id={id} event={event} />
			</ul>

			{children && children.length > 0 && (
				<div class="group-data-[micro-header='true']/header:top-[48px] md:group-hover:block top-[calc(100%_-_12px)] right-0 left-0 z-50 absolute justify-center items-start gap-6 hidden shadow-md py-8 rounded-b-[20px] w-full bg-white">
					<div class='flex justify-between items-start mx-auto border-red border-l border-solid max-w-[1360px]'>
						<ul class='flex flex-col px-[32px] lg:w-[377px]'>
							{children.slice(0, 8).map((node) => (
								<li class='border-Stroke hover:bg-[#f0f0ee] hover:px-[16px] py-[13px] border-b border-solid hover:rounded-[8px] duration-300 ease-in-out group/icon'>
									<a class='flex justify-between items-center' href={node.url}>
										<span
											class={`text-sm leading-[22px] text-dark font-medium ${
												node.isBold &&
												'uppercase font-bold  text-[13px] leading-[17px]'
											} `}
										>
											{node.name}
										</span>
										<Icon
											id='BannerArrowRight'
											size={16}
											class='group-hover/icon:text-red text-dark'
										/>
									</a>
								</li>
							))}
						</ul>
						{children.length > 8 && (
							<ul class='flex flex-col lg:w-[377px]'>
								{children.slice(8, 16).map((node) => (
									<li class='border-Stroke hover:bg-[#f0f0ee] hover:px-[16px] py-[13px] border-b border-solid hover:rounded-[8px] duration-300 ease-in-out group/icon'>
										<a
											class='flex justify-between items-center'
											href={node.url}
										>
											<span
												class={`text-sm leading-[22px] text-dark font-medium ${
													node.isBold &&
													'uppercase font-bold  text-[13px] leading-[17px]'
												} `}
											>
												{node.name}
											</span>
											<Icon
												id='BannerArrowRight'
												size={16}
												class='group-hover/icon:text-red text-dark'
											/>
										</a>
									</li>
								))}
							</ul>
						)}
						<ul class='px-[32px]'>
							{image && (
								<Image
									class='rounded-[20px] cover'
									src={image.src}
									alt={image.alt}
									width={526}
									height={392}
									loading='lazy'
								/>
							)}
						</ul>
					</div>
				</div>
			)}
		</li>
	)
}

export default NavItem
