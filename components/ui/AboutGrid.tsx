import { JSX } from 'preact'

interface PropsAboutGrid {
	title: () => JSX.Element
	isMobile?: boolean
}

export function AboutGrid({ isMobile, title }: PropsAboutGrid) {
	return (
		<div className='max-w-[1135px] mx-auto mb-12 lg:mb-16'>
			<h2 className=' text-[18px] lg:text-[24px] leading-[104%] lg:leading-none text-center uppercase text-dark font-bold mb-11 lg:mb-16'>
				{title()}
			</h2>

			<ul className='grid grid-cols-1 lg:grid-cols-2 gap-y-3.5 lg:gap-y-9 lg:gap-x-7 px-5 lg:px-0 lg:mb-16'>
				<li class='flex items-center relative bg-[#FFC23F] rounded-[23px] overflow-hidden'>
					<img
						className='object-cover w-full h-full mix-blend-multiply'
						loading='eager'
						src='https://assets.decocache.com/true-source/647e9c53-794c-43d5-ab13-1ae098036359/magnesio-e-inositol.png'
						alt=''
						style={{
							height: `${isMobile ? '197px ' : '280px'}`,
							opacity: '82%',
						}}
					/>
					<div className='absolute px-12 w-full'>
						<h4 className=' text-[16px] lg:text-[24px] leading-none font-bold uppercase text-dark mb-6'>
							magnésio e inositol
						</h4>
						<p className='text-[14px] lg:text-[18px] leading-[1.6] font-medium text-[#1e1e1e]'>
							Contribuem para a saúde dos ossos, músculos, coração, intestino e sistema nervoso,
							melhorando a comunicação neuronal.
						</p>
					</div>
				</li>

				<li class='flex items-center relative bg-[#CB9BFF] rounded-[23px] overflow-hidden'>
					<img
						className='object-cover w-full h-full mix-blend-multiply'
						loading='eager'
						src='https://assets.decocache.com/true-source/f8173311-9c3e-4bb1-a1cd-9442572cf92f/melatonina.png'
						alt=''
						style={{
							height: `${isMobile ? '161px ' : '280px'}`,
							opacity: '61%',
						}}
					/>
					<div className='absolute px-12 w-full'>
						<h4 className=' text-[16px] lg:text-[24px] leading-none font-bold uppercase text-dark mb-6'>
							melatonina
						</h4>
						<p className='text-[14px] lg:text-[18px] leading-[1.6] font-medium text-[#1e1e1e]'>
							Auxilia no relaxamento, ajudando você a adormecer e proporcionando um sono reparador.
						</p>
					</div>
				</li>

				<li class='flex items-center relative bg-[#7CC0FF] rounded-[23px] overflow-hidden'>
					<img
						className='object-cover w-full h-full mix-blend-multiply'
						loading='eager'
						src='https://assets.decocache.com/true-source/91c72f42-25f8-4cda-829c-dffbfbd7761c/taurina.png'
						alt=''
						style={{
							height: `${isMobile ? '142px ' : '202px'}`,
							opacity: '81%',
						}}
					/>
					<div className='absolute px-12 w-full'>
						<h4 className=' text-[16px] lg:text-[24px] leading-none font-bold uppercase text-dark mb-6'>
							taurina
						</h4>
						<p className='text-[14px] lg:text-[18px] leading-[1.6] font-medium text-[#1e1e1e]'>
							Atua como um agente inibitório do Sistema Nervoso Central, promovendo relaxamento.
						</p>
					</div>
				</li>

				<li class='flex items-center relative bg-[#D1D1D1] rounded-[23px] overflow-hidden'>
					<img
						className='object-cover w-full h-full mix-blend-multiply'
						loading='eager'
						src='https://assets.decocache.com/true-source/66daad04-57bc-4a8a-acfe-2d5deebe39ac/glicina.png'
						alt=''
						style={{ height: `${isMobile ? '142px ' : '202px'}` }}
					/>
					<div className='absolute px-12 w-full'>
						<h4 className=' text-[16px] lg:text-[24px] leading-none font-bold uppercase text-dark mb-6'>
							glicina
						</h4>
						<p className='text-[14px] lg:text-[18px] leading-[1.6] font-medium text-[#1e1e1e]'>
							Beneficia a saúde gastrointestinal, especialmente a mucosa intestinal.
						</p>
					</div>
				</li>
			</ul>

			{
				/* <div className="hidden lg:block max-w-[800px] mx-auto">
        <div className="flex items-center gap-8 pb-[60px] border-b border-solid border-[#D2D2D2]">
          <div className="flex items-center justify-center w-[76px] h-[76px] rounded-lg bg-[#F0F0EE]">
            <svg
              width="38"
              height="34"
              viewBox="0 0 38 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.94369 26.1659C5.44607 23.4196 4.76357 19.9454 5.06744 16.8416C5.40219 13.4178 6.96382 10.1336 8.99669 8.43877C11.7137 6.17514 14.5672 5.24564 17.0437 4.79064C18.2498 4.58472 19.4643 4.43128 20.6837 4.33077C21.3402 4.26902 22.0048 4.20727 22.6434 4.04802C23.9889 3.71164 25.3166 3.16564 26.4102 2.29789C26.9107 1.89977 27.4177 1.49677 28.0921 1.57152C28.3345 1.59849 28.5677 1.67968 28.7745 1.80908C28.9812 1.93848 29.1562 2.11277 29.2864 2.31902C34.4864 10.5529 33.7016 19.2938 29.3579 24.7993C27.1886 27.5471 24.1417 29.4646 20.5878 30.0318C17.4873 30.5241 14.0992 29.9733 10.6851 28.1858C10.3851 29.1182 10.1623 30.0736 10.0188 31.0425C9.95784 31.4692 9.72986 31.8542 9.38504 32.1127C9.04022 32.3713 8.6068 32.4823 8.18013 32.4213C7.75346 32.3603 7.3685 32.1324 7.10992 31.7875C6.85134 31.4427 6.74034 31.0093 6.80132 30.5826C7.00282 29.177 7.38632 27.6804 7.94369 26.1659ZM17.6287 7.98702C18.7727 7.77739 19.8468 7.67664 20.8901 7.57427C21.7416 7.49302 22.5996 7.40852 23.4316 7.20052C24.8328 6.85721 26.1747 6.3062 27.4128 5.56577C30.9521 12.2559 29.9641 18.7835 26.8067 22.7875C25.1037 24.9455 22.7621 26.395 20.0792 26.8208C17.6693 27.2043 14.8792 26.7818 11.9054 25.1535C13.7124 21.4696 16.6667 17.9385 20.5131 16.0161C20.8988 15.8235 21.1922 15.4855 21.3287 15.0765C21.4652 14.6676 21.4337 14.2211 21.2411 13.8354C21.0484 13.4497 20.7104 13.1563 20.3015 13.0197C19.8925 12.8832 19.446 12.9147 19.0603 13.1074C14.8223 15.2264 11.5756 18.8908 9.46469 22.7989C8.42307 21.0926 8.11107 19.1085 8.30282 17.1569C8.57744 14.3489 9.86282 11.9488 11.0767 10.9348C13.2347 9.13589 15.5097 8.37702 17.6303 7.98702H17.6287Z"
                fill="#B6B6B6"
              />
            </svg>
          </div>
          <p className="text-[14px] leading-none font-medium text-[#1e1e1e]">
            <strong>Fórmula limpa:</strong> Sem corantes e adoçantes
            artificiais, sem glúten e lactose, livre de açúcares e polióis.
          </p>
        </div>
      </div> */
			}
		</div>
	)
}
