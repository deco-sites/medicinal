import Icon, { AvailableIcons } from 'site/components/ui/Icon.tsx'
import ExtraLinks from 'site/components/footer/ExtraLinks.tsx'
import Collapsable from 'site/components/ui/Collapsable.tsx'

export type Item = {
	label?: string
	href: string
}

export type Section = {
	label?: string
	items: Item[]
}

export default function FooterItems(
	{ sections, institutionalItems }: {
		sections: Section[]
		institutionalItems: Item[]
	},
) {
	return (
		<>
			{sections.length > 0 && (
				<>
					{/* Tablet and Desktop view */}
					<ul
						className={'hidden lg:flex flex-row gap-6 lg:gap-10 lg:justify-between w-full lg:px-[72px]'}
					>
						{sections.map((section, index) => (
							<li
								className={index === 3 ? 'font-bold font-lemon-milk text-[13px]' : ''}
							>
								<div className='flex flex-col'>
									{section.label && (
										<span className='font-bold text-[13px] pb-[32px] font-lemon-milk'>
											{section.label}
										</span>
									)}
									<div className='flex gap-[32px]'>
										{/* Renderizando primeira coluna */}
										<ul className={'flex flex-col gap-5 text-sm leading-4'}>
											{section.items.slice(0, 7).map((item) => (
												<li>
													<a
														href={item.href}
														className='block hover:underline text-dark'
													>
														{item.label}
													</a>
												</li>
											))}
										</ul>
										{/* Renderizando segunda coluna se houver mais de 7 itens */}
										{section.items.length > 7 && (
											<ul className={'flex flex-col gap-5 text-sm leading-4'}>
												{section.items.slice(7, 14).map((item) => (
													<li>
														<a
															href={item.href}
															className='block hover:underline text-dark'
														>
															{item.label}
														</a>
													</li>
												))}
											</ul>
										)}
										{section.items.length > 14 && (
											<ul className={'flex flex-col gap-5 text-sm leading-4'}>
												{section.items.slice(14).map((item) => (
													<li>
														<a
															href={item.href}
															className='block hover:underline text-dark'
														>
															{item.label}
														</a>
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</li>
						))}
						<ul className={'flex flex-col gap-5 text-sm leading-4'}>
							{institutionalItems.map((item) => (
								<li>
									<a
										href={item.href}
										className='block hover:underline text-[13px] font-bold font-lemon-milk text-dark'
                    target={item.label === 'BLOG' ? '_blank' : ''}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</ul>

					{/* Mobile view */}
					<ul className='flex flex-col lg:hidden '>
						<li>
							<div className='flex flex-col'>
								<span className='font-bold text-[13px] pb-[32px] font-lemon-milk'>
									{sections[0].label}
								</span>
								<div className='flex gap-[32px]'>
									{/* Renderizando primeira coluna */}
									<ul className={'flex flex-col gap-5 text-sm'}>
										{sections[0].items.slice(
											0,
											Math.ceil(sections[0].items.length / 2),
										).map((item) => (
											<li>
												<a href={item.href} className='block text-dark'>
													{item.label}
												</a>
											</li>
										))}
									</ul>
									{/* Renderizando segunda coluna */}
									<ul className={'flex flex-col gap-5 text-sm'}>
										{sections[0].items.slice(
											Math.ceil(sections[0].items.length / 2),
										).map((item) => (
											<li>
												<a href={item.href} className='block text-dark'>
													{item.label}
												</a>
											</li>
										))}
									</ul>
								</div>
							</div>
						</li>

						<Collapsable
							class='w-full border-b border-light-gray'
							title={
								<div class='px-0 pb-[30px] pt-8 font-bold font-lemon-milk text-[13px] rounded-none flex items-center justify-between text-dark'>
									<span>
										{sections[1].label}
									</span>
									<Icon
										id='ChevronDown'
										size={16}
										class='rotate-0 text-neutral-5 group-open:rotate-180 transition-all ease-in-out duration-[400ms]'
									/>
								</div>
							}
						>
							<div class='flex flex-col gap-5 pb-5'>
								{sections[1].items.map((item) => (
									<li>
										<a href={item.href} class={'flex text-sm text-dark'}>
											{item.label}
										</a>
									</li>
								))}
							</div>
						</Collapsable>

						<Collapsable
							class='w-full border-b border-light-gray '
							title={
								<div class='px-0 pb-[30px] pt-8 font-bold font-lemon-milk text-[13px] rounded-none flex items-center justify-between text-dark'>
									<span>
										{sections[2].label}
									</span>
									<Icon
										id='ChevronDown'
										size={16}
										class='rotate-0 text-neutral-5 group-open:rotate-180 transition-all ease-in-out duration-[400ms]'
									/>
								</div>
							}
						>
							<div class='flex flex-col gap-5 pb-5'>
								{sections[2].items.map((item) => (
									<li>
										<a href={item.href} class={'flex text-sm text-dark'}>
											{item.label}
										</a>
									</li>
								))}
							</div>
						</Collapsable>

						<li>
							<div className='flex flex-col pt-[40px] pb-[32px]'>
								<div className='flex gap-[32px]'>
									<ul className={'flex flex-col gap-[14px]'}>
										{institutionalItems.map((item) => (
											<li>
												<a
													href={item.href}
													className='block text-sm font-bold font-lemon-milk text-dark'
												>
													{item.label}
												</a>
											</li>
										))}
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</>
			)}
		</>
	)
}
