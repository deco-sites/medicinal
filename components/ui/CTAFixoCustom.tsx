import useBuyProduct from 'site/sdk/useBuyProduct.ts'
import { useUI } from 'site/sdk/useUI.ts'
import Loading from 'site/components/ui/Loading.tsx'
import { JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

export default function CTAFixoCustom() {
  const [isVisible, setIsVisible] = useState(true);

  const { displayCart } = useUI();

  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOptionName, setSelectedOptionName] = useState<string>('');
  
  const buyProduct = useBuyProduct({
    eventParams: { items: [] },
    productID: selectedOption,
    seller: '1',
    quantity: 1,
    onSuccess: () => {
      displayCart.value = true
    },
  })

  function addProductToCart(event: JSX.TargetedEvent<HTMLFormElement, Event>) {
    event.preventDefault();

    buyProduct.add();
  }

  function handleSelectedOption() {
    setIsOptionsVisible(!isOptionsVisible);
  }
  
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    setSelectedOption(event.currentTarget.value);

    setSelectedOptionName(event.currentTarget.parentNode?.querySelector('span')?.innerText || '');

    setIsOptionsVisible(false);
  };

  useEffect(() => {
    const sectionToWatch = document.querySelector("#cupom");

    if (!sectionToWatch) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    observer.observe(sectionToWatch);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style="box-shadow: rgba(0, 0, 0, 0.35) 0px -4px 44px 0px;"
      className={`fixed bottom-0 w-full h-[85px] flex items-center justify-center rounded-t-[28px] bg-white z-50 ${!isVisible && 'opacity-0 pointer-events-none'}`}
    >
      <form onSubmit={addProductToCart} className="w-full flex items-center justify-center gap-1.5">
        <div className="w-full max-w-[207px] lg:max-w-[270px] relative">
          <button
            type="button"
            className={`w-full h-[38px] lg:h-[56px] flex items-center justify-center gap-4 bg-[#B6B6B6] rounded-[28px] relative z-10 ${isOptionsVisible ? 'border-t border-solid border-white' : ''}`}
            onClick={handleSelectedOption}
          >
            <span className="font-lemon-milk text-[10px] lg:text-[13px] font-bold leading-none uppercase text-white max-w-[150px] lg:max-w-[200px] line-clamp-1">
              {selectedOption ? selectedOptionName : 'selecione o sabor'}
            </span>

            <svg
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.81143 5.74637L0.63664 1.57159L1.68015 0.528076L5.33318 4.18111L8.98621 0.528076L10.0297 1.57159L5.85494 5.74637C5.71655 5.88472 5.52887 5.96245 5.33318 5.96245C5.1375 5.96245 4.94982 5.88472 4.81143 5.74637Z"
                fill="white"
              />
            </svg>
          </button>

          <div className={`flex flex-col gap-3 absolute bottom-[56px] left-0 w-full bg-[#B6B6B6] px-4 py-6 rounded-t-[28px] -mb-4 lg:-mb-6 lg:pb-9 ${!isOptionsVisible ? 'hidden': ''}`}>
            <label className="flex items-center gap-1.5">
              <input
                type="radio"
                name="productVariant"
                value="3208" onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <span className="text-[12px] lg:text-[14px] leading-tight font-medium text-white flex-1">
                Maracujá 3.0
              </span>
            </label>

            <label className="flex items-center gap-1.5">
              <input
                type="radio"
                name="productVariant"
                value="3652"
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"  
              />
              <span className="text-[12px] lg:text-[14px] leading-tight font-medium text-white flex-1">
                Camomila, laranja e lavanda 3.0
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#FFAA0D] rounded-[28px] w-[149px] lg:w-[177px] h-[38px] lg:h-[56px] flex items-center justify-center gap-6 flex-shrink-0 disabled:opacity-60"
          disabled={selectedOption ? false : true}
        >
          {buyProduct.loading.value ? (
            <Loading style={{ color: "#FFFFFF" }} />
          ) : (
            <>
              <span className="font-lemon-milk text-[10px] lg:text-[13px] leading-none font-bold text-white uppercase">
                Comprar
              </span>

              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_722_27)">
                  <path
                    d="M1.40472 1.33334H2.2755C2.43951 1.33334 2.52152 1.33334 2.58751 1.3635C2.64567 1.39008 2.69495 1.43283 2.72949 1.48664C2.76868 1.54771 2.78028 1.62889 2.80347 1.79125L3.11901 4.00001M3.11901 4.00001L3.82027 9.15428C3.90926 9.80836 3.95376 10.1354 4.11012 10.3816C4.24791 10.5985 4.44545 10.771 4.67896 10.8783C4.94397 11 5.27402 11 5.93413 11H11.6394C12.2678 11 12.5819 11 12.8387 10.887C13.0651 10.7873 13.2593 10.6266 13.3996 10.4228C13.5587 10.1918 13.6175 9.88312 13.735 9.26585L14.6175 4.63314C14.6588 4.41588 14.6795 4.30725 14.6495 4.22234C14.6232 4.14786 14.5713 4.08513 14.5031 4.04536C14.4253 4.00001 14.3147 4.00001 14.0935 4.00001H3.11901ZM6.73806 14C6.73806 14.3682 6.43958 14.6667 6.07139 14.6667C5.7032 14.6667 5.40472 14.3682 5.40472 14C5.40472 13.6318 5.7032 13.3333 6.07139 13.3333C6.43958 13.3333 6.73806 13.6318 6.73806 14ZM12.0714 14C12.0714 14.3682 11.7729 14.6667 11.4047 14.6667C11.0365 14.6667 10.7381 14.3682 10.7381 14C10.7381 13.6318 11.0365 13.3333 11.4047 13.3333C11.7729 13.3333 12.0714 13.6318 12.0714 14Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_722_27">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.0714111)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}