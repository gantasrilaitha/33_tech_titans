import React from "react";
import styled from "styled-components";
import {useStateValue} from "./StateProvider";
import Rating from "@material-ui/lab/Rating";

function Card({image,title,rating,price})
{
    const [{basket},dispatch]=useStateValue();
    console.log("basket>>",basket);
    const addToBasket =(e)=>{
        e.preventDefault();
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                title,price,image,rating,
            },
        })
    }
    return(
        <Container>
            <Image>
                <img src={image} alt="">
                </img>
            </Image>
            <Description>
              <h5>{title}</h5>
              <p>Rs {price}</p>
              <button onClick={addToBasket}>Add to Cart</button>
            </Description>
        </Container>
    )
}

const Container=styled.div`
width:100%;
height:100%;
display:flex;
flex-direction:column;
background-color:#fff;
z-index:10;
`;
const Image=styled.div`
width:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-top:20px;
flex:0.3;
img{
    width:180px;
    height:200px;
}
`;
const Description=styled.div`
width:90%;
margin:auto;
display:flex;
flex-direction:column;
justify-content:space-evenly;
align-items:center;
flex:0.7;
h5{
    font-size:16px;
    font-weight:600;
}
p{
    font-weight:600;
}
button{
    width:100%;
    height:33px;
    background-color:#fa8900;
    border:none;
    border-radius:10px;
    cursor:pointer;
}
`;
export default Card;