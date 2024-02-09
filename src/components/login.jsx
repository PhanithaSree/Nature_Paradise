// import React, { useState } from "react";
// import { postUser, validateUser } from '../services/Apiservices'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';



// export default function Login() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({
//         username: "",
//         email: "",
//         password: ""
//     })
//     const [authenticateUser, setAuthenticateUser] = useState({
//         email: "",
//         password: ""
//     })

//     const handleRegisterChange = (e) => {

//         let newUser = { ...user };
//         newUser[e.target.name] = e.target.value;
//         setUser(newUser);

//     }

//     const handleRegisterSubmit = (e) => {
//         e.preventDefault();
//         if (user.password.length < 6) {
//             alert("Password must be at least 6 characters long");
//             return;
//         }
//         postUser(user)
//             .then(() => {
//                 toast.success("Account created successfully!");
//                 setUser({ username: "", email: "", password: "" });
//             })
//             .catch(error => {
//                 console.error("Error creating account:", error);
//                 toast.error("Failed to create account. Please try again later.");
//             });
//     }

//     const handleValidateSubmit = async (e) => {
//         e.preventDefault();
//         // if (authenticateUser.password.length < 6) {
//         //     alert("Password must be at least 6 characters long");
//         //     return;
//         // }
//         try {
//             console.log(authenticateUser);
//             await validateUser(authenticateUser)
//             toast.success("Logged in successfully!");
//             setTimeout(() => navigate("/Home"), 4000); // after 4000 milliseconds goes to home page


//         } catch (error) {
//             console.error("Error validating user:", error);
//             toast.error("Login failed. Please try again.");
//         }



//     }



//     const handleValidateChange = (e) => {

//         let newUser = { ...authenticateUser };
//         newUser[e.target.name] = e.target.value;
//         console.log(e.target.value);

//         setAuthenticateUser(newUser);

//     }
//     return (

//         <div class="loginBlock">
//             <h3>AUTHENTICATION</h3>
//             <div class="createAccount">
//                 <form onSubmit={handleRegisterSubmit}>
//                     <h2>Add Account</h2>
//                     <p><label for="username">Name</label>
//                         <input type="text" name="username" onChange={handleRegisterChange}></input></p>

//                     <p><label for="email">Email  </label>
//                         <input type="email" name="email" required="required" onChange={handleRegisterChange} /></p>
//                     <p><label for="password">Password </label>
//                         <input type="password" name="password" required="required" onChange={handleRegisterChange} /></p>
//                     <p><a href="/Home"><input type="submit" value="Create Account" onClick={handleRegisterChange} /></a></p>
//                 </form>
//             </div>
//             <div class="alreadyUser">
//                 <form onSubmit={handleValidateSubmit}>
//                     <h2>Already a User??</h2>
//                     <p><label for="email">Email  </label>
//                         <input type="email" name="email" required="required" onChange={handleValidateChange} /></p>
//                     <p><label for="password">Password </label>
//                         <input type="password" name="password" required="required" onChange={handleValidateChange} /></p>
//                     <p><a href="/Home"><input type="submit" value="Login" /></a></p>
//                     <br />
//                     <br />
//                     <br />
//                     <br />

//                 </form>
//             </div>
//             <ToastContainer />

//         </div>

//     )

//}

import React, { useState } from "react";
import { postUser, validateUser } from '../services/Apiservices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi-browser';
// import { useAuth } from './Auth';
import { useEffect, useContext } from "react";
import { AuthProvider } from "../App";




export default function Login() {
    const { state, dispatch } = useContext(AuthProvider)


    const navigate = useNavigate();

    const [registerUser, setRegisterUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [authenticateUser, setAuthenticateUser] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({});
    const [errRes, setErrRes] = useState(null);


    // Step2: Define schema to validate user/form data
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

    // Step3: function to validate user/form data w.r.t schema
    const validate = () => {
        const errors = {}; //object type local variable
        console.log("###User", registerUser)
        const result = Joi.validate(registerUser, schema, {
            abortEarly: true,
        });
        console.log("JOi error " + JSON.stringify(result.error.details[0].path));
        // setting error messages to error properties
        // ex: errors[email] = "email is required";
        // ex: errors[password] = "password is required";
        if (result.error != null)
            for (let item of result.error.details) {
                errors[item.path[0]] = item.message;
            }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    const handleRegisterChange = (event) => {

        let tempUser = { ...registerUser };
        tempUser[event.target.name] = event.target.value;
        setRegisterUser(tempUser);

    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        // Step 4: call validate function to verify as per the schema
        //         user enetered details or not
        setErrors(validate());
        if (!errors) {
            const response = postUser(registerUser)
                .then(() => {
                    toast.success("Account created successfully!");
                    dispatch({
                        type: "LOGIN",
                        payload: {
                            isLoggedIn: true,
                            user: response.email
                        }
                    })
                    setRegisterUser({ username: "", email: "", password: "" });
                })
                .catch(error => {
                    console.error("Error creating account:", error);
                    toast.error("Failed to create account. Please try again later.");
                });
        }
        else {
            navigate('/Login');
        }
    }

    const handleValidateSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await validateUser(authenticateUser)
            console.log("Logged in ", state);

            console.log(JSON.stringify(response))
            dispatch({
                type: "LOGIN",
                payload: {
                    isLoggedIn: true,
                    user: response.email
                }
            })
            toast.success("Logged in successfully!");
            setTimeout(() => navigate("/Home"), 4000); // after 4000 milliseconds goes to home page


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

                    <p><label htmlFor="username">Name</label>
                        <input type="text" value={registerUser.username} name="username" onChange={handleRegisterChange}></input>
                        {errors && errors.username && <small style={{ "color": "red" }}>{errors.username}</small>}
                    </p>

                    <p><label htmlFor="email">Email  </label>
                        <input type="email" value={registerUser.email} name="email" required="required" onChange={handleRegisterChange} />
                        {errors && errors.email && <small style={{ "color": "red" }}>{errors.email}</small>}
                    </p>


                    <p><label for="password">Password </label>
                        <input type="password" value={registerUser.password} name="password" required="required" onChange={handleRegisterChange} />
                        {errors && errors.password && <small style={{ "color": "red" }}>{errors.password}</small>}
                    </p>

                    <p><a href="/Home"><input type="submit" value="Create Account" onClick={handleRegisterChange} /></a></p>
                </form>
            </div>
            <div class="alreadyUser">
                <form onSubmit={handleValidateSubmit}>
                    <h2>Already a User??</h2>
                    <p><label for="email">Email  </label>
                        <input type="email" name="email" required="required" onChange={handleValidateChange} /></p>
                    <p><label for="password">Password </label>
                        <input type="password" name="password" required="required" onChange={handleValidateChange} /></p>
                    <p><a href="/Home"><input type="submit" value="Login" /></a></p>
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






