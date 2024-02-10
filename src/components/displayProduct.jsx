import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginContext from "../LoginContext";
import { validateUser } from "../services/Apiservices";
import { useUser } from "./context/userContext";

export default function DisplayProduct() {
    const [product, setProduct] = useState([]);
    const [id, setId] = useState();
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('prodCat');
    const productName = searchParams.get('prodName');
    const navigate = useNavigate();

    const [authenticateUser, setAuthenticateUser] = useState({
        email: "",
        password: ""
    });
    

    // const { authenticated, login, logout } = useContext(LoginContext);
    const { isLoggedIn,login,logout } = useUser();


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const encodedCategory = encodeURIComponent(category);
                const encodedProductName = encodeURIComponent(productName);
                const response = await axios.get(`http://localhost:4000/api/product/getProduct?category=${encodedCategory}&productName=${encodedProductName}`);
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

    const handleCartClick = async() => {
        
        console.log(isLoggedIn);
        if (isLoggedIn) {
            navigate('/Cart');
        } else {
            navigate('/Login')
            // try {
            //    await validateUser(authenticateUser);
            //     login();
            //     navigate('/Cart');
            // } catch (error) {
            //     console.error("Error validating user:", error);
            //    // toast.error("Login failed. Please try again.");
            // }
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
                            <input type="submit" value="Add To Cart" onClick={() => handleCartClick()} />

                            <a href={``}><input type="submit" value="Back" /></a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
