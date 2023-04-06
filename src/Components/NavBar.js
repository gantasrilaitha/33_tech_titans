import React from "react";
import styled from "styled-components";
import Image from "./amazon_logo1.jpg";
import Image2 from "./search_icon.png";
import Image3 from "./basket-icon.png";
import {BrowserRouter as Router,useNavigate,Link,Routes, Route} from "react-router-dom";
import { useStateValue } from "./StateProvider";
function Navbar()
{
    const url = "C:\Users\User\Downloads\Prime_Clone_Webtech_Project\jswebsite.html"
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
      };
      
    const [{basket},user]=useStateValue();
    const navigate= useNavigate();
    return(
        <Container>
            <Inner> 
                <Logo>
                    <img src={Image} alt=""></img>
                </Logo>
                <SearchBar>
                    <input type="text" placeholder="Search..." />
                    <SearchIcon onClick={()=>navigate("./addproduct")}>
                        <img src={Image2}></img>
                    </SearchIcon>
                </SearchBar>
                <RightContainer>
                    <NavButton onClick={()=>navigate("./Login")}>
                        <div>Hello Farmer</div>
                    </NavButton>
                    <NavButton>
                    <div>
                     More Info
                     </div>
                    </NavButton>
                    <BasketButton onClick={()=>navigate("./Checkout")}>
                       <img src={Image3} alt=""></img>
                       <p>{basket.length}</p>
                    </BasketButton>
                </RightContainer>
            </Inner>
            <MobileSearchBar>
            <input type="text" placeholder="Search..." />
                    <SearchIcon onClick={()=>navigate("./addproduct")}>
                        <img src={Image2}></img>    
                    </SearchIcon>            
            </MobileSearchBar>
        </Container>
    );
}

const Container= styled.div`
width:100%;
height:60px;
background-color : #131921; 
display:flex;
align-items:center;
position:relative;
@media only screen and (max-width:767px)
{
    height:150px;
    flex-direction:column;
}
`;
const Inner =styled.div`
width:100%;
display:flex;
align-items:center;
@media only screen and (max-width:767px)
{
    justify-content:space-between;
}
`;
const Logo =styled.div`
margin-left:20px;
cursor:pointer;
 img{
    width:100px;
    margin-top:10px;
 }`;
const SearchIcon=styled.div`
background-color:#febd69;
height:100%;
width:40px;
img{
    height:100%;
    width:40px;
    display:flex;
    align-items:center;
    justify-content:center;
}
`;
const SearchBar=styled.div`
height:35px;
flex:1;
margin:0px 15px;
display:flex;
input{
    :focus{
        border:solid blue;
    }
    flex:1;
    width:100%;
    height:100%;
    border:none;
    border-radius:10px;

    &::placeholder{
        padding-left:10px;

    }
}

@media only screen and (max-width:767px){
    display:none;
}
`;
const RightContainer= styled.div`
display:flex;
flex:0.21;
align-items:center;
width:fit-content;
justify-content:space-around;
height:100%;
padding:5px 15px;

`;
const NavButton=styled.div`
color:#fff;
padding:5px;
height:80%;
display:flex;
flex-direction:column;
justify-content:center;
cursor:pointer;
margin-right:15px;
p{
    &:nth-child(1){
        font-size:12px;
    }
    &:nth-child(2){
        font-size:14px;
        font-weight:600
    }
}
`;
const BasketButton=styled.div`
display:flex;
align-items:center;
height:90%;
cursor:pointer;
img{
    width:30px;
    margin-right:10px;
}
p{
    color:#fff;
    font-weight:500;
}
`;
const MobileSearchBar=styled.div`
height:35px;
width:90%;
display:flex;
align-items:center;
padding:10px;
input{
    flex:1;
    width:100%;
    height:100%;
    border:none;
    border-radius:0px 5px 5px 0px;
    &:placeholder{
        padding-left:10px;
    }
}
@media only screen and (min-width:767px)
{
    display:none;
}
`;
export default Navbar;
