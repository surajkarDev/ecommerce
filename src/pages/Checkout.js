import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container, Card, Alert } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PageHeader from "../components/pageHeader";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Q7sQuGSASFgPjqw71uODwKONwfvZkfqTMNilUczTuutr3g5N85DoD6VUb9k4LNbyEsrxmyuBxDWcFTeWoYUidOz001J47qACp');

const CheckoutForm = () => {
  const navigate = useNavigate();
  useEffect(()=>{
      let login = JSON.parse(localStorage.getItem('login')) || false;
      if(!login){
        navigate('/');
      }
    },[]);
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'credit',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const fetchapi = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api");
      console.log("response", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    try {
      setIsProcessing(true);
      // Get client secret from the backend
      const response = await fetch('http://localhost:8080/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }), // Amount is in cents, e.g., $10.00
      });
  
      const data = await response.json();
      console.log("Backend Response: ", data);  // Log the response to check the data
      const { clientSecret } = data;
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zip,
            },
          },
        },
      });
  
      if (error) {
        setError(error.message);
      } else {
        setSuccess(`Payment successful: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.log(err); // Log any errors that occur
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  useEffect(() => {
    fetchapi();
  },[])
  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4">
        <Card.Header>Billing Information</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>Payment Information</Card.Header>
        <Card.Body>
          <Form.Group controlId="formPaymentMethod">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control
              as="select"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="paypal">PayPal</option>
            </Form.Control>
          </Form.Group>

          {formData.paymentMethod === 'credit' && (
            <Form.Group>
              <Form.Label>Card Details</Form.Label>
              <CardElement />
            </Form.Group>
          )}
        </Card.Body>
      </Card>

      <Button variant="primary" type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Complete Purchase'}
      </Button>
    </Form>
  );
};

const Checkout = () => {
  return (
    <main>
      <section className="shoopingCartSectionHeader">
        <PageHeader heading="Checkout" linkName="Checkout" link="/checkout" />
      </section>
      <section>
        <Container>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Container>
      </section>
    </main>
  );
};

export default Checkout;
