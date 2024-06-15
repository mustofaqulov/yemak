//components
import Button from '../Button/Button';

//clasName
import classNames from 'classnames';

// icons
import Phone from '../../assets/icons/phone.svg';
import Location from '../../assets/icons/location.svg';
import Telegram from '../../assets/icons/telegram.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/instagram.svg';
import Lang from '../../assets/icons/lang.svg';
import Logo from '../../assets/icons/logo.svg';
import Search from '../../assets/icons/search.svg';
import Order from '../../assets/icons/order.svg';
import Basket from '../../assets/icons/basket.svg';
import Me from '../../assets/images/me.jpg';

function Header() {
  let customClass = 'flex flex-col items-center text-[var(--clr-gray)] text-xs';
  return (
    <div className="w-full max-w-[1082px] my-0 mx-auto">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-5">
          <div className="flex items-center text-[var(--clr-primaray)] gap-1">
            <Phone />
            <p>+998 71 200 70 07</p>
          </div>
          <div className="flex items-center gap-1">
            <Location />
            <p>Qarshi, Amir Temur ko‘chasi 46</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Telegram />
            <Facebook />
            <Instagram />
          </div>
          <div className="flex items-center gap-1">
            O'zbekcha <Lang />
          </div>
        </div>
      </div>
      <header className="flex items-center justify-between py-5 gap-10">
        <div className="flex gap-6">
          <Logo />
          <div className="flex items-center ">
            <div className="flex rounded-l-[10px] w-[324px] bg-[var(--bg-body)] py-2 px-[10px] gap-2 items-center py-2 mr-[-10px] z-10">
              <Search />
              <input className="grow bg-transparent" type="text" />
            </div>
            <Button
              btnClass={'primary'}
              addStyle={'text-[var(--clr-white)]'}
              title={'Izlash'}
              pad={'py-2 px-8'}
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div
            className={classNames(
              customClass,
              'cursor-pointer  group/item hover:text-[var(--clr-primary)] transition-all',
            )}
          >
            <Order className="text-[#B0B7BA] transition-all group-hover/item:text-[var(--btn-primary)]" />
            Buyurtmalar
          </div>
          <div
            className={classNames(
              customClass,
              'cursor-pointer group/item hover:text-[var(--clr-primary)] transition-all ',
            )}
          >
            <Basket className="text-[#B0B7BA] transition-all group-hover/item:text-[var(--btn-primary)]" />
            Savatcha
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="text-end font-semibold">
              <h4 className="text-[var(--clr-primary)] ">Islombek Mustofaqulov</h4>
              <p className="text-xs text-[var(--clr-gray)]">+998 90 870 31 54</p>
            </div>
            <div className="w-10 h-10 group/item hover: rounded-full">
              <img
                className="rounded-full transition-[.3s] group-hover/item:scale-110"
                src={Me}
                alt=""
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
