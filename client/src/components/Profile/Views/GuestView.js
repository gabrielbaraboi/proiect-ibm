import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ImagePlace, GeneralInformation, AboutMeCard, Details, Detail, Informations, CoverImagePlace, InformationCard, SocialImage, ProfilePicture } from '../ProfileStyledComponents'
import facebook from '../socialNetworks/facebook.png';
import twitter from '../socialNetworks/twitter.png';
import github from '../socialNetworks/github.png';
import linkedin from '../socialNetworks/linkedin.jpg';
import gmail from '../socialNetworks/gmail.png';
import { deleteUser } from "../../../services/UserServices";


export const GuestProfile = ({ postData, deleteThisUser, admin }) => {

  const { id } = useParams();

let date = new Date(postData?.detalii?.DoB);
let year = date.getFullYear();
let month = date.getMonth() + 1
if (month < 10)
  month = '0' + month
let day = date.getDate()
if (day < 10)
  day = '0' + day
const DoB = day + '.' + month + '.' + year

return (
  <>
    <GeneralInformation>
      <CoverImagePlace>
        <img src='https://lp-cms-production.imgix.net/2019-06/28206231.jpg'></img>
      </CoverImagePlace>
      <Informations>
        <ImagePlace>
          <ProfilePicture src={`/profile/${id}/profilePicture`} />
        </ImagePlace>
        <Details>
          <Detail>
            {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
          </Detail>
          <Detail>{postData?.detalii?.role}</Detail>
          <Detail>{DoB}</Detail>
        </Details>
      </Informations>
    </GeneralInformation>

    {(postData?.detalii?.description) ?
      (<AboutMeCard>
        {postData?.detalii?.description}
      </AboutMeCard>) :
      (<></>)
      }


    {(postData?.detalii?.linkedin || postData?.detalii?.github || postData?.detalii?.facebook || postData?.detalii?.twitter) ?
      (<InformationCard>
        {/* {postData?.detalii?.linkedin ? (<a href={postData?.detalii?.linkedin}> <img src={linkedin} style={SocialImage} />  </a>) : (<></>)}
        {postData?.detalii?.github ? (<><a href={postData?.detalii?.github}> <img src={github} style={SocialImage} /> </a></>) : (<></>)}
        {postData?.detalii?.facebook ? (<><a href={postData?.detalii?.facebook}> <img src={facebook} style={SocialImage} /> </a></>) : (<></>)}
        {postData?.detalii?.twitter ? (<><a href={postData?.detalii?.twitter}> <img src={twitter} style={SocialImage} /> </a></>) : (<></>)} */}

      </InformationCard>)
      : (<></>)
    }



    <InformationCard>
      <Link to={`/?createdBy=${postData?.detalii?._id}`}>
        View more posts by {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
      </Link>
    </InformationCard>
  </>
)
}

export default GuestProfile;
