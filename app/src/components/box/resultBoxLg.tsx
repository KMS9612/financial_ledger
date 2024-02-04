interface IPropsResultLarge {
  title: string;
  subText: string;
}

export default function ResultBoxLarge(props: IPropsResultLarge) {
  return (
    <div className="w-full h-full border rounded-lg shadow-md p-2">
      <div className="text-slate-700 text-2xl font-bold">{props.title}</div>
      <div className="h-5/6">{props.subText}</div>
    </div>
  );
}
