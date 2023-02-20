import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {Col, Row, Table} from "react-bootstrap";
import "./index.css";

export default function Index() {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const checkCookie = cookies.get("idUser");

    useEffect(() => {
        if (checkCookie) {
            navigate("/profile");
        }
    }, []);

    return (
        <div className="container md text-center our">
            <div className="half-half-image-text">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="col-12">
                                <h1>Our Mission</h1>
                            </div>
                            <div className="content">
                                <p>At Fluid Automotive, our purpose is to make automotive parts easily accessible for
                                    everyone. Working with our partner brands, we aim to retail the highest quality
                                    parts, whilst maintaining a high level of customer satisfaction.</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="img"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="half-half-image-text">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="img"></div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="col-12">
                                <h1>Our Mission</h1>
                            </div>
                            <div className="content">
                                <p>At Fluid Automotive, our purpose is to make automotive parts easily accessible for
                                    everyone. Working with our partner brands, we aim to retail the highest quality
                                    parts, whilst maintaining a high level of customer satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="half-half-image-text">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="col-12">
                                <h1>Our Mission</h1>
                            </div>
                            <div className="content">
                                <p>At Fluid Automotive, our purpose is to make automotive parts easily accessible for
                                    everyone. Working with our partner brands, we aim to retail the highest quality
                                    parts, whilst maintaining a high level of customer satisfaction.</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="img"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}