import DMTodos, { ITodo } from "../domain/todos";
import DMUsers, { IUser } from "../domain/users";

export interface IUCTodo  extends Omit<ITodo, 'assigners'> {
  assigners: IUser[]
};

export default class UCTodo {
  private todoDomain: DMTodos;
  private userDomain: DMUsers;

  public constructor(t: DMTodos, u: DMUsers) {
    this.todoDomain = t;
    this.userDomain = u;
  }

  public getAll(): IUCTodo[] {
    const todos = this.todoDomain.getAll();
    const users = this.userDomain.getAll();

    const usersObj = {} as { [key: string]: IUser };
    users.forEach(user => {
      usersObj[user.id] = user;
    });

    return todos.map(todo => {
      return {
        ...todo,
        assigners: todo.assigners?.map(a => usersObj[a]).filter(a => a) || []
      }
    });
  }

  public get(id: string): ITodo | undefined {
    return this.todoDomain.get(id);
  }

  public delete(id: string): boolean {
    return this.todoDomain.delete(id);
  }

  public updateDesc(id: string, desc: string): boolean {
    return this.todoDomain.update(id, { desc });
  }

  public updateAssigners(id: string, assigners: string[]): boolean {
    return this.todoDomain.update(id, { assigners });
  }

  public updatDeadline(id: string, deadline: number): boolean {
    return this.todoDomain.update(id, { deadline });
  }

  public setDone(id: string): boolean {
    return this.todoDomain.update(id, { isDone: true });
  }

  public setUndone(id: string): boolean {
    return this.todoDomain.update(id, { isDone: false });
  }
}