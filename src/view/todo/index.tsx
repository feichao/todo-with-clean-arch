import { useCallback, useEffect, useState } from 'react';

import IOCUseCase from '../../ioc/usecase';

import './index.css';

function Todo() {
  const todoModel = useState({
    todos: {
      
    }
  });
  
  // create button controller
  const createHandler = useCallback(() => {

  }, []);

  // delete button controller
  const deleteHandler = useCallback(() => {

  }, []);

  useEffect(() => {
    console.log(IOCUseCase.UCTodo.getAll());
  }, []);

  return (
    <div className="todo">
      <header className="todo-header"></header>
      <ul>
        <li></li>
      </ul>
      <button onClick={createHandler}>Creata Todo</button>
      <button onClick={deleteHandler}>Delete Todo</button>
    </div>
  );
}

export default Todo;
