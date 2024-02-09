import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function DisplayProduct() {
    const [product, setProduct] = useState([]);
    const [id, setId] = useState();
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('prodCat');
    const productName = searchParams.get('prodName');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const encodedCategory = encodeURIComponent(category);
                const encodedProductName = encodeURIComponent(productName);
                const response = await axios.get(`http://10.237.0.26:4000/api/product/getProduct?category=${encodedCategory}&productName=${encodedProductName}`);
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

    const handleCartClick = (imageName) => {
        //call the api service method add to cart.
        // with the returned status code display added or couldn'd add
        //navigate back to list of products;
        navigate(`/displayProduct?prodName=${imageName}&prodCat=${category}`);
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
                            <a href={`http://localhost:3000/category/${product.prodCat}`}><input type="submit" value="Add To Cart" onClick={() => handleCartClick("Bonsai")} /></a>

                            <a href={``}><input type="submit" value={``} /></a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
