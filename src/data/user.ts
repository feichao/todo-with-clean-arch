import { IUser, IUserData } from "../core/domain/users";

const KEY = 'CleanTodo::Users';

export default class DataUser implements IUserData {
  get(): IUser[] {
    const todoStr = localStorage.getItem(KEY);
    if (!todoStr) {
      return [];
    }

    try {
      return JSON.parse(todoStr) as IUser[];
    } catch(exception) {
      console.error(exception);
      return [];
    }
  }
}
