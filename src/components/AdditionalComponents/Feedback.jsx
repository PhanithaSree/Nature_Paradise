import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
 
export default function Feedback() {
    return (
        <div className="feedback">
            <h2>Customer Satisfaction Survey</h2>
            <div className="survey" >
                <h4>Please rate your satisfaction with...</h4>
                <form>
                    <table className="table" >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Highly Satisfied</th>
                                <th>Satisfied</th>
                                <th>Neither Satisfied nor Dissatisfied</th>
                                <th>Dissatisfied</th>
                                <th>Highly Dissatisfied</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="alternateRows">
                                <td>Speed of Delivery</td>
                                <td><input type="radio" name="speed" /></td>
                                <td><input type="radio" name="speed" /></td>
                                <td><input type="radio" name="speed" /></td>
                                <td><input type="radio" name="speed" /></td>
                                <td><input type="radio" name="speed" /></td>
 
                            </tr>
                            <tr>
                                <td>Product Quality</td>
                                <td><input type="radio" name="quality" /></td>
                                <td><input type="radio" name="quality" /></td>
                                <td><input type="radio" name="quality" /></td>
                                <td><input type="radio" name="quality" /></td>
                                <td><input type="radio" name="quality" /></td>
 
                            </tr>
                            <tr className="alternateRows">
                                <td>Order Process</td>
                                <td><input type="radio" name="order" /></td>
                                <td><input type="radio" name="order" /></td>
                                <td><input type="radio" name="order" /></td>
                                <td><input type="radio" name="order" /></td>
                                <td><input type="radio" name="order" /></td>
 
                            </tr>
                            <tr>
                                <td>Website Usability</td>
                                <td><input type="radio" name="website" /></td>
                                <td><input type="radio" name="website" /></td>
                                <td><input type="radio" name="website" /></td>
                                <td><input type="radio" name="website" /></td>
                                <td><input type="radio" name="website" /></td>
 
                            </tr>
                            <tr className="alternateRows">
                                <td>Overall Experience</td>
                                <td><input type="radio" name="Experience" /></td>
                                <td><input type="radio" name="Experience" /></td>
                                <td><input type="radio" name="Experience" /></td>
                                <td><input type="radio" name="Experience" /></td>
                                <td><input type="radio" name="Experience" /></td>
 
                            </tr>
                        </tbody>
                    </table>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}