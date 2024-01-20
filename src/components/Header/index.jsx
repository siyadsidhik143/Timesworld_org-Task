import React, { useState } from 'react'
import { Navbar, Nav, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { activeHead } from './HeaderSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { active } = useSelector((state) => state.activeTab)

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const logout = () => {
        sessionStorage.removeItem('auth')
        navigate('/login')
    }

    return (
        <Navbar expand="lg" variant="light">
            <Navbar.Brand href="#">Countries</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
            <Navbar.Collapse id="basic-navbar-nav" className={expanded ? 'show' : ''}>
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link
                            className={active === 'all' ? 'active' : ''}
                            onClick={() => dispatch(activeHead('all'))}
                        >All</Nav.Link>
                        <Nav.Link className={active === 'asia' ? 'active' : ''}
                            onClick={() => dispatch(activeHead('asia'))}
                        >Asia</Nav.Link>
                        <Nav.Link className={active === 'europe' ? 'active' : ''}
                            onClick={() => dispatch(activeHead('europe'))}
                        >Europe</Nav.Link>
                        <Nav.Link
                            onClick={() => logout()}
                        >Logout</Nav.Link>
                    </Nav>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default Header
