import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, AuthProvider } from './context';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/Home';
import Login from './views/Login';

const App = () => {
    return (
        <LoadingProvider>
            <AuthProvider>
                <BrowserRouter>                
                    <Routes>
                        <Route exact path='/' element={<PrivateRoute/>}>
                            <Route exact path='/' element={<Home/>}/>
                        </Route>  
                        <Route exact path='/home' element={<PrivateRoute/>}>
                            <Route exact path='/home' element={<Home/>}/>
                        </Route>
                        <Route path="/login" element={<Login />} />
                    </Routes>  
                </BrowserRouter>
            </AuthProvider>
        </LoadingProvider>
    );
};

export default App;