import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { updateUser } from "../services/Apiservices";
import { useUser } from "./context/userContext";
import { ToastContainer, toast } from 'react-toastify';

export default function DisplayProduct() {

    // State variables to hold product data
    const [product, setProduct] = useState([]);
    const [id, setId] = useState();
    const [error, setError] = useState(null);

    // Using react-router-dom's useSearchParams hook to retrieve query parameters from the URL
    const [searchParams] = useSearchParams();

    // Extracting category and productName from the query parameters
    const category = searchParams.get('prodCat');
    const productName = searchParams.get('prodName');


    // Using custom user context hook to access user-related data and functions
    const { isLoggedIn, login, logout, cart, user, updatedCart } = useUser();


    // useEffect hook to fetch product data when category or productName changes
    useEffect(() => {
        const fetchProductData = async () => {
            try {

                //To ensure that are properly formatted for the URL.
                const encodedCategory = encodeURIComponent(category);
                const encodedProductName = encodeURIComponent(productName);

                //Making the request to get the response based on category and ProductName
                const response = await axios.get(`http://localhost:4000/api/product/getProduct?category=${encodedCategory}&productName=${encodedProductName}`);
                console.log(response)


                if (response.data && response.data.length > 0) {
                    setProduct(response.data);
                    setId(response.data[0]._id);
                } else {
                    setError("No product found");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProductData();
    }, [category, productName]);

    const handleCartClick = async (id) => {

        if (isLoggedIn) {
            const resp = await updateUser(user, id);
            console.log("prd:", resp)
            setTimeout(() => {
                toast.success("Added to cart successfully");
            }, 1000);
            updatedCart();
        }

        else {
            alert("Please Login to continue");
        }

    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product || product.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {product.map((product, index) => (
                <div key={index} className="appleBonsai">
                    <div className="Description">
                        <h2>{product.prodName}</h2>
                    </div>

                    <div className={`appleImage`}>
                        <img className={`apple1`} src={product.productImage} alt={product.prodName} />
                    </div>

                    <div className="Description">
                        <p>{product.productDescription}</p>
                        <div className="select">
                            <h3>${product.price}</h3>
                            <input type="submit" value="Add To Cart" onClick={() => handleCartClick(product._id)} />
                        </div>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}
