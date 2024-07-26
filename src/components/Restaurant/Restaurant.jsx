import RestoranCard from '../Card/RestoranCard/RestoranCard';
import Strelka from '../../assets/icons/strelka.svg';

export function Restaurant() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold text-[var(--clr-primary)]">Restoranlar</h1>
        <p className="flex">
          Barchasi <Strelka />
        </p>
      </div>
      <div>
        <RestoranCard />
      </div>
    </div>
  );
}
