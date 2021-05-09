import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, GeneralInformation, AboutMeCard, profileImageStyle, NameArea, CoverImagePlace, InformationCard, NetworkImage } from '../ProfileStyledComponents'
import facebook from '../socialNetworks/facebook.png';
import twitter from '../socialNetworks/twitter.png';
import github from '../socialNetworks/github.png';
import linkedin from '../socialNetworks/linkedin.jpg';
import gmail from '../socialNetworks/gmail.png';
import { deleteUser } from "../../../services/UserServices";


export const ShowProfileToGuest = ({ postData, deleteThisUser, admin }) => {

  const { id } = useParams();

  return (
    
      <ShowPostContainer className="App">
        <NavBar></NavBar>

        <GeneralInformation>

          <CoverImagePlace> 
                    <img src='https://lp-cms-production.imgix.net/2019-06/28206231.jpg' style={{"width": "100%", "height": "100%", 'border-top-left-radius': '13px', 'border-top-right-radius': '13px', 'position': 'relative' }}></img>
          </CoverImagePlace>
          
          <ImagePlace>
            <img src={`/profile/${id}/profilePicture`} style={profileImageStyle}></img>
          </ImagePlace>

          <NameArea>  
              {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName} <br/>
              <div style={{"font-size": "15px"}}> {postData?.detalii?.role} </div>
          </NameArea>

        </GeneralInformation>
        
        {(postData?.detalii?.description) ? 
            (<AboutMeCard>
                <AboutMe> 
                {postData?.detalii?.description}
              </AboutMe>
            </AboutMeCard>) :
            (<></>)
        }



        {(postData?.detalii?.linkedin || postData?.detalii?.github || postData?.detalii?.facebook || postData?.detalii?.twitter) ?
          (<InformationCard>
            {postData?.detalii?.linkedin ? (<a href = {postData?.detalii?.linkedin}> <img src={linkedin} style={NetworkImage}/>  </a>) : (<></>)} 
            {postData?.detalii?.github ? (<><a href = {postData?.detalii?.github}> <img src={github} style={NetworkImage}/> </a></>) : (<></>)} 
            {postData?.detalii?.facebook ? (<><a href = {postData?.detalii?.facebook}> <img src={facebook} style={NetworkImage}/> </a></>) : (<></>)} 
            {postData?.detalii?.twitter ? (<><a href = {postData?.detalii?.twitter}> <img src={twitter} style={NetworkImage}/> </a></>) : (<></>)} 
 
          </InformationCard>)
          : (<></>)
      }

        

        <InformationCard>
            <Link to={`/?createdBy=${postData?.detalii?._id}`}>
        View more posts by {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
              </Link>
        </InformationCard>
      </ShowPostContainer >
    )
  }

export default ShowProfileToGuest;
