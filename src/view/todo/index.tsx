import { useCallback, useEffect, useState } from 'react';

import { IUCTodo } from '../../core/usecase/todos';
import IOCUseCase from '../../ioc/usecase';

import './index.css';

function Todo() {
  const [todos, setTodo] = useState([] as IUCTodo[]);
  
  const createHandler = useCallback(() => {

  }, []);

  const deleteHandler = useCallback(() => {

  }, []);

  const updateHandler =  useCallback((id: string, isChecked: boolean) => {
    isChecked ? IOCUseCase.UCTodo.setDone(id) : IOCUseCase.UCTodo.setUndone(id);
    setTodo(IOCUseCase.UCTodo.getAll());
  }, []);

  useEffect(() => {
    setTodo(IOCUseCase.UCTodo.getAll());
  }, []);

  return (
    <div className="todo">
      <ul className="todo-body">
        { todos.map(todo => (
          <li key={todo.id} className={["todo-content", todo.isDone ? "todo-isDone" : "", (todo.deadline && todo.deadline < Date.now()) ? "todo-isDelay" : ""].join(' ')}>
            <input type="checkbox" checked={todo.isDone} onChange={(event) => updateHandler(todo.id, event.target.checked)}/>
            <span className="todo-desc">{todo.desc}</span>
            <span className="todo-assigners">
            {
              Array.isArray(todo.assigners) && todo.assigners.map(user => (
                <span key={todo.id}>@{user.name}</span>
              ))
            }
            </span>
            { todo.deadline ? <span className="todo-deadline">{new Date(+todo.deadline).toLocaleString()}</span> : null}
          </li>
        ))
        }
      </ul>
      <div className="todo-actions">
        <button onClick={createHandler}>Creata Todo</button>
        <button onClick={deleteHandler}>Delete Todo</button>
      </div>
    </div>
  );
}

export default Todo;
