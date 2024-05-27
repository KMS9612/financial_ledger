export default function EditListHeader(props: any) {
  return (
    <div
      className={`${
        props.headerText !== props.HeaderText && "border-r"
      } w-1/4 text-xs sm:text-lg font-bold flex justify-center items-center`}
    >
      {props.headerText}
    </div>
  );
}
