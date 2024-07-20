"use client";
import { useRouter } from "next/navigation";
import { useChangeStateOfModals } from "../lib/hooks/useChangeStateOfModals";
import { naviItems } from "./naviItem";
import TodayPayModal from "../components/modals/todayPayModal";
import FixPayModal from "../components/modals/fixPayModal";

export default function MobileNavi() {
  const { isOpen, changeModalState } = useChangeStateOfModals();
  const router = useRouter();

  const handleNaviItemEvent = (
    isModal: boolean,
    route: string | undefined,
    modalType: "edit" | "today" | undefined
  ) => {
    if (isModal && modalType) {
      changeModalState(modalType, !isOpen[modalType]);
    }

    if (!isModal && route) {
      router.push(route);
    }
    return;
  };
  return (
    <div className="w-full h-[50px] flex items-center bg-gray-400">
      <TodayPayModal />
      <FixPayModal />
      <div className="w-full grid grid-cols-4 divide-x-2 gap devide-white">
        {naviItems.map((el) => (
          <div key={el.itemName} className="text-center">
            <button
              onClick={() =>
                handleNaviItemEvent(el.isModal, el.route, el.modalType)
              }
              className="text-white font-bold md:text-md text-xs"
            >
              {el.itemName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
