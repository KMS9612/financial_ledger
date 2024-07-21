export default function EditListHeader(props: any) {
  return (
    <div
      className={`w-1/4 text-xs sm:text-lg font-bold flex justify-center items-center`}
    >
      {props.headerText}
    </div>
  );
}
