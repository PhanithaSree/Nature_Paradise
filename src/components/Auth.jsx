import React, { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = {
    isLoggedIn: false,
    user: null, // Placeholder for user information
    cart: [], // Placeholder for user's cart
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user, // Assuming the login action provides user information
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null, // Reset user information on logout
                cart: [], // Clear the cart on logout
            };
        case 'ADD_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload.item], // Add the item to the cart
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user) => {
        dispatch({ type: 'LOGIN', payload: { user } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const addCartItem = (items) => {
        items.forEach(item => {
            dispatch({ type: 'ADD_CART', payload: { item } });
        });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout, addCartItem }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };