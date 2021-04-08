import { Link } from "react-router-dom"
import styled from "styled-components";
import NavBar from "./NavBar.component"


export const ShowPosts = () => {
    const id = `60671023218a56ac20df49ff`;
    return(
    <div >
        <Link to={`/${id}`}>Hello World</Link>
    </div>
    )
}
