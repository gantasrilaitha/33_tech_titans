
import styled from 'styled-components'
  
const Button = styled.div`
    height:50px;
    width : 50px ;
    cursor: pointer ;
    text-decoration : none;
    color : blue;
    background-color : ${props => props.bg === 
                      "green" ? "green" : "yellow"};
    margin: 0 auto;
    font - size: 3rem;
`
  
export default Button;