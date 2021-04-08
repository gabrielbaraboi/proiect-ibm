import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0; 
    box-sizing: border-box;
    font-family: Open-Sans, Helvetica, Sans-Serif; 
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;