import React, { useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import Button from '../../Button/Button';
import EditIcon from '../../../assets/icons/edit.svg';
import classNames from 'classnames';
import './Login.scss';

const Login = ({ isOpen, onClick }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('enterPhone'); // enterPhone yoki enterCode
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
  const [timer, setTimer] = useState(59);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (step === 'enterCode' && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    setTimer(59);
  }, [step, timer]);

  useEffect(() => {
    const validCode = [1, 2, 3, 4];
    setIsCodeValid(code.every((num, idx) => parseInt(num) === validCode[idx]));
  }, [code]);

  useEffect(() => {
    if (inputRefs.current[0].current && step === 'enterCode') {
      inputRefs.current[0].current.focus();
    }
  }, [step]);

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCodeChange = (e, idx) => {
    const newCode = [...code];
    newCode[idx] = e.target.value;
    setCode(newCode);

    if (e.target.value && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1].current.focus();
    }
  };

  const handleBackspace = (e, idx) => {
    if (e.key === 'Backspace' && idx > 0 && e.target.value === '') {
      inputRefs.current[idx - 1].current.focus();
    }
  };

  const sendVerificationCode = async () => {
    try {
      setIsDisabled(true);
      const formattedPhone = phoneNumber.replace(/\s+/g, '').slice(-9);
      const response = await fetch(
        `https://api.yemak-test.uz/user/auth?phone_number=${formattedPhone}`,
      );
      if (!response.ok) throw new Error('Kod yuborishda xatolik');
      setStep('enterCode');
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    if (step === 'enterPhone') {
      sendVerificationCode();
    } else {
      console.log('Tasdiqlash kodi:', code.join(''));
    }
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        'login flex items-center justify-center fixed z-20 top-0 w-full h-[100%] left-0 bg-[var(--bg-opacity)] transition-opacity duration-500',
        { 'opacity-100': isOpen, 'opacity-0 pointer-events-none': !isOpen },
      )}
    >
      <div
        className={classNames(
          'bg-[var(--clr-white)] w-full max-w-[460px] rounded-[20px] transition-transform duration-300',
          { 'scale-100': isOpen, 'scale-0': !isOpen },
        )}
      >
        <div className="flex items-center justify-between w-full p-5 border-b border-solid border-[var(--gray-bg)]">
          <h2 className="font-bold text-[var(--clr-primary)] text-lg">
            {step === 'enterCode' ? 'Tasdiqlash' : 'Kirish'}
          </h2>
          <div className="cursor-pointer" onClick={onClick}></div>
        </div>
        <div className="p-5">
          <p className="text-sm text-[var(--clr-gray)] font-normal mb-4">
            {step === 'enterCode'
              ? 'Telefon raqamingizga yuborilgan kodni kiritish orqali telefon raqamingizni tasdiqlang'
              : 'Telefon raqamingizni kiriting va biz ushbu raqamga SMS orqali tasdiqlash kodini yuboramiz'}
          </p>
          {step === 'enterCode' && (
            <div className="flex items-center gap-2 mb-8">
              <p>{phoneNumber}</p>
              <div className="cursor-pointer" onClick={() => setStep('enterPhone')}>
                <EditIcon />
              </div>
            </div>
          )}
          <div
            className={classNames('flex flex-col w-full gap-1', {
              'mb-14': step !== 'enterCode',
              'mb-3': step === 'enterCode',
            })}
          >
            <label className="text-[var(--clr-gray)] text-sm" htmlFor="phone">
              {step === 'enterCode' ? 'Tasdiqlash kodi' : 'Telefon raqami'}
            </label>
            {step === 'enterCode' ? (
              <div className="flex space-x-2 justify-center gap-4 mt-4">
                {code.map((num, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs.current[idx]}
                    type="text"
                    maxLength="1"
                    value={num}
                    onChange={(e) => handleCodeChange(e, idx)}
                    onKeyDown={(e) => handleBackspace(e, idx)}
                    className={classNames(
                      'w-14 h-[60px] appearance-none border-2 bg-[var(--bg-body)] text-center text-lg rounded-lg focus:border-[var(--clr-yellow)] focus:outline-none transition-colors focus:bg-transparent',
                      { 'border-[var(--error)]': code.join('') !== '1234' && code[3] !== '' },
                    )}
                  />
                ))}
              </div>
            ) : (
              <InputMask
                mask="+\9\98 99 999 99 99"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maskChar=""
              >
                {(inputProps) => (
                  <input
                    autoComplete="off"
                    id="phone"
                    placeholder="+998 00 000 00 00"
                    className="px-4 py-2 rounded-lg border border-solid focus:outline focus:outline-1 focus:outline-[var(--clr-yellow)]"
                    {...inputProps}
                  />
                )}
              </InputMask>
            )}
          </div>
          <div className="text-center flex flex-col gap-4">
            {step !== 'enterCode' ? (
              <p className="text-sm">
                Davom etish orqali siz
                <span className="text-[var(--clr-green)]">
                  <a href="#"> Foydalanish qoidalari </a>
                </span>
                va
                <span className="text-[var(--clr-green)]">
                  <a href="#"> Maxfiylik siyosati </a>
                </span>
                ga rozilik bildirasiz
              </p>
            ) : (
              <div className="text-[var(--clr-green)]">
                <span>00</span>:<span>{timer > 9 ? timer : `0${timer}`}</span>
              </div>
            )}
            <Button
              title={step === 'enterPhone' ? 'Davom etish' : 'Tasdiqlash'}
              btnClass="primary"
              onClick={handleButtonClick}
              full={true}
              pad="py-3"
              isDisabled={isDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
