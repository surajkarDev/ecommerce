import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Table, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import PageHeader from "../components/pageHeader";
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist,addToCart } from '../redux/cart';
import Alert from 'react-bootstrap/Alert';

const Wishlist = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  // const [cartData, setCartData] = useState([]);
  // const reduxCartData = useSelector(state => state.cartItemAll.cartItem) || []
  const wishlistList = useSelector(state => state.cartItemAll.wishlist) || []
  const dispatch = useDispatch();

 

  // useEffect(() => {
  //   // Fetch wishlist data from local storage
  //   const fetchCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  //   setCartData(fetchCart);
  // }, []);

  
  // Remove item from wishlist
  const removeFromWishlistfun = (index) => {
    if (index < 0 || index >= wishlistList.length) return;
    const cartfilter = wishlistList[index];
    dispatch(removeFromWishlist(cartfilter))
  };

  const gotoContact = () => {
    navigate('/contact');
  }
  const addTocartCommon = (index) => {
    const product = {...wishlistList[index]};
        product.quantity = 1;
        // product.size = 50
        dispatch(addToCart(product))
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
  }
  useEffect(()=>{
    let login = JSON.parse(localStorage.getItem('login')) || false;
    if(!login){
      navigate('/');
    }
  },[]);
  
  return (
    <>
      <PageHeader heading="Wishlist" linkName="Wishlist" link="/wishlist" />
      {showAlert && (
        <Alert
          variant="success"
          className="position-fixed w-50 alertstyle d-flex align-items-center gap-1 shadow"
          style={{ left: 0, right: 0, margin: 'auto', top: "10%", zIndex: "9999" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill me-1" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
          Item Added Successfully
        </Alert>
      )}
      <section>
        <Container>
          <Row>
            <Col xs="12">
              <div className="wishlist-container">
                <h2>Your Wishlist</h2>
                <p>There are {wishlistList.length} products in this list</p>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Stock Status</th>
                      <th>Action</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistList.length > 0 ? (wishlistList.map((item, index) => (
                      <tr key={index}>
                        <td>
                         <div className='d-flex'>
                            <img src={item.img} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                            <div>
                              {item.name} <br />
                              <span>⭐ {item.rating}</span>
                            </div>
                         </div>
                        </td>
                        <td>${item.newPrice}</td>
                        <td>
                          {item.stock === 'Out of Stock' ? (
                            <Badge bg="danger">Out of Stock</Badge>
                          ) : item.stock === 'In Stock' ? (
                            <Badge bg="success">In Stock</Badge>
                          ): '' }
                        </td>
                        <td>
                          {item.stock === 'In Stock' ? (
                            <Button variant="success" onClick={()=>addTocartCommon(index)}>Add to cart</Button>
                          ) : (
                            <Button variant="primary" onClick={()=> gotoContact()}>Contact Us</Button>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => removeFromWishlistfun(index)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))): (
                      <tr>
                        <td colSpan={5} className='text-center'>
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wishlist;
