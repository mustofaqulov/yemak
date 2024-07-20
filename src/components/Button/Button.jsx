import classNames from 'classnames';

function Button({
  title,
  icon,
  btnClass,
  onClick,
  phone,
  addStyle,
  pad,
  full,
  isDisabled,
  error,
  allInputsFilled,
  disBtn,
}) {
  const btnDis =
    disBtn ||
    (phone && !error && phone.trim().length !== 17) ||
    (error && !allInputsFilled) ||
    isDisabled
      ? 'bg-[var(--gray-bg)] text-[var(--clr-gray-lt)]'
      : 'bg-[var(--btn-primary)] text-[var(--clr-primary)] transition-all font-semibold';

  const disabled =
    (phone && !error && phone.trim().length !== 17) || (error && !allInputsFilled) || disBtn;

  const buttons = classNames(
    pad,
    `flex items-center justify-center gap-[2px] rounded-xl`,
    addStyle,
    {
      [`${
        full ? 'w-full' : 'w-max'
      } text-[var(--clr-gray-lt) transition-all font-semibold ${btnDis}`]: btnClass === 'primary',
      [`w-max bg-[var(--btn-secondary)] text-[var(--clr-white)]`]: btnClass === 'secondary',
    },
  );

  return (
    <button disabled={disabled} onClick={onClick} className={buttons}>
      {icon}
      {title}
    </button>
  );
}

export default Button;
