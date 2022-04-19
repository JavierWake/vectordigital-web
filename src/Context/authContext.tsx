import React from 'react';
import loginObjectReducer, { loginObjectInitialState } from '../reducers/LoginObjectReducer';
import { LoginObjectActions, LoginObjectState } from '../types/LoginObjectTypes';

const AuthStateContext = React.createContext<LoginObjectState | null>(null);
const AuthDispatchContext = React.createContext<React.Dispatch<LoginObjectActions> | null>(null);

export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    if(context === undefined){
        throw new Error("usar useAuthState dentro del AuthProvider.");
    }
    return context;
}

export function useAuthDispatch() {
    console.log("useAuthDispatch");
    const context = React.useContext(AuthDispatchContext);
    if(context === undefined){
        throw new Error("usar useAuthDispatch dentro del AuthProvider.");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = React.useReducer(loginObjectReducer, loginObjectInitialState);
    console.log("AuthProvider");
    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}
