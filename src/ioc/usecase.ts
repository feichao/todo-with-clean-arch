import DMTodos from "../core/domain/todos";
import DMUsers from "../core/domain/users";
import UCTodo from "../core/usecase/todos";
import UCUser from "../core/usecase/users";
import DataTodo from "../data/todo";
import DataUser from "../data/user";

class IOCUseCase {
  private _DataTodo: DataTodo;
  private _UCTodo: UCTodo;
  private _DMTodo: DMTodos;

  private _DataUser: DataUser;
  private _UCUser: UCUser;
  private _DMUser: DMUsers;

  constructor() {
    this._DataTodo = new DataTodo();
    this._DMTodo = new DMTodos(this._DataTodo);

    this._DataUser = new DataUser();
    this._DMUser = new DMUsers(this._DataUser);

    this._UCUser = new UCUser(this._DMUser);
    this._UCTodo = new UCTodo(this._DMTodo, this._DMUser);
  }

  public get UCTodo() {
    return this._UCTodo;
  }

  public get UCUser() {
    return this._UCUser;
  }
}

export default new IOCUseCase();