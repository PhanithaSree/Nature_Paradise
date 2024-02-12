import React, { useState, useEffect, useContext } from "react";
import { deleteFromCart, displayCart } from "../../services/Apiservices";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../context/userContext";
import { isEmpty, values } from "lodash";
import './Cart.css';

const CheckoutPanel = ({ productIdToCountMap }) => {

    const navigate = useNavigate();

    let value = 0;

    values(productIdToCountMap).forEach(el => {
        value += (el[0] * el[1]);
    })

    const goToCheckout = () => {
        navigate('/checkout')
    }

    return (
        <>
            <div className="totals">
                <div className="totals-item totals-item-total">
                    <label>Grand Total</label>
                    <div className="totals-value" id="cart-total">{value}</div>
                </div>
            </div>

            <button className="checkout" onClick={goToCheckout}>Checkout</button>
        </>
    )
}


const ShoppingCart = ({ product, count }) => {

    const { isLoggedIn, login, logout, user } = useUser();

    const handleRemoveFromCart = async () => {
        const resp = await deleteFromCart(user, product["_id"])

        window.location.reload();
    }

    return (
        <div className="shopping-cart">

                <div className="product">
                    <div className="product-image">
                        <img src={product.productImage} alt="..." />
                    </div>
                    <div className="product-details">
                        <div className="product-title"><h3>{product.prodName}</h3></div>
                    </div>
                    <div className="product-price">{product.price}</div>
                    <div className="product-quantity">
                        <input type="number" defaultValue={count} min="1" readOnly />
                    </div>
                    <div className="product-removal">
                        <button className="remove-product" onClick={handleRemoveFromCart}>
                            Remove
                        </button>
                    </div>
                    <div className="product-line-price">{count * product.price}</div>
                </div>
            </div>
            );
};

export default function Cart() {

    //const {isLoggedIn, login, logout} = useContext(LoginContext);
    const {isLoggedIn, login, logout, user, updatedCart} = useUser();

            const navigate = useNavigate();

            const [searchParams] = useSearchParams();

            // State to store fetched product details
            const [productDetails, setProductDetails] = useState([]);
            const [error, setError] = useState(null);

            const productIdToCountMap = { };

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
                populateCart();
            console.log("Product lengths array" + productDetails.length);
    }, [])

    useEffect(()=> {
                console.log("something")
            }, [user])

            if (isLoggedIn && user?.cart?.length>0) {
                return (
                    <>
                        <div style={{ paddingTop: "10%", display: "flex", flexDirection: "column", gap: "2.5rem 1rem" }}>
                            {[...new Map(user?.cart.map(item => [item['_id'], item])).values()].map(uniqueItem => {
                                const count = user?.cart.filter(item => item['_id'] === uniqueItem['_id']).length;
            
                                productIdToCountMap[uniqueItem['_id']] = [uniqueItem.price, count]
            
                                return <ShoppingCart key={uniqueItem['_id']} product={uniqueItem} count={count} />;
                            })}
                        </div>
            
                        {!isEmpty(productIdToCountMap) ? <CheckoutPanel productIdToCountMap={productIdToCountMap} /> : null}
            
                    </>
                );
            }
            
            else if(isLoggedIn && user?.cart?.length===0)
            {
                return (<h1 style={{"textAlign":"center"}}>Your cart is empty</h1>)
            }
            
            
            else {
                return (
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
                );
            }
            
}
