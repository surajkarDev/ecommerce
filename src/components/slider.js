import React, { useState, useRef } from "react";
import { Badge} from 'react-bootstrap';
import Slider from "react-slick";
import Alert from 'react-bootstrap/Alert';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/custom.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { addToCart,addToWishlist } from "../redux/cart";

const SliderComponent = () => {
  
  // redux start
  const sliderItems = useSelector(state => state.cartItemAll.sliderAllItem) || []
  
  const dispatch = useDispatch();
  const heandleAddToCart = (index) =>{
    const product = {...sliderItems[index]};
    product.quantity = 1;
    product.size = 50
    dispatch(addToCart(product))
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
  const heandlewishlist = (index) => {
    const product = {...sliderItems[index]};
    product.quantity = 1;
    product.size = 50
    dispatch(addToWishlist(product))
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }
  // redux end
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const sliderRef = useRef(null); // Create a reference for the slider

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  const nextSlide = () => {
    sliderRef.current.slickNext(); // Move to the next slide
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev(); // Move to the previous slide
  };
  const productView = (index) => {
    let sliderdata = {...sliderItems[index]}
    sliderdata.sizedefault = 50
    const myArray = sliderdata
    console.log("myArray",myArray)
    navigate('/productshow',{ state: { data: myArray } });
  } 
  return (
    <>
    <section className="my-5">
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
      <div className="container">
        <div className="row px-0">
          <div className="col-12">
            <h1 className="mb-5">Popular Products</h1>

            {/* Slider with next and prev buttons */}
            <div className="d-flex justify-content-end mb-4">
              <button className="customSliderButtonleft me-2" onClick={prevSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
              </button>
              <button className="customSliderButtonRight" onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </button>
            </div>

            <Slider {...settings} ref={sliderRef}>
              {sliderItems.map((slide, index) => (
                <div key={index} className="px-2 productSlider border position-relative">
                  <div className="productImg">
                    <img src={slide.img} alt={`slide${index}`} className="img-fluid" />
                  </div>
                  <div className="productContent p-3">
                    <h5 className="mb-2">{slide.name}</h5>
                    {slide.stock === 'Out of Stock' ? (
                            <Badge bg="danger">Out of Stock</Badge>
                          ) : slide.stock === 'In Stock' ? (
                            <Badge bg="success">In Stock</Badge>
                          ): '' }
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0">${slide.newPrice}</p>
                      <span className="d-flex gap-2">
                      <button className="btn bg-success text-white d-flex align-items-center wishlistAllProducrt" onClick={()=>heandlewishlist(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                        </svg>
                      </button>
                      <button className="btn bg-success text-white d-flex align-items-center" onClick={() => heandleAddToCart(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill me-1" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                      </button>
                      <button className="btn bg-success text-white d-flex align-items-center" onClick={() => productView(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg>
                      </button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
    
    </>
  );
};

export default SliderComponent;
