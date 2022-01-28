import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, FloatingLabel, Card } from 'react-bootstrap';
import { login, useAuthState, useAuthDispatch, LoadingContext } from '../../context';
import { useFormik } from 'formik';
import classes from './style.module.css';
import Preloader from '../../components/Preloader';
import swal from 'sweetalert';

const Login = () => {
    
    const dispatch = useAuthDispatch();
	const { authLoading, errorMessage } = useAuthState();
	const { loading, setLoading } = useContext(LoadingContext);
	const navigate = useNavigate();	

    const formik = useFormik({
        initialValues: { 
            email: '',
            password: ''
        },
        onSubmit: values => {
            setLoading(true);
            try {
                login(dispatch, values)
                .then(response => {
                    if(response)
                        if("token" in response){ 
                            setLoading(false);
                            navigate('/home');
                        }
                });
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        },
        validateOnChange: false,
        validate: values => {
            let errors = {};
            if(!values.password){
                errors.password = 'Required!';
                swal("Error", "Password is required!", "warning");
            }
            if(!values.email){
                errors.email= 'Required!';
                swal("Error", "Email is required!", "warning");
            }else {
                if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)){
                    errors.email = 'Invalid email format!'
                    swal("Error", "Invalid email format!", "warning");
                }
            }
            return errors;
        }
    });

    return (        
        <Container className={classes.Container}>
            <div className={classes.Background}></div>
            {loading && <Preloader />}
            <h1 className={classes.Title}>Welcome!</h1>
            <Row>
                <Col sm={1} md={3}></Col>
                <Col sm={10} md={6}>
                    <Card className={classes.Card}>
                        <Card.Body>
                            <Form onSubmit={formik.handleSubmit} className={classes.Form}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <FloatingLabel
                                        controlId="formEmail"
                                        label="Email address"
                                        className="mb-3">
                                        <Form.Control 
                                            type="email"
                                            name="email" 
                                            placeholder="Enter email" 
                                            disabled={authLoading}
                                            onChange={formik.handleChange} 
                                            value={formik.values.email} />
                                        <Form.Text className={classes.MutedText}>
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <FloatingLabel
                                        controlId="formPassword"
                                        label="Password"
                                        className="mb-3">
                                        <Form.Control 
                                            type="password"
                                            name="password" 
                                            placeholder="Password" 
                                            disabled={authLoading}
                                            onChange={formik.handleChange} 
                                            value={formik.values.password} />
                                    </FloatingLabel>
                                </Form.Group>
                                <center>
                                    <Button 
                                        type="submit" 
                                        variant="success" 
                                        disabled={authLoading} 
                                        className={classes.LoginBtn}>
                                            Login
                                    </Button>
                                </center>
                                <Row>
                                    <Button 
                                        variant="link" 
                                        disabled={authLoading} 
                                        className={classes.RetrievePassBtn}>
                                            Forgot password?
                                    </Button>
                                </Row>
                            </Form>
                            {errorMessage ? <p className={classes.ErrorMsg}>{errorMessage}</p> : null}
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={1} md={3}></Col>
            </Row>
        </Container>
    );

};

export default Login;
