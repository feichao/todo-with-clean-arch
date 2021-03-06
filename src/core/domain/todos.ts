import ids from '../../util/id';
export interface ITodo {
  id: string;
  desc: string;
  isDone: boolean;
  assigners?: string[];
  createdBy: string;
  deadline?: number;
  createDate: number;
  updateDate: number;
}

export interface ITodoCreation {
  desc: string;
  assigners?: string[];
  deadline?: number;
}

export interface ITodoData {
  get: () => ITodo[];
  add: (id: string, todo: ITodoCreation) => boolean;
  set: (todo: ITodo) => boolean;
  del: (id: string) => boolean;
}

export default class DMTodos {
  private req: ITodoData;

  public constructor(req: ITodoData) {
    this.req = req;
  }

  public getAll(): ITodo[] {
    return this.req.get();
  }

  public get(id: string): ITodo | undefined {
    return this.req.get().find(todo => todo.id === id);
  }

  public add(todo: ITodoCreation): boolean {
    const id = ids.createTodoID()
    return this.req.add(id, todo);
  }

  public delete(id: string): boolean {
    return this.req.del(id);
  }

  public update(id: string, todo: Partial<ITodo>): boolean {
    const t = this.get(id);
    if (!t) {
      return false;
    }

    return this.req.set({...t, ...todo, updateDate: +new Date()});
  }
}