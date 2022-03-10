import DMUsers, { IUser } from "../domain/users";

export default class UCUser {
  private userDomain: DMUsers;

  public constructor(u: DMUsers) {
    this.userDomain = u;
  }

  public getAll(): IUser[] {
    return this.userDomain.getAll();
  }
}