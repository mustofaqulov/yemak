import InputMask from 'react-input-mask';
import { useState, useEffect, useRef } from 'react';
// import { Close } from '../../../assets/icons/close.svg?react';

import classNames from 'classnames';

import './Login.scss';

export default function Login({ isOpen, setIsOpen }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const inputRefs = inputValues.map(() => useRef(null));
  const [timer, setTimer] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.yemak-test.uz/user/auth?phone_number=${phone
  //           .slice(phone.length - 12)
  //           .split(' ')
  //           .join('')}`,
  //       );
  //       console.log(
  //         `https://api.yemak-test.uz/user/auth?phone_number=${phone
  //           .slice(phone.length - 12)
  //           .split(' ')
  //           .join('')}`,
  //       );
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error('Error karochchi:', error);
  //     }
  //   };
  //   if (phone.trim().length == 17) {
  //     fetchData();
  //     console.log(phone.trim().length);
  //   }
  // }, [phone]);

  useEffect(() => {
    if (inputRefs[0].current && inputRefs[0].current.value == '') {
      inputRefs[0].current.focus();
    }
  });

  let t = 59;
  function time() {
    !error &&
      setInterval(() => {
        t -= 1;
        setTimer(t);
      }, 1000);
  }

  console.log(timer);

  function handleClickBtn() {
    error && clearInterval(time);
    setError(!phone);
  }

  function handleButtonClick() {
    setError(!error);
  }

  // function message() {
  //   return userData && userData.ok;
  // }

  const btnDis =
    phone.trim().length !== 17
      ? 'bg-[var(--gray-bg)] text-[var(--clr-gray-lt)]'
      : 'bg-[var(--btn-primary)] text-[var(--clr-primary)] transition-all font-semibold';

  function handleChange(event, index) {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);

    if (event.target.value && index < inputRefs.length - 1) {
      setTimeout(() => {
        inputRefs[index + 1].current.focus();
      }, 100);
    }
  }

  function handleBackspace(event, index) {
    if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      index > -1 &&
      event.target.value !== ''
    ) {
      setTimeout(() => {
        inputRefs[index - 1].current.focus();
      }, 100);
    }
  }

  return (
    isOpen && (
      <div className="bg-[var(--clr-white)] w-full max-w-[460px] rounded-[20px]">
        <div className="flex items-center justify-between w-full p-5 border-b border-solid border-[var(--gray-bg)]">
          <h2 className="font-bold text-[var(--clr-primary)] text-lg">
            {error ? 'Tasdiqlash' : 'Kirish'}
          </h2>
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}></div>
        </div>
        <div className="p-5">
          <p className="text-sm text-[var(--clr-gray)] font-normal mb-4">
            {error
              ? 'Telefon raqamingizga yuborilgan kodni kiritish orqali telefon raqamingizni tasdiqlang'
              : 'Telefon raqamingizni kiriting va biz ushbu raqamga SMS orqali tasdiqlash kodini yuboramiz'}
          </p>
          {error ? (
            <div className="flex items-center gap-2 mb-8">
              <p>{phone}</p>
              <div className="cursor-pointer" onClick={() => handleClickBtn()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2 14H14M9.18961 3.54114C9.18961 3.54114 9.18961 4.63089 10.2794 5.72064C11.3691 6.81039 12.4589 6.81039 12.4589 6.81039M4.87975 11.992L7.16823 11.6651C7.49833 11.618 7.80424 11.465 8.04003 11.2292L13.5486 5.72064C14.1505 5.11879 14.1505 4.14299 13.5486 3.54114L12.4589 2.45139C11.857 1.84954 10.8812 1.84954 10.2794 2.45139L4.77078 7.95997C4.53499 8.19576 4.38203 8.50167 4.33488 8.83177L4.00795 11.1202C3.9353 11.6288 4.3712 12.0647 4.87975 11.992Z"
                    stroke="#5A696E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
          ) : null}
          <div
            className={classNames(`flex flex-col w-full gap-1`, { 'mb-14': !error, 'mb-3': error })}
          >
            <label className="text-[var(--clr-gray)] text-sm" htmlFor="phone">
              {error ? 'Tasdiqlash kodi' : 'Telefon raqami'}
            </label>
            {error ? (
              <div className="flex space-x-2 justify-between mt-4">
                {inputValues.map((value, ind) => (
                  <input
                    key={ind}
                    ref={inputRefs[ind]}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e, ind)}
                    onKeyDown={(e) => handleBackspace(e, ind)}
                    className="w-14 h-[60px] border-2 border-transparent bg-[var(--bg-body)] text-center text-lg rounded-lg focus:border-[var(--clr-yellow)] focus:outline-none transition-colors focus:bg-transparent"
                  />
                ))}
              </div>
            ) : (
              <InputMask
                mask="+\9\98 99 999 99 99"
                value={phone}
                maskChar={' '}
                onChange={(e) => setPhone(e.target.value)}
              >
                {(inputProps) => (
                  <input
                    id="phone"
                    placeholder="+998 000 00 00"
                    className={classNames('px-4 py-2 rounded-lg border border-solid select-none', {
                      'border-[var(--error)]': error,
                      'focus:outline focus:outline-1 focus:outline-[var(--clr-yellow)]': !error,
                    })}
                    {...inputProps}
                    type="tel"
                  />
                )}
              </InputMask>
            )}
          </div>
          <div
            className={classNames(`text-center flex flex-col`, {
              'gap-4': !error,
              'gap-8': error,
            })}
          >
            {!error ? (
              <p className="text-sm">
                Davom etish orqali siz
                <span className="text-[var(--clr-green)]">
                  <a href="#"> Foydalanish qoidalari </a>
                </span>
                va
                <span className="text-[var(--clr-green)]">
                  <a href="#"> Maxfiylik </a>
                </span>
                <span className="text-[var(--clr-green)]">
                  <a href="#">siyosat</a>
                </span>
                iga rozilik bildirasiz
              </p>
            ) : (
              <div className="text-[var(--clr-green)]">
                <span>00</span>:<span>{timer}</span>
              </div>
            )}
            <button
              onClick={() => handleButtonClick()}
              disabled={phone.trim().length !== 17}
              className={classNames(
                `py-3.5 w-full text-[var(--clr-gray-lt)] rounded-xl transition-all font-semibold ${btnDis}`,
              )}
            >
              Davom etish
            </button>
          </div>
        </div>
      </div>
    )
  );
}
