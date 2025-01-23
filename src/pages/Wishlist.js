import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import PageHeader from "../components/pageHeader";
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    let login = JSON.parse(localStorage.getItem('login')) || false;
    if(!login){
      navigate('/');
    }
  },[]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Fetch wishlist data from local storage
    const fetchCart = JSON.parse(localStorage.getItem('cartItem')) || [];
    setCartData(fetchCart);
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (index) => {
    const updatedCart = cartData.filter((_, i) => i !== index);
    setCartData(updatedCart);
    localStorage.setItem('cartItem', JSON.stringify(updatedCart));
  };

  return (
    <>
      <PageHeader heading="Wishlist" linkName="Wishlist" link="/wishlist" />
      <section>
        <Container>
          <Row>
            <Col xs="12">
              <div className="wishlist-container">
                <h2>Your Wishlist</h2>
                <p>There are {cartData.length} products in this list</p>

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
                    {cartData.length > 0 ? (cartData.map((item, index) => (
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
                            <Button variant="success">Add to cart</Button>
                          ) : (
                            <Button variant="primary">Contact Us</Button>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => removeFromWishlist(index)}
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
