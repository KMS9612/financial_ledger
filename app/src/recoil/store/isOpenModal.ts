import { atom } from "recoil";

export const isOpenModal = atom({
  key: "isOpenModal",
  default: { edit: false, today: false, editDetail: false },
});
