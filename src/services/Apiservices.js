import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const registerBaseUrl = 'http://localhost:4000/api/user/register'


//post the userdata to database.

const postUser = async (user) => {
    const response = await axios.post(registerBaseUrl, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.status === 201) 
    {
        console.log("User Posted Succesfully!!!!")
        console.log("Form Response" + response.data)
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify(response.data))
        return true;
    }
    else 
    {
        return false;
    }
}

const loginBaseUrl = 'http://localhost:4000/api/user/validate';

const validateUser = async (user) => {
   
    try {
        console.log("Before get " + JSON.stringify(user))
        // Make a POST request to the login endpoint with user data
        const response = await axios.post(loginBaseUrl, user);
        console.log("User " + JSON.stringify(response));
        // Check if the response indicates a successful validation
        if (response.status === 200) {
            // User is validated
            setTimeout(() => {
                toast.success("Logged in successfully!");
            }, 1000)
            localStorage.setItem("user", JSON.stringify({ ...response.data[0], token: response.data.token }))

            return true;
        } else if(response.status === 404) {
            // Validation failed
            
            console.log('User validation failed');
            return false;
        }
    } catch (error) 
    {
        // Handle network errors or other issues
        setTimeout(() => {
            toast.error("Failed to login.");
        }, 1000);
        console.error('Error validating user:', error);
        return false;
    }
};


const updateBaseUrl = 'http://localhost:4000/api/user/updateUser';

const updateUser = async (user, productId) => {
    try {
        console.log("Before get " + JSON.stringify(user))
        // Make a POST request to the login endpoint with user data
        const response = await axios.post(updateBaseUrl, {
            email: user.email,
            token: user.token,
            productId
        });
        console.log("broke: " + response);
        // Check if the response indicates a successful validation
        if (response.status === 200) {
            // User is validated
            localStorage.removeItem("user")
            localStorage.setItem("user", JSON.stringify({ ...response.data["_doc"], token: response.data.token }))

            return true;
        } else {
            // Validation failed
            console.log('User validation failed');
            return false;
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error validating user:', error);
        return false;
    }
};

const deleteFromCartBaseUrl = 'http://localhost:4000/api/user/removeProductFromCart';

const deleteFromCart = async (user, productId) => {
    try {
        console.log("Before get " + JSON.stringify(user))
        // Make a POST request to the login endpoint with user data
        const response = await axios.post(deleteFromCartBaseUrl, {
            email: user.email,
            token: user.token,
            productId
        });
        console.log("broke: " + response);
        // Check if the response indicates a successful validation
        if (response.status === 200) {
            // User is validated
            localStorage.removeItem("user")
            localStorage.setItem("user", JSON.stringify({ ...response.data["_doc"], token: response.data.token }))

            return true;
        } else {
            // Validation failed
            console.log('User validation failed');
            return false;
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error validating user:', error);
        return false;
    }
};

const addUserAddressBaseUrl = 'http://localhost:4000/api/user/address'

const addUserAddress = async (address,email) => {
    console.log(email?.email);
    const userEmail = email?.email
    const response = await axios.put(`${addUserAddressBaseUrl}/${userEmail}`,address)

    if(response.status === 200){
        console.log("Added address details successfully")
    }
    else{
        console.log("Failed to add address details")
    }
}

const cartUrl = "http://localhost:4000/api/product/getProductById"

const displayCart = async (id) => {

    const response = await axios.get(`${cartUrl}?productId=${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.status === 200) {
        console.log("Get Success Response" + response.data)
        const productDetails = response.data;
        return productDetails;
    }
    else {
        return false;
    }
}


// empty the cart after checkout

const emptyCartUrl = "http://localhost:4000/api/user/emptyCart";

const emptyCart = async() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.put(`${emptyCartUrl}?email=${user?.email}`)

}

const handleStripeToken = (totalAmount, token) => {
    try {
      axios.post("http://localhost:4000/api/stripe/pay", {
        token: token.id,
        amount: totalAmount,
      })
      window.location.href = 'http://localhost:3000/thankYou'
    }
     catch (error) {
      console.log(error)
    }
  }
 
  const tokenHandler = (token) => {
    handleStripeToken(100, token)
  }

<ToastContainer />

export { postUser, validateUser, displayCart, updateUser, deleteFromCart, addUserAddress, emptyCart, handleStripeToken, tokenHandler }