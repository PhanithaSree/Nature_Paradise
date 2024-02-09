import React, { useState, useEffect, useContext } from "react";
import { displayCart } from "../../services/Apiservices";
import { useSearchParams } from "react-router-dom";
import { AuthProvider } from "../../App";

export default function Cart() {
    const { state, dispatch } = useContext(AuthProvider)
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
        if (state.isLoggedIn) {
            console.log(state);
            populateCart();
        }
    }, [state.isLoggedIn]);

    return (
        <div>
            {state.isLoggedIn ? (
                <>
                    <h2 className="text-center">Your Cart [{state.cart.length} items]</h2><br />
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
                            {productDetails.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <h2 className="text-center">Please log in to view your cart</h2>
            )}
        </div>
    )
}