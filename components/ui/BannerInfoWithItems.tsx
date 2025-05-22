import type { ImageWidget, VideoWidget } from 'apps/admin/widgets.ts';
import { Picture, Source } from 'apps/website/components/Picture.tsx';
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
export interface Content {
    /** @title Texto de destaque acima do título */
    tag?: string;
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
    /** @title Botão de cta */
    cta?: {
        text: string;
        link: string;
    };
}
export interface Props {
    /** @title Video */
    video: Video;
    /** @title Conteúdo do banner */
    content?: Content;
    /** @title Items que ficam ao lado do banner */
    items?: string[];
    /** @description Check this option when this banner is the biggest image on the screen for image optimizations */
    preload?: boolean;
    isMobile?: boolean;
}
function BannerInfoWithItems({ isMobile, content, items, video }: Props) {
    const { source, mobileHeight, desktopHeight, dark } = video;
    const Title = content?.titleIsH1 ? 'h1' : 'h2';
    const heightStyle = isMobile
        ? (mobileHeight ? `${mobileHeight}px` : 'auto')
        : (desktopHeight ? `${desktopHeight}px` : 'auto');
    return (<div class='w-full relative rounded-b-[20px] overflow-hidden'>
			<video playsInline autoplay loop muted controls={false} class='w-full h-full object-cover rounded-b-[20px]' style={{ height: heightStyle }}>
				<source src={source}></source>
			</video>
			{dark &&
            (<div class='absolute top-0 left-0 z-[1] w-full h-full' style={{
                    background: 'linear-gradient(83deg, rgba(47, 15, 0, 0.50) 15.55%, rgba(47, 15, 0, 0.00) 84.56%), linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%)',
                }}/>)}
			<div class={'absolute top-0 w-full max-w-[1440px] mx-auto h-full grid grid-rows-[auto_auto_40px] md:grid-rows-1 md:grid-cols-2 place-content-center md:items-center right-0 left-0 text-left md:justify-start px-[17px] md:px-20 lg:px-[182px] z-[1]'}>
				<div class={'flex flex-col items-start w-full max-w-[441px]'}>
					{content?.tag &&
            (<span class='font-inter mb-6 font-lemon-milk font-bold text-sm leading-[18px] md:text-[18px] fontWithGradient'>
								{content.tag}
							</span>)}

					{content?.title &&
            (<Title class='font-lemon-milk font-bold text-ice mb-8 text-[24px] md:text-[40px] leading-[24px] md:leading-[42px] max-w-[337px] md:max-w-full'>
								{content.title}
							</Title>)}

					{content?.description &&
            (<p class='font-inter text-sm md:text-[16px] font-medium leading-[22px] md:leading-[27px] text-ice mb-8'>
								{content.description}
							</p>)}

					{content?.cta && (<a href={content.cta.link} class='hidden md:flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
                bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
                border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]'>
							{content.cta.text}
							<Icon id='ArrowRight' width={14} height={10} class='text-white group-hover:text-red'/>
						</a>)}
				</div>
				<div class='flex flex-col md:flex-row items-center gap-x-4 h-full'>
					{items?.map((item) => (<div class='grid grid-cols-[auto_1fr] md:grid-cols-1 md:grid-rows-[auto_1fr] items-center border-b last:border-b-0 md:last:border-b md:border border-ice md:rounded-[20px] first:pt-0 md:first:pt-6 py-6 md:px-6 text-sm md:text-[16px] text-ice leading-[22px] md:leading-[19px] font-medium md:font-bold gap-6 w-full md:w-[185px] 
            md:h-[185px]'>
							<Icon id='CheckCircle' size={24} class='text-red md:text-ice'/>
							<span>
								{item}
							</span>
						</div>))}
				</div>
				{content?.cta && (<a href={content.cta.link} class='flex md:hidden items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
                bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
                border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px] whitespace-nowrap'>
						{content.cta.text}
						<Icon id='ArrowNarrowRight' width={14} height={10} class='text-white group-hover:text-red'/>
					</a>)}
			</div>
		</div>);
}
export default BannerInfoWithItems;
export const loader = ({ ...props }: Props, req: Request, ctx: LoaderContext) => {
    const isMobile = ctx.device === 'mobile';
    return { ...props, isMobile };
};
