import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavBar from "./NavBar/NavBar.component";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile.component";
import { deleteUser, logout } from "../services/UserServices";
import { clearUser } from "../services/localStorageManagment";
import Moment from "moment";

export const ShowProfile = ({ connectedUser }) => {
  const [EditMode, setEditMode] = useState(false);
  const [UserExists, setUserExists] = useState(true);

  useEffect(() =>
  axios.get(`http://localhost:9000/profile/${id}`)
    .then(res => {
      setPostData(res.data);
    })
    .catch(err => {
      console.log(err.message);
      setUserExists(false)
    })
  , [])

  const toggleEdit = () => {
    setEditMode(false);
  }

  const { id } = useParams();

  let logat = false;
  let admin = false;
  if (connectedUser) {
    if (connectedUser.id === id) {
      logat = true;
    }
    if(connectedUser.role === 'admin') {
      admin = true;
    }
  }

  const history = useHistory();
  const deleteThisUser = () => {
    deleteUser(id).then(res => console.log(res)).catch(err => console.log(err));
    logout().then(res => console.log(res)).catch(err => console.log(err.message));
    clearUser();
    history.push('/');
  };

  const [postData, setPostData] = useState({})

  console.log(UserExists);
  // if (!UserExists)
  //   history.push("/")

return(
  <>
  {!logat ? (<>
    <ShowPostContainer className="App">
    <NavBar></NavBar>

      <InformatiiGenerale>
        <ImagePlace> </ImagePlace>
        <AboutMe> 
        
          {postData?.detalii?.description}

        </AboutMe>
              <div>
                <Continut>
                  {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName} <br></br>
                  {admin ? (<><button onClick={() => deleteThisUser()}>Delete User</button></>) : (<></>) }
               
               </Continut>
                
              </div>
          
        
       
      </InformatiiGenerale>
      
      <InformatiiGenerale>
           {postData?.detalii?.email} 
      </InformatiiGenerale>

      <AboutMeSmall>
      {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                  "Add an about me section."
          }
      </AboutMeSmall>
      
      <InformatiiGenerale>
           <Link to={`/?createdBy=${postData?.detalii?._id}`}>
                View more posts by {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
            </Link>
      </InformatiiGenerale>
    </ShowPostContainer>)
  
  </>) : (
  
  <ShowPostContainer className="App">
    <NavBar></NavBar>

      <InformatiiGenerale>
        <ImagePlace> </ImagePlace>
        <AboutMe> 
        
          {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                  <div>
                      Add an about me section.<br/>  
                  </div>
          }

        </AboutMe>

        {EditMode ? ( 
              <EditProfile toggleEdit={toggleEdit} connectedUser = {postData}></EditProfile>
          ) : (
              <div>
                <Continut>
                  {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName} <br></br>
                  <button onClick={() => setEditMode(true)}>Edit</button>
                  <button onClick={() => deleteThisUser()}>Delete your account</button>
               </Continut>
                
              </div>
          )
        }
       
      </InformatiiGenerale>
      
      <InformatiiGenerale>
           {postData?.detalii?.email} <br/>
           {postData?.detalii?.DoB ? Moment(postData?.detalii?.DoB).format('DD-MM-YYYY') : (<></>)} 
      </InformatiiGenerale>

      <AboutMeSmall>
      {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                  "Add an about me section."
          }
      </AboutMeSmall>
      
      <InformatiiGenerale>
           <Link to={`/?createdBy=${postData?.detalii?._id}`}>
                View your posts
            </Link>
      </InformatiiGenerale>
    </ShowPostContainer>)
}
    </>
  )
}

const ShowPostContainer = styled.div`
  text-align: center
`;


const ImagePlace = styled.div`
  float: left;
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 25px;
  margin-left: 25px;
  margin-top: 25px;
  background-color: gray;
  @media (max-width: 1000px){
      width: 270px;
      height: 270px;
  }
  @media (max-width: 750px){
    margin: 0 auto;
    float: none;
    margin-top: 20px;
  }
  
`;
const AboutMe = styled.div`
  float: left;
  position: relative;
  width: 700px;
  height: 250px;
  border-radius: 25px;
  margin-left: 25px;
  margin-top: 25px;
  padding: 70px 0.1;
  text-align: left;
  @media (max-width: 1400px){
    width: 570px;
  }
  @media (max-width: 1000px){
      width: 300px;
      height: 270px;
  }
  @media (max-width: 750px){
    margin: 0 auto;
    margin-top: 20px;
    display: none;
  }
  
`;

const AboutMeSmall  = styled.div`
  padding: 25px;
  margin: 0 auto;
  margin-top: 15px;
  background-color: white;
  width: 1100px;
  height: auto;
  border-radius: 25px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  text-align: left;
  display: none;
  @media (max-width: 1400px){
    width: 940px;
  }
  @media (max-width: 1000px){
    width: 700px;
  }
  @media (max-width: 750px){
    width: 500px;
    display: block;
    }
  }
`;
const InformatiiGenerale  = styled.div`
  display: block;
  padding: 25px;
  margin: 0 auto;
  margin-top: 15px;
  background-color: white;
  width: 1100px;
  height: auto;
  border-radius: 25px;
  border-width:0.5px;
  border-style: solid;
  border-color:#d7d9d7;
  
  @media (max-width: 1400px){
    width: 940px;
  }
  @media (max-width: 1000px){
    width: 700px;
  }
  @media (max-width: 750px){
    width: 500px;
    }
  }
`;

const Continut = styled.div`
  display: inline-block;
  text-align: left;
  font-size: 27px;
  margin-left: 25px;
  width: 1100px;

  @media (max-width: 1400px){
    width: 940px;
  }
  @media (max-width: 1000px){
    width: 700px;
  }
  @media (max-width: 750px){
    width: 250px;
    text-align: center;
    margin-left: 0px;
    }
  }
  
`;



document.body.style = 'background: #f2f3f5;';

