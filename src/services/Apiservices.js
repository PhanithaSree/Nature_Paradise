import axios from 'axios'

const registerBaseUrl = 'http://localhost:4000/api/user/register'

//post the userdata to database.

const postUser = async (user) => {
    const response = await axios.post(registerBaseUrl, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.status === 201) {
        console.log("User Posted Succesfully!!!!")
        console.log("Form Response" + response.data)
        return true;
    }
    else {
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
            console.log('User is validated');

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

export { postUser, validateUser, displayCart }