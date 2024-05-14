import { IPropsModalCloseBtn } from "@/app/src/types/components/commons/buttonTypes/modalCloseBtn";

export default function ModalCloseBtn(props: IPropsModalCloseBtn) {
  return (
    <button
      type={props.type}
      onClick={props.onClickEvent}
      className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150"
    >
      {props.btnText}
    </button>
  );
}
