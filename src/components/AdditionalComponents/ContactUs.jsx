import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 
export default function Contact() {
    const form = useRef();
 
    const [userConcern, setUserConcern] = useState('');
 
    const setConcern = (concern) => {
        setUserConcern(concern);
    };
 
    const sendEmail = (e) => {
        e.preventDefault();
 
        emailjs
            .sendForm('service_dvhiqzf', 'template_27s4e1k', form.current, {
                publicKey: 'OYtiJTjsHFke9LtdV',
                user_concern: userConcern
            })
            .then(
                (result) => {
                    console.log('SUCCESS MESSAGE SENT !');
                    console.log(result.text);
                    toast.success('Your message has been sent. We will contact you soon.');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                }
            );
    };
 
    return (
        <div class="containerblock">
            <h1>CONTACT US</h1>
            <form ref={form} onSubmit={sendEmail}>
                <div className="contact">
                    <div class="name">
                        <label>Name</label>
                        <input type="text" name="user_name" />
                    </div>
                    <div class="email">
                        <label>Email</label>
                        <input type="email" name="user_email" />
                    </div>
 
                </div>
                <div className="buttonContainer">
                    {/* Each button sets a different concern when clicked */}
                    <button type="button" onClick={() => setConcern('Orders Related')}>Orders Related</button>
                    <button type="button" onClick={() => setConcern('Payment related')}>Payment related</button>
                    <button type="button" onClick={() => setConcern('Delivery related')}>Delivery related</button>
                    <button type="button" onClick={() => setConcern('Product related')}>Product related</button>
                    {/* Add more buttons for other concerns */}
                </div>
                <div className="contact">
                    <div>
                        <label>Concern Regarding</label>
                        <input type="text" name="user_concern" value={userConcern} readOnly />
                    </div>
                    <div class="classmessage">
                        <label>Message</label>
                        <textarea name="message" />
                    </div>
                </div>
 
                <input type="submit" value="Send" />
                <ToastContainer />
            </form>
        </div>
    );
}