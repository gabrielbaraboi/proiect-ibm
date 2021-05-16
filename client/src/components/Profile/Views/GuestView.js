import { Link, useParams } from "react-router-dom";
import { Social, SocialLinks, ImagePlace, GeneralInformation, AboutMeCard, Details, Detail, Informations, CoverImagePlace, InformationCard, ProfilePicture } from '../ProfileStyledComponents'
import { faTwitter, faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactImageFallback from "react-image-fallback";
import { ImageCircleStyle } from "../../Global.styledComponents";

export const GuestProfile = ({ postData, deleteThisUser, admin }) => {

  const { id } = useParams();

  let DoB = '';

  if (postData?.details?.DoB) {
    let date = new Date(postData?.details?.DoB);
    let year = date.getFullYear();
    let month = date.getMonth() + 1
    if (month < 10)
      month = '0' + month
    let day = date.getDate()
    if (day < 10)
      day = '0' + day
    DoB = day + '.' + month + '.' + year
  }

  return (
    <>
      <GeneralInformation>
        <CoverImagePlace>
          <img src='https://lp-cms-production.imgix.net/2019-06/28206231.jpg'></img>
        </CoverImagePlace>
        <Informations>
          <ImagePlace>
            <ReactImageFallback
                    src={`/profile/${id}/profilePicture`}
                    fallbackImage={process.env.PUBLIC_URL + '/iconUser.jpg'}
                    style={ImageCircleStyle} />
          </ImagePlace>
          <Details>
            <Detail>
              {postData?.details?.companyName} {postData?.details?.firstName} {postData?.details?.lastName}
            </Detail>
            <Detail>{postData?.details?.role}</Detail>
            <Detail>{DoB}</Detail>
            {postData?.details?.role === 'student' ?
              <Detail>
                {postData?.details?.CV ?
                  <a href={`http://localhost:9000/profile/${postData?.details?._id}/CV`}>Download CV</a>
                  :
                  "We don't have CV"
                }
              </Detail>
              : null
            }
            <Detail>
              <a href={`/?createdBy=${postData?.details?._id}`}>
                View more posts by {postData?.details?.companyName} {postData?.details?.firstName} {postData?.details?.lastName}
              </a>
            </Detail>
          </Details>
          {(postData?.details?.linkedin || postData?.details?.github || postData?.details?.facebook || postData?.details?.twitter) ?
            (<SocialLinks>
              {postData?.details?.linkedin ?
                <Social>
                  <a target="_blank" rel="noreferrer" href={postData?.details?.linkedin}>
                    <FontAwesomeIcon icon={faLinkedin} size="1x" className="icon linkedin" />
                  </a>
                </Social>
                :
                ('')
              }
              {postData?.details?.github ?
                <Social>
                  <a target="_blank" rel="noreferrer" href={postData?.details?.github}>
                    <FontAwesomeIcon icon={faGithub} size="1x" className="icon github" />
                  </a>
                </Social>
                :
                ('')
              }
              {postData?.details?.facebook ?
                <Social>
                  <a target="_blank" rel="noreferrer" href={postData?.details?.facebook}>
                    <FontAwesomeIcon icon={faFacebook} size="1x" className="icon facebook" />
                  </a>
                </Social>
                :
                ('')
              }
              {postData?.details?.twitter ?
                <Social>
                  <a target="_blank" rel="noreferrer" href={postData?.details?.twitter}>
                    <FontAwesomeIcon icon={faTwitter} size="1x" className="icon twitter" />
                  </a>
                </Social>
                :
                ('')
              }
            </SocialLinks>)
            : (<></>)}
        </Informations>
      </GeneralInformation>

      {(postData?.details?.description) ?
        (<AboutMeCard>
          {postData?.details?.description}
        </AboutMeCard>) :
        (<></>)
      }
    </>
  )
}

export default GuestProfile;
