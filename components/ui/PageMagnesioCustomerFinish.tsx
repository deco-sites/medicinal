import { type LoaderContext } from '@deco/deco';
import { AboutProduct } from 'site/components/ui/AboutProduct.tsx'
import { AboutGrid } from 'site/components/ui/AboutGrid.tsx'
import { AboutGrid2 } from 'site/components/ui/AboutGrid2.tsx'
import { Questions } from 'site/components/ui/Questions.tsx'
import Testimonials from 'site/components/ui/Testimonials.tsx'
import Stories from 'site/components/ui/Stories.tsx'
import { BannerInfoWithImage3 } from 'site/components/ui/BannerInfoWithImage3.tsx'
import PromoCoupon from 'site/islands/PromoCoupon.tsx'
import CTAFixoCustom from 'site/islands/CTAFixoCustom.tsx'

export interface Props {
  isMobile?: boolean;
}

function PageMagnesioCustomerFinish({ isMobile }: Props) {
  return (
    <div className="min-w-[375px] mb-[75px] lg:mb-[192px]">
      <AboutProduct />

      <AboutGrid
        isMobile={isMobile}
        title={() => (
          <>
            conheça a
            <br />
            <span className="fontWithGradient">
              fórmula perfeita
            </span>
          </>
        )}  
      />

      <AboutGrid2 isMobile={isMobile} />

      <Questions />

      <div
        style="background: linear-gradient(125deg, rgba(234, 198, 240, .3) 10%, rgba(253, 227, 206, 1) 100%);"
        className="relative flex items-center justify-center px-6 lg:px-0 pt-9 lg:pt-0 pb-2.5 lg:pb-0 rounded-t-[23px] lg:rounded-t-[60px] lg:rounded-b-[60px] lg:h-[300px] lg:mt-[200px]"
      >
        <img
          src="https://assets.decocache.com/true-source/12cdc460-0d27-482d-9e99-86d34c6a21cf/magnesio-inositol-relief-3.0-render.png"
          alt=""
          loading="lazy"
          width="100%"
          height="100%"
          className="lg:w-[598px] lg:h-[488px] lg:absolute"
        />
      </div>

      <div className="-mt-12 lg:mt-0 mb-12 lg:mb-20">
        <Testimonials
          title='Depoimentos de clientes felizes com os benefícios proporcionados pelo o True Magnésio'
          isMobile={isMobile || true}
          testimonials={[
            {
              authorName: 'Maria Clara',
              text: 'Depois de começar a usar o True Magnésio, minhas noites de sono nunca mais foram as mesmas. Agora, acordo revigorada e com energia de sobra para encarar todos os desafios do dia!',
              subscriptionTime: '38 anos',
              subscriptionTimeCustom: true
            },
            {
              authorName: 'Juliana Souza',
              text: 'Além de finalmente conseguir ter uma boa noite de sono, percebi uma grande melhora na minha disposição e na minha saúde como um todo. Recomendo para todas as mulheres que querem uma vida melhor!',
              subscriptionTime: '45 anos',
              subscriptionTimeCustom: true
            },
            {
              authorName: 'Carla Mendes, 52 anos',
              text: 'Sempre tive dificuldades para relaxar à noite, mas com o True Magnésio, consigo relaxar com mais facilidade e acordo me sentindo mais descansada. Sem contar que meu humor e minha concentração melhoraram muito!',
              subscriptionTime: '52 anos',
              subscriptionTimeCustom: true
            },
            {
              authorName: 'Ana Paula Ribeiro',
              text: 'Eu costumava acordar várias vezes durante a noite, mas desde que comecei a usar o True Magnésio, meu sono tem sido profundo e ininterrupto. Sinto-me muito mais equilibrada e com mais vitalidade ao longo do dia.',
              subscriptionTime: '41 anos',
              subscriptionTimeCustom: true
            },
            {
              authorName: 'Fernanda Lima',
              text: 'O True Magnésio Inositol Relief 3.0 realmente fez a diferença para mim. Notei não apenas uma melhoria no sono, mas também uma redução significativa no estresse e na ansiedade. Sinto-me mais calma e centrada.',
              subscriptionTime: '36 anos',
              subscriptionTimeCustom: true
            }
          ]}
        />
      </div>

      <Stories
        videos={[
          {
            url: 'https://storage.googleapis.com/truesource-files/videos/B%C3%A1rbara%20Davila.mp4',
            // url: 'https://www.youtube.com/embed/n-VH720dL0M',
            user: {
              name: 'Bárbara Davila - ES',
              instagram: '@barbaravdavila'
            }
          },
          {
            url: 'https://storage.googleapis.com/truesource-files/videos/Bianca%20Soares.mp4',
            // url: 'https://www.youtube.com/embed/Vd2k9K0PSzs',
            user: {
              name: 'Bianca Queiroz - ES',
              instagram: '@qbianca'
            }
          },
          {
            url: 'https://storage.googleapis.com/truesource-files/videos/Isabela%20Le%C3%A3o.mp4',
            // url: 'https://www.youtube.com/embed/hxwOgW8ZFfU',
            user: {
              name: 'Isabela Leão - SP',
              instagram: '@isabelaleaobc'
            }
          },
          {
            url: 'https://storage.googleapis.com/truesource-files/videos/Luciana%20Nogueira.mp4',
            // url: 'https://www.youtube.com/embed/Thh9IrI8gCE',
            user: {
              name: 'Luciana Nogueira - ES',
              instagram: '@luciananogueirann'
            }
          },
        ]}
        // youtube={true}
      >
        <>
          Veja os depoimentos de quem usa ou
          {' '}<br className="hidden lg:block" />
          prescreve{" "}
          <span className="fontWithGradient">magnésio + inositol relief 3.0</span>
        </>
      </Stories>

      <BannerInfoWithImage3 isMobile={isMobile} />

      <PromoCoupon isMobile={isMobile} coupon="TRUERELIEF" />

      <CTAFixoCustom />
    </div>
  )
}

export default PageMagnesioCustomerFinish;

export const loader = ({ ...props }: Props, req: Request, ctx: LoaderContext) => {
  const isMobile = ctx.device === 'mobile' || ctx.device === 'tablet';

  return { ...props, isMobile };
};