import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, GeneralInformations, Content, ProfileImage } from '../ProfileStyledComponents'
import facebook from '../socialNetworks/facebook.png';
import twitter from '../socialNetworks/twitter.png';
import github from '../socialNetworks/github.png';
import linkedin from '../socialNetworks/linkedin.jpg';
import gmail from '../socialNetworks/gmail.png';
import { deleteUser } from "../../../services/UserServices";


export const ShowProfileToGuest = ({ postData, deleteThisUser, admin }) => {

  const { id } = useParams();

  const mystyle = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: "20px",
  };
  const sn = {
    height: 70,
    width: 70,
    margin: 20
  };
  const sn2 = {
    height: 15,
    width: 15,

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
                    <img src={gmail} style={sn2}/> <span style={{fontSize: 15}}>{postData?.detalii?.email} </span> 
                    {admin ? (<><button onClick={() => deleteThisUser()}>Delete User</button></>) : (<></>) }

                </Content>
                  
                </div>
            
          
        
        </GeneralInformations>
        
        {(postData?.detalii?.linkedin || postData?.detalii?.github || postData?.detalii?.facebook || postData?.detalii?.twitter) ?
          (<GeneralInformations>
            {postData?.detalii?.linkedin ? (<a href = {postData?.detalii?.linkedin}> <img src={linkedin} style={sn}/>  </a>) : (<></>)} 
            {postData?.detalii?.github ? (<><a href = {postData?.detalii?.github}> <img src={github} style={sn}/> </a></>) : (<></>)} 
            {postData?.detalii?.facebook ? (<><a href = {postData?.detalii?.facebook}> <img src={facebook} style={sn}/> </a></>) : (<></>)} 
            {postData?.detalii?.twitter ? (<><a href = {postData?.detalii?.twitter}> <img src={twitter} style={sn}/> </a></>) : (<></>)} 
 
          </GeneralInformations>)
          : (<></>)
      }


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
