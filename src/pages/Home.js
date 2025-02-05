import { useState,useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Compslider from '../components/slider'
import { useNavigate,Link } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const banner = [
   {
    images: require('../images/new/slider/slider-2.png'),
    // images1: require('../images/banner11.png'),
    heading:"Fresh Vegetables",
    heading1:"Big discount",
    perra:"Save up to 50% off on your first order",
    btnName:'Shop Now',
    className:'flex-row'
   },
   {
    images: require('../images/new/slider/slider-1.png'),
    // images1: require('../images/banner21.png'),
    heading:"Don’t miss amazing",
    heading1:"grocery deals",
    perra:"Sign up for the daily newsletter",
    btnName:'Shop Now',
    className:'flex-row'
   }
  //  {
  //   images: require('../images/banner3.png'),
  //   images1: require('../images/banner31.png'),
  //   heading:"Porto Modern Chairs",
  //   heading1:"Clean Forniture",
  //   btnName:'Shop Forniture',
  //   className:'flex-row'
  //  }
  ]

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem('login')) || false
    if(!login){
      navigate('/');
    }
  },[]);
    return (
      <div>
      <Container className='mt-4'>
        <Carousel activeIndex={index} onSelect={handleSelect} className='bannerAll'>
          {
            banner.map((x,index) =>(
            <Carousel.Item key={index} className='bg-black text-center  text-white' style={{ backgroundImage: `url(${x.images})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className={'sliderData row align-items-center '+ x.className}>
                <div className='col-lg-6 d-flex justify-content-center'>
                    <div className='mx-auto text-start bannerDataHeading '>
                      <h1 className='text-black fw-bold text-capitalize'>{x.heading}</h1>
                      <h1 className='text-black mb-3 fw-bold text-capitalize'>{x.heading1}</h1>
                     { x.perra ? <p className='text-black mb-3 text-capitalize'>{x.perra}</p> : ""}
                     <Link as={Link} to="/allproduct" className='text-black-50 text-capitalize'>{x.btnName}</Link>
                      
                    </div>
                    {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </div>
                <div className='col-lg-6'>
                  {/* <img src={x.images1} alt={x.heading1} /> */}
                </div>
              </div>
            </Carousel.Item>
            ))
          }
        </Carousel>
      </Container>
     <Compslider></Compslider>
      </div>
      
    );
  };
  
  export default Home;