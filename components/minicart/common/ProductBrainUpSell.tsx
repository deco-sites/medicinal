import useBuyProduct from 'site/sdk/useBuyProduct.ts'
import { useUI } from 'site/sdk/useUI.ts'
import Image from 'apps/website/components/Image.tsx'
import Loading from 'site/components/ui/Loading.tsx'

export default function ProductBrainUpSell() {
	const { displayCart } = useUI()

	const buyProduct = useBuyProduct({
		eventParams: { items: [] },
		productID: '3809',
		seller: '1',
		quantity: 1,
		onSuccess: () => {
			displayCart.value = true
		},
	})

	return (
		<>
			<div class='flex items-center gap-1 mb-2 pt-1 pb-1 pr-2 border-2 border-[#ccc] border-dashed'>
				<Image
					src='https://tfcucl.vtexassets.com/arquivos/ids/159585/Sem-Titulo-1.jpg'
					width={48}
					height={48}
					class='object-contain'
					alt='Kit 3 Sachês True Vegan'
				/>
				<div className='flex gap-2'>
					<div className='flex flex-wrap justify-between'>
						<a
							href='/brain-up-ready-to-drink-blueberry-269ml-true-source/p'
							class='font-bold text-sm font-inter text-[#3C3C3B] line-clamp-1'
						>
							Kit 3 Sachês True Vegan
						</a>
						<div className='flex flex-wrap gap-x-2 items-center'>
							<span className='text-xs text-dark'>
								R$ 39,90
							</span>
							{
								/* <span className='text-xs text-dark line-through'>
								R$ 32,70
							</span> */
							}
							{
								/* <span className='text-xs text-green font-bold'>
								R$ 31,06
							</span> */
							}
						</div>
					</div>
					<button
						type='button'
						onClick={buyProduct.add}
						class='flex justify-center items-center rounded text-xs sm:text-sm font-bold h-[32px] w-[120px] group/card bg-[#939491] text-white'
					>
						{buyProduct.loading.value ? <Loading /> : (
							<>
								Adicionar
							</>
						)}
					</button>
				</div>
			</div>
			<div className='flex mb-2 items-center w-full gap-2'>
				<span class='w-full h-[2px] bg-[#ccc]'></span>
				<div className='flex gap-2'>
					<span className='w-[2px] h-[10px] bg-[#ccc]'></span>
					<span className='w-[2px] h-[10px] bg-[#ccc]'></span>
				</div>
				<span class='w-full h-[2px] bg-[#ccc]'></span>
			</div>
		</>
	)
}
