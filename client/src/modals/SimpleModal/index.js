import { Modal, Button } from 'react-bootstrap';

const SimpleModal = props => (
    <Modal centered {...props}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                props.children
            }
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Ok
            </Button>                    
        </Modal.Footer>
    </Modal>
);

export default SimpleModal;