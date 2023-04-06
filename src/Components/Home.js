import React,{ useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./NavBar";
import axios from "./axios"
import Image4 from "C:/Users/User/Desktop/kodikon/my-app/src/Components/farmer.jpeg"
import Card from "./Card";

function Home()
{
    const [products, setProducts] = useState("");
    useEffect(() => {
        const fetchdata = async () => {
          const data = await axios.get("/products/get");
          setProducts(data);
        };
        fetchdata();
      }, []);
    
    return (
        <Container>
        <Navbar />
         <Banner>
             <img src={Image4} alt=""></img>
         </Banner>
         <Main>
            <Card  image={"https://5.imimg.com/data5/CI/RT/MY-34448131/ammonium-sulphate-fertilizer-500x500.jpg"} price={150} rating={3} title={"Ammonium Sulphate fertilizer"}/>
            <Card  image={"https://cdn.shopify.com/s/files/1/0850/0900/products/Crustacean_Meal_Organic_Fertilizer_2_Pounds_1024x.png?v=1627413706"} price={200} rating={3} title={"Crustacean Meal"}/>
            <Card  image={"https://m.media-amazon.com/images/I/612LJ7lHWTS._SL1181_.jpg"} price={130} rating={3} title={"NPK fertilizer"}/>
            <Card image={"https://m.media-amazon.com/images/I/61BVMXL2MML._SX466_.jpg"} price={170} rating={3} title={"Urea Fertilizer"}/>
         </Main>
         <Main>
         {products &&
          products?.data.map((product) => (
            <Card
              id={product._id}
              image={product.imageURL}
              price={product.price}
              rating={product.rating}
              title={product.title}
            />
          ))}
         </Main>
        </Container>
    );
}

const Container=styled.div`
 width:100%;
 margin-top:none;
 background-color:rgb(234,237,237);
`; 

const Banner=styled.div`
  width:100%;
  flex:1;
  margin-left:none;
  img{
    width:100%;
    height:300px;
    -webkit-mask-image:linear-gradient(to bottom , 
        rgba(0,0,0,2),
        rgba(0,0,0,0.95),
        rgba(0,0,0,0.85),
        rgba(0,0,0,0.75),
        rgba(0,0,0,0.55),
        rgba(0,0,0,0)
        );
  }

`;

const Main =styled.div`
display:grid;
justify-content:center;
place-items:center;
width:100%;
grid-auto-rows: 430px 430px;
grid-template-columns:repeat(4,300px);
grid-gap:20px;
@media only screen and (max-width:767px){
    grid-template-columns:repeat(2,50%);
    grid-gap:0px;
}

@media only screen and (min-width:767px)
{
    margin-top:-20px;
    padding:10px 0px;
}
`;

export default Home;
