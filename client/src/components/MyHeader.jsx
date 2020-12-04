import React from 'react';
import Navbar from 'react-bootstrap/cjs/Navbar';
import { Nav } from 'react-bootstrap';

export default function MyHeader() {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/unbranded">Unbranded</Nav.Link>
                    <Nav.Link href="/branded">Branded</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}
