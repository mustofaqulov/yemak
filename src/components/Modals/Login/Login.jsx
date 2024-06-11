import InputMask from 'react-input-mask';
import { useState, useEffect, useRef } from 'react';
import Button from '../../Button/Button';
import Edit from '../../../assets/icons/edit.svg';
import Sign from '../../../assets/icons/sign-in.svg';

import classNames from 'classnames';

import './Login.scss';

export default function Login({ isOpen, setIsOpen }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const inputRefs = inputValues.map(() => useRef(null));
  const [timer, setTimer] = useState(5);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
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
  useEffect(() => {
    let interval;
    let clear = () => {
      clearInterval(interval);
      setTimer(59);
    };
    if (error) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clear();
  }, [error]);

  function handleClickBtn() {
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

  let arr = [1, 2, 3, 4];

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
                <Edit />
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
              <div className="flex space-x-2 justify-center gap-4 mt-4">
                {inputValues.map((value, ind) => (
                  <input
                    key={ind}
                    ref={inputRefs[ind]}
                    type="number"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e, ind)}
                    onKeyDown={(e) => handleBackspace(e, ind)}
                    className={classNames(
                      `w-14 h-[60px] appearance-none border-2 border-transparent bg-[var(--bg-body)] text-center text-lg rounded-lg focus:border-[var(--clr-yellow)] focus:outline-none transition-colors focus:bg-transparent ${
                        value !== ''
                          ? arr[ind] != value
                            ? 'focus:border-[red] border-[red]'
                            : 'focus:border-[var(--clr-yellow)] border-transparent'
                          : 'focus:border-[var(--clr-yellow)]'
                      }`,
                    )}
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
                <span>00</span>:<span>{timer > 9 ? timer : `0${timer}`}</span>
              </div>
            )}

            <Button
              title="Davom etish"
              btnClass="secondary"
              phone={phone}
              onClick={() => handleButtonClick()}
              icon={<Sign />}
              py={'20px'}
              px={'20px'}
            />
          </div>
        </div>
      </div>
    )
  );
}
