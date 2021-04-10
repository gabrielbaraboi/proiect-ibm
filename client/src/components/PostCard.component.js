import styled from "styled-components";
import { Link } from "react-router-dom";

const PostCard = ({theRef,post}) => {
  return (
    <div className="card-container">
      <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
      <div className="desc">
        <h2>
          <Link to={`/post/${post._id}`}>
            {post.title}
          </Link>
        </h2>
        <h3>{post.type}</h3>
        <p>{post.workHours}</p>
      </div>
    </div>
  )
}

export default PostCard;