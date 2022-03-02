import { ITodo, ITodoData } from "../core/domain/todos";

const KEY = 'CleanTodo::Todo';

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

  set(todo: ITodo): boolean {
    return true;
  }

  del(id: string): boolean {
    return true;
  }
}


window.initData = function() {
  localStorage.setItem('CleanTodo::Todo', JSON.stringify([{
    id: 10001,
    desc: '制定代码审核流程机制',
    isDone: false,
    assigners: [90001],
    createdBy: 90001,
    deadline: 1646471837000,
    createDate: 1646206994841,
    updateDate: 1646206994841,
  },{
    id: 10002,
    desc: '选举文档委员和技术委员',
    isDone: true,
    assigners: [90001, 90002],
    createdBy: 90001,
    deadline: 1646126237000,
    createDate: 1646093837000,
    updateDate: 1646111837000,
  }]));

  localStorage.setItem('CleanTodo::Users', JSON.stringify([{
    id: 90001,
    name: 'Frank',
    avatar: '',
    createDate: 1641014237000,
    updateDate: 1641014237000,
  },{
    id: 90002,
    name: 'Dadiwang',
    avatar: '',
    createDate: 1641014237000,
    updateDate: 1641014237000,
  }]));
}