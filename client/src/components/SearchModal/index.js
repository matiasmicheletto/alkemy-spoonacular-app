import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

const SearchModal = props => {

    const formik = useFormik({
        initialValues: { 
            query: '',            
            check: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        validate: values => {
            let errors = {};            
            if(!values.query)
                errors.query= 'Required!';
            return errors;
        }
    });

    return (
        <Modal show={props.show} onHide={()=>props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add recipes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Query terms</Form.Label>
                        <Form.Control 
                            type="text"                             
                            name="query" 
                            placeholder="Enter search query" 
                            onChange={formik.handleChange} 
                            value={formik.values.query} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check 
                            type="checkbox"                             
                            name="check" 
                            label="Check me out" 
                            onChange={formik.handleChange} 
                            value={formik.values.check} />
                    </Form.Group>
                    <Button type="submit" variant="success">Search</Button>
                </Form>                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>props.setShow(false)}>
                    Close
                </Button>
                <Button variant="primary">
                    Add to menu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchModal;