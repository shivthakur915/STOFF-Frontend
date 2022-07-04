import React from 'react'
import NavBar from "../components/NavBar"
import Announcement from "../components/Announcement"
import Slider from "../components/Slider"
import Categories from "../components/Categories"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import styled from "styled-components";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";
import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';


const Home = () => {
	const user=useSelector((state)=>state.user.currentUser);
	const getDate=(val)=>{
		let date=new Date(val).toDateString();
		return date;
	}
	return (
		<ContainerBase>
		    <NavBar/>
			<Announcement/>
			<Container>
                <Wrapper>
                <AvatarCover>
                  <Avatar alt="Remy Sharp" src=""  sx={{ width: 56, height: 56 }}/>
                </AvatarCover>
                <Form>
                    <LabelContainer>
                      <Label>Name</Label>
                      <Input>{user.name}</Input>
                    </LabelContainer>
                    <LabelContainer>
                      <Label>Email</Label>
                      <Input>{user.email}</Input>
                    </LabelContainer>
                    <LabelContainer>
                      <Label>Username</Label>
                      <Input>{user.username}</Input>
                    </LabelContainer>
                    <LabelContainer>
                      <Label>Customer From</Label>
                      <Input>{getDate(user.createdAt)}</Input>
                    </LabelContainer>

                </Form>
                </Wrapper>
            </Container>
			<Newsletter/>
			<Footer/>
		</ContainerBase>

	)
}

export default Home;

const ContainerBase=styled.div`

`;


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/p0ZRcTm/base1.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 70%;
  //height: 50vh;
  padding: 20px;
  max-height:70vh;
  background-color: white;
  ${mobile({ width: "75%" })}
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  display: flex;
  justify-content:center;
  align-items: center;
`;

const AvatarCover = styled.div`

  display: flex;
  justify-content:center;
  align-items: center;
`;

const LabelContainer=styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  overflow:auto;
  overflow-wrap: break-word;
`

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Label=styled.label`
  flex: 1;
  min-width: 40%;
  margin: 10px 10px 0px 0px;
  padding: 10px;
  //border-bottom: 0.5px solid grey;
`
const Input = styled.h3`
  flex: 1;
  min-width: 40%;
  padding: 10px;
  //border-bottom: 0.5px solid grey;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
`;