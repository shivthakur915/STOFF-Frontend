import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../responsive";
import {useSelector} from "react-redux"
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { logOut } from "../redux/apiCalls";
import PersonIcon from '@mui/icons-material/Person';
import swal from 'sweetalert';
import Profile from "../pages/Profile"


const NavBar = () => {
  const cart=useSelector(state=>state.cart)
  const quantity=cart.quantity;
  const currentUser=useSelector(state=>state.user.currentUser)
  const dispatch=useDispatch();
  const handleClick=()=>{
    if(!currentUser.isLoggedIn){
      swal("Login Required", "", "error");
    }
  }
  const handleLogout=()=>{
    logOut(dispatch,cart);
  }
	return (
		<Container>
			<Wrapper>
				<Left>
					<Language>EN</Language>
					{/* <SearchContainer> */}
					{/*     <Input/> */}
					{/* 	<SearchIcon style={{color:"gray",fontSize:16}}/> */}
					{/* </SearchContainer> */}
				</Left>
				<Center>
          <Link style={{color:"black",textDecoration:"none"}} to="/">
            <Logo>STOFF</Logo>
          </Link>
				</Center>
        {currentUser?
        <Right>
          <Link style={{color:"black",textDecoration:"none"}} to="/profile">
            <MenuHead><PersonIcon/> {currentUser.name.split(" ")[0].toUpperCase()}</MenuHead>
          </Link>
          <Link onClick={handleLogout} style={{color:"black",textDecoration:"none"}} to="/register">
            <MenuItem>LOGOUT</MenuItem>
          </Link>
          <Link style={{color:"black",textDecoration:"none"}} to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon/>
            </Badge>
          </MenuItem>
          </Link>
        </Right>
        : 
        <Right>
          <Link style={{color:"black",textDecoration:"none"}} to="/register">
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link style={{color:"black",textDecoration:"none"}} to="/login">
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link style={{color:"black",textDecoration:"none"}} to="/cart">  
          <MenuItem >
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon/>
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      }
			</Wrapper>
		</Container>
	)
}

export default NavBar

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const MenuHead = styled.div`
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;