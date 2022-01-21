import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import { login, useAuthState, useAuthDispatch, LoadingContext } from '../../context';
import { useFormik } from 'formik';
import classes from './style.module.css';
import Preloader from '../../components/Preloader';

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
        validate: values => {
            let errors = {};
            if(!values.password)
                errors.password = 'Required!';
            if(!values.email)
                errors.email= 'Required!';
            else 
                if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)){
                    errors.email = 'Invalid email format!'
                }
            return errors;
        }
    });

    return (
        <Container className={classes.Container}>
            {loading && <Preloader />}
            <center>
                <h1>Welcome!</h1>
                <Form onSubmit={formik.handleSubmit} className={classes.Form}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email"
                            name="email" 
                            placeholder="Enter email" 
                            disabled={authLoading}
                            onChange={formik.handleChange} 
                            value={formik.values.email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password" 
                            placeholder="Password" 
                            disabled={authLoading}
                            onChange={formik.handleChange} 
                            value={formik.values.password} />                            
                    </Form.Group>
                    <Button type="submit" variant="success" disabled={authLoading}>Login</Button>
                </Form>
                {errorMessage ? <p className={classes.ErrorMsg}>{errorMessage}</p> : null}
            </center>
        </Container>
    );

};

export default Login;
