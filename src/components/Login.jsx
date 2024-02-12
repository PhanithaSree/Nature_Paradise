import React, { useState } from "react";
import { postUser, validateUser } from '../services/Apiservices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from "./context/userContext";
import Joi from "joi-browser";


export default function Login() {

    const [errors, setErrors] = useState({});
    //const [loginErrors,setLoginErrors] = useState({});
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
        setErrors(validate());
    
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

    const handleValidateSubmit = async (e) => {
        e.preventDefault();
       // setLoginErrors(validateLogin());
        // try {
             const response = await validateUser(authenticateUser)
             if(response)
             {
                login()
                console.log(isLoggedIn)
             }
             else
             {
                console.log("Error 404")
             }
    }


    const handleValidateChange = (e) => {
        let newUser = { ...authenticateUser };
        newUser[e.target.name] = e.target.value;
        setAuthenticateUser(newUser);
    }

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

    const validate = () => {
        const errors = {}; //object type local variable
        console.log("###User", user)
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
                        <input type="text" name="username" required="required" onChange={handleRegisterChange}></input></p>
                        {errors && errors.username && <small style={{ "color": "red" }}>{errors.username}</small>}

                    <p><label htmlFor="email">Email  </label>
                        <input type="email" name="email" required="required" onChange={handleRegisterChange} />
                        {errors && errors.email && <small style={{ "color": "red" }}>{errors.email}</small>}
                        </p>
                    <p><label htmlFor="password">Password </label>
                        <input type="password" name="password" required="required" onChange={handleRegisterChange} />
                        {errors && errors.password && <small style={{ "color": "red" }}>{errors.password}</small>}
                        </p>
                    <p><a href="/Home"><input type="submit" value="Create Account" onClick={handleRegisterSubmit} /></a></p>
                </form>
            </div>
            <div className="alreadyUser">
                <form onSubmit={handleValidateSubmit}>
                    <h2>Already a User??</h2>
                    <p><label htmlFor="email">Email  </label>
                        <input type="email" name="email" required="required" onChange={handleValidateChange} />
                        </p>
                    <p><label htmlFor="password">Password </label>
                        <input type="password" name="password" required="required" onChange={handleValidateChange} />
                        
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









