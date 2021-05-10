import { clearUser } from "../../services/localStorageManagment";
import { logout } from "../../services/UserServices";
import { isUserData, getUserData } from "../../services/localStorageManagment";
import "./NavBar.css";
import Icon from '@mdi/react'
import { mdiPlusBoxMultiple } from '@mdi/js';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container } from "../Global.styledComponents"
import { Nav, VerticalNav, TitleDiv, Title, UserProfileMinimizedNavBar, ProfileCard, Other, Vertical, Column, NavBarButton, ColumnNav, OtherColumn } from "./NavBar.styledComponents";

const NavBar = ({ connectedUser }) => {
    const [showColumnNav, setShowColumnNav] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = getUserData();
        setUser(userData);
    }, [])

    const mystyle = {
        height: "100%",
        width: "100%",
        objectFit: "cover",
        borderRadius: "100%"
    };

    return (
        <Nav>
            <Container>
                <VerticalNav>
                    <button className={showColumnNav ? `hamburger hamburger--slider is-active` : `hamburger hamburger--slider`} type="button" onClick={(e) => {
                        setShowColumnNav(!showColumnNav);
                    }}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                    <TitleDiv>
                        <a href={`/`}>
                            <Title>Proiect IBM</Title>
                        </a>
                    </TitleDiv>
                    {isUserData() ? <UserProfileMinimizedNavBar>
                        <a href={`/profile/${user?.id}`}>
                            <ProfileCard>
                                <img src={`/profile/${user?.id}/profilePicture`} style={mystyle}></img>
                            </ProfileCard>
                        </a>
                    </UserProfileMinimizedNavBar> :
                        ``}
                    <Other>
                        <a className="flex-elem" href={`/`}><NavBarButton>Postari</NavBarButton></a>
                        {isUserData() ?
                            <Vertical>
                                <Link to={`/posts/new`}>
                                    <NavBarButton>
                                        <Icon path={mdiPlusBoxMultiple} size={1}></Icon>
                                    </NavBarButton>
                                </Link>
                                <a href={`/profile/${user?.id}`}>
                                    <ProfileCard>
                                        <img src={`/profile/${user?.id}/profilePicture`} style={mystyle}></img>
                                    </ProfileCard>
                                </a>
                                <a href={`/`}>
                                    <NavBarButton backgroundColor={`#FF7272`} color={`white`} backgroundColorHover={`#FF3838`} onClick={(e) => {
                                        e.preventDefault();
                                        try {
                                            logout().then(res => console.log(res)).catch(err => console.log(err.message));
                                            clearUser();
                                            window.location.reload();
                                        } catch (error) {
                                            console.log(error.message);
                                        }
                                    }}>Deconectare</NavBarButton>
                                </a>
                            </Vertical>
                            :
                            <div>
                                <a href={`/login`}>
                                    <NavBarButton>Conectare</NavBarButton>
                                </a>
                                <a href={`/register`}>
                                    <NavBarButton backgroundColor={`#BAF19C`} backgroundColorHover={`#8DFF4F`}>Inregistrare</NavBarButton>
                                </a>
                            </div>
                        }

                    </Other>
                </VerticalNav>
                <ColumnNav className={showColumnNav ? `show` : `hide`}>
                    <OtherColumn>
                        <a href={`/`}>
                            <NavBarButton>Postari</NavBarButton>
                        </a>
                        {isUserData() ?
                            <Column>
                                <Link to={`/posts/new`}>
                                    <NavBarButton>Adauga postare</NavBarButton>
                                </Link>
                                <a href={`/`}>
                                    <NavBarButton backgroundColor={`#FF7272`} color={`white`} backgroundColorHover={`#FF3838`} onClick={(e) => {
                                        e.preventDefault();
                                        try {
                                            logout().then(res => console.log(res)).catch(err => console.log(err.message));
                                            clearUser();
                                            window.location.reload();
                                        } catch (error) {
                                            console.log(error.message);
                                        }
                                    }}>Deconectare</NavBarButton>
                                </a>
                            </Column>
                            :
                            <Column>
                                <a href={`/login`}>
                                    <NavBarButton>Conectare</NavBarButton>
                                </a>
                                <a href={`/register`}>
                                    <NavBarButton backgroundColor={`#BAF19C`} backgroundColorHover={`#8DFF4F`}>Inregistrare</NavBarButton>
                                </a>
                            </Column>

                        }
                    </OtherColumn>
                </ColumnNav>
            </Container>
        </Nav>
    )
}

export default NavBar;