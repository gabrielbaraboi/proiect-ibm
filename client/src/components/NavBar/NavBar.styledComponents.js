import styled from "styled-components";

export const Nav = styled.div`
    padding: 8px 0;
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, .55);
`

export const VerticalNav = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 780px) {
        justify-content: space-between;
        position: relative;
    }
`;

export const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    @media (max-width: 780px) {
        margin: 0 4rem;
    }
`;


export const Other = styled.div`
    display: flex;
    font-size: 1rem;
    margin: 1rem;
    align-items: center;
    @media (max-width: 780px) {
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
    color: ${props => props.color || `white`};
    transition: 1s ease;
    :hover{
        cursor: pointer;
        background-color: ${props => props.backgroundColorHover || `#22A5FF`};
    }
`;

export const ColumnNav = styled.div`
    text-align: center;
`;

export const OtherColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
    a {
        margin-top: 5px;
    }
`;

export const TitleDiv = styled.div`
    margin-right: auto;
    @media (max-width: 780px) {
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
    margin: 0 1rem;
`;

export const Vertical = styled.div`
    display: flex;
    align-items: center;
`;

export const UserProfileMinimizedNavBar = styled.div`
    display: none;
    @media (max-width: 780px) {
        display: inline-block;
        position: absolute;
        right: 0;
    }  
`;