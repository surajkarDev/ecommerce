import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import { CartProvider } from './components/CartContext';
import ShopCart from "./pages/ShopCart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Productshow from "./pages/Productshow";
import store from "./redux/store";
import { Provider } from "react-redux";
import Allproduct from "./pages/Allproduct"
import { counterContext } from "./context/context";
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="ecommerce" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="ecommerce/home" element={<Home />} />
              <Route path="ecommerce/blogs" element={<Blogs />} />
              <Route path="ecommerce/allproduct" element={<Allproduct />} />
              <Route path="ecommerce/contact" element={<Contact />} />
              <Route path="ecommerce/shopCart" element={<ShopCart />} />
              <Route path="ecommerce/checkout" element={<Checkout />} />
              <Route path="ecommerce/wishlist" element={<Wishlist />} />
              <Route path="ecommerce/productshow" element={<Productshow />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);