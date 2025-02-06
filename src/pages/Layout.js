import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, ListGroup,Form } from 'react-bootstrap';
import Footer from './Footer';

import { useSelector,useDispatch } from 'react-redux';
import { removeFromCart,addToCartCart } from '../redux/cart';

import logo from '../images/logo.png'

const Layout = () => {
  // redux fetch start
  const dispatch = useSelector(state => state.cartItemAll.cartItem) || []
  // redux fetch end

  //start 
  const removedispatch = useDispatch();
  const heandleremovecart = (index) => {
    console.log("index",index)
    const updatedCart = dispatch[index]
    removedispatch(removeFromCart(updatedCart))
  }
  //end 
  const navigate = useNavigate();
  const [cartitem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [toggleCart, settoggleCart] = useState(false);
  const [checkLogin , setLoginData] = useState(false);


  const getImageSrc = (img) => img;
  useEffect(() => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
      setCartItem(cartItems);
      console.log("Cart items retrieved:", cartItems);
    } catch (error) {
      console.error("Error fetching cart items from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartitem.reduce((accum, item) => accum + (Number(item.newPrice) || 0), 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
    console.log("cartitem",cartitem)
  }, [cartitem]);
  const toggleaCartdiv = () => {
    settoggleCart(!toggleCart)
  }
  const addProductQuantity = (e, index) => {
    const updateProductquentity = {
      ...dispatch[index],
      quantity: e.target.value 
    }
    removedispatch(addToCartCart(updateProductquentity))
  };
  
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
      setCartItem(cartItems);
  },[toggleCart]);

  const LogOut = () => {
    localStorage.setItem('login',false);
    navigate('/');
    const userLogin = JSON.parse(localStorage.getItem('login'));
    setLoginData(userLogin)
  }
  const checkLoginStatus = () => {
    const userLogin = JSON.parse(localStorage.getItem('login'));
    setLoginData(userLogin)
  }
  return (
    <>
      <Navbar expand="lg" className="py-lg-4 py-2 navbarMain">
        <Container className='py-2'>
          <Navbar.Brand as={Link} to="/" className='text-capitalize'>
          <img src={logo} alt="BuyFresh" width={150} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='order-1 order-lg-0'/>
          <Navbar.Collapse id="basic-navbar-nav" className='order-2 order-lg-0'>
            <Nav className="m-auto">
              {/* <Nav.Link as={Link} to="/" className="fw-medium px-3">Login</Nav.Link> */}
              <Nav.Link as={Link} to="/home" className="fw-medium px-3">Home</Nav.Link>
              <Nav.Link as={Link} to="/allproduct" className="fw-medium px-3">Shop</Nav.Link>
              <Nav.Link as={Link} to="/blogs" className="fw-medium px-3">Blogs</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="fw-medium px-3">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="cartData d-flex">
            <div className="cartDataCart">
              <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"  onMouseEnter={() => toggleaCartdiv()}>
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h.268c.474 0 .711 0 .905.085c.17.076.316.197.42.351c.12.174.163.407.248.871L7 16h10.422c.453 0 .68 0 .868-.08a.998.998 0 0 0 .415-.331c.12-.165.171-.385.273-.826v-.003l1.57-6.8v-.001c.154-.669.232-1.004.147-1.267a1.001 1.001 0 0 0-.44-.55C20.019 6 19.676 6 18.99 6H5.5M18 21a1 1 0 1 1 0-2a1 1 0 0 1 0 2M8 21a1 1 0 1 1 0-2a1 1 0 0 1 0 2"/>
              </svg>
              {/* {
                toggleCart ? ( */}
                  <div className="cart-dropdown-wrap cart-dropdown-hm2" onMouseLeave={() => toggleaCartdiv()}>
                    {dispatch.length > 0 ? (
                      <ListGroup variant="flush" className='cartboxhover overflow-y-auto'>
                        {dispatch.map((item, index) => (
                          <ListGroup.Item key={index} className="d-flex align-items-center p-0 mb-2">
                            <div className="shopping-cart-img">
                              <Link to="#">
                                <img alt={item.name} src={getImageSrc(item.img)} className="img-fluid" />
                              </Link>
                            </div>
                            <div className="shopping-cart-title ms-2">
                              <h6>
                                <Link to="#">{item.name}</Link>
                              </h6>
                              <h6>
                                <span>1 × </span>${item.newPrice} ({item.size}gm)
                              </h6>
                              <div className='quentityData mb-2'>
                                <Form.Control type="number" value={item.quantity} min="1" className="cart-quantity-input" onChange={(e)=> addProductQuantity(e,index)}/>
                              </div>
                            </div>
                            <div className="shopping-cart-delete ms-auto">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 36 36"
                                onClick={() => heandleremovecart(index)}
                              >
                                <path fill="currentColor" d="m19.61 18l4.86-4.86a1 1 0 0 0-1.41-1.41l-4.86 4.81l-4.89-4.89a1 1 0 0 0-1.41 1.41L16.78 18L12 22.72a1 1 0 1 0 1.41 1.41l4.77-4.77l4.74 4.74a1 1 0 0 0 1.41-1.41Z" className="clr-i-outline clr-i-outline-path-1" />
                                <path fill="currentColor" d="M18 34a16 16 0 1 1 16-16a16 16 0 0 1-16 16m0-30a14 14 0 1 0 14 14A14 14 0 0 0 18 4" className="clr-i-outline clr-i-outline-path-2" />
                                <path fill="none" d="M0 0h36v36H0z" />
                              </svg>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <p>No Data Available</p>
                    )}
                    <div className="shopping-cart-footer mt-3">
                      <h6 className="text-success d-flex justify-content-between">
                        Total <span className="text-black">${totalPrice.toFixed(2)}</span>
                      </h6>
                      <div className="shopping-cart-button mt-2">
                        <Button variant="outline-success" as={Link} to="/shopCart" className="me-2">
                          View cart
                        </Button>
                        <Button variant="success" as={Link} to="/checkout">
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                {/* ) :""
              } */}
              
            </div>
            <span className="ms-3">
              <Link as={Link} to="/wishlist" className='text-black'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m12 20.703l.343.667a.75.75 0 0 1-.686 0l-.003-.002l-.007-.003l-.025-.013a31 31 0 0 1-5.233-3.576C3.8 15.573 1 12.332 1 8.514v-.001C1 5.053 3.829 2.5 6.736 2.5C9.03 2.5 10.881 3.726 12 5.605C13.12 3.726 14.97 2.5 17.264 2.5C20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31 31 0 0 1-5.233 3.576l-.025.013l-.007.003l-.002.001ZM6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.7 29.7 0 0 0 4.566 3.175l.073.041l.073-.04c.271-.153.661-.38 1.13-.674c.94-.588 2.19-1.441 3.436-2.502c2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.751.751 0 0 1-1.422 0C10.537 5.389 8.841 4 6.736 4"/>
                </svg>
              </Link>
            </span>
            <span className="ms-3 userprofileIcon" onMouseEnter={()=>checkLoginStatus()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 15 15">
                <path fill="none" stroke="currentColor" strokeLinecap="square" d="M10.5 3.498a2.999 2.999 0 0 1-3 2.998a2.999 2.999 0 1 1 3-2.998Zm2 10.992h-10v-1.996a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3z" clipRule="evenodd"/>
              </svg>
              <ul className='p-0 list-unstyled userprofile'>
                {checkLogin ? (
                  <li onClick={()=>LogOut()}> Logout </li>
                    
                ) : (
                  <li onClick={()=> navigate('/')}> Login </li>
                )}
              </ul>
            </span>
          </div>
        </Container>
      </Navbar>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
