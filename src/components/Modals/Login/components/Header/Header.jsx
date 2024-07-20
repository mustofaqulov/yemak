export function Header({ step, onClick }) {
  return (
    <div className="flex items-center justify-between w-full p-5 border-b border-solid border-[var(--gray-bg)]">
      <h2 className="font-bold text-[var(--clr-primary)] text-lg">
        {step === 'enterCode' ? 'Tasdiqlash' : 'Kirish'}
      </h2>
      <div className="cursor-pointer" onClick={onClick}></div>
    </div>
  );
}
