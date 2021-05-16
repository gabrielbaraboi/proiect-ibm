import { Link } from "react-router-dom";
import moment from "moment";
import { PostRightBlock, Post, PostHeader, AuthorImage, Image, PostHeaderBody, PostTitle, PostHeaderDetails, Detail, PostHeaderData, DataItem, PostDescription, PostRequirements, Requirement } from "./Post.styledComponents"
import ReactImageFallback from "react-image-fallback";
import { ImageRectStyle } from '../Global.styledComponents';


const PostCard = ({ theRef, post }) => {

  const created_date = new Date(post?.dateCreated);

  return (
    <Post>
      <AuthorImage>
        {/* {post.creator ?
          <Link to={`/profile/${post?.createdBy}`} target="_blank">
            <Image src={`/profile/${post?.createdBy}/profilePicture`} />
          </Link> :
          <Image src=" " />
        } */}
        <ReactImageFallback
                    src={`/profile/${post?.createdBy}/profilePicture`}
                    fallbackImage={process.env.PUBLIC_URL + '/iconUser.jpg'}
                    style={ImageRectStyle} />
      </AuthorImage>
      <PostRightBlock>
        <PostHeader>
          <PostHeaderBody>
            <PostTitle>
              <Link to={`/post/${post?._id}`}>
                {post?.title.length > 45 ? post?.title.slice(0, 35) + '...' : post?.title}
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
              {moment(created_date).fromNow()}
            </DataItem>
          </PostHeaderData>
        </PostHeader>
        <PostDescription>
          {post?.description.length > 200 ? post?.description.slice(0, 160) + '...' : post?.description}
        </PostDescription>
        <PostRequirements>
          {post?.requirements.map((req, idx) => (
            <Requirement key={idx}>{req.length > 30 ? req.slice(0, 30) + '...' : req}</Requirement>
          ))}
        </PostRequirements>
      </PostRightBlock>
    </Post>
  )
}

export default PostCard;