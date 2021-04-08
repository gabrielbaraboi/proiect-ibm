import styled from "styled-components";

const NavBar = () => {
  return (
    <Nav>
      <NavContainer>
        <NavBarLogo href="/">Project IBM</NavBarLogo>
        <NavBarItem href="#">Posts</NavBarItem>
        <NavBarItem href="#">Companies</NavBarItem>
        <NavBarItem href="#">About</NavBarItem>
        <NavBarButton href="#">Sign Up</NavBarButton>
      </NavContainer>
    </Nav>
  )
}

const Nav = styled.div`
  background: #546e7a;
  height: 70px;
  width: 100%
  font-weight: 300;
`;

const NavContainer = styled.div`
  width: 1200px;
  display: flex;
  height: 70px;
  margin: 0 auto;
  align-items: center;
  text-transform: uppercase;
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
  margin: 0 10px;
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