import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../../context';

const PrivateRoute = () => {
	const user = useAuthState();	
    return Boolean(user.token) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;