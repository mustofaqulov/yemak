import Res from '../../../assets/images/res.jpg';

export default function RestoranCard() {
  return (
    <div className=" w-[167px] rounded-[12px] flex flex-col gap-3 items-center justify-center bg-[var(--gray-bg)] py-4 px-[12px]">
      <img src={Res} alt="card img" />
      <h2 className="text-sm font-bold ">Santini Bar & Terrace</h2>
    </div>
  );
}
