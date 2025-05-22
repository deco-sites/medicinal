import type { ImageWidget, VideoWidget } from 'apps/admin/widgets.ts';
import Image from 'apps/website/components/Image.tsx';
import Icon from 'site/components/ui/Icon.tsx';
import { type LoaderContext } from "@deco/deco";
/**  @titleBy alt */
export interface Video {
    /**
     * @title Imagem para desktop
     */
    source: VideoWidget;
    /**
     * @title Altura do video para desktop
     * @description Deixar vazio para altura máxima da imagem
     */
    desktopHeight?: number;
    /**
     * @title Altura do video para mobile
     * @description Deixar vazio para altura máxima da imagem
     */
    mobileHeight?: number;
    /**
     * @title Escurecer Vídeo?
     * @default false
     */
    dark?: boolean;
}
const textPositionMapping = {
    left: 'text-left justify-start',
    center: 'text-center justify-center',
    right: 'text-left justify-end',
};
export interface Content {
    /** @title Texto de destaque acima do título */
    tag?: string;
    /** @title Imagem acima do título */
    image?: {
        src?: ImageWidget;
        width?: number;
        height?: number;
    };
    /**
     * @title Título
     * @format textarea
     */
    title?: string;
    /**
     * @title O título é um h1?
     */
    titleIsH1?: boolean;
    /**
     * @title Descrição
     * @format textarea
     */
    description?: string;
    /** @title Botão */
    cta?: {
        text: string;
        link: string;
    };
}
export interface Props {
    /** @title Video */
    video: Video;
    /** @title Posição do texto */
    textPosition?: 'left' | 'center' | 'right';
    /** @title Conteúdo do banner */
    content?: Content;
    /** @description Check this option when this banner is the biggest image on the screen for image optimizations */
    preload?: boolean;
    isMobile?: boolean;
}
function BannerInfoVideo({ video, isMobile, content, textPosition }: Props) {
    const { mobileHeight, desktopHeight, source, dark } = video;
    const Title = content?.titleIsH1 ? 'h1' : 'h2';
    const heightStyle = isMobile
        ? (mobileHeight ? `${mobileHeight}px` : 'auto')
        : (desktopHeight ? `${desktopHeight}px` : 'auto');
    return (<div class='w-full relative rounded-b-[20px] overflow-hidden'>
			<video playsinline autoplay loop muted controls={false} class='w-full h-full object-cover rounded-b-[20px]' style={{ height: heightStyle }}>
				<source src={source}></source>
			</video>
			{dark &&
            (<div class='absolute top-0 left-0 z-[1] w-full h-full' style={{
                    background: 'linear-gradient(83deg, rgba(47, 15, 0, 0.50) 15.55%, rgba(47, 15, 0, 0.00) 84.56%), linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%)',
                }}/>)}
			<div class={`absolute z-[1] top-0 w-full max-w-[1440px] mx-auto h-full flex items-center right-0 left-0 px-[30px] md:px-20 lg:px-[152px]
        ${textPosition ? textPositionMapping[textPosition] : 'text-start justify-start'}`}>
				<div class={`flex flex-col w-full 
        ${textPosition === 'center' ? 'items-center md:max-w-[50%]' : 'items-start max-w-[295px] md:max-w-[390px]'}`}>
					{content?.tag &&
            (<span class='font-inter mb-6 font-lemon-milk font-bold text-[18px] fontWithGradient'>
								{content.tag}
							</span>)}

					{content?.image &&
            (<Image src={content?.image.src || ''} width={content?.image.width || 0} height={content?.image.height || 0} alt='' class={'mb-6'}/>)}

					{content?.title &&
            (<Title class='font-lemon-milk font-bold text-ice mb-8 text-[24px] md:text-[40px] leading-[24px] md:leading-[42px]'>
								{content.title}
							</Title>)}

					{content?.description &&
            (<p class='font-inter text-sm md:text-[16px] font-medium leading-[22px] md:leading-[27px] text-ice mb-8'>
								{content.description}
							</p>)}

					{content?.cta && (<a href={content.cta.link} class='flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
                bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
                border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]'>
							{content.cta.text}
							<Icon id='ArrowRight' size={16} class='text-white group-hover:text-red'/>
						</a>)}
				</div>
			</div>
		</div>);
}
export default BannerInfoVideo;
export const loader = ({ ...props }: Props, req: Request, ctx: LoaderContext) => {
    const isMobile = ctx.device === 'mobile';
    return { ...props, isMobile };
};
