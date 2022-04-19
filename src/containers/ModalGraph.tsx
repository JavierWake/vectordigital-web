import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BsArrowsAngleExpand } from "react-icons/bs";

import '../styles/sidebar.css';

const ModalGraph: React.FC = () => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
        <div>
            <BsArrowsAngleExpand data-toggle="toggle" className="text-red-600 text-2xl cursor-pointer" onClick={handleShow}/>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            //size="lg"
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <iframe id="inlineFrameExample"
                    title="Inline Frame Example"
                    height="500"
                    width="100%"
                    src="https://d2qtarn0vt9297.cloudfront.net/">
                </iframe>
            </Modal.Body>
        </Modal>
      </div>
    );
}

export default ModalGraph;