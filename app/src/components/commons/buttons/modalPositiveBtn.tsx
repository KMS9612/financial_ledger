import { IPropsModalPositiveBtn } from "@/app/src/types/components/commons/buttonTypes/modalPositiveBtn";

export default function ModalPositiveBtn(props: IPropsModalPositiveBtn) {
  const whenDisableCSS = "bg-gray-300 hover:bg-gray-500";
  const whenUndisableCSS = "bg-blue-500 hover:bg-blue-700";
  return (
    <button
      disabled={props.disable}
      onClick={props.onClickEvent}
      className={`${
        props.disable ? whenDisableCSS : whenUndisableCSS
      } flex justify-center items-center w-full text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg transition ease-in-out duration-150 cursor-pointer`}
    >
      {props.btnText}
    </button>
  );
}
