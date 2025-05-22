import { Picture, Source } from 'apps/website/components/Picture.tsx';

export function CardInfoWithImage() {
  const mobileSrc = null;
  const desktopSrc = 'https://assets.decocache.com/true-source/a4ad5b9d-380e-49e6-b804-18f4ec61a096/produto-magnesio-3.0-min.png';

  return (
    <section class="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mx-auto max-w-[1340px] px-8 lg:px-20 pt-9 lg:pt-[70px] pb-12 lg:pb-24">
      <div>
        <Picture preload={true}>
          <Source
            media='(max-width: 767px)'
            fetchPriority="high"
            src={mobileSrc || desktopSrc}
            width={768}
          />
          <Source
            media='(min-width: 768px)'
            fetchPriority="high"
            src={desktopSrc}
            width={1192}
          />
          <img
            src={desktopSrc}
            alt="Banner unisul"
            loading="lazy"
            width="100%"
            height="100%"
          />
        </Picture>
      </div>
      <div className="lg:max-w-[416px]">
        <p className="text-[14px] lg:text-[18px] leading-[1.7] font-medium text-center lg:text-left text-dark">
          O <strong>True Magnésio Inositol Relief 3.0</strong> foi desenvolvido 
          para quem busca uma solução natural e eficaz para a qualidade do sono 
          e saúde geral.
          <br /><br />
          Validado pela ciência através de um estudo inédito feito pela Unisul, 
          é recomendado para homens e mulheres que sabem que uma boa noite de 
          descanso é essencial para um dia mais produtivo, equilibrado e cheio 
          de bem-estar.
        </p>
      </div>
    </section>
  )
}