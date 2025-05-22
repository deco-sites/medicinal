import { Picture, Source } from 'apps/website/components/Picture.tsx';

export function InfoWithSliderGrid() {
  return (
    <section id="info-with-slider-grid" className="py-10 lg:py-20 mx-auto max-w-[1340px] mb-12 lg:mb-24">          
      <div className="flex flex-col items-center mb-8">
        <div className='w-20 h-[3px] bg-brand' />

        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='38'
          height='39'
          viewBox='0 0 38 39'
          fill='none'
          className='block my-8'
        >
          <path
            d='M34.2749 30.0191L26.5035 22.2277L23.372 19.0881L26.5035 15.9484L34.2749 8.15703C33.6744 7.31301 32.9998 6.51022 32.2457 5.75418C31.4916 4.99813 30.6881 4.32182 29.849 3.71973L22.0776 11.5111L18.9461 14.6508L15.8145 11.5111L8.04309 3.71698C7.20124 4.31907 6.40052 4.99538 5.64641 5.75143C4.89231 6.50748 4.21773 7.31301 3.61719 8.15428L11.3886 15.9457L14.5202 19.0853L11.3886 22.225L3.61719 30.0164C4.21773 30.8604 4.89231 31.6632 5.64641 32.4192C6.40052 33.1753 7.20398 33.8516 8.04309 34.4537L15.8145 26.6623L18.9461 23.5226L22.0776 26.6623L29.849 34.4537C30.6909 33.8516 31.4916 33.1753 32.2457 32.4192C32.9998 31.6632 33.6744 30.8576 34.2749 30.0164V30.0191Z'
            fill='#E4003F'
          />
          <path
            d='M37.72 15.866H22.1608V0.263929C21.1325 0.0907255 20.0795 0 19.0018 0C17.9241 0 16.8711 0.0907255 15.8428 0.263929V15.8632H0.280829C0.108071 16.8942 0.0175781 17.9499 0.0175781 19.0304C0.0175781 20.1108 0.108071 21.1665 0.280829 22.1975H15.84V37.7968C16.8684 37.97 17.9214 38.0607 18.999 38.0607C20.0767 38.0607 21.1297 37.97 22.1581 37.7968V22.1975H37.7173C37.89 21.1665 37.9805 20.1108 37.9805 19.0304C37.9805 17.9499 37.89 16.8942 37.7173 15.8632L37.72 15.866Z'
            fill='#E9530E'
          />
        </svg>

        <h2 className="max-w-[326px] md:max-w-[620px] font-lemon-milk text-[16px] lg:text-[24px] leading-tight font-bold uppercase text-center">
          em parceria com
          <span>{' '} a unisul - Universidade do Sul de Santa Catarina, {' '}</span> 
          realizamos um estudo inédito para entender os efeitos do 
          <span>{' '} magnésio + inositol relief 3.0</span> na qualidade do sono.
        </h2>
      </div>

      <p className="text-[14px] lg:text-[16px]  leading-none font-medium text-center text-dark mb-11  ">
        Os resultados foram surpreendentes:
      </p>

      <div id="slider" className="mb-20">
        <div
          id="slides"
          className="flex overflow-x-scroll no-scrollbar px-8 lg:px-0"
        >
          <div
            id="slide"
            className="w-full max-w-[210px] h-[400px] relative flex justify-center overflow-hidden mr-5 flex-shrink-0 lg:flex-shrink snap-start rounded-2xl"  
          >
            <img
              src="https://assets.decocache.com/true-source/09a51402-4a1a-4644-9406-6e9a4aa463c2/42-dos-participantes-tiveram-aumento-da-qualidade-do-sono.jpeg"
              alt="42% dos participantes tiveram aumento da qualidade do sono"
              loading="lazy"
              style="all: unset;"
              className="object-cover object-center"
            />
            
            <div 
              id="info"
              style="background: linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(255, 255, 255, 0) 90%);"
              className="absolute left-0 bottom-0 right-0 h-[270px] flex flex-col justify-end gap-[14px] pl-6 pb-[10px] pr-8 lg:pr-6"  
            >
              <span className="w-fit p-[10px] bg-white rounded-xl font-lemon-milk text-[18px] leading-none font-bold text-center text-[#E9530E]">
                42%
              </span>
              <span className="text-[13px] leading-tight font-bold text-white h-[88px]">
                dos participantes tiveram aumento da qualidade do sono
              </span>
            </div>
          </div>
          <div 
            id="slide"
            className="w-full max-w-[210px] h-[400px] relative flex justify-center overflow-hidden mr-5 flex-shrink-0 lg:flex-shrink snap-start rounded-2xl"  
          >
            <img
              src="https://assets.decocache.com/true-source/7851f05e-6231-4b6a-b642-7c0e33a0e778/64-dos-participantes-se-sentiram-mais-dispostos.jpeg"
              alt="62% dos participantes se sentiram mais dispostos"
              loading="lazy"
              style="all: unset;"
              className="object-cover object-center"
            />

            <div 
              id="info"
              style="background: linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(255, 255, 255, 0) 90%);"
              className="absolute left-0 bottom-0 right-0 h-[270px] flex flex-col justify-end gap-[14px] pl-6 pb-[10px] pr-8 lg:pr-6"  
            >
              <span className="w-fit p-[10px] bg-white rounded-xl font-lemon-milk text-[18px] leading-none font-bold text-center text-[#E9530E]">
                62%
              </span>
              <span className="text-[13px] leading-tight font-bold text-white h-[88px]">
                dos participantes se sentiram mais dispostos
              </span>
            </div>
          </div>

          <div 
            id="slide"
            className="w-full max-w-[210px] h-[400px] relative flex justify-center overflow-hidden mr-5 flex-shrink-0 lg:flex-shrink snap-start rounded-2xl"  
          >
            <img
              src="https://assets.decocache.com/true-source/d4d20499-92e6-4150-ba5c-f07462388c0b/30-dos-participantes-pegaram-no-sono-mais-rapido.jpeg"
              alt="30% dos participantes pegaram no sono mais rápido"
              loading="lazy"
              style="all: unset;"
              className="object-cover object-center"
            /> 
            
            <div 
              id="info"
              style="background: linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(255, 255, 255, 0) 90%);"
              className="absolute left-0 bottom-0 right-0 h-[270px] flex flex-col justify-end gap-[14px] pl-6 pb-[10px] pr-8 lg:pr-6"  
            >
              <span className="w-fit p-[10px] bg-white rounded-xl font-lemon-milk text-[18px] leading-none font-bold text-center text-[#E9530E]">
                30%
              </span>
              <span className="text-[13px] leading-tight font-bold text-white h-[88px]">
                dos participantes pegaram no sono mais rápido
              </span>
            </div>
          </div>

          <div 
            id="slide"
            className="w-full max-w-[210px] h-[400px] relative flex justify-center overflow-hidden mr-5 flex-shrink-0 lg:flex-shrink snap-start rounded-2xl"  
          >
            <img
              src="https://assets.decocache.com/true-source/e82fbf42-527e-4f09-8a4f-a687241b2f89/40-dos-participantes-reduziram-ou-interromperam-o-uso-de-medicamentos-para-dormir.jpeg"
              alt="40% dos participantes reduziram ou interromperam o uso de medicamentos para dormir"
              loading="lazy"
              style="all: unset;"
              className="object-cover object-center"
            /> 
            
            <div 
              id="info"
              style="background: linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(255, 255, 255, 0) 90%);"
              className="absolute left-0 bottom-0 right-0 h-[270px] flex flex-col justify-end gap-[14px] pl-6 pb-[10px] pr-8 lg:pr-6"  
            >
              <span className="w-fit p-[10px] bg-white rounded-xl font-lemon-milk text-[18px] leading-none font-bold text-center text-[#E9530E]">
                40%
              </span>
              <span className="text-[13px] leading-tight font-bold text-white h-[88px]">
                dos participantes reduziram ou interromperam o uso de medicamentos para dormir
              </span>
            </div>
          </div>

          <div 
            id="slide"
            className="w-full max-w-[210px] h-[400px] relative flex justify-center overflow-hidden mr-5 flex-shrink-0 lg:flex-shrink snap-start rounded-2xl"  
          >
            <img
              src="https://assets.decocache.com/true-source/5e75b375-97c7-481a-843f-cccb666ff3ee/15-de-aumento-no-fluxo-sanguineo-do-cortex--pre-frontal-melhorando-a-funcao-cognitiva.jpeg"
              alt="15% de aumento no fluxo sanguíneo do córtex  pré-frontal, melhorando a função cognitiva"
              loading="lazy"
              style="all: unset;"
              className="object-cover object-center"
            /> 
            
            <div 
              id="info"
              style="background: linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(255, 255, 255, 0) 90%);"
              className="absolute left-0 bottom-0 right-0 h-[270px] flex flex-col justify-end gap-[14px] pl-6 pb-[10px] pr-8 lg:pr-6"  
            >
              <span className="w-fit p-[10px] bg-white rounded-xl font-lemon-milk text-[18px] leading-none font-bold text-center text-[#E9530E]">
                15%
              </span>
              <span className="text-[13px] leading-tight font-bold text-white h-[88px]">
                de aumento no fluxo sanguíneo do córtex  pré-frontal, melhorando a função cognitiva
              </span>
            </div>
          </div>

          <div 
            id="slide"
            className="w-full max-w-[210px] h-[400px] relative flex justify-center overflow-hidden flex-shrink-0 lg:flex-shrink snap-start rounded-2xl"  
          >
            <img
              src="https://assets.decocache.com/true-source/707611fe-f766-4e18-82d0-f91e0daac235/30-de-aumento-no-fluxo-sanguineo-cerebral-otimizando-o-transporte-de-oxigenio-e-nutrientes.png"
              alt="30% de aumento no fluxo sanguíneo cerebral, otimizando o transporte de oxigênio e nutrientes"
              loading="lazy"
              style="all: unset;"
              className="object-cover object-center"
            /> 
            
            <div 
              id="info"
              style="background: linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(255, 255, 255, 0) 90%);"
              className="absolute left-0 bottom-0 right-0 h-[270px] flex flex-col justify-end gap-[14px] pl-6 pb-[10px] pr-8 lg:pr-6"  
            >
              <span className="w-fit p-[10px] bg-white rounded-xl font-lemon-milk text-[18px] leading-none font-bold text-center text-[#E9530E]">
                30%
              </span>
              <span className="text-[13px] leading-tight font-bold text-white h-[88px]">
                de aumento no fluxo sanguíneo cerebral, otimizando o transporte de oxigênio e nutrientes
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[14px] lg:text-[18px] leading-[1.7] font-medium text-center text-dark px-[42px] mb-10 lg:mb-[76px]">
        O estudo foi conduzido com 60 participantes, divididos em dois grupos 
        durante 30 dias.
        <br />
        Os resultados demonstraram melhorias significativas em vários 
        indicadores do <strong>Índice de Pittsburgh</strong>, 
        <br className="hidden lg:block" />
        um dos principais métodos de avaliação da qualidade do sono.
      </p>

      <div className="relative rounded-[35px] overflow-hidden">
        <Picture preload={true}>
          <Source
            media='(min-width: 1024px)'
            fetchPriority="high"
            src="https://assets.decocache.com/true-source/07ad4850-b2b1-4314-9e10-9513b1dc5e7e/alem-disso-os-participantes-relataram-melhorias-na-saude-mental-e-emocional-D.png"
            width={1440}
            height={580}
          />
          <img 
            className="object-cover w-full h-full"
            loading="eager"
            src="https://assets.decocache.com/true-source/e7196e4c-a532-4c29-9f68-a3a1761f591e/alem-disso-os-participantes-relataram-melhorias-na-saude-mental-e-emocional-M.jpeg"
            alt="Banner unisul"
            style={{ height: '580px' }}
          />
        </Picture>

        <div className="absolute top-12 w-full px-12 lg:top-[86px] lg:left-32 lg:max-w-[400px] lg:px-0">
          <h3 className="font-lemon-milk text-[16px] lg:text-[24px] leading-tight uppercase font-bold text-white mb-6">
            <span className="lg:text-[#1E1E1E]">
              Além disso, os participantes relataram melhorias na
            </span> 
            {' '} saúde mental e emocional
          </h3>

          <ul>
            <li className="text-[14px] lg:text-[18px] leading-[1.6] font-medium text-white lg:text-[#1e1e1e]">
              <strong className="font-black">12%</strong> de melhora na saúde mental;
              <br /><br />
            </li>
            <li className="text-[14px] lg:text-[18px] leading-[1.6] font-medium text-white lg:text-[#1e1e1e]">
              <strong className="font-black">57%</strong> de melhora nos aspectos emocionais;
              <br /><br />
            </li>
            <li className="text-[14px] lg:text-[18px] leading-[1.6] font-medium text-white lg:text-[#1e1e1e]">
              <strong className="font-black">20%</strong> sentiram que o corpo físico deixou de ser uma limitação;
              <br /><br />
            </li>
            <li className="text-[14px] lg:text-[18px] leading-[1.6] font-medium text-white lg:text-[#1e1e1e]">
              <strong className="font-black">20%</strong> relataram redução das dores corporais.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}