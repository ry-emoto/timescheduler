import { atom } from "recoil";

export const signInUserState = atom({
  key: 'signInUserState',
  default: {
      uid: ''
  }
});

export const todoTaskState = atom({
  key: 'todoTaskState',
  default: [],
});

export const timeTaskState = atom({
  key: 'timeTaskState',
  default: [],
});

export const selectDateState = atom({
  key: 'selectDateState',
  default: new Date(),
});

