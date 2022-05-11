import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Box from "./box";
import OptionModalContents from "./option-modal-cotents";
function OptionModal({ setOptions, show, setShow }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    setOptions({ ...selectedOptions });
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>옵션 선택하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OptionModalContents setSelectedOptions={setSelectedOptions} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default OptionModal;
