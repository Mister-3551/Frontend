import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import AOS from "aos";
import "aos/dist/aos.css";

export default function News() {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const checkCookie = cookies.get("sessionToken");

    useEffect(() => {
        if (checkCookie) {
            navigate("/profile");
        }

        AOS.init({});
        window.scrollTo(0, 0);
    });

    return (
        <div>
            <section id="hero" className="hero d-flex align-items-center section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                            <h2 data-aos="fade-up">Game news</h2>
                            <p data-aos="fade-up" data-aos-delay="100">Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.</p>
                            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                                <a href="#download" className="btn-book-a-table">Download</a>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
                            <img src="https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="img-fluid" alt=""/>
                        </div>
                    </div>
                </div>
            </section>

            <section id="download" className="why-us section-bg">
                <div className="container" data-aos="fade-up">

                    <div className="row gy-4">

                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="why-box">
                                <h3>Download <br/> "GAME NAME"</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                                    Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel
                                    necessitatibus optio ad corporis.
                                </p>
                                <div className="text-center">
                                    <a href="#" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 d-flex align-items-center">
                            <div className="row gy-4">

                                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="200">
                                    <div
                                        className="icon-box d-flex flex-column justify-content-center align-items-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/71/71753.png" alt="" className="us-image"/>
                                        <h4>Windows</h4>
                                        <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut
                                            aliquip</p>
                                        <div className="text-center">
                                            <a href="#" className="more-btn">Download</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                                    <div
                                        className="icon-box d-flex flex-column justify-content-center align-items-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/25/25719.png" alt="" className="us-image"/>
                                        <h4>Linux</h4>
                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                            deserunt</p>
                                        <div className="text-center">
                                            <a href="#" className="more-btn">Download</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                                    <div
                                        className="icon-box d-flex flex-column justify-content-center align-items-center">
                                        <img src="https://cdn-icons-png.flaticon.com/512/61/61120.png" alt="" className="us-image"/>
                                        <h4>Android</h4>
                                        <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis
                                            facere</p>
                                        <div className="text-center">
                                            <a href="#" className="more-btn">Download</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <footer id="footer" className="footer container-fluid">

                <div className="container">
                    <div className="row gy-3">
                        <div className="col-lg-3 col-md-6 d-flex">
                            <i className="bi bi-geo-alt icon"></i>
                            <div>
                                <h4>Address</h4>
                                <p>
                                    A108 Adam Street <br/>
                                    New York, NY 535022 - US<br/>
                                </p>
                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6 footer-links d-flex">
                            <i className="bi bi-telephone icon"></i>
                            <div>
                                <h4>Reservations</h4>
                                <p>
                                    <strong>Phone:</strong> +1 5589 55488 55<br/>
                                    <strong>Email:</strong> info@example.com<br/>
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links d-flex">
                            <i className="bi bi-clock icon"></i>
                            <div>
                                <h4>Opening Hours</h4>
                                <p>
                                    <strong>Mon-Sat: 11AM</strong> - 23PM<br/>
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Follow Us</h4>
                            <div className="social-links d-flex">
                                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Yummy</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}