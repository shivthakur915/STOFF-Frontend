import { loginFailure, loginStart, loginSuccess,logoutSuccess,logoutFailure} from "./userRedux";
import { publicRequest,userRequest } from "../requestMethods";
import {addToCartSuccess,addToCartFailure,updateCartSuccess,updateCartFailure,setQuantity,emptyCartSuccess,emptyCartFailure} from "./cartRedux.js"

export const logOut=(dispatch,cart)=>{
  console.log(cart);
  try {
    const cart=JSON.parse(localStorage.getItem("persist:root"));
    console.log(cart);
    localStorage.setItem("persist:root",null);
    dispatch(setQuantity(0));
    const msg="Logged Out";
    dispatch(logoutSuccess());
    dispatch(emptyCartSuccess());
  } catch(e) {
    dispatch(logoutFailure());
    dispatch(emptyCartFailure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    //console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
  }
};

export const addCart=async(dispatch,id,products)=>{
  
  const cart={
    userId:id,
    products:products
  }

  try {
   const response=await userRequest.get(`/carts/find/${id}`);
   console.log(response);
   if(!response.data){
    console.log("Creating new user Cart")
    try{
      const res=await publicRequest.post('/carts',cart);
      console.log(res);
      dispatch(addToCartSuccess(res.data));
    }catch(err){
      console.log(err);
      dispatch(addToCartFailure());
    }
  }else{
    console.log("Updating user Cart")
      try{
      const res=await userRequest.put(`/carts/${id}`,cart);
      console.log(res.data);
      dispatch(updateCartSuccess(res.data));
    } catch(e) {
      console.log(e);
      dispatch(updateCartFailure());
    }
  }
 }catch(e){
  console.log(e);
  }
}

export const emptyCart=async (dispatch,id)=>{
  try{
    const res=await userRequest.delete(`/carts/${id}`);
    console.log(res.data);
    dispatch(emptyCartSuccess());
  } catch(e) {
    console.log(e);
    dispatch(emptyCartFailure());
  }
}