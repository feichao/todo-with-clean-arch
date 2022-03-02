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

export interface ITodoData {
  get: () => ITodo[];
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

  public delete(id: string): boolean {
    return true;
  }

  public update(id: string, todo: Partial<ITodo>): boolean {
    return true;
  }
}