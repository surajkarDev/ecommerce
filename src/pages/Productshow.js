import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Button, Image, Badge, Form, InputGroup } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
// import '../css/product.css'; // Import the custom CSS
import { useLocation,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addToCartShow, addToWishlist} from '../redux/cart';
const Productshow = () => {
  const dispatech = useDispatch();
  

  const navigate = useNavigate()
  const location = useLocation();
  const { data: myArray } = location.state || {}; // Get the array from state
  const [showAlert, setShowAlert] = useState(false);
  const [productquentity,setProductQuentity] = useState(1);
  const [showMessage, setMessage] = useState('')
  const [productSize,setProductSize] = useState(50);
  const cartStore = useSelector(state => state.cartItemAll.cartItem)

  const quentity = (e) => {
    const productQuentity = e.target.value
    setProductQuentity(productQuentity);
    console.log("productquentity",productquentity)
  }

  const heandleAddToCart = (showarray) => {
    let showarrayAll = {...showarray}
    showarrayAll.quentity = productquentity
    showarrayAll.size = productSize
    console.log("showarrayAll",showarrayAll)
    // return
    dispatech(addToCartShow(showarrayAll))
    setMessage('Item Add Successfully')
    setShowAlert(true)
    setTimeout(() => {
        setShowAlert(false)
    }, 3000);
  }
  
  const setProductSizeAll = (size) => {
    let addtoCart = JSON.parse(localStorage.getItem('cartItem')) || []
    let quantity = 1
    setProductSize(size);
    if(addtoCart.length > 0){
      addtoCart.map((x,index) => {
        if(x.size === size && x.name === myArray.name){
          quantity = x.quantity
        }
      })
    }
    setProductQuentity(quantity)
  }
  const heandlewishlist = (array) => {
    let wishlistItem = {...array}
    wishlistItem.quantity = productquentity
    wishlistItem.size = productSize
    console.log("wishlistItem",wishlistItem)
    dispatech(addToWishlist(wishlistItem));
    setMessage('Item Add to Wishlist Successfully')
    setShowAlert(true)
    setTimeout(() => {
        setShowAlert(false)
    }, 3000);
  }
  useEffect(() => {
    console.log("myArray",myArray)
    let login = JSON.parse(localStorage.getItem('login')) || false;
    let cartData = JSON.parse(localStorage.getItem('cartItem')) || []
    if(!login){
      navigate('/');
    }
    // Prepopulate quantity if the product is already in the cart
    const existingProduct = cartData.find(item => item.name === myArray?.name);
    if (existingProduct) {
      setProductQuentity(existingProduct.quantity);
    }
  },[navigate, myArray]);
  return (
    <Container className="product-page">
      <Row>
      {showAlert ? (
        <Alert variant="success" className='position-absolute w-50 alertstyle d-flex align-items-center gap-1 shadow' style={{ left: 0, right: 0, margin: 'auto',}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill me-1" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
           {showMessage}
        </Alert>
        ):""
    }
        {/* Product Image Section */}
        {
          myArray ? (
            <Col md={5} className="product-image">
              <Image 
                src={myArray.img} // Replace with your product image
                alt="Product Image"
                fluid
              />
            </Col>
          ) : ""
        }
        

        {/* Product Details Section */}
        {myArray ? (
        <Col md={7} className="product-details">
          {/* Sale Badge */}
          <Badge className="sale-badge">Sale Off</Badge>
          <h2 className="product-title">{myArray.name}</h2>
          <p className="product-rating">⭐⭐⭐⭐⭐ (32 reviews)</p>
          
          {/* Price */}
          <h3 className="product-price">
            {myArray.newPrice} <span className="discount-price"><del>{(myArray.newPrice*1.5).toFixed(2)}</del></span>
          </h3>
          <p className="discount-info">26% Off</p>

          {/* Product Description */}
          <p className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rem officia...</p>

          {/* Size/Weight Selector */}
          <div className="size-selector mb-3">
            <span>Size / Weight: </span>
            {
              myArray?.size?.map((x, index) => (
                <Button variant="outline-secondary" className={productSize === x ? 'size-button selected' : 'size-button'} key={index} onClick={() => setProductSizeAll(x)}>{x}g</Button>
              ))
            }
            {/* <Button variant="outline-secondary" className="size-button" onClick={() => setProductSizeAll(50)}>50g</Button>
            <Button variant="success" className="size-button selected" onClick={() => setProductSizeAll(60)}>60g</Button>
            <Button variant="outline-secondary" className="size-button" onClick={() => setProductSizeAll(80)}>80g</Button>
            <Button variant="outline-secondary" className="size-button" onClick={() => setProductSizeAll(100)}>100g</Button>
            <Button variant="outline-secondary" className="size-button" onClick={() => setProductSizeAll(150)}>150g</Button> */}
          </div>

          {/* Quantity Selector and Add to Cart */}
          <div className="quantity-cart">
            <InputGroup className="quantity-input w-25">
              <Form.Control type="number" value={productquentity} min="1" onChange={(e)=>quentity(e)} />
            </InputGroup>
            <Button variant="success" className="add-to-cart" onClick={()=>heandleAddToCart(myArray)}>Add to Cart</Button>
            <Button variant="outline-secondary" className="wishlist-button" onClick={()=>heandlewishlist(myArray)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m12 20.703l.343.667a.75.75 0 0 1-.686 0l-.003-.002l-.007-.003l-.025-.013a31 31 0 0 1-5.233-3.576C3.8 15.573 1 12.332 1 8.514v-.001C1 5.053 3.829 2.5 6.736 2.5C9.03 2.5 10.881 3.726 12 5.605C13.12 3.726 14.97 2.5 17.264 2.5C20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31 31 0 0 1-5.233 3.576l-.025.013l-.007.003l-.002.001ZM6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.7 29.7 0 0 0 4.566 3.175l.073.041l.073-.04c.271-.153.661-.38 1.13-.674c.94-.588 2.19-1.441 3.436-2.502c2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.751.751 0 0 1-1.422 0C10.537 5.389 8.841 4 6.736 4"/>
                </svg>
            </Button>
            {/* <Button variant="outline-secondary" className="compare-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
            </Button> */}
          </div>

          {/* Product Info */}
          <Row className="product-info">
            <Col><strong>Type:</strong> Organic</Col>
            <Col><strong>SKU:</strong> FWM15VKT</Col>
          </Row>
          <Row className="product-info">
            <Col><strong>MFG:</strong> Jun 4, 2024</Col>
            <Col><strong>Tags:</strong> Snack, Organic, Brown</Col>
          </Row>
          <Row className="product-info">
            <Col><strong>Life:</strong> 70 days</Col>
            <Col><strong>Stock:</strong> 8 Items In Stock</Col>
          </Row>
        </Col>
        ) : ''}
      </Row>

      {/* Related Products Section */}
      <Row className="related-products">
        <Col>
          <h4>Related Products</h4>
          <div className="related-products-carousel">
            <Image 
              src="https://via.placeholder.com/100" 
              roundedCircle 
              className="related-product-img" 
            />
            <Image 
              src="https://via.placeholder.com/100" 
              roundedCircle 
              className="related-product-img" 
            />
            <Image 
              src="https://via.placeholder.com/100" 
              roundedCircle 
              className="related-product-img" 
            />
            <Image 
              src="https://via.placeholder.com/100" 
              roundedCircle 
              className="related-product-img" 
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Productshow;
