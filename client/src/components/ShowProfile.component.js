import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavBar from "./NavBar/NavBar.component";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile.component";



export const ShowProfile = ( { connectedUser }) => {
    const [EditMode, setEditMode] = useState(false);

    const toggleEdit = () => {
      setEditMode(false);
    }

    const { id } = useParams();
   
    var logat = false;
    if(connectedUser) {
      if(connectedUser.id === id) {
        logat = true;
      }
    }

    const [postData, setPostData] = useState({})
    
    useEffect(() => 
      axios.get(`http://localhost:9000/profile/${id}`)
        .then( res => {
          setPostData(res.data);})
        .catch(err => console.log(err))
      ,[])
    
    console.log(connectedUser)
    if(!logat)
      return(
        <div>
      <ShowPostContainer className="App">
        <NavBar></NavBar>
        <TopSection>
          <Line></Line>
          <ImagePlace></ImagePlace>

        </TopSection>
        <Title>{postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}</Title>
        <Company>{postData?.detalii?.email}</Company>

        <Company>
          <Link to={`/?createdBy=${postData?.detalii?._id}`}>
            View more posts by {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
          </Link>
        </Company>
      </ShowPostContainer>
    
      </div>
      
      )
    else {
      return(
        <div>
          {EditMode ? ( 
              <div> 
                <EditProfile toggleEdit={toggleEdit} connectedUser = {connectedUser}></EditProfile>
              </div>
            ) : (
              <div>
                  <ShowPostContainer className="App">
                    <NavBar></NavBar>
                    <TopSection>
                      <Line></Line>
                      <ImagePlace></ImagePlace>

                    </TopSection>
                    <Title>{postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}</Title>
                    <Company>{postData?.detalii?.email}</Company>

                    <Company>
                      <Link to={`/?createdBy=${postData?.detalii?._id}`}>
                        View more posts by {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
                      </Link>
                    </Company>

                    <button onClick={()=>setEditMode(true)}>Edit</button>
                  </ShowPostContainer>
              </div>
            )
          }
        </div>
      )
    }
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