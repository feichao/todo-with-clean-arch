import { useCallback, useEffect, useState } from 'react';

import { IUCTodo } from '../../core/usecase/todos';
import IOCUseCase from '../../ioc/usecase';

import './index.css';

function Todo() {
  const [todos, setTodo] = useState([] as IUCTodo[]);
  
  const createHandler = useCallback(() => {

  }, []);

  const deleteHandler = useCallback((id: string) => {
    IOCUseCase.UCTodo.delete(id);
    setTodo(IOCUseCase.UCTodo.getAll());
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
            <div>
              <input type="checkbox" checked={todo.isDone} onChange={(event) => updateHandler(todo.id, event.target.checked)}/>
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
            <div>
              <button onClick={() => deleteHandler(todo.id)}>Delete</button>
            </div>
          </li>
        ))
        }
      </ul>
      <div className="todo-actions">
        <button onClick={createHandler}>Creata Todo</button>
      </div>
    </div>
  );
}

export default Todo;
