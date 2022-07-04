import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar"
import Announcement from "../components/Announcement"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import React , {useState} from 'react'
import { publicRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const Register = () => {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    name:"",
    username:"",
    email:"",
    password:""
  })
  const handleChange =(e)=>{
    const {name,value}=e.target;
    setUser({
      ...user,
      [name]:value
    })
  }
  const registerUser = (e)=>{
   e.preventDefault();
   const {name,username,email,password} = user
   if (name && username && email && password){
    publicRequest.post("/auth/register",user )
    .then(res=>console.log("Response"+res))
    .catch(e=>console.log("Error in frontend"+ e))
    navigate('/registersuccess');
   }
   else{
    swal("Invalid Input"," ","error");
    setTimeout(()=>navigate("/"),2000);
   };
  }  

  return (
    <>
    <NavBar/>
    <Announcement/>
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input name="name" value={user.name} onChange={handleChange} required placeholder="Name" />
          <Input name="username" value={user.username} onChange={handleChange} required placeholder="Username" />
          <Input name="email" value={user.email} onChange={handleChange} required placeholder="Email" />
          <Input name="password" value={user.password} onChange={handleChange} required placeholder="Password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            <br></br><LinkCover > <Link style={{color:"black"}} to='/login'>ALREADY HAVE ACCOUNT ?</Link></LinkCover>
          </Agreement>
          <Button type="submit" onClick={registerUser}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
    <Newsletter/>
    <Footer/>
    </>
  );
};

export default Register;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const LinkCover = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;