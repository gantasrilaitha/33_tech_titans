import React from 'react';
import styled from "styled-components"

function student_page() {
  return(
    <Body>
      <header>
        <h1>My Website</h1>
      </header>
      <buttonContainer>
        <button>View Teachers projects</button>
        <button>View Open Source Projects</button>
        </buttonContainer>
    </Body>
  );
}

const Body=styled.div`{
        max-width: 960px; /* Sets the maximum width of the container */
        margin: 0 auto; /* Centers the container horizontally */
        padding: 20px; /* Adds some padding to the container */
        background-color: #f0f0f0; /* Sets the background color of the container */
}`;
const inputContainer=styled.div`{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }`;

styled.button`{
    margin: 0 10px;
}`; 
  
export default student_page;
