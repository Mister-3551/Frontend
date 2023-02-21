import React from "react";
import {Col, Container, Navbar} from "react-bootstrap";

export default function Footer() {
    let fullYear = new Date().getFullYear();

    return (
        <Navbar fixed="bottom" bg="lights" variant="dark">
            <Container>
                <Col className="text-center text-muted">
                    <div>
                        {fullYear} - {fullYear+1}, All Rights Reserved by Gašper Pintar
                    </div>
                </Col>
            </Container>
        </Navbar>
    );
}