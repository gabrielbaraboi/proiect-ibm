import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, GeneralInformations, Content, ProfileImage } from '../ProfileStyledComponents'

export const ShowProfileToGuest = ({ postData, deleteThisUser, admin }) => {

  const { id } = useParams();

  const mystyle = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: "20px",
  };


  return (
    
      <ShowPostContainer className="App">
        <NavBar></NavBar>

        <GeneralInformations>
          <ImagePlace>
            <ProfileImage src={`/profile/${id}/profilePicture`} style={mystyle}></ProfileImage>
          </ImagePlace>
          <AboutMe> 
          
            {postData?.detalii?.description}

          </AboutMe>
                <div>
                  <Content>
                    {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName} <br></br>
                    {admin ? (<><button onClick={() => deleteThisUser()}>Delete User</button></>) : (<></>) }
                
                </Content>
                  
                </div>
            
          
        
        </GeneralInformations>
        
        {(postData?.detalii?.linkedin || postData?.detalii?.github) ?
          (<GeneralInformations>
            {postData?.detalii?.linkedin ? (<a href = {postData?.detalii?.linkedin}> LinkedIn </a>) : (<></>)} 
            {postData?.detalii?.github ? (<><br/><a href = {postData?.detalii?.github}> GitHub </a></>) : (<></>)} 
          </GeneralInformations>)
          : (<></>)
      }

        <GeneralInformations>
            {postData?.detalii?.email} 
        </GeneralInformations>

        <AboutMeSmall>
        {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                    "Add an about me section."
            }
        </AboutMeSmall>
        

        <GeneralInformations>
            <Link to={`/?createdBy=${postData?.detalii?._id}`}>
        View more posts by {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
              </Link>
        </GeneralInformations>
      </ShowPostContainer >
    )
  }

export default ShowProfileToGuest;
