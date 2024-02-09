import React, { useState, useEffect, createContext } from "react";
import { useId } from '../displayProduct'
import { useContext } from 'react';
import { displayCart } from "../../services/Apiservices";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginContext from "../../LoginContext";




export default function Cart() {

    const { authenticated, login, logout } = useContext(LoginContext);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    // State to store fetched product details
    const [productDetails, setProductDetails] = useState([]);
    const [error, setError] = useState(null);

    const populateCart = async () => {
        const id = searchParams.get('productId');
        let receivedproduct = await displayCart(id);
        if (receivedproduct !== null) {
            setProductDetails(receivedproduct)
        }
    }

    useEffect(() => {
        //console.log("Use Context",authenticated)
        populateCart();
        console.log("Product lengths array" + productDetails.length);
    }, [])

    return (
        <div>
            <h1>{`${authenticated}`}</h1>
            {/* {authenticated ? (
                 <h2 className="text-center">Your Cart [4 items]</h2><br />
                 <table className="table">
                     <thead>
                         <tr>
                             <th>Item</th>
                             <th>Price</th>
                             <th>Quantity</th>
                             <th>Total</th>
                         </tr>
                     </thead>
                     <tbody>
                         {/* {products.map(product => (
                             <tr>
                                 <td>{product.name}</td>
                                 <td>{product.price}</td>
                                 <td><Quantity price={product.price} count={product.qty} increment={() => increment(product)} decrement={() => decrement(product)} /></td>
                                 <td><Total price={product.price} quantity={product.qty} /></td>
                             </tr>
                         ))} }
     
                     </tbody>
                 </table>
            )} */}
            <div>
      {authenticated ? (
        <>
        <h2 className="text-center">Your Cart [4 items]</h2><br />
        <table className="table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
          
        </table>
        </>
      ) : (
        // <button onClick={login}>Login</button>
        <div className="card">
        <div className="card-body">
          <button type="button" className="close" aria-label="Close" >
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 className="card-title">Login</h5>
          <p className="card-text">Please login to access the content.</p>
          <a href="/Login"><button type="button" className="btn btn-primary">
            Login
          </button>
          </a>
        </div>
      </div>
      )}
      <p>Authenticated: {authenticated.toString()}</p>
      {navigate('/Login')}
    </div>
           
        </div>
    )
}

