interface IPropsResultSmall {
  title: string;
  subText: string;
}

export default function ResultBoxSmall(props: IPropsResultSmall) {
  return (
    <div className="w-96 h-72 border-2 border-slate-700 rounded-lg">
      <div className="text-white font-bold rounded-t bg-slate-700 pl-2">
        {props.title}
      </div>
      <div className="h-5/6 overflow-auto pl-2">{props.subText}</div>
    </div>
  );
}
