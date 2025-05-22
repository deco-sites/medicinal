interface PropsAboutGrid2 {
  isMobile?: boolean;
}

export function AboutGrid2({ isMobile }: PropsAboutGrid2) {
  return (
    <div className="max-w-[1135px] mx-auto mb-12 lg:mb-16 px-5 lg:px-0">
      <h2 className="font-lemon-milk text-[18px] lg:text-[24px] leading-[104%] text-center uppercase font-bold mb-11 lg:mb-16">
        <span className="text-[#1e1e1e]">em dois</span>
        <br />
        <span className="fontWithGradient">sabores deliciosos</span>
      </h2>

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 lg:gap-7 mb-12">
        <li class="flex items-center relative rounded-[23px] overflow-hidden">
          <img
            className="object-cover w-full h-full"
            loading="eager"
            src="https://assets.decocache.com/true-source/7cf09257-113c-44d8-97d0-ade66778853b/maracuja.png"
            alt=""
            style={{
              height: `${isMobile ? "190px " : "254px"}`,
            }}
          />
          <div className="absolute px-6 lg:px-12 w-full">
            <h4 className="w-full font-lemon-milk text-[20px] leading-none font-bold uppercase text-white">
              maracujá
            </h4>
          </div>
        </li>

        <li class="flex items-center relative rounded-[23px] overflow-hidden">
          <img
            className="object-cover w-full h-full"
            loading="eager"
            src="https://assets.decocache.com/true-source/3c94db1e-a347-4aca-b453-79e5e97f6a36/camomila-com-laranja-lavanda.png"
            alt=""
            style={{
              height: `${isMobile ? "190px " : "254px"}`,
            }}
          />
          <div className="absolute px-6 lg:px-12 w-full">
            <h4 className="w-full font-lemon-milk text-[20px] leading-tight font-bold uppercase text-white text-right">
              camomila
              <br />
              <span className="hidden lg:block">com</span> laranja
              <br />& lavanda
            </h4>
          </div>
        </li>
      </ul>

      <div className="max-w-[826px] mx-auto">
        <div className="flex lg:items-center gap-6 lg:gap-8 pb-[60px] border-b border-solid border-[#D2D2D2] px-3 lg:px-0">
          <div className="flex-shrink-0 flex items-center justify-center w-[76px] h-[76px] rounded-lg bg-[#F0F0EE]">
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_247_197"
                style="mask-type:luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="33"
                height="33"
              >
                <path d="M0 0H33V33H0V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_247_197)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.7016 12.0347C23.43 11.2056 23.7188 10.395 23.7188 9.79688C23.7188 9.23588 23.4651 8.48925 22.0069 7.71375L21.6996 7.55906C19.9382 6.71344 17.226 6.1875 13.9219 6.1875C10.6178 6.1875 7.90762 6.7155 6.14212 7.55906C4.41375 8.38819 4.125 9.19875 4.125 9.79688C4.125 10.395 4.41375 11.2056 6.14212 12.0347C7.90762 12.8803 10.6198 13.4062 13.9219 13.4062C17.2239 13.4062 19.9361 12.8783 21.6996 12.0347M13.9219 16.5C17.8035 16.5 21.285 15.8359 23.6466 14.5076C23.5249 17.292 23.2011 19.8598 22.3389 21.9656C21.714 23.4919 20.8539 24.6324 19.6659 25.4183C18.4718 26.2082 16.6877 26.8125 13.9219 26.8125C11.1581 26.8125 9.372 26.2082 8.17781 25.4183C6.99187 24.6324 6.13181 23.4919 5.50481 21.9656C4.64269 19.8598 4.31888 17.2899 4.19719 14.5076C6.55875 15.8359 10.0402 16.5 13.9219 16.5ZM26.8043 9.51225C26.565 5.23256 20.889 3.09375 13.9219 3.09375C6.80212 3.09375 1.03125 5.32744 1.03125 9.79688C1.03125 18.5625 1.03125 29.9062 13.9219 29.9062C20.8519 29.9062 24.0549 26.6289 25.5379 22.2358C26.114 22.0571 26.6764 21.8556 27.225 21.6315C28.4934 21.1035 29.8403 20.3672 30.9169 19.338C32.0182 18.2841 33 16.7475 33 14.7634C33 13.8621 32.7999 12.9278 32.2884 12.0739C31.8135 11.2915 31.131 10.6561 30.3167 10.2383C29.1555 9.63394 27.8685 9.49988 26.8043 9.51225ZM26.7981 12.606C26.7671 14.6066 26.6743 16.6629 26.3794 18.6285C28.3656 17.7375 29.9062 16.4505 29.9062 14.7634C29.9062 13.0969 28.5532 12.5792 26.7981 12.606Z"
                  fill="#ACACAC"
                />
              </g>
            </svg>
          </div>
          <p className="text-[14px] leading-[1.6 ] font-medium text-[#1e1e1e]">
            <strong>Fácil de preparar!</strong> Misture 1 medida dosadora em 
            150ml de água. Consumir próximo ao horário de dormir. Também pode 
            ser adicionado a receitas como picolés, sucos, shakes e outras 
            bebidas de sua preferência.
          </p>
        </div>
      </div>
    </div>
  );
}