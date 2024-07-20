import type { AroundMinesCount } from "../../types";

type Props = {
  value: AroundMinesCount;
};

export function Opened({ value }: Props) {
  return <div className="bg-slate-300 text-pink-400">{value}</div>;
}

export function Mine(): JSX.Element {
  return <div>mine</div>;
}
