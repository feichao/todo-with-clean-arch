
import { useCallback } from 'react';
import { IUCTodo } from '../../../../core/usecase/todos';

import './index.css';

interface ITodoItem {
  todo: IUCTodo
}

const TodoItem: React.FC<ITodoItem> = ({ todo }) => {

  const getItemClass = useCallback((isDone: boolean, deadline?: number) => {
    return ["todo-item", isDone ? "todo-isDone" : "", (deadline && deadline < Date.now()) ? "todo-isDelay" : ""].join(' ');
  }, []);

  return (
    <div className={getItemClass(todo.isDone, todo.deadline)}>
      <span className="todo-desc">{todo.desc}</span>
      <span className="todo-assigners">
      {
        Array.isArray(todo.assigners) && todo.assigners.map(user => (
          <span key={user.id}>@{user.name}</span>
        ))
      }
      </span>
      { todo.deadline ? <span className="todo-deadline">{new Date(+todo.deadline).toLocaleString()}</span> : null}
    </div>
  );
}

export default TodoItem;
