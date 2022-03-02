export interface IUser {
  id: string;
  name: string;
  avatar: string;
  createDate: number;
  updateDate: number;
}

export interface IUserData {
  get: () => IUser[];
}

export default class DMUsers {

  private req: IUserData;

  public constructor(req: IUserData) {
    this.req = req;
  }

  public getAll(): IUser[] {
    return this.req.get();
  }

  public get(id: string): IUser | undefined {
    return this.req.get().find(user => user.id === id);
  }
  
}