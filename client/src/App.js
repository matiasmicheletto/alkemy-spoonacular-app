import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, AuthProvider, MiddlewareProvider } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/Home/';
import Login from './views/Login';
import Search from './views/Search/';
import Details from './views/Details/';

const App = () => {
    return (
        <LoadingProvider>
            <AuthProvider>
                <MiddlewareProvider>
                    <BrowserRouter>                
                        <Routes>
                            <Route exact path='/' element={<PrivateRoute/>}>
                                <Route exact path='/' element={<Home/>}/>
                            </Route>  
                            <Route exact path='/home' element={<PrivateRoute/>}>
                                <Route exact path='/home' element={<Home/>}/>
                            </Route>
                            <Route exact path='/search/:slotIndex' element={<PrivateRoute/>}>
                                <Route exact path='/search/:slotIndex' element={<Search/>}/>
                            </Route>
                            <Route exact path='/details/:recipeId' element={<PrivateRoute/>}>
                                <Route exact path='/details/:recipeId' element={<Details/>}/>
                            </Route>
                            <Route path="/login" element={<Login />} />
                        </Routes>  
                    </BrowserRouter>
                </MiddlewareProvider>
            </AuthProvider>
        </LoadingProvider>
    );
};

export default App;