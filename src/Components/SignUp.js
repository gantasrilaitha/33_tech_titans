import React,{useState} from "react"
import styled from "styled-components"
import Image from "./amazon_logo1.jpg";
import axios from "./axios";
import {useNavigate} from "react-router-dom";
function SignUp(){
    const navigate= useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setrole] = useState("")

    const onOptionChange = (e) => {
    setrole(e.target.value)
      }
    const signup = (e) => {
        e.preventDefault();
        axios
          .post("/auth/signup", { role,email, password, fullName })
          .then((res) => alert(res.data.message))
          .catch((err) => console.warn(err));
    
        navigate("/login");
      };
    return(
        <Container>
            <Logo onClick={() => navigate("/")}>
                <img src={Image} alt=""></img>
            </Logo>
            <FormContainer>
         <p>Sign-Up</p>
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



         </InputContainer>
         <InputContainer>
          <p>Name</p>
          <input type="text" placeholder="John Smith" onChange={(e) => setFullName(e.target.value)}
            value={fullName}/>
         </InputContainer>
         <InputContainer>
          <p>Email</p>
          <input type="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}
            value={email}/>
         </InputContainer>
         <InputContainer>
          <p>Password</p>
          <input type="password" placeholder="******" onChange={(e) => setPassword(e.target.value)}
            value={password}/>
         </InputContainer>
         <SignUpButton onClick={signup}>Create Account</SignUpButton>
         <InfoText>By continuing you agree to Amazon's <span>Conditions of Use</span> and <span>Privacy Notice</span></InfoText>
         </FormContainer>
         <LoginButton onClick={()=>navigate("/Login")}>Back to Login</LoginButton>
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
border :1px solid red;
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
     height:800px;
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
width:55%;
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
width:100%;
height:35px;
font-size:12px;
margin-top:10px;
&:hover{
    background-color:#dfdfdf;
    border:1px solid gray;
}
`;
export default SignUp;