import React, { useContext, useState } from "react";
import { postUser, validateUser } from '../services/Apiservices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoginContext from "../LoginContext";
import { useUser } from "./context/userContext";


export default function Login() {

    // const { authenticated, login, logout } = useContext(LoginContext);

    const { isLoggedIn, login, logout } = useUser();

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [authenticateUser, setAuthenticateUser] = useState({
        email: "",
        password: ""
    })

    const handleRegisterChange = (e) => {

        let newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);

    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (user.password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        postUser(user)
            .then(() => {
                toast.success("Account created successfully!");
                
                setUser({ username: "", email: "", password: "" });
            })
            .catch(error => {
                console.error("Error creating account:", error);
                toast.error("Failed to create account. Please try again later.");
            });
    }

    const handleValidateSubmit = async (e) => {
        e.preventDefault();
        // if (authenticateUser.password.length < 6) {
        //     alert("Password must be at least 6 characters long");
        //     return;
        // }
        try {
            await validateUser(authenticateUser)
            toast.success("Logged in successfully!");
            login();
            navigate('/Cart')
            // setTimeout(() => navigate("/Cart"), 4000); // after 4000 milliseconds goes to home page


        } catch (error) {
            console.error("Error validating user:", error);
            toast.error("Login failed. Please try again.");
        }



    }



    const handleValidateChange = (e) => {

        let newUser = { ...authenticateUser };
        newUser[e.target.name] = e.target.value;
        setAuthenticateUser(newUser);

    }
    return (

        <div class="loginBlock">
            <h3>AUTHENTICATION</h3>
            <div class="createAccount">
                <form onSubmit={handleRegisterSubmit}>
                    <h2>Add Account</h2>
                    <p><label for="username">Name</label>
                        <input type="text" name="username" onChange={handleRegisterChange}></input></p>

                    <p><label for="email">Email  </label>
                        <input type="email" name="email" required="required" onChange={handleRegisterChange} /></p>
                    <p><label for="password">Password </label>
                        <input type="password" name="password" required="required" onChange={handleRegisterChange} /></p>
                    <p><a href="/Home"><input type="submit" value="Create Account" onClick={handleRegisterSubmit} /></a></p>
                </form>
            </div>
            <div class="alreadyUser">
                <form onSubmit={handleValidateSubmit}>
                    <h2>Already a User??</h2>
                    <p><label for="email">Email  </label>
                        <input type="email" name="email" required="required" onChange={handleValidateChange} /></p>
                    <p><label for="password">Password </label>
                        <input type="password" name="password" required="required" onChange={handleValidateChange} /></p>
                    <p><a href="/Home"><input type="submit" value="Login" onClick={handleValidateSubmit}/></a></p>
                    <br />
                    <br />
                    <br />
                    <br />

                </form>
            </div>
            {/* <ToastContainer /> */}

        </div>

    )

}









