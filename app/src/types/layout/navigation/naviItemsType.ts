export interface INaviItem {
  itemName: string;
  route?: string;
  isModal: boolean;
  modalType?: "edit" | "today" | undefined;
}
