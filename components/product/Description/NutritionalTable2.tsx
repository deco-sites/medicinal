import type { HTMLWidget } from 'apps/admin/widgets.ts'

/**
 * @titleBy title
 */
interface TableBodyProps {
	title: string
	value: string
	/**
   @title %VD 1
   */
	vD1: string
	/**
   @title %VD 2
   */
	vD2?: string
	/**
   @title %VD 3
   */
	vD3?: string
	/**
   @title %VD 4
   */
	vD4?: string
}

interface TableHeadProps {
	/**
   @title Title by title and value
   */
	title1: string
	/**
   @title Title for %VD 1
   */
	title2: HTMLWidget
	/**
   @title Title for %VD 2
   */
	title3?: HTMLWidget
	/**
   @title Title for %VD 3
   */
	title4?: HTMLWidget
	/**
   @title Title for %VD 3
   */
	title5?: HTMLWidget
}

interface Props {
	tableHeader?: TableHeadProps
	tableBody?: TableBodyProps[]
	description?: HTMLWidget
	ingredients?: HTMLWidget
	/**
	 * @default true
	 */
	showIngredients: boolean
	/**
   @default true
   */
	showTable: boolean
	color?: string
}

export default function NutritionalTable({
	tableHeader = {
		title1: 'Porção 0,5ml (5 gotas)',
		title2: '<p>%VD(*)</p><p>(7-11 meses)</p>',
		title3: '<p>%VD(*)</p><p>(1-6 anos)</p>',
		title4: '<p>%VD(*)</p><p>(7-10 anos)</p>',
	},
	tableBody = [{
		title: 'Colágeno Verisol®',
		value: '2,5g',
		vD1: '2,5%',
		vD2: '2,5%',
		vD3: '2,5%',
	}, {
		title: 'Proteína',
		value: '22g',
		vD1: '22',
		vD2: '22',
		vD3: '22',
	}, {
		title: 'Carboidratos',
		value: '5g',
		vD1: '5',
		vD2: '5',
		vD3: '5',
	}],
	ingredients =
		'Colágeno hidrolisado, peptídeos bioativos de colágeno hidrolisado com peso molecular médio de 2kDa (Verisol®), goma acácia, cacau alcalino lecitinado em pó, edulcorantes naturais stévia e taumatina.',
	description =
		'(*) % Valores Diários de referência com base em uma dieta de 2.000kcal ou 8.400kJ. Seus valores diários podem ser maiores ou menores, dependendo das suas necessidades energéticas. (**) Valores diários não estabelecidos.',
	showIngredients = true,
	showTable = true,
	color = '#3C3C3B',
}: Props) {
	return (
		<div style={{ background: color }}>
			<div
				class='flex flex-col lg:flex-row items-center py-24 lg:py-28 gap-8 lg:gap-0 px-8 lg:px-0'
				style={{
					background:
						'linear-gradient(72deg, rgba(210, 210, 210, 0.36) 9.7%, rgba(210, 210, 210, 0.00) 73.19%)',
				}}
			>
				{showIngredients && (
					<div class='w-full lg:w-1/2 flex items-center justify-center'>
						<div class='w-full lg:w-3/4 text-white'>
							<h2 class='text-2xl lg:text-4xl uppercase mb-3 font-bold font-lemon-milk'>
								INGREDIENTES
							</h2>
							<p
								class='text-sm lg:text-base leading-6 sm:leading-5'
								dangerouslySetInnerHTML={{ __html: ingredients }}
							/>
						</div>
					</div>
				)}
				{showTable && (
					<div class='w-full lg:w-1/2 flex flex-col items-center justify-center border-none lg:border-solid border-l border-[#f0f0ee33]'>
						<div class='w-full lg:w-3/4 border border-[#f0f0ee33] p-6 rounded-3xl'>
							<h3 class='text-lg text-white uppercase mb-2 font-bold font-lemon-milk'>
								Tabela Nutricional
							</h3>
							<table class='table-auto text-white text-xs lg:text-sm w-full'>
								<thead>
									<tr>
										<th
											colSpan={3}
											class='text-left pt-2'
										>
											{tableHeader.title1}
										</th>
										<th
											colSpan={1}
											class='text-left pt-2'
											dangerouslySetInnerHTML={{ __html: tableHeader.title2 }}
										/>
										{tableHeader.title3 && (
											<th
												colSpan={1}
												class='text-left pt-2'
												dangerouslySetInnerHTML={{ __html: tableHeader.title3 }}
											/>
										)}
										{tableHeader.title4 && (
											<th
												colSpan={1}
												class='text-left pt-2'
												dangerouslySetInnerHTML={{ __html: tableHeader.title4 }}
											/>
										)}
										{tableHeader.title5 && (
											<th
												colSpan={1}
												class='text-left pt-2'
												dangerouslySetInnerHTML={{ __html: tableHeader.title5 }}
											/>
										)}
									</tr>
								</thead>
								<tbody>
									{tableBody.map((item) => {
										return (
											<tr class='border-b border-[#f0f0ee33]'>
												{/^_{2,2}/.test(item.title)
													? (
														<>
															<td width={24} class='py-2' />
															<td class='py-2'>
																{item.title.replace(/^_{2,2}/, '')}
															</td>
														</>
													)
													: <td colSpan={2} class='py-2'>{item.title}</td>}
												<td class='py-2'>{item.value}</td>
												<td class='py-2'>{item.vD1}</td>
												{item.vD2 && <td class='py-2'>{item.vD2}</td>}
												{item.vD3 && <td class='py-2'>{item.vD3}</td>}
												{item.vD4 && <td class='py-2'>{item.vD4}</td>}
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
						<div
							class='w-full lg:w-3/4 text-sm mt-8 !text-white leading-6 sm:leading-5'
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
