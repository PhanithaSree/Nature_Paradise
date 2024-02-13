import React, { useState } from "react";
import { postUser, validateUser } from '../services/Apiservices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from "./context/userContext";
import Joi from "joi-browser";


export default function Login() {

    const { isLoggedIn, login, logout } = useUser();

    // State hooks for user data, authentication, and form errors
    const [errors, setErrors] = useState({});
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

    // Handler for user registration form input changes
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setErrors(validate());

        // Post user data to the server for registration
        postUser(user)
            .then(() => {
                setTimeout(() => {
                    toast.success("Account created successfully!");
                }, 1000); // Show toast after 1 second
                setUser({ username: "", email: "", password: "" });
            })
            .catch(error => {
                console.error("Error creating account:", error);
                setTimeout(() => {
                    toast.error("Failed to create account. Please try again later.");
                }, 1000); // Show toast after 1 second
            });
    }

    // Handler for user login form submission
    const handleValidateSubmit = async (e) => {
        e.preventDefault();
        const response = await validateUser(authenticateUser)
        if (response) {
            login()
            console.log(isLoggedIn)
        }
        else {
            console.log("Error 404")
        }
    }
    //Handler for validation
    const handleValidateChange = (e) => {
        let newUser = { ...authenticateUser };
        newUser[e.target.name] = e.target.value;
        setAuthenticateUser(newUser);
    }

    //Joi Schema creation
    const schema = Joi.object({
        username: Joi.string()
            .regex(new RegExp('[a-zA-Z]'))
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } })
            .required(),
        password: Joi.string()
            .regex(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6)
            .required(),
    })

    //Schema Validation
    const validate = () => {
        const errors = {}; //object type local variable
        const result = Joi.validate(user, schema, {
            abortEarly: true,
        });
        if (result.error != null)
            for (let item of result.error.details) {
                errors[item.path[0]] = item.message;
            }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    return (

        <div className="loginBlock">
            <h3>AUTHENTICATION</h3>
            <div className="createAccount">
                <form onSubmit={handleRegisterSubmit}>
                    <h2>Add Account</h2>
                    <p><label htmlFor="username">Name</label>
                        <input type="text" name="username" value={user.username} required="required" onChange={handleRegisterChange}></input></p>
                    {errors && errors.username && <small style={{ "color": "red" }}>{errors.username}</small>}

                    <p><label htmlFor="email">Email  </label>
                        <input type="email" name="email" value={user.name} required="required" onChange={handleRegisterChange} />
                        {errors && errors.email && <small style={{ "color": "red" }}>{errors.email}</small>}
                    </p>
                    <p><label htmlFor="password">Password </label>
                        <input type="password" name="password" value={user.password} required="required" onChange={handleRegisterChange} />
                        {errors && errors.password && <small style={{ "color": "red" }}>{errors.password}</small>}
                    </p>
                    <p><a href="/Home"><input type="submit" value="Create Account" onClick={handleRegisterSubmit} /></a></p>
                </form>
            </div>
            <div className="alreadyUser">
                <form onSubmit={handleValidateSubmit}>
                    <h2>Already a User??</h2>
                    <p><label htmlFor="email">Email  </label>
                        <input type="email" name="email" value={authenticateUser.email} required="required" onChange={handleValidateChange} />
                    </p>
                    <p><label htmlFor="password">Password </label>
                        <input type="password" name="password" value={authenticateUser.password} required="required" onChange={handleValidateChange} />

                    </p>
                    <p><a href="/Home"><input type="submit" value="Login" onClick={handleValidateSubmit} /></a></p>
                    <br />
                    <br />
                    <br />
                    <br />
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}