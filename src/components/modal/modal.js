import { Component } from 'react';
import { createPortal } from 'react-dom';
import { HiX } from 'react-icons/hi';
import s from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscDown);
  }

  handleEscDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleClose();
    }
  };
  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <button type="button" onClick={this.props.toggleClose} className={s.buttonClose}>
            <HiX width="15" height="15" />
          </button>
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}

// const modal = ({ toggleClose }) => {
//   return (
//     <div onClick={toggleClose} className={s.Overlay}>
//       <div className={s.Modal}>
//         <img src="../public/logo192.png" alt="" width="100" height="100" />
//         <button type="button" onClick={toggleClose} className={s.buttonClose}></button>
//       </div>
//     </div>
//   );
// };

export default Modal;
