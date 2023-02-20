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
        <div>
            <section id="hero" className="hero d-flex align-items-center section-bg">
                <div className="container">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                            <h2 data-aos="fade-up">Enjoy Your Healthy<br/>Delicious Food</h2>
                            <p data-aos="fade-up" data-aos-delay="100">Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.</p>
                            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                                <a href="#book-a-table" className="btn-book-a-table">Book a Table</a>
                                <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle"></i><span>Watch Video</span></a>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
                            <img src="assets/img/hero-img.png" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="300"/>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="about">
                <div className="container" data-aos="fade-up">

                    <div className="section-header">
                        <h2>About Us</h2>
                        <p>Learn More <span>About Us</span></p>
                    </div>

                    <div className="row gy-4">
                        <div className="col-lg-7 position-relative about-img"
                             data-aos="fade-up"
                             data-aos-delay="150">
                            <div className="call-us position-absolute">
                                <h4>Book a Table</h4>
                                <p>+1 5589 55488 55</p>
                            </div>
                        </div>
                        <div className="col-lg-5 d-flex align-items-end" data-aos="fade-up" data-aos-delay="300">
                            <div className="content ps-0 ps-lg-5">
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <ul>
                                    <li><i className="bi bi-check2-all"></i> Ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </li>
                                    <li><i className="bi bi-check2-all"></i> Duis aute irure dolor in reprehenderit in
                                        voluptate velit.
                                    </li>
                                    <li><i className="bi bi-check2-all"></i> Ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta
                                        storacalaperda mastiro dolore eu fugiat nulla pariatur.
                                    </li>
                                </ul>
                                <p>
                                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                    non proident
                                </p>

                                <div className="position-relative mt-4">
                                    <img src="assets/img/about-2.jpg" className="img-fluid" alt=""/>
                                        <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                                           className="glightbox play-btn"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="why-us" className="why-us section-bg">
                <div className="container" data-aos="fade-up">

                    <div className="row gy-4">

                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="why-box">
                                <h3>Why Choose Yummy?</h3>
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
                                        <i className="bi bi-clipboard-data"></i>
                                        <h4>Corporis voluptates officia eiusmod</h4>
                                        <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut
                                            aliquip</p>
                                    </div>
                                </div>

                                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                                    <div
                                        className="icon-box d-flex flex-column justify-content-center align-items-center">
                                        <i className="bi bi-gem"></i>
                                        <h4>Ullamco laboris ladore pan</h4>
                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                            deserunt</p>
                                    </div>
                                </div>

                                <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                                    <div
                                        className="icon-box d-flex flex-column justify-content-center align-items-center">
                                        <i className="bi bi-inboxes"></i>
                                        <h4>Labore consequatur incidid dolore</h4>
                                        <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis
                                            facere</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <section id="chefs" className="chefs section-bg">
                <div className="container" data-aos="fade-up">

                    <div className="section-header">
                        <h2>Chefs</h2>
                        <p>Our <span>Proffesional</span> Chefs</p>
                    </div>

                    <div className="row gy-4">

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up"
                             data-aos-delay="100">
                            <div className="chef-member">
                                <div className="member-img">
                                    <img src="assets/img/chefs/chefs-1.jpg" className="img-fluid" alt=""/>
                                        <div className="social">
                                            <a href=""><i className="bi bi-twitter"></i></a>
                                            <a href=""><i className="bi bi-facebook"></i></a>
                                            <a href=""><i className="bi bi-instagram"></i></a>
                                            <a href=""><i className="bi bi-linkedin"></i></a>
                                        </div>
                                </div>
                                <div className="member-info">
                                    <h4>Walter White</h4>
                                    <span>Master Chef</span>
                                    <p>Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae
                                        aut. Ipsum exercitationem iure minima enim corporis et voluptate.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up"
                             data-aos-delay="200">
                            <div className="chef-member">
                                <div className="member-img">
                                    <img src="assets/img/chefs/chefs-2.jpg" className="img-fluid" alt=""/>
                                        <div className="social">
                                            <a href=""><i className="bi bi-twitter"></i></a>
                                            <a href=""><i className="bi bi-facebook"></i></a>
                                            <a href=""><i className="bi bi-instagram"></i></a>
                                            <a href=""><i className="bi bi-linkedin"></i></a>
                                        </div>
                                </div>
                                <div className="member-info">
                                    <h4>Sarah Jhonson</h4>
                                    <span>Patissier</span>
                                    <p>Quo esse repellendus quia id. Est eum et accusantium pariatur fugit nihil minima
                                        suscipit corporis. Voluptate sed quas reiciendis animi neque sapiente.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up"
                             data-aos-delay="300">
                            <div className="chef-member">
                                <div className="member-img">
                                    <img src="assets/img/chefs/chefs-3.jpg" className="img-fluid" alt=""/>
                                        <div className="social">
                                            <a href=""><i className="bi bi-twitter"></i></a>
                                            <a href=""><i className="bi bi-facebook"></i></a>
                                            <a href=""><i className="bi bi-instagram"></i></a>
                                            <a href=""><i className="bi bi-linkedin"></i></a>
                                        </div>
                                </div>
                                <div className="member-info">
                                    <h4>William Anderson</h4>
                                    <span>Cook</span>
                                    <p>Vero omnis enim consequatur. Voluptas consectetur unde qui molestiae deserunt.
                                        Voluptates enim aut architecto porro aspernatur molestiae modi.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">

                    <div className="section-header">
                        <h2>Contact</h2>
                        <p>Need Help? <span>Contact Us</span></p>
                    </div>

                    <div className="mb-3">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.8550287859675!2d15.156853615827417!3d45.79413201938775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764ffecf5ac734f%3A0x24c2191f1950c228!2s%C5%A0olski%20center%20Novo%20mesto!5e0!3m2!1ssl!2ssi!4v1676923848476!5m2!1ssl!2ssi"
                            allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade" className="google-maps"></iframe>
                    </div>

                    <div className="row gy-4">

                        <div className="col-md-6">
                            <div className="info-item  d-flex align-items-center">
                                <i className="icon bi bi-map flex-shrink-0"></i>
                                <div>
                                    <h3>Our Address</h3>
                                    <p>A108 Adam Street, New York, NY 535022</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="info-item d-flex align-items-center">
                                <i className="icon bi bi-envelope flex-shrink-0"></i>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>contact@example.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="info-item  d-flex align-items-center">
                                <i className="icon bi bi-telephone flex-shrink-0"></i>
                                <div>
                                    <h3>Call Us</h3>
                                    <p>+1 5589 55488 55</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="info-item  d-flex align-items-center">
                                <i className="icon bi bi-share flex-shrink-0"></i>
                                <div>
                                    <h3>Opening Hours</h3>
                                    <div><strong>Mon-Sat:</strong> 11AM - 23PM;
                                        <strong>Sunday:</strong> Closed
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <form action="forms/contact.php" method="post" role="form" className="php-email-form p-3 p-md-4">
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" id="name"
                                   placeholder="Your Name" required/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" name="email" id="email"
                                   placeholder="Your Email" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="subject" id="subject"
                                   placeholder="Subject" required/>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" name="message" rows="5" placeholder="Message"
                                      required/>
                        </div>
                        <div className="my-3">
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message">Your message has been sent. Thank you!</div>
                        </div>
                        <div className="text-center">
                            <button type="submit">Send Message</button>
                        </div>
                    </form>
                </div>
            </section>

            <footer id="footer" className="footer">

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
    )
};