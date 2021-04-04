import { Link } from "react-router-dom"

export const ShowPosts = () => {
    const id = 123;
    return(
    <div >
        <Link to={`/${id}`}>Hello World</Link>
        
    </div>
    )
}