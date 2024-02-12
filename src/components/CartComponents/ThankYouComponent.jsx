import React, { useEffect, useState } from 'react'
import './ThankYouComponent.css'
import { NavLink } from 'react-router-dom'
import { emptyCart } from '../../services/Apiservices';
import { useUser } from '../context/userContext';

function ThankYouComponent() {

    const [cart,setCart] = useState({
        cart : []
    })
    const { isLoggedIn, login, logout, user } = useUser();
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigateToHome();
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    const navigateToHome = async (e) => {
        await emptyCart();
        window.location.href = '/home'; // Navigate to the home page
        
    };

    return (
        <div>
            <div class="card">
                <div class="card-content">
                    <h2>Success!!</h2>
                    <p>Thank you for placing your order!</p>
                    <NavLink to="/home"><button class="go-back-btn" onClick={navigateToHome}>Go Back</button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default ThankYouComponent
