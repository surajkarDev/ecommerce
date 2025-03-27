import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login")) || false;
    if (!login) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear specific error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        formRef.current,
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          setIsSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log("Failed to send email.", error.text);
        }
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={8}>
          <div className="shadow-lg p-5 rounded-5">
            <h2 className="text-center">Contact Us</h2>
            {isSubmitted && (
              <Alert variant="success" onClose={() => setIsSubmitted(false)} dismissible>
                Your message has been sent successfully!
              </Alert>
            )}
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Submit"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
