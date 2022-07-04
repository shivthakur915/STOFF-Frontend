import { createSlice } from "@reduxjs/toolkit";
import {sum} from "./util.js";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    cartPushed:false,
    error:false
  },

  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct:(state,action)=>{
      state.quantity-=1;;
      state.products=action.payload;
      state.total=sum(action.payload);
    },
    addToCartSuccess:(state,action)=>{
      console.log(action.payload)
      state.cartPushed=true;
      state.error=false;
      state.products=action.payload.products;
      state.quantity=action.payload.products.length;
    },
    addToCartFailure:(state)=>{
      state.cartPushed=false;
      state.error=true;
    },
    updateCartSuccess:(state,action)=>{
      state.cartPushed=true;
      state.error=false;
      state.products=action.payload.products;
      state.quantity=action.payload.products.length;
      console.log(state.products);
    },
    updateCartFailure:(state)=>{
      state.cartPushed=false;
      state.error=true;
    },
    setCart:(state,action)=>{
      state.products=action.payload;
      state.quantity=action.payload.length;
      state.total=sum(action.payload);
    },
    setQuantity:(state,action)=>{
      state.quantity=action.payload;
    },
    emptyCartSuccess:(state)=>{
      state.quantity=0;
      state.products=[];
      state.total=0;
    },emptyCartFailure:(state)=>{
      state.error=true;
    }
  },
});

export const { addProduct,removeProduct,addToCartSuccess,addToCartFailure,updateCartSuccess,updateCartFailure,setCart,setQuantity,emptyCartSuccess,emptyCartFailure} = cartSlice.actions;
export default cartSlice.reducer;