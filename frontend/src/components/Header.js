import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import './style.css';


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }


    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

   




    return (
        <div>
              <Nav defaultActiveKey="/home" as="ul" className="bg-dark">
      <Nav.Item as="li">
        <Nav.Link href="/home" className="text-white">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" className="text-white">Travel</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2" className="text-white" >Business</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" className="text-white">Climate</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2" className="text-white" >Movie</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" className="text-white">Travel</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2" className="text-white" >Business</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" className="text-white">Climate</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2" className="text-white" >Movie</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" className="text-white">Travel</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2" className="text-white" >Business</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" className="text-white">Climate</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2" className="text-white" >Movie</Nav.Link>
      </Nav.Item>
    </Nav>
    <hr></hr>
            <Navbar className="navbar-light bg-light pt-0 pb-0 shadow" expand="lg"  collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>

                        <Navbar.Brand className="mr-0 mr-md-4">

                            <div>
                                <div className="text-center " > 
                                
                                {/* <img src="https://mpng.subpng.com/20180512/rte/kisspng-beauty-parlour-cosmetics-make-up-artist-royalty-fr-5af6a1f05d3e73.6847260815261127523819.jpg" heigth="50" width="50"></img> */}

                                <i class="fas fa-laptop-house"></i></div>
                                <div className="text-center">


                                    <span class="text-info "> <b>B</b></span>
                                    <span className="text-danger">B</span>
                                    <span className="text-success">C</span>
                              
                                    <span class="text-info ">n</span>
                                    <span className="text-danger">e</span>
                                    <span className="text-success">w</span>
                                    <span className="text-warning">s</span> 
                                    
                                    
                                   
                                </div>
                            </div>





                        </Navbar.Brand>
                        
                    </LinkContainer>
                     
                    <LinkContainer to='/cart' className="text-white active mr-0 mr-md-4">
                        <Nav.Link>
                            <i className="fas fa-shopping-cart ct"></i> cart <span class="badge badge-info ct3">{cartItems.length > 0 ? (cartItems.reduce((acc, item) => acc + item.qty, 0)) : null}</span></Nav.Link>
                    </LinkContainer>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto">


                            {userInfo && userInfo.firstName ? (
                                <>
                                    <Image src={`http://localhost:4000/${userInfo.profile_pic}`} width={40}
                                        height={40} rounded />
                                    <NavDropdown title={userInfo.firstName} id='username' className="active">
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                    </NavDropdown>
                                </>

                            ) : (<>

                                <LinkContainer to='/register2'>
                                    <Nav.Link><i className="fas fa-user"></i>Register An Account </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            </>
                            )}


                            {userInfo && userInfo.isAdmin ? (
                                <>
                                    <LinkContainer to='/dashboard'>
                                        <Nav.Link>Dashboard</Nav.Link>
                                    </LinkContainer>
                                </>

                            ) : null}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </div>
    )
}

export default Header
