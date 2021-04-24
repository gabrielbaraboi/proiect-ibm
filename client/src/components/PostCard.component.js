import styled from "styled-components";
import { Link } from "react-router-dom";

const PostCard = ({ theRef, post }) => {
  let created_date = new Date(post.dateCreated);
  let hour = created_date.getHours();
  if (hour < 10)
    hour = '0' + hour
  let min = created_date.getMinutes();
  if (min < 10)
    min = '0' + min

  return (
    <Post>
      <PostHeader>
        <PostTitle>
          <Link to={`/post/${post._id}`}>
            {post.title}
          </Link>
        </PostTitle>
        <PostCreator>
          <Link to={`/profile/${post.createdBy}`}>
            by {!post.creator?'Deleted User':post.creator.companyName ? post.creator.companyName : post.creator.firstName + ' ' + post.creator.lastName}
          </Link>
          <br></br>
          {post.dateCreated.slice(0, 10) + ' ' + hour + ':' + min}
        </PostCreator>
      </PostHeader>
      <h4>{post.type}</h4>
      <h4>{post.workPlace}</h4>
      <Requirements>
        {post.requirements.map((req, idx) => (
          <li key={idx}>{req.length > 30 ? req.slice(0, 30) + '...' : req}</li>
        ))}
        <li>{post.workHours}</li>
      </Requirements>
    </Post>
  )
}

const Post = styled.div`
  width: 100%;
  background: #f5f5f5;
  margin-bottom: 5px;
  padding: 15px;
  border-radius: 5px;
  h4 {
    font-size: 14px;
    font-weight: 400;
  }
  h4:nth-child(2) {
    font-weight: bold;
  }
`;

const PostHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
`

const PostCreator = styled.div`
  color: gray;
  font-size: 14px;
  position: absolute;
  right: 0;
`

const PostTitle = styled.h3`
  font-size: 18px;
    a {
      color: #1e88e5;
    }
`

const Requirements = styled.ul`
  list-style: none;
  margin-top: 5px;
  li {
    float: left;
    font-size: 15px;
    background: #DCDCDC;
    margin-right: 10px;
    margin-top: 5px;
    padding: 2px 10px;
    color: #3e3e3e;
    border-radius: 5px;
  }
  li:nth-child(1) {
    margin-left: 0;
  }
`

export default PostCard;