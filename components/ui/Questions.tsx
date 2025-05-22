import Icon from 'site/components/ui/Icon.tsx'

export function Questions() {
  return (
    <div className="mb-20 mx-auto max-w-[1340px]">
      <h2 className="font-lemon-milk text-[18px] lg:text-[24px] leading-[104%] font-bold text-center fontWithGradient py-1 uppercase mb-12 lg:mb-14">
        talvez você esteja
        <br />
        se perguntando
      </h2>

      <ul className="flex px-12 lg:px-0 overflow-x-scroll no-scrollbar gap-4 mb-16 lg:mb-20">
        <li className="flex-shrink-0 lg:flex-shrink w-full max-w-[300px] lg:max-w-full p-10 rounded-[10px] border border-solid border-[#d2d2d2]">
          <h4 className="font-lemon-milk text-[18px] leading-tight font-bold uppercase text-dark mb-6">
            Já tentei de tudo para melhorar meu sono e nada funcionou.
          </h4>

          <p className="text-[14px] font-medium leading-[1.6] text-dark">
            O True Magnésio Inositol Relief 3.0 é diferente de qualquer outro 
            suplemento que você já experimentou. Sua fórmula premium é 
            cientificamente desenvolvida para otimizar a absorção do magnésio e 
            maximizar seus benefícios, garantindo resultados reais e duradouros.
          </p>
        </li>

        <li className="flex-shrink-0 lg:flex-shrink w-full max-w-[300px] lg:max-w-full p-10 rounded-[10px] border border-solid border-[#d2d2d2]">
          <h4 className="font-lemon-milk text-[18px] leading-tight font-bold uppercase text-dark mb-6">
            Tenho medo de efeitos colaterais.
          </h4>

          <p className="text-[14px] font-medium leading-[1.6] text-dark">
            Nosso suplemento é 100% natural, sem aditivos químicos ou 
            conservantes artificiais, minimizando o risco de efeitos colaterais. 
            Além disso, é formulado especialmente para mulheres, atendendo às 
            necessidades específicas do seu corpo.
          </p>
        </li>

        <li className="flex-shrink-0 lg:flex-shrink w-full max-w-[300px] lg:max-w-full p-10 rounded-[10px] border border-solid border-[#d2d2d2]">
          <h4 className="font-lemon-milk text-[18px] leading-tight font-bold uppercase text-dark mb-6">
            Eu já me acostumei com noites mal dormidas.
          </h4>

          <p className="text-[14px] font-medium leading-[1.6] text-dark">
            Noites mal dormidas não precisam ser sua nova realidade. Imagine 
            acordar revigorada, cheia de energia e pronta para encarar o dia. 
            Com o True Magnésio Inositol Relief 3.0, você pode transformar essa 
            visão em realidade.
          </p>
        </li>
      </ul>

       <a
        href="#cupom"
        className="flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px] mx-auto"
      >
        <span>quero mais disposição</span>
        <Icon
          id="ArrowRight"
          size={16}
          class="text-white group-hover:text-red"
        />
      </a>
    </div>
  )
}