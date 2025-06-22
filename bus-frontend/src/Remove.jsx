import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Remove(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const removeBus = () => {document.getElementById(props.num.toString()).remove();setShow(false);};
  
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Remove
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.route} {props.busnum}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this bus?</Modal.Body>
        <Modal.Footer>
            <Button variant='primary' onClick={removeBus}>
                Yes
            </Button>
            <Button variant="danger" onClick={handleClose}>
                No
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Remove;