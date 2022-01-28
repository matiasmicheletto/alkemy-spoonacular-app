export async function login(dispatch, loginPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(loginPayload),
	};
	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(process.env.REACT_APP_LOGIN_URL, requestOptions);		
		if (response.status === 200) {
			let data = await response.json();
			if (data.token) {
				dispatch({ type: 'LOGIN_SUCCESS', payload: data });
				localStorage.setItem('currentUser', JSON.stringify(data));			
				return data;
			}
		}
		dispatch({ type: 'LOGIN_ERROR', error: 'Wrong username or password' });		
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
		console.log(error);
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');	
}