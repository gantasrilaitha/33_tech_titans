import React from "react";
import {useStateValue} from "./StateProvider";
import Navbar from "./NavBar";
import styled from "styled-components"
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
function Checkout(){
    const navigate = useNavigate();
    const [{basket}]=useStateValue();
    console.log("checkout>>",basket);
    var sum=0;
    {basket.map((e)=>{
        sum=sum+e.price
    })};
    return(
        <Container>
            <Navbar />
            <h2>Shopping Cart</h2>
            <Bar>
            <Main>
            {basket.map((e,i) => {
                return (
                  <ShoppingCart>
                    <h2>Product {i+1}</h2>
                    <Product>
                        <Image><img src={e.image}></img></Image>
                        <Description>
                           <h2>{e.title}</h2>
                           <h2>Price:{e.price}</h2>
                           <h2>Rating:{e.rating}</h2>
                           <button>Remove</button>
                        </Description>
                    </Product>
                  </ShoppingCart>
                )
            })}
            </Main>
            <SubTotal>           
                <CurrencyFormat
                 renderText={(value) => (
              <>
                <p>
                  Subtotal ( {basket.length} items ) : <strong> {value}</strong>
                </p>
                <small>
                <input type="checkbox" />
                  <span>This order contains a gift</span>
                  <button onClick={() => navigate("/")}>
            Proceed to Checkout
          </button>
                </small>
              </>
            )}
            decimalScale={2}
            value={sum}
            displayType="text"
            thousandSeparator={true}
            prefix={"₹ "}
            />
            </SubTotal>
            </Bar>
        </Container>

    )
}

const Container=styled.div`
width: 100%;
max-width: 1400px;
height: fit-content;
margin: auto;
background-color: rgb(234, 237, 237);
border: 1px solid red;
position: relative;
`;
const Bar = styled.div`
display:flex;
`;
const Main=styled.div` 
padding: 15px;
@media only screen and (max-width: 1200px) {
  flex-direction: column;
}
`;
const ShoppingCart=styled.div`
padding:15px;
background-color:#fff;
flex:0.7;
h2{
    font-size:15px;
    font-weight:500;
    border-bottom:1px solid lightgray;
    padding-bottom:15px;
}
`;
const SubTotal = styled.div`
width:30%;
background-color:#fff;
margin:15px;
padding:15px;
height:200px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
p{
    font-size:20px;
}
small{
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top:10px;
    span{
        margin-left:10px;

    }
    button{
        width:100%;
        height:33px;
        margin-top:20px;
        background-color:yellow;
        border:none;
        outline:none;
        border-radius:8px;
    }
}
`;
const Product = styled.div`
display:flex;
align-items:center;
`;
const Image=styled.div`

img{
    width:100%;
    height:200px;
}
`;
const Description=styled.div`
padding-left:25px;
flex:0.7;
h4{
    font-weight:600;
    font-size:18px;
};
p{
    font-weight:600;
    margin-top:10px;
};
button{
    background-color:transparent;
    color:#1384b4;
    border:none;
    outline:none;
    margin-top:10px;
    cursor:pointer;
    &:hover{
        text-decoration:underline;
    }
}
`;
export default Checkout;