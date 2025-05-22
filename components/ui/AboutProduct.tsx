import Icon from 'site/components/ui/Icon.tsx'

export function AboutProduct() {
  return (
    <>
      <div style="background: linear-gradient(125deg, rgba(234, 198, 240, .6) 10%, rgba(253, 227, 206, 1) 100%);">
        <div className="pt-10 lg:pt-14 lg:flex lg:justify-between max-w-[1060px] mx-auto">
          <div className="flex flex-col items-center lg:items-start mb-9 lg:mb-0 lg:min-w-[400px] lg:pt-14">
            <h2 className="font-lemon-milk text-[32px] lg:text-[40px] leading-[104%] font-bold text-center lg:text-left uppercase mb-9 lg:mb-11 fontWithGradient">
              o SEGREDO PARA
              <br />
              NOITES DE SONO
              <br />
              REPARADORAS E
              <br />
              DIAS com MAIS
              <br />
              disposição comprovado
              <br />
              cientificamente
            </h2>

            <a
              href="#cupom"
              className="flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full bg-transparent hover:!bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group border border-red hover:border-transparent fontWithGradient hover:fontWithGradient-not-hover cursor-pointer max-h-[40px]"
            >
              <span>quero melhorar meu sono</span>
              <Icon
                id="ArrowRight"
                size={16}
                class="text-red group-hover:text-white"
              />
            </a>
          </div>

          <div className="px-8 lg:px-0 max-w-[562px] relative z-10">
            <img
              src="https://assets.decocache.com/true-source/ce584e18-522d-4531-aada-031fe477b494/o-segredo-para-noites-de-sono-reparadoras-e-dias-com-mais-disposicao.png"
              alt=""
              loading="eager"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>

      <div className="rounded-t-[28px] lg:rounded-t-[70px] pt-[114px] lg:pt-[100px] -mt-[78px] lg:-mt-[170px] bg-white mb-10 lg:mb-24">
        <div className="max-w-[1060px] mx-auto">
          <div className="max-w-[344px] lg:max-w-full mx-auto pb-10 lg:pb-24">
            <p className="text-[14px] lg:text-[18px] leading-[160%] font-medium text-[#1e1e1e] text-center lg:text-left">
              Você já se pegou virando de um lado para o outro
              <br />
              na cama, desejando um descanso profundo e
              <br />
              restaurador que nunca parece vir?
            </p>
            <br />
            <br />
            <p className="text-[14px] lg:text-[18px] leading-[160%] font-medium text-[#1e1e1e] text-center lg:text-left">
              Com o tempo, noites mal dormidas se tornam frequentes, afetando
              humor, produtividade e bem-estar. Com o{" "}
              <strong className="font-black">
                Magnésio + Inositol Relief 3.0
              </strong>
              , você encontra uma solução que não só te ajuda a dormir melhor,
              mas também contribui para a saúde dos ossos, músculos, coração e
              intestinos.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-11 px-6 lg:px-0 mb-14 lg:mb-28 lg:relative">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcset="https://assets.decocache.com/true-source/745777f7-5ba6-4dfd-ab2b-e0d41a020e4c/e-para-voce-que-busca-d.jpeg"
              />
              <img
                src="https://assets.decocache.com/true-source/c42476cd-fd63-41ae-962b-db6a233b512c/e-para-voce-que-busca-m.jpeg"
                alt=""
                loading="lazy"
                width="100%"
                height="100%"
                className="rounded-[28px]"
              />
            </picture>

            <h3 className="font-lemon-milk text-[18px] lg:text-[24px] leading-none text-center font-bold uppercase fontWithGradient py-1 lg:text-dark lg:absolute !bg-transparent webkit-text-fill-reset">
              é para você que busca
            </h3>
          </div>

          <ul className="px-12 lg:grid lg:grid-cols-3 lg:gap-16">
            <li className="flex lg:flex-col gap-8 pb-8 lg:pb-0 border-b lg:border-b-0 lg:border-l border-solid border-[#D2D2D2] lg:pl-10">
              <div className="w-[76px] h-[76px] flex items-center justify-center bg-[#F0F0EE] rounded-lg">
                <svg
                  width="39"
                  height="37"
                  viewBox="0 0 39 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8246 2C12.2515 3.70772 11.9604 5.49093 11.9619 7.28497C11.9619 16.7855 19.9901 24.4874 29.8932 24.4874C32.3375 24.4913 34.7565 24.0132 37 23.0825C34.6759 29.9989 27.9128 35 19.9313 35C10.0283 35 2 27.2981 2 17.7976C2 10.7188 6.45594 4.63962 12.8246 2Z"
                    stroke="#ACACAC"
                    stroke-width="3"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p className="text-[14px] leading-[160%] font-500 text-[#1e1e1e] flex-1">
                <strong>Um sono profundo e restaurador:</strong> Sua fórmula de 
                alta absorção com magnésio bisglicinato promove relaxamento e 
                melhora a qualidade do sono.
              </p>
            </li>

            <li className="flex lg:flex-col gap-8 py-8 lg:py-0 border-b lg:border-b-0 lg:border-l border-solid border-[#D2D2D2] lg:pl-10">
              <div className="w-[76px] h-[76px] flex items-center justify-center bg-[#F0F0EE] rounded-lg">
                <svg
                  width="34"
                  height="29"
                  viewBox="0 0 34 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.9979 9.19448e-07C17.3358 -0.000357352 17.6651 0.103996 17.9382 0.29799C18.2113 0.491985 18.4141 0.765578 18.5173 1.07926L25.5 22.3516L28.2327 14.0283C28.3354 13.7146 28.5378 13.4408 28.8105 13.2464C29.0832 13.052 29.4122 12.9472 29.75 12.947H32.4062C32.8289 12.947 33.2343 13.1106 33.5332 13.402C33.8321 13.6934 34 14.0885 34 14.5006C34 14.9126 33.8321 15.3078 33.5332 15.5992C33.2343 15.8905 32.8289 16.0542 32.4062 16.0542H30.9124L27.0173 27.9219C26.914 28.2351 26.7114 28.5081 26.4388 28.7019C26.1661 28.8956 25.8374 29 25.5 29C25.1626 29 24.8339 28.8956 24.5612 28.7019C24.2886 28.5081 24.086 28.2351 23.9827 27.9219L17.0106 6.6827L12.1444 21.7012C12.044 22.0106 11.8467 22.2817 11.5802 22.4763C11.3137 22.6708 10.9913 22.7792 10.6585 22.786C10.3256 22.7929 9.99885 22.6979 9.72415 22.5145C9.44946 22.3311 9.24059 22.0684 9.12687 21.7633L6.44087 14.5627L6.29212 14.9936C6.18647 15.3029 5.98372 15.5719 5.71257 15.7626C5.44142 15.9533 5.11561 16.0561 4.78125 16.0563H1.59375C1.17106 16.0563 0.765685 15.8926 0.466799 15.6013C0.167912 15.3099 0 14.9147 0 14.5027C0 14.0906 0.167912 13.6954 0.466799 13.4041C0.765685 13.1127 1.17106 12.949 1.59375 12.949H3.63375L4.862 9.35081C4.96612 9.04433 5.1656 8.77709 5.43271 8.58622C5.69982 8.39535 6.02129 8.29034 6.35244 8.28579C6.68359 8.28123 7.00798 8.37735 7.28051 8.5608C7.55303 8.74424 7.76017 9.00589 7.87313 9.30938L10.5187 16.4043L15.4806 1.08755C15.5822 0.772655 15.784 0.49749 16.0568 0.301945C16.3297 0.106401 16.6593 0.000641234 16.9979 9.19448e-07Z"
                    fill="#ACACAC"
                  />
                </svg>
              </div>
              <p className="text-[14px] leading-[160%] font-500 text-[#1e1e1e] flex-1">
                <strong>Uma vida mais equilibrada e saudável:</strong> Ativos
                que auxiliam na saúde do coração, do sistema digestivo e
                nervoso.
              </p>
            </li>

            <li className="flex lg:flex-col gap-8 py-8 lg:py-0 border-b lg:border-b-0 lg:border-l border-solid border-[#D2D2D2] lg:pl-10">
              <div className="w-[76px] h-[76px] flex items-center justify-center bg-[#F0F0EE] rounded-lg">
                <svg
                  width="36"
                  height="32"
                  viewBox="0 0 36 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 30.4763C3.10595 24.4813 6.42381 20.9842 11.9536 19.985C17.4833 18.9859 20.8012 17.4871 21.9071 15.4888M30.2018 2C27.9899 5.99668 23.5661 7.99502 16.9303 7.99502C13.8505 7.99502 10.8968 9.10034 8.71907 11.0678C6.54131 13.0353 5.31785 15.7038 5.31785 18.4863C5.31785 21.2688 6.54131 23.9373 8.71907 25.9047C10.8968 27.8722 13.8505 28.9776 16.9303 28.9776C20.1167 29.0693 23.2622 28.2468 25.9904 26.6084C28.7187 24.97 30.9142 22.5851 32.3143 19.7391C33.7143 16.8931 34.2597 13.7065 33.885 10.5606C33.5104 7.41465 32.2316 4.44259 30.2018 2Z"
                    stroke="#ACACAC"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p className="text-[14px] leading-[160%] font-500 text-[#1e1e1e] flex-1">
                <strong>Fórmula Limpa:</strong> Livre de aditivos e corantes
                artificiais, glúten, lactose e açúcar, garantindo uma opção
                segura e eficaz para o seu bem-estar.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}