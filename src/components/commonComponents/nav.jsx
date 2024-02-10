import React, { useContext } from "react";
import LoginContext from "../../LoginContext";
import { useUser } from "../context/userContext";

// import { NavLink } from "react-router-dom";
export default function Nav() {
    // const { authenticated, login, logout } = useContext(LoginContext);
    const { isLoggedIn,login,logout } = useUser();
    const handleLogin=()=>{
        login()
        }
    const handleLogout=()=>{
            logout()
            }
    return (
    
        <div class="item1">
            <div class="header" >
                <img src='/assets/Logo/logoTreeBig.jpg' alt="Tree logo" />
                <h2>Nature's Paradise<br />
                    <span>Make your Home a Greener Place !!</span></h2>
                {/* <p>{authenticated ? (
                    <>
                        <a href="/login">Login</a>
                    </>
                ):
                (
                    <>
                        <a href="/login">Logout</a>
                    </>
                )}
                    
                </p> */}
                {/* <p>Login</p> */}
                

                <p>{isLoggedIn?<a onClick={handleLogout}>Logout</a>:<a href="/Login" onClick={handleLogin}>Login</a>}</p>
            </div>
            <div class="nav">
                <nav>
                    <ul>
                        <li><a href="/Home">HOME</a></li>
                        <li><div class="dropdown">
                            <a href=""><button class="dropbtn">PRODUCTS</button></a>
                            <div class="dropdown-content">
                                <a href="/category/Bonsai">Bonsai</a>
                                <a href="/category/flowers">Flower saplings</a>
                                <a href="/category/fruits">Fruit saplings</a>
                                <a href="/category/manure">Organic manure</a>
                                <a href="#">Gardening tools</a>
                                <a href="#">Vegetable saplings</a>
                                <a href="#">Fruit seeds</a>
                                <a href="#">Vegetable seeds</a>
                                <a href="#">Special Offers</a>
                            </div>
                        </div></li>
                        <li><a href="#">ABOUT US</a></li>
                        <li><a href="#">CONTACT US</a></li>
                        <li><a href="#">FEEDBACK</a></li>
                        <li><a href="#">Cart</a></li>

                    </ul>
                </nav>
            </div>



        </div>
    )
}