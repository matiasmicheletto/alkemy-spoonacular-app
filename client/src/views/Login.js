import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { login, useAuthState, useAuthDispatch, LoadingContext } from '../context';


const Login = () => {
    
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const dispatch = useAuthDispatch();
	const { authLoading, errorMessage } = useAuthState();
	const { setLoading } = useContext(LoadingContext);
	const navigate = useNavigate();	

    const handleLogin = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			let response = await login(dispatch, { email, password });			
			if (response.token){ 
				setLoading(false);
				navigate('/home');
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

    return (
        <Container>
            <div>
				<h1>Login Page</h1>
				{errorMessage ? <p>{errorMessage}</p> : null}
				<form>
					<div>
						<div>
							<label htmlFor='email'>Username</label>
							<input
								type='text'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={authLoading}
							/>
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={authLoading}
							/>
						</div>
					</div>
					<button onClick={handleLogin} disabled={authLoading}>
						login
					</button>
				</form>
			</div>     
        </Container>
    );

};

export default Login;
