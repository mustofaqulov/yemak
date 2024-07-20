import Button from '../../../../Button/Button';

export function Footer({ step, timer, handleButtonClick, isDisabled }) {
  return (
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
        onClick={() => handleButtonClick()}
        full={true}
        pad="py-3"
        isDisabled={isDisabled}
      />
    </div>
  );
}
