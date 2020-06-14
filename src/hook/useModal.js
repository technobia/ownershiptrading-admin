import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";

const ModalContext = React.createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [body, setBody] = useState(null);
  const [options, setOptions] = useState({
    size: null
  });

  const open = (component, context) => {
    setBody(component);
    setShow(true);
    setOptions(context);
  };

  const close = () => setShow(false);

  return (
    <ModalContext.Provider
      value={{ open, close }}
    >
      {children}
      <Modal className="modal-top" show={show} size={options.size} onHide={close}>
        {body}
      </Modal>
    </ModalContext.Provider>
  );
};

export default useModal;
