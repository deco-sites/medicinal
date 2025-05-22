import { Picture, Source } from 'apps/website/components/Picture.tsx';

interface PropsBannerImageFullWithInfo {
  isMobile?: boolean;
}

export function BannerImageFullWithInfo({ isMobile }: PropsBannerImageFullWithInfo) {
  const mobileSrc = 'https://assets.decocache.com/true-source/cb61040a-5adf-4bfb-a9c2-ad81dcf0bb70/sono-de-qualidade-mobile-min.jpg';
  const desktopSrc = 'https://assets.decocache.com/true-source/f6f1eb6e-62f6-4308-a0ee-5a15857c3df1/sono-de-qualidade-desktop.jpeg';

  const desktopHeight = 580;
  const mobileHeight = 650;

  const heightStyle = isMobile
    ? (mobileHeight ? `${mobileHeight}px` : 'auto')
    : (desktopHeight ? `${desktopHeight}px` : 'auto');

  return (
    <section className="max-w-[1340px] mx-auto relative rounded-[35px] overflow-hidden">
      <Picture preload={true}>
        <Source
          media='(min-width:768px)'
          src={desktopSrc}
          width={1340}
        />
        <Source
          media='(max-width: 767px)'
          src={mobileSrc ? mobileSrc : desktopSrc}
          width={1024}
        />
        <img
          className='object-cover object-center w-full h-full'
          alt='o sono de qualidade é um dos principais pilares da saúde'
          loading='eager'
          src={mobileSrc}
          style={{ height: heightStyle }}
        />
      </Picture>

      <div className="absolute top-12 lg:top-20 lg:left-[125px] w-full px-12 lg:px-0 md:max-w-[398px]">
        <h2 className="font-lemon-milk text-[16px] lg:text-[24px] leading-tight font-bold text-white uppercase mb-6">
          o sono de qualidade
          <br />
          é um dos principais
          <br />
          pilares da saúde 
        </h2>

        <p className="text-[14px] lg:text-[16px] leading-[1.6] lg:leading-[1.7] font-medium text-white">
          No entanto, <strong className="font-black">72% dos brasileiros</strong> sofrem com insônia, 
          de acordo com um estudo da Fundação Oswaldo Cruz. O uso excessivo de 
          ansiolíticos e soníferos é alarmante, sendo associado a um maior 
          risco de demência e mortalidade precoce.
          <br /><br />
          O excesso de informação, o estresse e o ritmo acelerado da vida 
          moderna contribuem para um ciclo vicioso de noites mal dormidas e 
          fadiga crônica. Mas a ciência agora traz uma solução inovadora.
        </p>
      </div>
    </section>
  )
}