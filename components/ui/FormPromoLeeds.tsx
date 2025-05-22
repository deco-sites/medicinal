import { useState, useEffect } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import Loading from 'site/components/ui/Loading.tsx';

export default function () {
  const regexPhone = /^\(\d{2}\) 9\d{4}-\d{4}$/;
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const [showPopup, setShowPopup] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);

  const [loading, setLoading] = useState(false)

  function formatPhone(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.currentTarget.value;

    const text: RegExpMatchArray | null = value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

    if (!text) {
      return event;
    }

    value = !text[2]
      ? text[1]
      : `(${text[1]}) ${text[2]}${text[3] ? `-${text[3]}` : ""}`;

    event.currentTarget.value = value;

    return event;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    setLoading(true);
    await fetch('https://jobs.truesource.com.br/klaviyo/profile-import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        phoneNumber,
        origin: 'PopupPromoEbookLeeds',
        eventName: 'inscricao_kit_4_saches_magnesio'
      })
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setLoading(false);
      setShowPopup(false);

      document.body.style.overflow = 'auto';
    })
  }

  useEffect(() => {
    if (globalThis.document) {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  return (
    <div className={`${!showPopup ? 'hidden' : ''} fixed top-0 bottom-0 left-0 right-0 z-[9999999999999] bg-[#000] bg-opacity-85 flex items-center	justify-center`}>
      <div className="w-full max-w-[342px] sm:max-w-[500px] bg-white rounded-[20px] overflow-hidden">
        <Image
          src="https://assets.decocache.com/true-source/972d9bc6-f9c5-44a8-9797-984913454d6d/POP-UP-DESKTOP_MOBILE-V2.jpg"
          alt="Banner saches True Source"
          width={500}
        />

        <form className="flex flex-col p-6 sm:p-10" onSubmit={handleSubmit}>
          <input
            className="text-sm font-medium text-gray px-4 py-2 h-[48px] border border-solid border-light-gray-200 rounded-md mb-2 outline-none"
            type="text"
            name="user-name"
            placeholder="Nome"
            required
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
              
              if (e.currentTarget.value.length > 3) {
                console.log('aqui');
                
                setNameIsValid(true);
              } else {
                setNameIsValid(false);
              }
            }}
          />

          <input
            className="text-sm font-medium text-gray px-4 py-2 h-[48px] border border-solid border-light-gray-200 rounded-md mb-2 outline-none"
            type="email"
            name="user-email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
              setEmailIsValid(regexEmail.test(e.currentTarget.value));
            }}
          />

          <input
            className="text-sm font-medium text-gray px-4 py-2 h-[48px] border border-solid border-light-gray-200 rounded-md mb-4 outline-none"
            type="tel"
            name="user-phone-number"
            placeholder="Telefone com DDD"
            required
            value={phoneNumber}
            onChange={(e) => {
              formatPhone(e);
              setPhoneNumber(e.currentTarget.value);
              setPhoneNumberIsValid(regexPhone.test(e.currentTarget.value));
            }}
          />

          <button
            className="text-sm font-bold text-white uppercase h-[40px] sm:h-[50px] rounded-md bg-[#808080]/55 enabled:bg-gradient-to-r from-red to-orange"
            type="submit"
            disabled={!nameIsValid || !emailIsValid || !phoneNumberIsValid}
          >
            {loading ? 
              <Loading /> : (
                <span>
                  quero garantir minha oferta
                </span>
              )}
          </button>
        </form>
      </div>
    </div>
  );
}
