import styled from "styled-components";

export const Container = styled.div`
    background-color: #89CCF6;
    text-align: center;
`;

export const VerticalNav = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  @media (max-width: 1000px) {
    justify-content: space-between;
  }
`;

export const Title = styled.div`
    font-size:1.5rem;
    font-weight: bold;
    color: black;
    @media (max-width: 1000px) {
        margin: 0 2rem;
    }
`;


export const Other = styled.div`
  display: flex;
  font-size: 1rem;
  margin: 1rem;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const NavBarButton = styled.button`
    
    background-color: ${props => props.backgroundColor || `#89CCF6`};
    padding: .5rem;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    margin: 0 1rem;
    color: ${props => props.color || `black`};
    transition: 1s ease;
    :hover{
        cursor: pointer;
        background-color: ${props => props.backgroundColorHover || `#22A5FF`};
    }
`;

export const NavBarMenuButton = styled.button`
    display: none;
    background: transparent;
    border: none;
    margin: .5rem;
    :hover{
        cursor: pointer;
    }
    @media (max-width: 1000px) {
        display: inline-block;
        position: absolute;
  }
`;

export const ColumnNav = styled.div`
`;

export const OtherColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
`;

export const TitleDiv = styled.div`
    @media (max-width: 1000px) {
        width: 100%;
        text-align: center;
    }  
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProfileCard = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: grey;
`;

export const Vertical = styled.div`
    display: flex;
`;

export const UserProfileMinimizedNavBar = styled.div`
    display:none;
    @media (max-width: 1000px) {
        display: inline-block;
    }  
`;