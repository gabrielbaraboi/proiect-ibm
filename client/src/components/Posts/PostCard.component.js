import { Link } from "react-router-dom";
import { Post, PostHeader, AuthorImage, Image, PostHeaderBody, PostTitle, PostHeaderDetails, Detail, PostHeaderData, DataItem, PostDescription, PostRequirements, Requirement } from "./Post.styledComponents"

const PostCard = ({ theRef, post }) => {

  return (
    <Post>
      <PostHeader>
        <AuthorImage>
          <Link to={`/profile/${post?.createdBy}`} target="_blank">
            <Image src={`/profile/${post?.createdBy}/profilePicture`} />
          </Link>
        </AuthorImage>
        <PostHeaderBody>
          <PostTitle>
            <Link to={`/post/${post?._id}`}>
              {post?.title.length > 45 ? post?.title.slice(0, 45) + '...' : post?.title}
            </Link>
          </PostTitle>
          <PostHeaderDetails>
            <Detail>{post?.type}</Detail>
            <Detail>{post?.workHours}</Detail>
            <Detail>{post?.workPlace}</Detail>
          </PostHeaderDetails>
        </PostHeaderBody>
        <PostHeaderData>
          <DataItem>
            {!post.creator ? 'by Deleted User' :
              <Link to={`/profile/${post?.createdBy}`}>
                by {post?.creator?.companyName ? post?.creator?.companyName : post?.creator?.firstName + ' ' + post?.creator?.lastName}
              </Link>
            }
          </DataItem>
          <DataItem>
            {post?.dateCreated.slice(0, 10)}
          </DataItem>
        </PostHeaderData>
      </PostHeader>
      <PostDescription>
        {post?.description.length > 200 ? post?.description.slice(0, 200) + '...' : post?.description}
      </PostDescription>
      <PostRequirements>
        {post?.requirements.map((req, idx) => (
          <Requirement key={idx}>{req.length > 30 ? req.slice(0, 30) + '...' : req}</Requirement>
        ))}
      </PostRequirements>
    </Post>
  )
}

export default PostCard;