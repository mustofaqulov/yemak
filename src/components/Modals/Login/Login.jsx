import React, { useState, useEffect, useRef } from 'react';
import EditIcon from '../../../assets/icons/edit.svg';

// Komponentlar
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { verifyCode } from '../../../services/VerifyCode';
import { sendVerificationCode } from '../../../services/SendCode';

// Kutubxona
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import { useMutation } from '@tanstack/react-query';

// CSS
import './Login.scss';

const Login = ({ isOpen, onClick, setLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('enterPhone'); // 'enterPhone' yoki 'enterCode'
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
  const [timer, setTimer] = useState(59);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [token, setToken] = useState('');

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

  const sendVerificationCodeMutation = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: (data) => {
      setToken(data);
      setStep('enterCode');
    },
    onError: () => {
      console.log('Error karoche');
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: verifyCode,
    onSuccess: (data) => {
      console.log(data.ok);
      setIsCodeValid(data.ok);
    },
    onError: (data) => {
      console.log('Error karoche', data);
      setIsCodeValid(false);
    },
  });

  const handleButtonClick = () => {
    if (step === 'enterPhone') {
      sendVerificationCodeMutation.mutate(phoneNumber);
    } else if (step === 'enterCode') {
      setLogin(!isCodeValid);
      verifyCodeMutation.mutate({ code: code.join(''), token });
    }
  };

  const editFn = () => {
    setStep('enterPhone');
    setCode(['', '', '', '']);
  };

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
    if (inputRefs.current[0].current && step === 'enterCode') {
      inputRefs.current[0].current.focus();
    }
  }, [step]);

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
        <Header step={step} onClick={onClick} />
        <div className="p-5">
          <p className="text-sm text-[var(--clr-gray)] font-normal mb-4">
            {step === 'enterCode'
              ? 'Telefon raqamingizga yuborilgan kodni kiritish orqali telefon raqamingizni tasdiqlang'
              : 'Telefon raqamingizni kiriting va biz ushbu raqamga SMS orqali tasdiqlash kodini yuboramiz'}
          </p>
          {step === 'enterCode' && (
            <div className="flex items-center gap-2 mb-8">
              <p>{phoneNumber}</p>
              <div className="cursor-pointer" onClick={() => editFn()}>
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
                      { 'border-[var(--error)]': step !== 'enterCode' && !isCodeValid },
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
          <Footer
            step={step}
            handleButtonClick={handleButtonClick}
            timer={timer}
            isDisabled={sendVerificationCodeMutation.isPending || verifyCodeMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
