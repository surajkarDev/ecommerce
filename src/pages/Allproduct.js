import React,{useState,useEffect} from "react";
import { Badge} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import "../css/custom.css";
import PageHeader from "../components/pageHeader";
import { useSelector,useDispatch } from "react-redux";
import { addToCart,addToWishlist } from "../redux/cart";

const AllProduct = () => {
    const navigate = useNavigate();
    useEffect(() => {
      let login = JSON.parse(localStorage.getItem('login')) || false
      if(!login){
        navigate('/');
      }
    },[]);
    const [showAlert, setShowAlert] = useState(false);
    
    const slides = useSelector(state => state.cartItemAll.sliderAllItem) || []

    const callAddTocart = useDispatch();
    const heandleAddToCart = (index) => {
      const product = { ...slides[index] };
      console.log("product",product)
      product.quantity = 1;
      product.size = 50
      callAddTocart(addToCart(product));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    const heandlewishlist = (index) => {
        const product = {...slides[index]};
        product.quantity = 1;
        product.size = 50
        callAddTocart(addToWishlist(product))
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    const productView = (index) => {
      let sliderdata = {...slides[index]}
      sliderdata.sizedefault = 50
      const myArray = sliderdata
      console.log("myArray",myArray)
      navigate('/productshow',{ state: { data: myArray } });
    }
     
    return (
        <>
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
      <section className="shoopingCartSectionHeader">
        <PageHeader heading="All Products" linkName="All Products" link="/allproduct" />
      </section>
      <section>
        <div className="container">
            <div className="row">
            {slides.map((slide, index) => (
                <div className="col-lg-3 mb-4">
                        <div key={index} className={slide.stock === 'Out of Stock' ? 'px-2 productSlider border position-relative productSliderDisabled disabled' : 'px-2 productSlider border position-relative'} aria-disabled={slide.stock === 'Out of Stock'?true:false} disabled={slide.stock === 'Out of Stock'?true:false}>
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
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                  </svg>
                              </button>
                            </span>
                            </div>
                        </div>
                        </div>
                    
                </div>
                ))}
            </div>
        </div>
      </section>
             
        </>
    )
}

export default AllProduct