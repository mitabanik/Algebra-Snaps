import { atom } from "recoil";

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const popupState = atom({
  key: 'popupState',
  default: null,
});
