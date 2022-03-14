import { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { IUser } from '../../../../core/domain/users';

import { setTodos } from '../../../../viewmodel/vm-todo';
import { useAppDispatch } from '../../../../viewmodel';

import IOCUseCase from '../../../../ioc/usecase';

import Modal from '../Modal';

import './index.css';

interface ICreateTodo {
  isVisible: boolean;
  closeHandler?: Function
}

const CreateTodoModal: React.FC<ICreateTodo> = ({ isVisible, closeHandler = () => {} }) => {
  const formRef = useRef(null);
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState([] as IUser[]);
  const [title, setTitle] = useState('');
  const [assigners, setAssigners] = useState([] as string[]);
  const [deadline, setDeadline] = useState('');

  const confirmHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    if (formRef.current && (formRef.current as HTMLFormElement).checkValidity()) {
      IOCUseCase.UCTodo.add(title, assigners, +new Date(deadline));
      dispatch(setTodos(IOCUseCase.UCTodo.getAll()));
      closeHandler();
    }
  };

  const cancelHandler = useCallback(() => {
    closeHandler();
  }, [closeHandler]);

  useEffect(() => {
    const u = IOCUseCase.UCUser.getAll();
    setUsers(u);
  }, []);

  return (
    <Modal isVisible={isVisible}>
      <form ref={formRef}>
        <div className="create-todo-modal">
          <div className="item-block">
            <label>Title</label>
            <input type="text" required value={title} onChange={(event) => setTitle(event.target.value)}/>
          </div>
          <div className="item-block">
            <label>Assigners</label>
            <select multiple  onChange={(event) => setAssigners(Array.from(event.target.selectedOptions).map(option => option.value))}>
              {
                users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)
              }
            </select>
          </div>
          <div className="item-block">
            <label>Deadline</label>
            <input type="datetime-local" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
          </div>
          <div className="create-modal-actions">
            <input type="submit" value="Confirm" disabled={!title} onClick={confirmHandler}/>
            <input type="button" value="Cancel" onClick={cancelHandler}/>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default CreateTodoModal;
