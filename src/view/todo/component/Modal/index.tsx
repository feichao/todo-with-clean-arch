import './index.css';

interface ICreateTodo {
  isVisible: boolean;
}

const Modal: React.FC<ICreateTodo> = ({ isVisible, children }) => {

  return isVisible ? (
    <div className="modal-wrapper">
      <div className="modal-content">
        {children}
      </div>
    </div>
  ) : null;
}

export default Modal;
