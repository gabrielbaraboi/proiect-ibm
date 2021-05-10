import { Link, useParams } from "react-router-dom";
import { Social, SocialLinks, ImagePlace, GeneralInformation, AboutMeCard, Details, Detail, Informations, CoverImagePlace, InformationCard, ProfilePicture } from '../ProfileStyledComponents'
import { faTwitter, faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const GuestProfile = ({ postData, deleteThisUser, admin }) => {

  const { id } = useParams();

  let DoB = '';

  if (postData?.detalii?.DoB) {
    let date = new Date(postData?.detalii?.DoB);
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
            <ProfilePicture src={`/profile/${id}/profilePicture`} />
          </ImagePlace>
          <Details>
            <Detail>
              {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
            </Detail>
            <Detail>{postData?.detalii?.role}</Detail>
            <Detail>{DoB}</Detail>
          </Details>
          {(postData?.detalii?.linkedin || postData?.detalii?.github || postData?.detalii?.facebook || postData?.detalii?.twitter) ?
            (<SocialLinks>
              {postData?.detalii?.linkedin ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.detalii?.linkedin}>
                        <FontAwesomeIcon icon={faLinkedin} size="1x" className="icon linkedin" />
                      </a>
                    </Social>
                    :
                    ('')
                  }
                  {postData?.detalii?.github ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.detalii?.github}>
                        <FontAwesomeIcon icon={faGithub} size="1x" className="icon github" />
                      </a>
                    </Social>
                    :
                    ('')
                  }
                  {postData?.detalii?.facebook ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.detalii?.facebook}>
                        <FontAwesomeIcon icon={faFacebook} size="1x" className="icon facebook" />
                      </a>
                    </Social>
                    :
                    ('')
                  }
                  {postData?.detalii?.twitter ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.detalii?.twitter}>
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

      {(postData?.detalii?.description) ?
        (<AboutMeCard>
          {postData?.detalii?.description}
        </AboutMeCard>) :
        (<></>)
      }

      {postData?.detalii?.role === 'student' ?
        <div>
          {postData?.detalii?.CV ?
            <a href={`http://localhost:9000/profile/${postData?.detalii?._id}/CV`}>Download CV</a>
            :
            "We don't have CV"
          }
        </div>
        : null
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
