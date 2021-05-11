import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar/NavBar.component";
import { CommentSection } from "./CommentSection.component";
import { Link } from "react-router-dom";
import { getPostDetails, deletePost, getApplications, createApplication } from "../services/PostsServices"
import { useHistory } from 'react-router';

export const ShowPost = ({ connectedUser }) => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  const [applicationsData, setApplicationData] = useState({});
  const [loading, setLoading] = useState(true);

  const userPost = (user, post) => {
    return (post?.post?.createdBy === user?.id) || (user?.role === 'admin');
  };
  useEffect(() => {
    setLoading(true);
    getPostDetails(id)
      .then(res => {
        setPostData(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }
    , []);

  ///////////
    useEffect(() => {
      getApplications(id)
        .then(res => {
          setApplicationData(res.data);
        })
        .catch(err => console.log(err))
    }
    , []);

    
  if(userPost(connectedUser, postData)) {
    console.log(applicationsData);
  }
  
  ///////////

  const history = useHistory();
  const deleteThisPost = () => {
    deletePost(id).then(res => {
      console.log('Successfully delete post!');
      history.push('/');
    })
      .catch(err => console.log(err));
  };

  const mystyle = {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  };
  return (
    <div>
      <ShowPostContainer className="App">
        <NavBar></NavBar>
          { connectedUser ? ((connectedUser.role === 'student' && !userPost(connectedUser, postData) && postData?.post?.type === 'offer') ?
                <button onClick={() => createApplication(id, connectedUser.id)}> APPLY </button>
            : (<></>)) : (<></>)
          }
        <TopSection>
          <Line></Line>
          <ImagePlace>
            <img src={`/profile/${postData?.post?.createdBy_id}/profilePicture`} style={mystyle}></img>
          </ImagePlace>
          <Data>Postat: {postData?.post?.dateCreated?.slice(0, 10)}</Data>
        </TopSection>
        <Title>{loading ? "Loading post right now!" : postData?.post?.title}</Title>
        <Company>
          <Link to={`/profile/${postData?.post?.createdBy_id}`}>
            {postData?.post?.creator?.companyName}
          </Link>
        </Company>
        <Place>{postData?.post?.workPlace}</Place>
        <PostData>
          <PostDataRow>
            <LabelPost htmlFor="about">Despre job:</LabelPost>
            <About id="about">
              {postData?.post?.description}
            </About>
          </PostDataRow>
          <PostDataRow>
            <LabelPost htmlFor="requirements">Cerinte:</LabelPost>
            <About id="requirements">
              <CustomUL>
                {postData?.post?.requirements.map((req, idx) => (
                  <CustomLi key={idx}>{req}</CustomLi>
                ))}
              </CustomUL>
            </About>
          </PostDataRow>
          <PostDataRow>
            <LabelPost htmlFor="details">Detalii:</LabelPost>
            <About id="details">
              <CustomUL>
                <CustomLi>Locatie: {postData?.post?.workPlace}</CustomLi>
                <CustomLi>Program: {postData?.post?.workHours}</CustomLi>
              </CustomUL>
            </About>
          </PostDataRow>
        </PostData>
        {!loading && userPost(connectedUser, postData) &&
          <div>
            <button onClick={deleteThisPost}>Delete Post</button>
          </div>}
      </ShowPostContainer>
      <CommentSection postID={id} connectedUser={connectedUser} commentCount={postData?.commentCount}></CommentSection>
    </div>

  )
}

const ShowPostContainer = styled.div`
  text-align: center;
`;

const TopSection = styled.div`
  height: 200px;
  position: relative;
  left: 0px;
`;

const Line = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  background-color: black;
  height: 1px;
`;

const ImagePlace = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 130px;
  height: 130px;
  transform: translate(-50%, -50%);
  background-color: #c4c4c4;
  @media (max-width: 1000px){
    width: 100px;
    height: 100px;
  }
  
`;

const Title = styled.div`
  font-size: 2rem;
  margin-top: -1.5rem;
  @media (max-width: 1000px){
    font-size: 1.5rem;
  }
`;

const Company = styled.div`
  font-size: 1.2rem;
  padding-bottom: .2rem;
  @media (max-width: 1000px){
    font-size: 1rem;
  }
`;

const Place = styled.div`
  color: #7c7c7c;
  font-size: 1rem;
  padding-bottom: 1rem;
  @media (max-width: 1000px){
    font-size: .8rem;
  }
`;

const PostData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelPost = styled.label`
  width: 100px;
  font-size: 1rem;
  font-weight: bold;
  flex-shrink: 0;
  margin: 0 2rem 0 0;
  text-align: left;
  @media (max-width: 1000px){
    padding-bottom: 1rem;
  }
  
`;

const PostDataRow = styled.div`
  display: flex;
  @media (max-width: 1000px){
    flex-direction: column;
    padding: 1rem 1rem;
  }
  padding: 1rem 5rem;
`;

const About = styled.div`
  text-align: left;
`;

const Data = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  color: #7c7c7c;
  padding: 0 2rem;
  @media (max-width: 1000px){
    top: 10%;
    padding: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const CustomUL = styled.ul`
    margin: 0;
    list-style-type: none;
`;

const CustomLi = styled.li`
  padding: 0 0 .2rem 0;
`;