import Image from 'apps/website/components/Image.tsx'
import Icon from 'site/components/ui/Icon.tsx'
import Button from 'site/components/ui/VideoModal/Button.tsx'
import Modal from 'site/components/ui/VideoModal/Modal.tsx'
import type { ImageWidget } from 'apps/admin/widgets.ts'
import { useId } from 'site/sdk/useId.ts'
import { Picture, Source } from 'apps/website/components/Picture.tsx'

interface ImageProps {
	/**
	 * @title Imagem
	 */
	src: ImageWidget
	/**
	 * @title Largura
	 * @description Largura da imagem
	 */
	width: number
	/**
	 * @title Altura
	 * @description Altura da imagem
	 */
	height: number
}

interface Thumbnail {
	/**
	 * @title Desktop
	 * @description Imagem otimizada para telas maiores
	 */
	desktop: ImageProps
	/**
	 * @title Mobile
	 * @description Imagem otimizada para telas menores
	 */
	mobile: ImageProps
	/**
	 * @title Alt
	 * @description Texto alternativo da imagem
	 */
	alt: string
	/**
	 * @title Pré-carregar
	 * @description Define se a imagem deve ser pré-carregada, melhorando a performance (ative apenas se a imagem for a primeira a ser exibida na página)
	 * @default false
	 */
	preload?: boolean
}

export interface Props {
	thumbnail: Thumbnail
	/**
	 * @format uri
	 */
	videoUrl: string
}

export default function Video({
	thumbnail = {
		alt: 'placeholder',
		desktop: {
			height: 400,
			width: 600,
			src: 'https://fakeimg.pl/600x400',
		},
		mobile: {
			height: 400,
			width: 600,
			src: 'https://fakeimg.pl/600x400',
		},
	},
	videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
}: Props) {
	const id = useId()

	return (
		<div class='relative px-6 md:px-10 max-w-[1400px] mx-auto text-terra-clara'>
			<Picture preload={thumbnail.preload}>
				<Source media='(max-width: 768px)' {...thumbnail.mobile} />
				<Source media='(min-width: 769px)' {...thumbnail.desktop} />
				<img
					{...thumbnail.desktop}
					alt={thumbnail.alt}
					loading={thumbnail.preload ? 'eager' : 'lazy'}
					class='w-full object-cover h-full rounded-[15px] md:rounded-[35px]'
				/>
			</Picture>
			<Button
				modalId={id}
				class='absolute inset-0 flex-col gap-6 flex justify-center items-center'
			>
				<Icon id='PlayCircle' strokeWidth={2} class='size-10 md:size-14' />
				<span class='font-lemon font-bold text-sm leading-[18px] md:text-lg md:leading-6'>
					Assista ao vídeo
				</span>
			</Button>
			<Modal url={videoUrl} modalId={id} />
		</div>
	)
}
