import type { AroundMinesCount } from "../../types";

type Props = {
  value: AroundMinesCount;
};

export function Opened({ value }: Props) {
  if (value === 0) {
    return <div className="bg-slate-300">&nbsp;</div>;
  }
  return <div className="bg-slate-300 text-pink-500 font-bold">{value}</div>;
}

export function Mine(): JSX.Element {
  return <div>mine</div>;
}
