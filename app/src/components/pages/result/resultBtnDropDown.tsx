import { showMonthDataState } from "@/app/src/recoil/store/showMonthData";
import { ReactNode, useState } from "react";
import { useRecoilValue } from "recoil";

interface IPropsBtnDropDown {
  optionLabel: string;
  options: {
    comp: () => ReactNode;
    isShow: (showMonthData: boolean) => boolean;
    key: string;
  }[];
}
export default function ResultBtnDropDown(props: IPropsBtnDropDown) {
  const showMonthData = useRecoilValue(showMonthDataState);
  const [menuState, setMenuState] = useState(false);

  const onClickControlMenu = () => {
    setMenuState((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={onClickControlMenu}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {props.optionLabel}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${
          menuState ? "opacity-100" : "opacity-0"
        } transition ease-out duration-300 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        tabIndex={-1}
      >
        {props.options
          .filter((comp) => comp.isShow(showMonthData))
          .map((el) => {
            const Components = el.comp;
            return (
              <div key={el.key} className="py-1">
                <Components />
              </div>
            );
          })}
      </div>
    </div>
  );
}
