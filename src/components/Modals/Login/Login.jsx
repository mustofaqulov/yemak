import React, { useState, useEffect, useRef, useReducer } from 'react';
import EditIcon from '../../../assets/icons/edit.svg';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { verifyCode } from '../../../services/VerifyCode';
import { sendVerificationCode } from '../../../services/SendCode';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import { useMutation } from '@tanstack/react-query';
import './Login.scss';

const initialState = {
  phoneNumber: '',
  step: 'enterPhone',
  code: ['', '', '', ''],
  timer: 59,
  isCodeValid: true, // Begin with true to avoid initial red border
  token: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_CODE':
      const newCode = [...state.code];
      newCode[action.payload.index] = action.payload.value;
      return { ...state, code: newCode };
    case 'SET_TIMER':
      return { ...state, timer: action.payload };
    case 'SET_IS_CODE_VALID':
      return { ...state, isCodeValid: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'RESET_CODE':
      return { ...state, code: ['', '', '', ''] };
    default:
      return state;
  }
}

const Login = ({ isOpen, onClick, setLogin }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));

  const handlePhoneChange = (e) => {
    dispatch({ type: 'SET_PHONE_NUMBER', payload: e.target.value });
  };

  const handleCodeChange = (e, idx) => {
    dispatch({ type: 'SET_CODE', payload: { value: e.target.value, index: idx } });

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
      dispatch({ type: 'SET_TOKEN', payload: data });
      dispatch({ type: 'SET_STEP', payload: 'enterCode' });
    },
    onError: () => console.log('Error sending verification code'),
  });

  const verifyCodeMutation = useMutation({
    mutationFn: verifyCode,
    onSuccess: (data) => {
      dispatch({ type: 'SET_IS_CODE_VALID', payload: data.ok });
      setLogin(!data.ok);
      dispatch({ type: 'RESET_CODE' });
      dispatch({ type: 'SET_STEP', payload: 'enterPhone' });
      state.phoneNumber = '';
    },
    onError: (data) => {
      console.log('Error verifying code', data);
      dispatch({ type: 'SET_IS_CODE_VALID', payload: false });
    },
  });

  const handleButtonClick = () => {
    if (state.step === 'enterPhone') {
      sendVerificationCodeMutation.mutate(state.phoneNumber);
    } else if (state.step === 'enterCode') {
      verifyCodeMutation.mutate({ code: state.code.join(''), token: state.token });
    }
  };

  const editPhoneNumber = () => {
    dispatch({ type: 'SET_STEP', payload: 'enterPhone' });
    dispatch({ type: 'RESET_CODE' });
  };

  useEffect(() => {
    if (state.step === 'enterCode' && state.timer > 0) {
      const intervalId = setInterval(() => {
        dispatch({ type: 'SET_TIMER', payload: state.timer - 1 });
      }, 1000);
      return () => clearInterval(intervalId);
    }
    dispatch({ type: 'SET_TIMER', payload: 59 });
  }, [state.step, state.timer]);

  useEffect(() => {
    if (inputRefs.current[0].current && state.step === 'enterCode') {
      inputRefs.current[0].current.focus();
    }
  }, [state.step]);

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
        <Header step={state.step} onClick={onClick} />
        <div className="p-5">
          <p className="text-sm text-[var(--clr-gray)] font-normal mb-4">
            {state.step === 'enterCode'
              ? 'Telefon raqamingizga yuborilgan kodni kiritish orqali telefon raqamingizni tasdiqlang'
              : 'Telefon raqamingizni kiriting va biz ushbu raqamga SMS orqali tasdiqlash kodini yuboramiz'}
          </p>
          {state.step === 'enterCode' && (
            <div className="flex items-center gap-2 mb-8">
              <p>{state.phoneNumber}</p>
              <div className="cursor-pointer" onClick={editPhoneNumber}>
                <EditIcon />
              </div>
            </div>
          )}
          <div
            className={classNames('flex flex-col w-full gap-1', {
              'mb-14': state.step !== 'enterCode',
              'mb-3': state.step === 'enterCode',
            })}
          >
            <label className="text-[var(--clr-gray)] text-sm" htmlFor="phone">
              {state.step === 'enterCode' ? 'Tasdiqlash kodi' : 'Telefon raqami'}
            </label>
            {state.step === 'enterCode' ? (
              <div className="flex space-x-2 justify-center gap-4 mt-4">
                {state.code.map((num, idx) => (
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
                      { 'border-[var(--error)]': !state.isCodeValid },
                    )}
                  />
                ))}
              </div>
            ) : (
              <InputMask
                mask="+\9\98 99 999 99 99"
                value={state.phoneNumber}
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
            step={state.step}
            handleButtonClick={handleButtonClick}
            timer={state.timer}
            isDisabled={sendVerificationCodeMutation.isPending || verifyCodeMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
