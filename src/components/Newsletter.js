import {useSelector} from "react-redux"
import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import swal from 'sweetalert';
import {useState } from "react";
import { publicRequest } from "../requestMethods";



const Newsletter = () => {

  const user=useSelector(state=>state.user)
  const emval=user.currentUser?user.currentUser.email:"";
  const [eid,setEid]=useState(emval);

  const handleClick=async ()=>{
    if(eid===""){
      swal("Enter Valid Email Addrress"," ","error");
    }else{
      const pair={
        name:user.currentUser?user.currentUser.name:eid,
        email:eid
      }
      try {
        const res1=await publicRequest.post('/email/confirm',pair);
        console.log(res1);
      } catch(e) {
        console.log(e);
      }
    }
  }
  const handleChange=(e)=>{
    setEid(...eid,e.target.value);
    console.log(eid);
  }
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input name="email" type="email"  onChange={(e) => setEid(e.target.value)} required placeholder="Your Email" />
        <Button onClick={handleClick}>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
`;