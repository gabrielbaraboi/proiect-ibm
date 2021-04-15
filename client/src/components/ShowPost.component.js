import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavBar from "./NavBar.component"
import { CommentSection } from "./CommentSection.component";

export const ShowPost = ( {connectedUser }) => {
    const { id } = useParams();

    const [postData, setPostData] = useState({})
    const [commentPage,setCommentPage] = useState(0);
    
    useEffect(() => 
      axios.get(`http://localhost:9000/posts/postDetails/${id}`)
        .then( res => {
          setPostData(res.data);
        })
        .catch(err => console.log(err))
      ,[])
    return(
      <div>
    <ShowPostContainer className="App">
      <NavBar></NavBar>
      <TopSection>
        <Line></Line>
        <ImagePlace></ImagePlace>
        <Data>Postat: {postData?.post?.dateCreated?.slice(0,10)}</Data>
      </TopSection>
      <Title>{postData?.post?.title}</Title>
      <Company>{postData?.post?.creator?.companyName}</Company>
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
    </ShowPostContainer>
    <CommentSection postID={id} connectedUser={connectedUser}></CommentSection>
    </div>
    
    )
}

const ShowPostContainer = styled.div`
text-align: center
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
  height: 0.5px;
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