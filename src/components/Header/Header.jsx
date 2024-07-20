import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import Login from '../Modals/Login/Login';
import classNames from 'classnames';
import PhoneIcon from '../../assets/icons/phone.svg';
import LocationIcon from '../../assets/icons/location.svg';
import TelegramIcon from '../../assets/icons/telegram.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import LangIcon from '../../assets/icons/lang.svg';
import LogoIcon from '../../assets/icons/logo.svg';
import SearchIcon from '../../assets/icons/search.svg';
import OrderIcon from '../../assets/icons/order.svg';
import BasketIcon from '../../assets/icons/basket.svg';
import SignInIcon from '../../assets/icons/sign-in.svg';

function Header({ count2 }) {
  const [login, setLogin] = useState(false);

  const handleLoginClick = (e) => {
    if (e.target.className && e.target.className.slice(0, 5) === 'login') {
      setLogin(false);
    }
  };

  useEffect(() => {
    if (login) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [login]);

  const customClass = 'flex flex-col items-center text-[var(--clr-gray)] text-xs';
  const iconTextClass = 'flex items-center gap-1';

  return (
    <div className="w-full max-w-[1082px] my-0 mx-auto">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-5">
          <div className={`${iconTextClass} text-[var(--clr-primaray)]`}>
            <PhoneIcon />
            <p>+998 71 200 70 07</p>
          </div>
          <div className={iconTextClass}>
            <LocationIcon />
            <p>Qarshi, Amir Temur ko‘chasi 46</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <TelegramIcon />
            <FacebookIcon />
            <InstagramIcon />
          </div>
          <div className={iconTextClass}>
            O'zbekcha <LangIcon />
          </div>
        </div>
      </div>
      <header className="flex items-center justify-between py-5 gap-10">
        <div className="flex gap-6">
          <LogoIcon />
          <div className="flex items-center border-2 border-solid border-transparent focus-within:border-[var(--clr-yellow)] rounded-[10px]">
            <div className="flex items-center w-full bg-[var(--bg-body)] py-2 px-[10px] gap-2 rounded-l-[10px]">
              <SearchIcon />
              <input
                className="w-[324px] flex-grow bg-transparent"
                type="text"
                placeholder="Search..."
              />
            </div>
            <div className="flex-none">
              <button className="h-full py-2 px-8 text-[var(--clr-white)] bg-[var(--clr-yellow)] rounded-r-[10px] border-l border-[var(--clr-yellow)]">
                Izlash
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
          <div
            className={classNames(
              customClass,
              'cursor-pointer group/item hover:text-[var(--clr-primary)] transition-all',
            )}
          >
            <OrderIcon className="text-[#B0B7BA] transition-all group-hover/item:text-[var(--btn-primary)]" />
            Buyurtmalar
          </div>
          <div
            className={classNames(
              customClass,
              'cursor-pointer group/item hover:text-[var(--clr-primary)] transition-all',
            )}
          >
            <BasketIcon className="text-[#B0B7BA] transition-all group-hover/item:text-[var(--btn-primary)]" />
            Savatcha
          </div>
          {createPortal(
            <Login isOpen={login} setLogin={setLogin} onClick={(e) => handleLoginClick(e)} />,
            document.body,
          )}
          <Button
            onClick={() => setLogin(!login)}
            btnClass="secondary"
            title="Войти"
            icon={<SignInIcon />}
            pad="py-2 px-11"
          />
          <footer></footer>
        </div>
      </header>
    </div>
  );
}

export default Header;
