import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavBar from "./NavBar.component"

export const ShowPost = () => {
    const { id } = useParams();

    const [postData, setPostData] = useState({})
    
    useEffect(() => 
      axios.get(`http://localhost:9000/posts/${id}`)
        .then( res => {
          setPostData(res.data);})
        .catch(err => console.log(err))
      ,[])
  
    return(
    <Container className="App">
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
                <li key={idx}>{req}</li>
              ))}
            </CustomUL>
          </About>
        </PostDataRow>
        <PostDataRow>
          <LabelPost htmlFor="details">Informatii:</LabelPost>
          <About id="details">
            <CustomUL>
              <li>Locatie: {postData?.post?.workPlace}</li>
              <li>Program: {postData?.post?.workHours}</li>
            </CustomUL>
          </About>
        </PostDataRow>
      </PostData>
    </Container>
    )
}

const Container = styled.div`
text-align: center
`;

// const NavBar = styled.div`
//   width: 100%;
//   height: 50px;
//   background-color: #c4c4c4;
// `;

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
`;

const Title = styled.div`
  font-size: 2rem;
  margin-top: -1.5rem;
`;

const Company = styled.div`
  font-size: 1.2rem;
  padding-bottom: .2rem;
`;

const Place = styled.div`
  color: #7c7c7c;
  font-size: 1rem;
`;

const PostData = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelPost = styled.label`
  font-size: 1rem;
  font-weight: bold;
  flex-shrink: 0;
  margin: 0 5rem 0 0;
`;

const PostDataRow = styled.div`
  display: flex;
  padding: 2rem 5rem;
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
`;

const CustomUL = styled.ul`
    margin: 0;
`;