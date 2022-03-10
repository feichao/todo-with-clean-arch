import { useCallback, useEffect, useState } from 'react';

import TodoItem from './component/TodoItem';

import { IUCTodo } from '../../core/usecase/todos';
import IOCUseCase from '../../ioc/usecase';

import './index.css';

function Todo() {
  const [isBatchDel, setBatchDel] = useState(false);
  const [batchDelItems, setBatchDelItems] = useState([] as string[]);
  const [todos, setTodo] = useState([] as IUCTodo[]);
  
  const createHandler = useCallback(() => {

  }, []);

  const deleteHandler = useCallback((id: string) => {
    IOCUseCase.UCTodo.delete(id);
    setTodo(IOCUseCase.UCTodo.getAll());
  }, []);

  const batchDelHandler = useCallback(() => {
    setBatchDel(true);
  }, []);

  const updateHandler =  useCallback((id: string, isChecked: boolean) => {
    isChecked ? IOCUseCase.UCTodo.setDone(id) : IOCUseCase.UCTodo.setUndone(id);
    setTodo(IOCUseCase.UCTodo.getAll());
  }, []);

  const selectBatchDelItemsHandler = useCallback((id: string, isChecked: boolean) => {
    setBatchDelItems(b => {
      if(isChecked) {
        return b.findIndex(bId => bId === id) === -1 ? [...b, id] : [...b];
      } else {
        return b.filter(bId => bId !== id);
      }
    });
  }, []);

  const confirmBatchDelHandler = useCallback(() => {
    batchDelItems.forEach(id => IOCUseCase.UCTodo.delete(id));
    setTodo(IOCUseCase.UCTodo.getAll());
  }, [batchDelItems]);

  const cancelBatchDelHandler = useCallback(() => {
    setBatchDel(false);
    setBatchDelItems([]);
  }, []);

  useEffect(() => {
    setTodo(IOCUseCase.UCTodo.getAll());
  }, []);

  return (
    <div className="todo">
      <ul className="todo-body">
        { todos.map(todo => (
          <li key={todo.id} className="todo-content">
            <div className="todo-item-wrapper">
              {!isBatchDel && <input type="checkbox" checked={todo.isDone} onChange={(event) => updateHandler(todo.id, event.target.checked)}/>}
              <TodoItem todo={todo}/>
            </div>
            {
              isBatchDel ?(
                <div>
                  <input type="checkbox" onChange={(event) => selectBatchDelItemsHandler(todo.id, event.target.checked)}/>
                </div>
              ) : (
                <div>
                  <button onClick={() => deleteHandler(todo.id)}>Del</button>
                </div>
              ) 
            }
          </li>
        ))
        }
      </ul>
      {
        isBatchDel ? (
          <div className="todo-actions">
            <button onClick={confirmBatchDelHandler}>Batch Delete</button>
            <button onClick={cancelBatchDelHandler}>Cancel</button>
          </div>
        ) : (
          <div className="todo-actions">
            <button onClick={createHandler}>Creata Todo</button>
            <button onClick={batchDelHandler}>Batch Delete</button>
          </div>
        )
      }
    </div>
  );
}

export default Todo;
