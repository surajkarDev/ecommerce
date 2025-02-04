import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
    name : 'cart',
    initialState:{
        cartItem:JSON.parse(localStorage.getItem('cartItem')) || [],
        wishlist:JSON.parse(localStorage.getItem('wishlist')) || [],
        sliderAllItem : [
            {
              img: require('../images/new/products/3.jpg'),
              name: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
              newPrice: '28.85',
              stock:"In Stock",
              size:[50,60,80,100,150]
            },
            {
              img: require('../images/new/products/4.jpg'),
              name: "All Natural Italian-Style Chicken Meatballs",
              newPrice: '28.85',
              stock:"Out of Stock",
              size:[50,60,80,100,150]
            },
            {
              img: require('../images/new/products/5.jpg'),
              name: "Angie’s Boomchickapop Sweet & Salty Kettle Corn",
              newPrice: '48.85',
              stock:"In Stock",
              size:[50,60,80,100,150]
            },
            {
              img: require('../images/new/products/6.jpg'),
              name: "Foster Farms Takeout Crispy Classic Buffalo Wings",
              newPrice: '28.85',
              stock:"In Stock",
              size:[50,60,80,100,150]
            },
            {
              img: require('../images/new/products/7.jpg'),
              name: "Blue Diamond Almonds Lightly Salted Vegetables",
              newPrice: '28.85',
              stock:"In Stock",
              size:[50,60,80,100,150]
            },
            {
              img: require('../images/new/products/8.jpg'),
              name: "Chobani Complete Vanilla Greek Yogurt",
              newPrice: '28.85',
              stock:"Out of Stock",
              size:[50,60,80,100,150]
            },
            {
              img: require('../images/new/products/9.jpg'),
              name: "Canada Dry Ginger Ale – 2 L Bottle - 200ml - 400g",
              newPrice: '28.85',
              stock:"Out of Stock",
              size:[50,60,80,100,150]
            },
            {
              img: require('../images/new/products/10.jpg'),
              name: "Encore Seafoods Stuffed Alaskan Salmon",
              newPrice: '28.85',
              stock:"In Stock",
              size:[50,60,80,100,150]
            }
        ]
    },
    reducers : {
        addToCart: (state,action) =>{
            const existingItem = state.cartItem.find((item) => item.name === action.payload.name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItem.push({ ...action.payload, quantity: 1 });
            }
            // Save updated cart to localStorage
            localStorage.setItem('cartItem', JSON.stringify(state.cartItem));
        },
        addToCartCart: (state,action) =>{
          state.cartItem = state.cartItem.map((item) => 
            item.name === action.payload.name 
                ? { ...item, quantity: action.payload.quantity }
                : item
          );
          localStorage.setItem('cartItem', JSON.stringify(state.cartItem));
        },
        removeFromCart:(state, action) => {
            console.log("removeFromCart",action.payload)
          state.cartItem = state.cartItem.filter((item) => item.name !== action.payload.name);
          // Save updated cart to localStorage
          localStorage.setItem('cartItem', JSON.stringify(state.cartItem));
        },
        addToCartShow: (state, action) => {
            let cartExist = Array.isArray(state.cartItem) ? [...state.cartItem] : []; // Ensure cartExist is an array
            let checkduplicatedata = false;
            cartExist.forEach((item) => {
                if (item.name === action.payload.name && Number(item.size) === Number(action.payload.size)) {
                    checkduplicatedata = true;
                    item.quantity = Number(action.payload.quentity);
                    item.size = Number(action.payload.size);
                }
            });
            if (!checkduplicatedata) {
                cartExist.push({
                    img: action.payload.img,
                    name: action.payload.name,
                    newPrice: action.payload.newPrice,
                    stock: action.payload.stock,
                    quantity: Number(action.payload.quentity),
                    size: Number(action.payload.size),
                });
            }
        
            // Update state and save updated cart to localStorage
            state.cartItem = cartExist; // Update Redux state or similar state management
            localStorage.setItem('cartItem', JSON.stringify(state.cartItem)); // Persist to local storage
        },
        addToWishlist: (state,action) =>{
          const existingItem = state.wishlist.find((item) => item.name === action.payload.name);

          if (existingItem) {
              existingItem.quantity += 1;
          } else {
              state.wishlist.push({ ...action.payload, quantity: 1 });
          }
          // Save updated cart to localStorage
          localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        },
        removeFromWishlist:(state, action) => {
          console.log("removeFromCart",action.payload)
          state.wishlist = state.wishlist.filter((item) => item.name !== action.payload.name);
    
          // Save updated cart to localStorage
          localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        },
    }
})

export const {addToCart,removeFromCart,addToCartShow,addToWishlist,removeFromWishlist,addToCartCart} = cart.actions
// export const cartItemNews = (state) => state.cartItemAll.sliderAllItem

export default cart.reducer
