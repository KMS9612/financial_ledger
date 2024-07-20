import { INaviItem } from "../types/layout/navigation/naviItemsType";

export const naviItems: INaviItem[] = [
  { itemName: "Overview", route: "/result", isModal: false },
  { itemName: "Table", route: "/edit", isModal: false },
  { itemName: "TodayRegist", modalType: "today", isModal: true },
  { itemName: "FixedRegist", modalType: "edit", isModal: true },
];
