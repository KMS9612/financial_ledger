import { IPropsNaviOpenBtn } from "@/app/src/types/components/commons/buttonTypes/naviOpenBtn";

export default function NaviOpenBtn(props: IPropsNaviOpenBtn) {
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
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  );
}
