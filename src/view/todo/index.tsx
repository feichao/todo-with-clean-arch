import { useCallback, useEffect, useState } from 'react';

import TodoItem from './component/TodoItem';
import CreateTodoModal from './component/CreateTodoModal';

import { useAppSelector, useAppDispatch } from '../../viewmodel';
import { setTodos } from '../../viewmodel/vm-todo';

import IOCUseCase from '../../ioc/usecase';

import './index.css';

function Todo() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(s => s.todo.todos);
  const [isBatchDel, setBatchDel] = useState(false);
  const [batchDelItems, setBatchDelItems] = useState([] as string[]);
  const [isCreateTodoModalVisible, setCreateTodoModalVisible] = useState(false);
  
  const createHandler = useCallback(() => {
    setCreateTodoModalVisible(true);
  }, []);

  const deleteHandler = useCallback((id: string) => {
    IOCUseCase.UCTodo.delete(id);
    getTodos();
  }, []);

  const batchDelHandler = useCallback(() => {
    setBatchDel(true);
  }, []);

  const updateHandler =  useCallback((id: string, isChecked: boolean) => {
    isChecked ? IOCUseCase.UCTodo.setDone(id) : IOCUseCase.UCTodo.setUndone(id);
    getTodos();
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
    getTodos();
  }, [batchDelItems]);

  const cancelBatchDelHandler = useCallback(() => {
    setBatchDel(false);
    setBatchDelItems([]);
  }, []);

  const getTodos = useCallback(() => {
    dispatch(setTodos(IOCUseCase.UCTodo.getAll()));
  }, []);

  const createMockData = useCallback(() => {
    window.initData();
    getTodos();
  }, []);

  useEffect(() => {
    getTodos();
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
              isBatchDel ? (
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
        todos.length <= 0 && (
          <div className="todo-create-tip">Click 'Create Todo' To Start Or <button onClick={createMockData}>Create Mock Datas</button></div>
        )
      }
      {
        isBatchDel ? (
          <div className="todo-actions">
            <button onClick={confirmBatchDelHandler}>Batch Delete</button>
            <button onClick={cancelBatchDelHandler}>Cancel</button>
          </div>
        ) : (
          <div className="todo-actions">
            <button onClick={createHandler}>Create Todo</button>
            <button onClick={batchDelHandler}>Batch Delete</button>
          </div>
        )
      }
      <CreateTodoModal isVisible={isCreateTodoModalVisible} closeHandler={() => setCreateTodoModalVisible(false)}/>
    </div>
  );
}

export default Todo;
