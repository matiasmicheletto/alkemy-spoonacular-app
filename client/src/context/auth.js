import React, { useReducer, createContext, useContext } from 'react';

let token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser'))?.token : '';

export const initialState = {
	token: '' || token,
	authLoading: false,
	errorMessage: null
};

export const AuthReducer = (initialState, action) => {

	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				authLoading:true
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,				
				token: action.payload.token,
				authLoading: false
			};
		case 'LOGIN_ERROR':
			return {
				...initialState,
				errorMessage: action.error,
				authLoading: false
			};
		case 'LOGOUT':			
			return {
				...initialState,				
				token: '',
				authLoading: false
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

const AuthStateContext = createContext();

export const useAuthState = () => {
	const context = useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}
	return context;
};

const AuthDispatchContext = createContext();

export const useAuthDispatch = () => {
	const context = useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};