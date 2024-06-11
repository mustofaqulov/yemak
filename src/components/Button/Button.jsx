import classNames from 'classnames';

function Button({ title, icon, btnClass, onClick, phone, addStyle, py, px }) {
  const btnDis =
    phone.trim().length !== 17
      ? 'bg-[var(--gray-bg)] text-[var(--clr-gray-lt)]'
      : 'bg-[var(--btn-primary)] text-[var(--clr-primary)] transition-all font-semibold';

  const buttons = classNames(`py-[${py}] px-[${px}] flex items-center gap-[2px]`, {
    [`w-max text-[var(--clr-gray-lt)] rounded-xl transition-all font-semibold ${btnDis}`]:
      btnClass === 'primary',
    [`w-max bg-[var(--btn-secondary)]`]: btnClass === 'secondary',
  });

  return (
    <button onClick={onClick} className={buttons}>
      {icon}
      {title}
    </button>
  );
}

export default Button;
