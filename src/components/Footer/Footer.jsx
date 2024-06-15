import Logo from '../../assets/icons/dark-logo.svg';
import Apple from '../../assets/icons/apple.svg';
import Huawei from '../../assets/icons/huawie.svg';
import PlayMarket from '../../assets/icons/play-market.svg';
import Telegram from '../../assets/icons/telegram.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/instagram.svg';
import Phone from '../../assets/icons/phone.svg';
import Message from '../../assets/icons/message.svg';

export default function Footer() {
  let dow = [
    { icon: <Apple />, title: 'Apple Store', ins: 'Yuklab oling' },
    { icon: <PlayMarket />, title: 'Google Play', ins: 'Yuklab oling' },
    { icon: <Huawei />, title: 'App Gallery', ins: 'Yuklab oling' },
  ];
  let icon = [<Telegram />, <Facebook />, <Instagram />];
  let contact = [
    { icon: <Phone />, title: '+998 71 200 70 07' },
    { icon: <Message />, title: 'info@yemak.uz' },
  ];
  return (
    <footer className="container">
      <div className="font-semibold mb-3">
        <Logo />
        <ul className="flex gap-4 text-[var(--clr-primary)] mt-5">
          <li>Biz haqimizda</li>
          <li>Ommaviy oferta</li>
          <li>Bog’lanish</li>
        </ul>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[var(--clr-gray)] text-sm w-full max-w-[506px]">
          10 dan oshiq restoran, choyxona va kafelarni tanlab oson buyurtma berishingiz mumkin.
          Bularning barchasini telefoningizda turib bajarish mumkin
        </p>
        <div className="flex gap-3">
          {dow.map((item, ind) => {
            return (
              <div
                key={ind}
                className="flex items-center gap-2 py-3 pr-8 pl-3 bg-[var(--bg-body)] rounded-xl"
              >
                {item.icon}
                <div>
                  <p className="text-[var(--clr-gray-lt)] font-normal text-xs">{item.ins}</p>
                  <h4 className="font-bold text-sm">{item.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between py-3 mt-8">
        <p>© Yemak Delivery 2022. Barcha huquqlar himoyalangan.</p>
        <div className="flex items-center gap-2">{icon.map((item) => item)}</div>
        <div className="flex gap-6">
          {contact.map((item, ind) => (
            <p className="flex items-center gap-1 ">
              {item.icon}
              {item.title}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
