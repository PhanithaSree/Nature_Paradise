import React, { useState, useEffect, createContext } from "react";
import { useId } from '../displayProduct'
import { useContext } from 'react';
import { displayCart } from "../../services/Apiservices";
import { useSearchParams } from "react-router-dom";

const IdContext = createContext(); // Define IdContext outside the component

export default function Cart() {

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
        populateCart();
        console.log("Product lengths array" + productDetails.length);
    }, [])

    return (
        <div>
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
                    ))} */}

                </tbody>
            </table>
        </div>
    )
}

export { IdContext }; // Export IdContext outside the component
