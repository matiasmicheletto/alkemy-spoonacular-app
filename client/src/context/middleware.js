import React, {createContext} from 'react';
import Middleware from '../middleware';

const middleware = new Middleware();

export const MiddlewareContext = createContext();

export const MiddlewareProvider = props => (
    <MiddlewareContext.Provider value={middleware}>
        {props.children}
    </MiddlewareContext.Provider>
);