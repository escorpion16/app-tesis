import { Modal, Button, Alert } from "react-bootstrap";

const CustomModal = ({
  mostrarModal,
  setMostrarModal,
  tipo,
  operacion,
  error,
  submitHandler,
  cancel,
  children,
}) => {
  const dismiss = () => {
    setMostrarModal(false);
    if (cancel) cancel();
  };
  return (
    <Modal show={mostrarModal} onHide={dismiss}>
      <Modal.Header>
        <Modal.Title>
          {operacion} {tipo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={dismiss}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          {operacion} {tipo}
        </Button>
      </Modal.Footer>
      {error && <Alert variant="danger">{error}</Alert>}
    </Modal>
  );
};

export default CustomModal;
