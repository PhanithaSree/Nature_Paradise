import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    const footerStyle ={
        textDecoration: 'none', color: 'white'
    }
    return (

        <div className="item5">
            <footer>
                <div className="follow">
                    <h3>Follow Us</h3>
                    <p><img src="assets/Logo/AllLogo.jpg" alt="logo"/><br />
                        We also accept:<br /><br />
                        <img src="assets/Logo/visaLogo.jpg" alt="visaLogo"/></p>
                </div>
                <div className="support">
                    <h3>Support</h3>
                    <ul type="none" >
                        <li><a href="/" style={footerStyle}>Home</a></li>
                        <li><a href="/about" style={footerStyle}>About Us</a></li>
                        <li><a href="/contact" style={footerStyle}>Contact us</a></li>
                        <li><a href="/feedback" style={footerStyle}>Feedback</a></li>
                    </ul>
                </div>
                <div className="account">
                    <h3>My Accounts</h3>
                    <ul type="none" >
                        
                        <li>My orders</li>
                        <li>My addresses</li>

                    </ul>
                </div>
                <div className="useful">
                    <h3>Useful Links</h3>
                    <ul type="none" >
                        <li>Contact us</li>
                        <li>Shipping and Delivery policy</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="copyright">
                    <h3>&copy;2017 Nature's Paradise, All rights reserved.</h3>
                </div>
                <div className="address">
                    <h3>Written by Nature's Paradise.<br />
                        Visit us at:natureparadise.in or at MG Road,Bangalore, KA, India </h3>
                </div>
            </footer>
        </div>
    )
}
