interface IPropsEL {
  title: string;
  subText: string;
  path: string;
}

export default function MainNaviBox({
  index,
  el,
  onClickRoute,
}: {
  index: number;
  el: IPropsEL;
  onClickRoute: (path: string) => void;
}) {
  return (
    <div
      onClick={() => {
        onClickRoute(el.path);
      }}
      className="w-2/5 h-full border-2 border-slate-700 flex bg-white rounded p-6 cursor-pointer transition ease-in-out hover:-translate-y-1"
    >
      <div className="w-5/6">
        <h2 className="text-3xl">{el.title}</h2>
        <div className="flex justify-between">
          <span>{el.subText}</span>
        </div>
      </div>
      <div className="w-1/6 flex justify-end items-center">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
            viewBox="0 0 512 512"
          >
            <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
