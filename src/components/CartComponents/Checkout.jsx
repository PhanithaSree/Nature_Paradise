import React, { useState } from 'react'
import './Checkout.css'
import { addUserAddress,handleStripeToken, tokenHandler } from '../../services/Apiservices'
import { useNavigate } from 'react-router-dom'
import Stripe from 'react-stripe-checkout'


function Checkout() {

    const navigate = useNavigate();

    const [address, setAddress] = useState({
        firstAddress: "",
        city: "",
        state: "",
        pincode: 0
    })

    const handleAddressChange = (e) => {
        let newAddress = { ...address };
        newAddress[e.target.name] = e.target.value;
        setAddress(newAddress);
    }

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        const email = JSON.parse(localStorage.getItem("user"));
        //console.log("From local storage",id.email)
        const response = await addUserAddress(address, email);
        
        //navigate('/thankYou');
    }

    return (
        <div>
            <div className="form-container">
                <h2 style={{ "color": "green", "textAlign": "center" }}>Please Enter your Address</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">First Address:</label>
                        <input type="text" id="username" name="firstAddress" placeholder="Enter your street number, street name" onChange={handleAddressChange} required="required"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <select id="city" name="city" onChange={handleAddressChange}>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                            <option value="kolkata">Kolkata</option>
                            <option value="chennai">Chennai</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="pune">Pune</option>
                            <option value="ahmedabad">Ahmedabad</option>
                            <option value="jaipur">Jaipur</option>
                            <option value="lucknow">Lucknow</option>
                            <option value="patna">Patna</option>
                            <option value="indore">Indore</option>
                            <option value="chandigarh">Chandigarh</option>
                            <option value="bhopal">Bhopal</option>
                            <option value="kochi">Kochi</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <select id="state" name="state" onChange={handleAddressChange}>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="uttar-pradesh">Uttar Pradesh</option>
                            <option value="west-bengal">West Bengal</option>
                            <option value="tamil-nadu">Tamil Nadu</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="telangana">Telangana</option>
                            <option value="gujarat">Gujarat</option>
                            <option value="rajasthan">Rajasthan</option>
                            <option value="madhya-pradesh">Madhya Pradesh</option>
                            <option value="bihar">Bihar</option>
                            <option value="uttarakhand">Uttarakhand</option>
                            <option value="punjab">Punjab</option>
                            <option value="haryana">Haryana</option>
                            <option value="kerala">Kerala</option>
                            <option value="assam">Assam</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Pincode:</label>
                        <input type="number" id="pincode" name="pincode" placeholder="Enter your pincode" onChange={handleAddressChange} required="required"/>
                    </div>
                   
                    {/* <button type="submit" className="btn" onClick={handleAddressSubmit}>Proceed to Checkout</button> */}

                    {
                        
                    }
                </form>
                <Stripe stripeKey='pk_test_51OihPwSIgrkY4FdnaOvfmMbkB56l0CAiI5d6Wmvm4LawAS3uiUytjrVaSzbsEnzNUzzhUXE2Rg5McDtGE8i9mDA400h3oHWTlS' token={tokenHandler} />
            </div>
        </div>
    )
}

export default Checkout
