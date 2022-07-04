import React from 'react'
import NavBar from "../components/NavBar"
import Announcement from "../components/Announcement"
import Slider from "../components/Slider"
import Categories from "../components/Categories"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import styled from "styled-components";

const Home = () => {
	return (
		<Container>
			<NavBar/>
			<Announcement/>
			<Slider/>
			<Categories/>
			<Products sliceUpto={8}/>
			<Newsletter/>
			<Footer/>
		</Container>

	)
}

export default Home;

const Container=styled.div`

`;