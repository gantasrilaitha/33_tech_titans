import React,{useState} from "react"
import axios from "./axios"
import styled from "styled-components"
import Image from "./amazon_logo1.jpg";
import { useStateValue } from "./StateProvider";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
function Login(){
    const navigate= useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role,setrole]=useState("")
    const [{}, dispatch] = useStateValue();
    const onOptionChange = (e) => {
      setrole(e.target.value)
        }
  
    const login = (e) => {
      e.preventDefault();

      axios
        .post("/auth/login", { role,email, password })
        .then((res) => {
          if (!res.data.error) {
            dispatch({
              type: "SET_USER",
              user: res.data,
            });
  
            localStorage.setItem("user", JSON.stringify(res.data));
            if (role=='student')
            navigate("/student_page");
          } else if (res.data.error) {
            alert(res.data.error);
          }
        })
        .catch((err) => console.warn(err));
    };


    return(
        <Container>
            <Logo onClick={() => navigate("/")}>
                <img src={Image} alt="" onClick={()=>navigate("/")}></img>
            </Logo>
            <FormContainer>
         <h3>Sign-In</h3>
         <InputContainer>
         <div className="App">
          <h6>Select Your Role</h6>
      <label htmlFor="Student">Student</label>
        <input
          type="radio"
          name="role"
         value="student"
           id="student"
         checked={role === "student"}
         onChange={onOptionChange}
    />
    <label htmlFor="teacher">Teacher</label>

    <input
      type="radio"
      name="role"
      value="teacher"
      id="teacher"
      checked={role === "teacher"}
      onChange={onOptionChange}
    />
    <label htmlFor="Open Source Contributor">Open Source Contributor</label>

    <input
      type="radio"
      name="role"
      value="OSC"
      id="OSC"
      checked={role === "OSC"}
      onChange={onOptionChange}
    />
  </div>
          <p>Email</p>
          <input type="email" placeholder="example@gmail.com"  onChange={(e) => setEmail(e.target.value)}
            value={email}/>
         </InputContainer>
         <InputContainer>
          <p>Password</p>
          <input type="password" placeholder="******"  onChange={(e) => setPassword(e.target.value)}
            value={password}/>
         </InputContainer>
         <LoginButton onClick={login}>Login</LoginButton>
         <InfoText>By continuing you agree to Tech Titan's <span>Conditions of Use</span> and <span>Privacy Notice</span></InfoText>
         </FormContainer>
         <SignUpButton onClick={()=>navigate("/SignUp")}>Create Account in Tech Titans</SignUpButton>
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
const Logo=styled.div`
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
     height:600px;
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

const LoginButton = styled.button`
width:70%;
height:35px;
background-color:#f3b414;
border:none;
outline:none;
border-radius:10px;
marin-top:30px;
`
const InfoText=styled.p`
  font-size:12px;
  width:100%;
  word-wrap:normal;
  word-break:normal;
  margin-top:20px;
  span{
    color:#426bc0;

  }
`;

const SignUpButton = styled.button`
width:55%;
height:35px;
font-size:12px;
margin-top:20px;
&:hover{
    background-color:#dfdfdf;
    border:1px solid gray;
}
`;
export default Login;