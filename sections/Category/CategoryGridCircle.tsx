import Image from 'apps/website/components/Image.tsx'

import type { ImageWidget } from 'apps/admin/widgets.ts'

interface ICollection {
	image: ImageWidget
	label: string
}

interface Props {
	title: string
	collections: ICollection[]
}

export default function CategoryGridCircle() {
	return (
		<>
			<div
				dangerouslySetInnerHTML={{
					__html: `
        <style>
          [id="1877790422-0"] {
            display: none
          }
          [id="3454325197-0"] + section {
            display: none;
          }
        </style>
      `,
				}}
			/>
			<div className='py-12 mx-auto w-full max-w-[1440px]'>
				<h2 className='font-bold font-lemon text-center text-dark text-sm md:text-lg uppercase leading-5 md:leading-6 tracking-[-0.01em] mb-8'>
					Leve 3 & Pague 2: escolha seu presente grátis
				</h2>
				<ul className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-8 lg:px-0 lg:max-w-[70%] lg:mx-auto'>
					<li>
						<a
							href='https://www.truesource.com.br/carnavaltrue/classic'
							class='flex flex-col items-center gap-4'
						>
							<figure>
								<Image
									class='w-full'
									src='https://tfcucl.vtexassets.com/assets/vtex.file-manager-graphql/images/0fc58ca2-5b6f-44ef-85b3-8b919c4572dd___86ccf1392a36c65884c3c6e60e28c46b.jpg'
									alt='classic'
									width={300}
									loading='lazy'
								/>
							</figure>
						</a>
					</li>
					<li>
						<a
							href='https://www.truesource.com.br/carnavaltrue/plus'
							class='flex flex-col items-center gap-4'
						>
							<figure>
								<Image
									class='w-full'
									src='https://tfcucl.vtexassets.com/assets/vtex.file-manager-graphql/images/c28f6e4c-194c-47be-9ba3-049ddc0e9785___3bf95780c4d75407fb8b4b9fc32eedd5.jpg'
									alt='plus'
									width={300}
									loading='lazy'
								/>
							</figure>
						</a>
					</li>
					<li>
						<a
							href='https://www.truesource.com.br/carnavaltrue/premium'
							class='flex flex-col items-center gap-4'
						>
							<figure>
								<Image
									class='w-full'
									src='https://tfcucl.vtexassets.com/assets/vtex.file-manager-graphql/images/7b91f335-0cea-4fd5-be99-3da1256523a5___961fa1b7ac2c52c0a7bd105aafc3adaa.jpg'
									alt='premium'
									width={300}
									loading='lazy'
								/>
							</figure>
						</a>
					</li>
					<li>
						<a
							href='https://www.truesource.com.br/carnavaltrue/exclusive'
							class='flex flex-col items-center gap-4'
						>
							<figure>
								<Image
									class='w-full'
									src='https://tfcucl.vtexassets.com/assets/vtex.file-manager-graphql/images/3b9428f8-f390-4d6c-a185-2194e9691399___d821960a5aaa792b133563a9c2354764.jpg'
									alt='exclusive'
									width={300}
									loading='lazy'
								/>
							</figure>
						</a>
					</li>
				</ul>
			</div>
		</>
	)
}
