import styled from "styled-components";

const NavBar = () => {
  return (
    <Nav>
      <Container>
        <NavBarLogo href="/">Project IBM</NavBarLogo>
        <NavBarItem href="#">Posts</NavBarItem>
        <NavBarItem href="#">Companies</NavBarItem>
        <NavBarItem href="#">About</NavBarItem>
        <NavBarItem href="/profile">Profile</NavBarItem>
        <NavBarButton href="/login">Log In</NavBarButton>
        <NavBarButton href="#">Sign Up</NavBarButton>
      </Container>
    </Nav>
  )
}

const Nav = styled.div`
  background: #546e7a;
  height: 70px;
  width: 100%
  font-weight: 300;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  
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

const NavBarLogo = styled.a`
  font-weight: bold;
  font-size: 130%;
  margin-right: auto;
  padding: 8px;
  color: #ffffff !important;
`;

const NavBarItem = styled.a`
  padding: 1.6rem 1rem;
  margin: 0 5px;
  color: #ffffff !important;
  transition: all .2s ease-in-out;
  &:hover {
    background-color: #29434e;
  }
`;

const NavBarButton = styled.a`
  padding: 0.5rem 1.5rem;
  background: #4caf50;
  border-radius: 16px;
  font-size: 12px;
  margin: 0 10px;
  color: #ffffff !important;
  transition: all .2s ease-in-out;
  &:hover {
    background-color: #4caf5095;
  }
`;

export default NavBar;