import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 576px) {
      max-width: 540px;
  }
  @media (min-width: 768px) {
      max-width: 720px;
  }
  @media (min-width: 992px) {
      max-width: 960px;
  }
  @media (min-width: 1200px) {
      max-width: 1140px;
  }
`;

export const PageTitle = styled.p`
padding: 8px 20px;
margin: 30px 0;
font-size: 22px;
color: #3e3e3e;
border-radius: 5px;
display: inline-block;
background: #DCDCDC;
`