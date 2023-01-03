import React, {Component} from "react";
import "./Form.css";
import {Link} from "react-router-dom";

export default class ForgotPassword extends Component {

    render() {
        return (
            <div className="form-container">
                <form className="form">
                    <div className="form-content">
                        <h3 className="form-title">Reset Password</h3>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input type="email" className="form-control mt-1" placeholder="Enter email address"/>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <Link to={"../email"} className="nav-link" className="btn btn-primary">Send Email</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}