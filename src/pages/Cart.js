import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { addCart,emptyCart} from "../redux/apiCalls";
import { sum } from "../redux/util";
import {setCart,setQuantity} from "../redux/cartRedux.js";


const Cart = () => {

  const dispatch=useDispatch();
  const cart=useSelector((state)=>state.cart);
  const user=useSelector((state)=>state.user);
  let navigate = useNavigate();
  const [products,setProducts]=useState([]);
  const [total,setTotal]=useState(0);
  //console.log(cart);
  //console.log(user.currentUser._id);
  //console.log(localStorage.getItem("persist:root"));

  const deleteProduct=(id)=>{ 
    const newProducts=products.filter((product=>product._id!==id));
    setProducts(newProducts);
    const cart={
    userId:user.currentUser._id,
    products:newProducts
    }
    addCart(dispatch,user.currentUser._id,newProducts);
    dispatch(removeProduct(newProducts));
  }

  useEffect(()=>{
    
    const getProducts = async () => {
      try{
        const res=await userRequest.get(`/carts/find/${user.currentUser._id}`);
        console.log(res.data);
        setTotal(sum(res.data.products));
        dispatch(setQuantity(res.data.products.length));
        dispatch(setCart(res.data.products));
        setProducts(res.data.products);
        }
      catch(err){console.log(err)}
    }
    getProducts();
  },[])

  
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const __DEV__ = document.domain === 'localhost'

  async function showRazorpay(){
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }
    let data;
    try {
      data=await publicRequest.post('/checkout/razorpay',cart);
    } catch(e) {
      console.log(e);
    }
  
    // console.log(data);
    // console.log(cart.total);
    const options = {
      key: __DEV__ ? 'rzp_test_7ODw2nPJBAE41w' : 'PRODUCTION_KEY',
      currency: data.currency,
      amount: cart.total*100,
      order_id: data.id,
      name: 'Payment',
      description: 'Thank You',
      image: 'https://i.ibb.co/V210JxK/THE-STOFF.png',
      handler: async function (response) {
        console.log(response);
        console.log(cart);
        navigate('/success',{state:{
          response:response,
          cart:cart
        }});
        const pair={
          name:user.currentUser.name,
          email:user.currentUser.email
        }
        try {
          const res1=await publicRequest.post('/email/confirm',pair);
          console.log(res1);
        } catch(e) {
          console.log(e);
        }
        emptyCart(dispatch,user.currentUser._id);
      },
      prefill: {
        name:`${user.currentUser.name}`,
        email:`${user.currentUser.email}`,
        username:`${user.currentUser.username}`
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

    }

  return (
        <Container>
      <NavBar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
           {!products
            ?
            (<ProductName>
              <b>AddItems</b>
            </ProductName>)
            :(
            products.map((product,index) => (
              <Product key={index}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add>+</Add>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove>-</Remove>
                  </ProductAmountContainer>
                  <ProductPrice>
                    ₹ {product.price * product.quantity}
                  </ProductPrice>
                  <br/>
                  <Link onClick={(e)=>deleteProduct(product._id)} style={{color:"black"}} to="/cart" >
                    <DeleteIcon/>
                  </Link>
                </PriceDetail>
              </Product>
            ))
            )}
            <Hr />
          </Info>
          <br/>
         {
          total>0
          ?(
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 79</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -79</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
              <Button onClick={showRazorpay}>CHECKOUT NOW</Button>
          </Summary>)
          :(
          <Summary>
            <SummaryTitle>ADD ITEMS</SummaryTitle>
          </Summary>)    
        }
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Add=styled.button`
  border:none;
  color:black;
  background-color: transparent;
  font-weight: bold;
  font-size:3vh;
  cursor: pointer;
`
const Remove=styled.button`
  border:none;
  color:black;
  background-color: transparent;
  font-weight: bold;
  font-size:3vh;
  cursor: pointer;
`