import React from 'react';
import './App.css';

import Nav from '../src/components/commonComponents/nav';
import Sidebar from './components/commonComponents/sidebar';
import Footer from './components/commonComponents/footer';
import Home from './components/commonComponents/home';
import Login from './components/login';
import PlantCategory from './components/PlantCategory';
import DisplayProduct from './components/displayProduct';
import Cart from './components/CartComponents/Cart';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

export const AuthProvider = React.createContext();



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

function App() {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  return (

    <AuthProvider.Provider
      value={{
        state,
        dispatch
      }}
    >


      <div className="grid-container">
        <Nav />
        <Sidebar />
        <div className="item3">
          <Router>
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="*" element={<Home />} />
              <Route path="/category/:category" element={<PlantCategory />} />
              <Route path="/displayProduct" element={<DisplayProduct />} />
              <Route path='/Cart' element={<Cart />} />
            </Routes>
          </Router>

        </div>
        <Footer />
      </div>
    </AuthProvider.Provider>

  );
}

export default App;