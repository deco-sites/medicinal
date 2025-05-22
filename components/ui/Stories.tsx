import { useState, useRef } from 'preact/hooks'
import { JSX } from 'preact'

interface Video {
  url: string;
  thumbs?: string;
  user?: {
    name: string;
    profession?: string;
    instagram: string;
  }
}
interface PropsStories {
  children: JSX.Element;
  videos: Video[];
  youtube?: boolean;
}

export default function Stories({ children, videos, youtube = false }: PropsStories) {
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    if (currentPlaying !== null && currentPlaying !== index) {
      const previousVideo = videoRefs[currentPlaying].current;
      if (previousVideo) {
        previousVideo.pause();
        previousVideo.currentTime = 0;
      }
    }

    const currentVideo = videoRefs[index].current;
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play();
        setCurrentPlaying(index);
      } else {
        currentVideo.pause();
        setCurrentPlaying(null);
      }
    }
  };

  const handleVideoClick = (index: number) => {
    const currentVideo = videoRefs[index].current;
    if (currentVideo) {
      if (!currentVideo.paused) {
        currentVideo.pause();
        setCurrentPlaying(null);
      }
    }
  };
  
  return (
    <div className="mb-20 max-w-[1340px] mx-auto">
      <h2 className="font-lemon-milk max-w-[290px] lg:max-w-full mx-auto text-[18px] lg:text-[24px] leading-[104%] text-center font-bold uppercase text-[#1e1e1e] mb-9 lg:mb-20">
        {children}
      </h2>

      <ul className="px-10 lg:px-0 flex gap-3 lg:gap-5 overflow-x-scroll no-scrollbar lg:grid lg:grid-cols-4">
        {videos.map((video, index) => (
          <li
            key={index}
            className="flex-shrink-0 lg:flex-shrink relative rounded-[28px] overflow-hidden max-w-[213px] lg:max-w-[initial] flex items-center justify-center"
          >
            {youtube && (
              <div className="relative w-full h-0 overflow-hidden pb-[177.77%]">
                <iframe 
                  src={`${video.url}?controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0`}
                  style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen={true}
                  allowTransparency={true}
                />
              </div>
            )}

            {!youtube && (
              <>
                <video
                  ref={videoRefs[index]}
                  src={video.url}
                  poster={video?.thumbs || undefined}
                  controls={false}
                  onClick={() => handleVideoClick(index)}
                />

                {currentPlaying !== index && (
                  <>
                    <button
                      className="absolute top-0 left-0 w-full h-full z-10 bg-black/50 flex items-center justify-center"
                      onClick={() => handlePlay(index)}  
                    >
                      <svg
                        width="21"
                        height="28"
                        viewBox="0 0 21 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 14L7.48624e-07 27.8564L1.82416e-06 0.143593L21 14Z"
                          fill="#D9D9D9"
                        />
                      </svg>
                    </button>

                    {video?.user && (
                      <div className="absolute left-7 bottom-8 z-20 flex flex-col gap-3">
                        <span className="font-lemon-milk text-[14px] lg:text-[16px] leading-[1.6] uppercase font-bold text-white">
                          {video.user.name}
                        </span>

                        <span className="text-[10px] lg:text-[12px] leading-tight font-normal text-white">
                          {video.user?.profession && (
                            <>
                              {video.user.profession}
                              <br /> 
                            </>
                          )}

                          {video.user.instagram}
                        </span>
                      </div>
                    )}

                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}