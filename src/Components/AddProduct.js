import React, { useState } from "react"
import axios from "./axios"
import styled from "styled-components"
import Image from "./amazon_logo1.jpg";
import { useStateValue } from "./StateProvider";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

function AddProduct() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const addProduct=(e)=>{
        e.preventDefault();
        axios.post("/products/add", { title, imageURL, price, rating })
        .then(() => {
          console.log("1")
          setTitle("");
          setImageURL("");
          setPrice(0);
          setRating(0);
        })
        .catch((error) => alert(error.message));
    }
    return (
        <Container>
            <Logo>
                <img src={Image} alt="" onClick={() => navigate("/")}></img>
            </Logo>
            <FormContainer>
                <h3>Add Products</h3>
                <InputContainer>
                    <p>Title</p>
                    <input type="text" placeholder="" onChange={(e) => setTitle(e.target.value)} value={title} />
                </InputContainer>
                <InputContainer>
                    <p>Image URL</p>
                    <input type="text" placeholder="" onChange={(e) => setImageURL(e.target.value)} value={imageURL} />
                </InputContainer>
                <InputContainer>
                    <p>Price</p>
                    <input type="number" placeholder="" onChange={(e) => setPrice(e.target.value)} value={price} />
                </InputContainer>
                <InputContainer>
                    <p>Rating</p>
                    <input type="number" placeholder="" onChange={(e) => setRating(e.target.value)} value={rating} />
                </InputContainer>
                <Button onClick={addProduct}>AddProduct</Button>
            </FormContainer>
        </Container>
    );
}

const Container = styled.div`
width:40%;
min-width:450px;
height:fit-content;
padding:15px;
margin:auto;
display:flex;
flex-direction:column;
align-items:center;
`
const Logo = styled.div`
width:120 px;
img{
    width:100%;
    height:40px;
}
margin-bottom:20px;
`

const FormContainer = styled.form`
     border:1px solid lightgrey;
     width:55%;
     height:fit-content;
     display:flex;
     flex-direction:column;
     align-items:center;
     justify-content:center;
     padding:55px;
     h3{
        font-size:28px;
        font-weight:400;
        line-height:33px;
        align-self:flex-start;
        margin-bottom:10px;
     }
`
const InputContainer = styled.div` 
   width:100%;
   height:100%;
   padding:10px;
   p{
    font-size:14px;
    font-weight:600;
   }
   input{
    width:95%;
    height:33px;
    padding-left:5px;
    border-radius :5px;
    border:1px solid lightgray;
    margin-top:1px;
   }
   &:hover{
    border :1px solid orange;

   }
`

const Button = styled.button`
width:100%;
height:35px;
background-color:#f3b414;
border:none;
outline:none;
marin-top:60px;
`;


export default AddProduct;