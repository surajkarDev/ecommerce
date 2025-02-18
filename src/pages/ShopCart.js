import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import PageHeader from "../components/pageHeader";
import '../css/shopcart.css';
import Alert from 'react-bootstrap/Alert';
import { Link,useNavigate } from "react-router-dom";
import { removeFromCart,addToCartCart } from '../redux/cart';
import { useDispatch,useSelector } from 'react-redux';

const ShopCart = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showMessage, setMessage] = useState('')
  const dispatch = useDispatch(); 
  const cartAllItemAll = useSelector(state => state.cartItemAll.cartItem) || [];

  const handleQuantityChange = (e,index) => {
    const updatedCartItem = { 
      ...cartAllItemAll[index], 
      quantity: e.target.value 
    };
    console.log("updatedCartItem",updatedCartItem)
    dispatch(addToCartCart(updatedCartItem))
  };

  const deleteCartData = (index) => {
    const updatedCart = cartAllItemAll[index]
    dispatch(removeFromCart(updatedCart))
    setMessage('Item Delete Successfully')
    setShowAlert(true)
    setTimeout(() => {
        setShowAlert(false)
    }, 3000);
  }

  const handleUpdateCart = () => {
    if(cartAllItemAll.length > 0){
      navigate('/checkout');
    }
  };

  useEffect(() => {
    let login = JSON.parse(localStorage.getItem('login')) || false
    if(!login){
      navigate('/');
    }
  },[]);
  return (
    <>
    {showAlert ? (
        <Alert variant="success" className='position-absolute w-50 alertstyle d-flex align-items-center gap-1 shadow' style={{ left: 0, right: 0, margin: 'auto',}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill me-1" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
           {showMessage}
        </Alert>
        ):""
    }
     
      <section className="shoopingCartSectionHeader">
        <PageHeader heading="Cart" linkName="Cart" link="/shopCart" />
      </section>
      <section className="shoopingCartSection">
        <Container className="cart-container">
          <h5 className="cart-title">There are {cartAllItemAll.length} products in your cart</h5>
          <Table responsive className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartAllItemAll.length > 0 ? cartAllItemAll.map((product,index) => (
                <tr key={product.id} className="cart-item-row">
                  <td className="cart-item">
                    <img src={product.img} alt={product.name} className="cart-item-image" />
                    <span className="cart-item-name">{product.name}</span>
                    <span className="cart-item-rating">★ 4.0</span>
                  </td>
                  <td>${Number(product.newPrice).toFixed(2)}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={product.quantity}
                      min="1"
                      className="cart-quantity-input"
                      onChange={(e) => handleQuantityChange(e,index)}
                    />
                  </td>
                  <td>${(Number(product.newPrice) * product.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="light" className="remove-btn" onClick={()=> deleteCartData(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className='text-center'>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Row className="cart-actions">
            <Col>
              {/* <Button variant="success" className="continue-shopping-btn">Continue Shopping</Button> */}
              <Link to="/home" className="fw-medium px-3 continue-shopping-btn btn text-white px-4">Continue Shopping</Link>
            </Col>
            <Col className="text-end">
              <Button variant="primary" className="update-cart-btn" onClick={handleUpdateCart}>
                Go To Checkout
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ShopCart;
