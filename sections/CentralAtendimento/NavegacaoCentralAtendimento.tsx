export default function MenuCentralAtendimento() {
	return (
		<>
			<div class='sticky top-0 z-20 flex h-[104px] w-full flex-row overflow-hidden bg-white px-0 py-4  sm:h-[432px] sm:w-[275px] sm:flex-col sm:border-l-2  sm:border-solid sm:border-red sm:px-14 sm:py-10'>
				<div class='flex h-full w-full flex-row gap-6 sm:flex-col sm:gap-8'>
					<a
						href='https://deco-sites-pave1.deno.dev/fale-conosco'
						class='group flex items-center gap-4 border-b-[2px] border-b-red sm:border-b-0'
					>
						<div class='flex items-center justify-center gap-4'>
							<svg
								class='h-4 w-4'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M12 18H12.01M7 2H17C18.1046 2 19 2.89543 19 4V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2Z'
									stroke='#3C3C3B'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</div>

						<p class='font-inter font-normal text-[14px] text-nowrap bg-clip-text text-[#3C3C3B] group-hover:bg-gradient-to-r group-hover:from-[#E4003F] group-hover:to-[#E9530E] group-hover:text-transparent'>
							Fale Conosco
						</p>
					</a>

					<a
						href='https://deco-sites-pave1.deno.dev/perguntas-frequentes'
						class='group flex items-center gap-4 sm:border-b-0'
					>
						<div class='flex items-center justify-center'>
							<svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M6.06004 6.00003C6.21677 5.55448 6.52614 5.17877 6.93334 4.93946C7.33394 4.70402 7.78919 4.62716 8.22396 4.6909C8.7074 4.76178 9.1655 5.00652 9.49497 5.40041C9.86125 5.83831 10.0343 6.42058 9.83748 7.00004C9.5817 7.75293 8.79285 8.38465 7.94671 8.6667M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z'
									stroke='#3C3C3B'
									stroke-width='1.5'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</div>
						<p class='font-inter font-normal text-[14px] text-nowrap bg-clip-text text-[#3C3C3B] group-hover:bg-gradient-to-r group-hover:from-[#E4003F] group-hover:to-[#E9530E] group-hover:text-transparent'>
							Perguntas Frequentes
						</p>
					</a>

					<a
						href='https://deco-sites-pave1.deno.dev/politica-de-privacidade'
						class='group flex items-center gap-4 sm:border-b-0'
					>
						<div class='flex items-center justify-center'>
							<svg
								width='16'
								height='14'
								viewBox='0 0 16 14'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5.33337 5.66667L8.00004 8.33333L10.6667 5.66667M2.66671 1H13.3334C13.687 1 14.0261 1.14048 14.2762 1.39052C14.5262 1.64057 14.6667 1.97971 14.6667 2.33333V6.33333C14.6667 8.10144 13.9643 9.79714 12.7141 11.0474C11.4638 12.2976 9.76815 13 8.00004 13C7.12456 13 6.25765 12.8276 5.44882 12.4925C4.63998 12.1575 3.90505 11.6664 3.286 11.0474C2.03575 9.79714 1.33337 8.10144 1.33337 6.33333V2.33333C1.33337 1.97971 1.47385 1.64057 1.7239 1.39052C1.97395 1.14048 2.31309 1 2.66671 1Z'
									stroke='#3C3C3B'
									stroke-width='1.5'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</div>

						<p class='font-inter font-normal text-[14px] text-nowrap bg-clip-text text-[#3C3C3B] group-hover:bg-gradient-to-r group-hover:from-[#E4003F] group-hover:to-[#E9530E] group-hover:text-transparent'>
							Política de Privacidade
						</p>
					</a>

					<a
						href='https://deco-sites-pave1.deno.dev/troca-e-devolucao'
						class='group flex items-center gap-4 sm:border-b-0'
					>
						<div class='flex items-center justify-center'>
							<svg
								width='16'
								height='14'
								viewBox='0 0 16 14'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M0.666626 5.66667H4.66663M0.666626 5.66667L3.75996 2.76001C4.47646 2.04315 5.36287 1.51948 6.3365 1.23786C7.31012 0.956237 8.33922 0.925844 9.32777 1.14952C10.3163 1.37319 11.2321 1.84363 11.9896 2.51696C12.7472 3.19028 13.3218 4.04453 13.66 5.00001M0.666626 5.66667V1.66667M15.3333 12.3333V8.33333M15.3333 8.33333L12.24 11.24C11.5235 11.9569 10.637 12.4805 9.66342 12.7622C8.6898 13.0438 7.6607 13.0742 6.67215 12.8505C5.6836 12.6268 4.76783 12.1564 4.01027 11.4831C3.25271 10.8097 2.67807 9.95549 2.33996 9.00001M15.3333 8.33333H11.3333'
									stroke='#3C3C3B'
									stroke-width='1.5'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</div>
						<p class='font-inter font-normal text-[14px] text-nowrap bg-clip-text text-[#3C3C3B] group-hover:bg-gradient-to-r group-hover:from-[#E4003F] group-hover:to-[#E9530E] group-hover:text-transparent'>
							Troca e Devolução
						</p>
					</a>

					<a
						href='https://deco-sites-pave1.deno.dev/politica-de-uso'
						class='group flex items-center gap-4 sm:border-b-0'
					>
						<div class='flex items-center justify-center'>
							<svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M14.6667 7.38662V7.99995C14.6659 9.43756 14.2004 10.8364 13.3396 11.9878C12.4788 13.1393 11.2689 13.9816 9.89028 14.3892C8.51166 14.7968 7.03821 14.7479 5.68969 14.2497C4.34116 13.7515 3.18981 12.8307 2.40735 11.6247C1.62488 10.4186 1.25323 8.99199 1.34783 7.55749C1.44242 6.12299 1.99818 4.7575 2.93223 3.66467C3.86628 2.57183 5.12856 1.81021 6.53083 1.49338C7.9331 1.17656 9.40022 1.32151 10.7134 1.90662M14.6667 2.66663L8.00004 9.33996L6.00004 7.33996'
									stroke='#3C3C3B'
									stroke-width='1.5'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</div>
						<p class='font-inter font-normal text-[14px] text-nowrap bg-clip-text text-[#3C3C3B] group-hover:bg-gradient-to-r group-hover:from-[#E4003F] group-hover:to-[#E9530E] group-hover:text-transparent'>
							Política de Uso
						</p>
					</a>

					<a
						href='https://deco-sites-pave1.deno.dev/politica-de-entrega'
						class='group flex items-center gap-4 sm:border-b-0'
					>
						<div class='flex items-center justify-center'>
							<svg
								width='16'
								height='14'
								viewBox='0 0 16 14'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M10.6666 9.66667V1H0.666626V9.66667H10.6666ZM10.6666 9.66667H15.3333V6.33333L13.3333 4.33333H10.6666V9.66667ZM5.33329 11.3333C5.33329 12.2538 4.5871 13 3.66663 13C2.74615 13 1.99996 12.2538 1.99996 11.3333C1.99996 10.4129 2.74615 9.66667 3.66663 9.66667C4.5871 9.66667 5.33329 10.4129 5.33329 11.3333ZM14 11.3333C14 12.2538 13.2538 13 12.3333 13C11.4128 13 10.6666 12.2538 10.6666 11.3333C10.6666 10.4129 11.4128 9.66667 12.3333 9.66667C13.2538 9.66667 14 10.4129 14 11.3333Z'
									stroke='#3C3C3B'
									stroke-width='1.5'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</div>
						<p class='font-inter font-normal text-[14px] text-nowrap bg-clip-text text-[#3C3C3B] group-hover:bg-gradient-to-r group-hover:from-[#E4003F] group-hover:to-[#E9530E] group-hover:text-transparent'>
							Política de Entrega
						</p>
					</a>

					<a
						href='https://deco-sites-pave1.deno.dev/frete-gratis'
						class='group flex items-center gap-4 sm:border-b-0'
					>
						<div class='flex items-center justify-center'>
							<svg
								width='14'
								height='16'
								viewBox='0 0 14 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M7.66663 1.33337H2.99996C2.64634 1.33337 2.3072 1.47385 2.05715 1.7239C1.8071 1.97395 1.66663 2.31309 1.66663 2.66671V13.3334C1.66663 13.687 1.8071 14.0261 2.05715 14.2762C2.3072 14.5262 2.64634 14.6667 2.99996 14.6667H11C11.3536 14.6667 11.6927 14.5262 11.9428 14.2762C12.1928 14.0261 12.3333 13.687 12.3333 13.3334V6.00004M7.66663 1.33337V6.00004H12.3333M7.66663 1.33337L12.3333 6.00004'
									stroke='#3C3C3B'
									stroke-width='1.5'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</div>
						<p class='font-inter font-normal text-[14px] text-nowrap bg-clip-text text-[#3C3C3B] group-hover:bg-gradient-to-r group-hover:from-[#E4003F] group-hover:to-[#E9530E] group-hover:text-transparent'>
							Política de Frete Grátis
						</p>
					</a>

					<a
						href='https://deco-sites-pave1.deno.dev/politica-de-pagamento'
						class='group flex items-center gap-4 sm:border-b-0'
					>
						<div class='flex items-center justify-center'>
							<svg
								width='10'
								height='16'
								viewBox='0 0 10 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5 0.666626V15.3333M8.33333 3.33329H3.33333C2.71449 3.33329 2.121 3.57913 1.68342 4.01671C1.24583 4.45429 1 5.04779 1 5.66663C1 6.28546 1.24583 6.87896 1.68342 7.31654C2.121 7.75413 2.71449 7.99996 3.33333 7.99996H6.66667C7.28551 7.99996 7.879 8.24579 8.31658 8.68338C8.75417 9.12096 9 9.71445 9 10.3333C9 10.9521 8.75417 11.5456 8.31658 11.9832C7.879 12.4208 7.28551 12.6666 6.66667 12.6666H1'
									stroke='#3C3C3B'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</div>
						<p class='font-inter font-normal text-[14px] text-nowrap bg-clip-text text-[#3C3C3B] group-hover:bg-gradient-to-r group-hover:from-[#E4003F] group-hover:to-[#E9530E] group-hover:text-transparent'>
							Política de Pagemento
						</p>
					</a>
				</div>
			</div>
		</>
	)
}
