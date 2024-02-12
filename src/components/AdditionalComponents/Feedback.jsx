import React, { useState } from 'react';
import './FeedbackForm.css';
import { toast, ToastContainer } from 'react-toastify';
import { useUser } from '../context/userContext';

const Feedback = () => {


    const { isLoggedIn } = useUser();

  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(feedback);
    // Clear the form after submission
    setFeedback({
      name: '',
      email: '',
      message: ''
    });

    setTimeout(() => {
        toast.success("Thank you for your Feedback!");
    }, 1000); 
  };

 if(isLoggedIn){
    return (
    
        <div className="feedback-container">
          <h2>Feedback Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={feedback.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={feedback.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" value={feedback.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
          <ToastContainer/>
        </div>
      )
    }
    else
    {
        return(
            <h1 style={{"textAlign":"center"}}>Please Login to continue</h1>
        )
    }
}

  

export default Feedback;
