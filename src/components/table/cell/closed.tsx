export function Closed(): JSX.Element {
  return <div className="bg-slate-500">&nbsp;</div>;
}

export function Flagged(): JSX.Element {
  return <div className="bg-slate-500 text-green-400 font-bold">F</div>;
}

export function InvalidFlagged(): JSX.Element {
  return <div className="bg-slate-500 text-red-500 font-bold">F</div>;
}

export function HiddenMine(): JSX.Element {
  return <div className="bg-slate-500 text-yellow-500 font-bold">M</div>;
}
