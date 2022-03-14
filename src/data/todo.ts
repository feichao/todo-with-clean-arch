import { ITodo, ITodoCreation, ITodoData } from "../core/domain/todos";

const KEY = 'CleanTodo::Todos';
export default class DataTodo implements ITodoData {
  get(): ITodo[] {
    const todoStr = localStorage.getItem(KEY);
    if (!todoStr) {
      return [];
    }

    try {
      return JSON.parse(todoStr) as ITodo[];
    } catch(exception) {
      console.error(exception);
      return [];
    }
  }

  add(id: string, todo: ITodoCreation): boolean {
    try {
      const todos = this.get();
      todos.push({
        id,
        ...todo,
        createDate: +new Date(),
        updateDate: +new Date(),
        createdBy: '900000001',
        isDone: false
      });
      localStorage.setItem(KEY, JSON.stringify(todos));
      return true;
    } catch(exception) {
      console.error(exception);
      return false;
    }
  }

  set(todo: ITodo): boolean {
    try {
      const todos = this.get();
      const existedIndex = todos.findIndex(t => t.id === todo.id);
      if (existedIndex !== -1) {
        todos.splice(existedIndex, 1, todo);
      } else {
        todos.push(todo);
      }
      localStorage.setItem(KEY, JSON.stringify(todos));
      return true;
    } catch(exception) {
      console.error(exception);
      return false;
    }
  }

  del(id: string): boolean {
    try {
      const todos = this.get();
      const existedIndex = todos.findIndex(t => t.id === id);
      if (existedIndex !== -1) {
        todos.splice(existedIndex, 1);
        localStorage.setItem(KEY, JSON.stringify(todos));
      }
      return true;
    } catch(exception) {
      console.error(exception);
      return false;
    }
  }
}