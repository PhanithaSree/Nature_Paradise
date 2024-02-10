import React, { useState, useEffect, useContext } from "react";
import { displayCart } from "../../services/Apiservices";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../context/userContext";




export default function Cart() {

    //const { isLoggedIn, login, logout } = useContext(LoginContext);
    const { isLoggedIn ,login,logout} = useUser();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    // State to store fetched product details
    const [productDetails, setProductDetails] = useState([]);
    const [error, setError] = useState(null);

    const populateCart = async () => {
        try {
            const id = searchParams.get('productId');
            const receivedProduct = await displayCart(id);
            console.log("YYYY", receivedProduct.data);
            if (receivedProduct !== null) {
                setProductDetails(receivedProduct.data); // Assuming receivedProduct.data is an array of product details
            }
        } catch (error) {
            setError("Failed to fetch cart details");
            console.error("Error fetching cart details:", error);
        }
    }

    useEffect(() => {
        //console.log("Use Context",isLoggedIn)
        populateCart();
        console.log("Product lengths array" + productDetails.length);
    }, [])

    return (
        <div>
            <h1>{`${isLoggedIn}`}</h1>
            {/* {isLoggedIn ? (
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
      {isLoggedIn ? (
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
      <p>isLoggedIn: {isLoggedIn.toString()}</p>
      {/* {navigate('/Login')} */}
    </div>
           
        </div>
    )
}

