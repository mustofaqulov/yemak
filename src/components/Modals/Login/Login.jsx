// import classNames from 'classnames';

export default function Login() {
  return (
    <div className="bg-[var(--bg-section)] w-full max-w-[460px] rounded-[20px] h-[392px]">
      <div className="flex items-center justify-between w-full p-5 border-b border-solid border-[var(--gray-bg)]">
        <h2 className="font-bold text-[var(--clr-primary)] text-lg">Kirish</h2>
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M18.9498 9.05029L9.05029 18.9498M18.9498 18.9497L9.05029 9.05023"
              stroke="#5A696E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="p-5">
        <p>
          Telefon raqamingizni kiriting va biz ushbu raqamga SMS orqali tasdiqlash kodini yuboramiz
        </p>
        <div>
          <label>
            Telefon raqami
            <input type="tell" />
          </label>
        </div>
      </div>
    </div>
  );
}
