import { IPropsNaviCloseBtn } from "@/app/src/types/components/commons/buttonTypes/naviCloseBtn";

export default function NaviCloseBtn(props: IPropsNaviCloseBtn) {
  return (
    <button
      onClick={() => props.setIsOpen((prev) => !prev)}
      className="p-2 rounded-md focus:outline-none bg-gray-800 text-white hover:bg-gray-700 transition ease-in-out duration-150"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
