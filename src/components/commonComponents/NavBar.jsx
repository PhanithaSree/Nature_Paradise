import React, { useContext } from "react";
import { useUser } from "../context/userContext";
import { NavLink,Router } from "react-router-dom";

export default function NavBar() {
    const { isLoggedIn, login, logout, user } = useUser();

    console.log("wreck:", isLoggedIn)


    const handleLogin = () => {
        login()
    }
    const handleLogout = () => {
        logout()
    }
    
    
    return (

        <div className="item1">
            <div className="header" >
                <img src='/assets/Logo/logoTreeBig.jpg' alt="Tree logo" />
                <h2>Nature's Paradise<br />
                    <span>Make your Home a Greener Place !!</span></h2>
                


                    <p>{isLoggedIn ? (<a onClick={handleLogout}>Logout</a>) : (<a href="/Login" >Login</a>)}
</p>
            </div>
            <div className="nav">
            
                <nav>
                    <ul>
                        <li><a href="/Home">HOME</a></li>
                        <li><div className="dropdown">
                            <a href=""><button className="dropbtn">PRODUCTS</button></a>
                            <div className="dropdown-content">
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
                        <li><a href="/about">ABOUT US</a></li>
                        {/* <li><NavLink to="/contact">CONTACT US</NavLink></li> */}
                        <li><a href="/contact">CONTACT US</a></li>
                        {/* <li><NavLink to="/contact">CONTACT US</NavLink></li> */}
                        <li><a href="/feedback">FEEDBACK</a></li>
                        {/* <li><NavLink to="/feedback">FEEDBACK</NavLink></li> */}
                        <li><a href="/Cart">CART</a></li>
                        <li>{isLoggedIn ? (<p style={{"color":"white","fontFamily":"serif","fontStyle":"italic"}}>Welcome {user?.username}!! </p>) : (<></>)}</li>

                    </ul>
                </nav>
                
            </div>



        </div>
       

    )
}


//  ({user?.cart?.length || 0 })

/*

<div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ "backgroundColor": "white" }}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link  text-white" href="#">HOME</a>
                            </li>
                            <li className="nav-item">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        PRODUCTS
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/category/Bonsai">Bonsai</a></li>
                                        <li><a className="dropdown-item" href="/category/flowers">Flower saplings</a></li>
                                        <li><a className="dropdown-item" href="#">Fruit saplings</a></li>
                                        <li><a className="dropdown-item" href="#">Organic manure</a></li>
                                        <li><a className="dropdown-item" href="#">Gardening tools</a></li>
                                        <li><a className="dropdown-item" href="#">Vegetable saplings</a></li>
                                        <li><a className="dropdown-item" href="#">Fruit seeds</a></li>
                                        <li><a className="dropdown-item" href="#">Vegetable seeds</a></li>
                                    </ul>
                                </li>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  text-white" href="#">ABOUT US</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  text-white">CONTACT US</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  text-white">FEEDBACK</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  text-white">CART</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>


*/