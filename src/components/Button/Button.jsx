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
  error,
  allInputsFilled,
}) {
  const btnDis =
    (phone && !error && phone.trim().length !== 17) || (error && !allInputsFilled)
      ? 'bg-[var(--gray-bg)] text-[var(--clr-gray-lt)]'
      : 'bg-[var(--btn-primary)] text-[var(--clr-primary)] transition-all font-semibold';

  const disabled = (phone && !error && phone.trim().length !== 17) || (error && !allInputsFilled);

  const buttons = classNames(
    pad,
    addStyle,
    `flex items-center justify-center gap-[2px] rounded-xl`,
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
