import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import {
 Link
} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import { addProduct } from "../redux/cartRedux";



const Product = ({ item }) => {
  const isLoggedIn=useSelector(state=>state.user.isLoggedIn);
  const dispatch=useDispatch();

  const handleClick = () => {
     console.log("Clicked")
  }
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Button onClick={handleClick}>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        </Button>
        <Icon>
          <Link color={{color:"black"}} to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  //background-color: #f5fbfd;
  background-color: #F0F0F0 ;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
const Button=styled.button`
  border:0;
  background-color: transparent;
  cursor: pointer;
`

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;