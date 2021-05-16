import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { Detail, ImagePlace, AboutMeCard, InformationCard, Informations, GeneralInformation, CoverImagePlace, Details, modalStyles, ProfilePicture, Social, SocialLinks, ProfilePictureDiv } from '../ProfileStyledComponents';
import { EditDescription, EditName, EditDoB, EditNetworks, EditProfilePicture, EditCoverPicture, EditCV } from "../IndividualEditing";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Modal from 'react-modal';
import { getCompanyApplications, getStudentApplications } from "../../../services/UserServices";
import ReactImageFallback from "react-image-fallback";
import { ImageCircleStyle } from "../../Global.styledComponents";

export const OwnerProfile = ({ postData, deleteThisUser }) => {

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

  const [EditTheProfilePicture, setEditProfilePicture] = useState(false);
  const toggleEditProfilePicture = () => {
    setEditProfilePicture(false);
  };

  const [EditTheCoverPicture, setEditCoverPicture] = useState(false);
  const toggleEditCoverPicture = () => {
    setEditCoverPicture(false);
  };

  const [EditAboutMe, setEditAboutMe] = useState(false);
  const toggleEditAboutMe = () => {
    setEditAboutMe(false);
  }

  const [EditTheDoB, setEditDoB] = useState(false);
  const toggleEditDoB = () => {
    setEditDoB(false);
  }

  const [EditTheNetworks, setEditNetworks] = useState(false);
  const toggleEditNetworks = () => {
    setEditNetworks(false);
  }

  const [modalEditCVIsOpen, setModalEditCVIsOpen] = useState(false);
  const openModalCV = () => {
    setModalEditCVIsOpen(true);
  }

  const closeModalEditCV = () => {
    setModalEditCVIsOpen(false);
  }

  const [modalEditNameIsOpen, setModalEditNameIsOpen] = useState(false);
  const openModalEditName = () => {
    setModalEditNameIsOpen(true);
  }

  const closeModalEditName = () => {
    setModalEditNameIsOpen(false);
  }

  const [modalEditPictureIsOpen, setModalEditPictureIsOpen] = useState(false);
  const openModalEditPicture = () => {
    setModalEditPictureIsOpen(true);
  }

  const closeModalEditPicture = () => {
    setModalEditPictureIsOpen(false);
  }

  const [modalDelete, setModalDelete] = useState(false);
  const openModalDelete = () => {
    setModalDelete(true);
  }

  const closeModalDelete = () => {
    setModalDelete(false);
  }
  const [modalNetworks, setModalNetworksIsOpen] = useState(false);
  const openModalNetworks = () => {
    setModalNetworksIsOpen(true);
  }

  const closeModalNetworks = () => {
    setModalNetworksIsOpen(false);
  }

  const [applicationData, setApplicationData] = useState([]);
  useEffect(() => {
    if (postData?.details?.role === 'student') {
      getStudentApplications(id)
        .then(res => {
          setApplicationData(res.data.applications);
        })
        .catch(err => console.log(err))
    } else {
      getCompanyApplications(id)
        .then(res => {
          setApplicationData(res.data.applications);
        })
        .catch(err => console.log(err))
    }
  }
    , []);

  console.log(applicationData)

  return (
    <>
      <GeneralInformation>
        <CoverImagePlace>
          <img src='https://lp-cms-production.imgix.net/2019-06/28206231.jpg'
            onClick={() => openModalEditPicture()} />
        </CoverImagePlace>
        <Informations>
          <ImagePlace>
            {/* <ProfilePicture onClick={() => openModalEditPicture()} src={`/profile/${id}/profilePicture`} /> */}
            <ProfilePictureDiv>            
              <ReactImageFallback
                    src={`/profile/${id}/profilePicture`}
                    fallbackImage={process.env.PUBLIC_URL + '/iconUser.jpg'}
                    style={ImageCircleStyle}
                    onClick={() => openModalEditPicture()} />
            </ProfilePictureDiv>

          </ImagePlace>
          <Details>
            <Detail>
              {postData?.details?.companyName} {postData?.details?.firstName} {postData?.details?.lastName}
              <FontAwesomeIcon icon={faPencilAlt} size="1x" onClick={openModalEditName} className="icon" />
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
                <FontAwesomeIcon icon={faPencilAlt} size="1x" onClick={openModalCV} className="icon" />
              </Detail>
              : null
            }
            <Detail>
              <a href={`/?createdBy=${postData?.details?._id}`}>
                View posts
              </a>
            </Detail>
          </Details>
          {
            (postData?.details?.role == "student" || postData?.details?.role == "company") ?
              (!EditTheNetworks ?
                (<SocialLinks>
                  {postData?.details?.linkedin ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.details?.linkedin}>
                        <FontAwesomeIcon icon={faLinkedin} size="1x" className="icon linkedin" />
                      </a>
                    </Social>
                    :
                    (<Social>
                      <FontAwesomeIcon icon={faLinkedin} size="1x" className="icon no-social linkedin" />
                    </Social>)
                  }
                  {postData?.details?.github ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.details?.github}>
                        <FontAwesomeIcon icon={faGithub} size="1x" className="icon github" />
                      </a>
                    </Social>
                    :
                    (<Social>
                      <FontAwesomeIcon icon={faGithub} size="1x" className="icon no-social github" />
                    </Social>)
                  }
                  {postData?.details?.facebook ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.details?.facebook}>
                        <FontAwesomeIcon icon={faFacebook} size="1x" className="icon facebook" />
                      </a>
                    </Social>
                    :
                    (<Social>
                      <FontAwesomeIcon icon={faFacebook} size="1x" className="icon no-social facebook" />
                    </Social>)
                  }
                  {postData?.details?.twitter ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.details?.twitter}>
                        <FontAwesomeIcon icon={faTwitter} size="1x" className="icon twitter" />
                      </a>
                    </Social>
                    :
                    (<Social>
                      <FontAwesomeIcon icon={faTwitter} size="1x" className="icon no-social twitter" />
                    </Social>)
                  }
                  <FontAwesomeIcon icon={faPencilAlt} size="1x" onClick={() => openModalNetworks()} className="icon-edit" />
                </SocialLinks>)
                : (<EditNetworks toggleEditNetworks={toggleEditNetworks} connectedUser={postData} ></EditNetworks>)
              )
              :
              (<> </>)
          }
        </Informations>
      </GeneralInformation>
      <AboutMeCard>
        <center> About </center>
        {!EditAboutMe ?
          (<>
            {postData?.details?.description ? (postData?.details?.description) :
              <div>
                Add an about me section.<br />
              </div>
            }
            <button onClick={() => setEditAboutMe(true)}>Edit</button>
          </>) :
          (<EditDescription toggleEditAboutMe={toggleEditAboutMe} connectedUser={postData} small={true}>Editam</EditDescription>)
        }
      </AboutMeCard>
      <InformationCard>
        <table id="table_id" class="display">
          <thead>
            {(postData?.details?.role == "student") ?
              (
                <tr>
                  <th>Offer Creator</th>
                  <th>Offer Title</th>
                  <th>Creation Date</th>
                </tr>
              ) : (
                <tr>
                  <th>Application Creator</th>
                  <th>Offer Title</th>
                  <th>Creation Date</th>
                </tr>
              )
            }
          </thead>
          <tbody>
            {applicationData.map((application, key) =>
              <tr key={key}>
                {(postData?.details?.role == "student") ?
                  (
                    <td>{application?.offerCreator?.companyName}</td>
                  ) : (
                    <td>{application?.applicant?.firstName + ' ' + application?.applicant?.lastName}</td>
                  )
                }
                <td>{application?.offer?.title}</td>
                <td>{application?.dateCreated.slice(0, 10).replaceAll('-', '.')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </InformationCard>
      <InformationCard>
        <button onClick={() => openModalDelete()}>Delete your account</button>
      </InformationCard>

      <Modal
        isOpen={modalEditPictureIsOpen}
        onRequestClose={closeModalEditPicture}
        style={modalStyles}>
        <button onClick={closeModalEditPicture}>close</button> <br />
        {!EditTheProfilePicture ?
          (<> <button onClick={() => setEditProfilePicture(true)}>Change profile picture</button> <br></br> </>) :
          (<EditProfilePicture toggleEditProfilePicture={toggleEditProfilePicture} connectedUser={postData}></EditProfilePicture>)
        }
        {/* {!EditTheCoverPicture ?
                            (<> <button onClick={() => setEditCoverPicture(true)}>Change cover picture</button> <br></br> </>) :
                            (<EditCoverPicture toggleEditCoverPicture={toggleEditCoverPicture} connectedUser={postData}></EditCoverPicture>)
                        } */}
      </Modal>

      <Modal isOpen={modalEditNameIsOpen} onRequestClose={closeModalEditName} style={modalStyles}>
        <button onClick={closeModalEditName}>close</button> <br />
        <EditName connectedUser={postData}> </EditName> <br />
        {(postData?.details?.role == "student") ?
          (!EditTheDoB ?
            (<>
              Birth Date:
                {postData?.details?.DoB ? Moment(postData?.details?.DoB).format(' DD-MM-YYYY') : (<></>)}
              <button onClick={() => setEditDoB(true)}>Edit</button>
            </>) :
            (<EditDoB toggleEditDoB={toggleEditDoB} connectedUser={postData}> </EditDoB>)
          ) : (<></>)
        }
      </Modal>

      <Modal isOpen={modalEditCVIsOpen} onRequestClose={closeModalEditCV} style={modalStyles}>
        <button onClick={closeModalEditCV}>close</button> <br />
        <EditCV connectedUser={postData}></EditCV>
      </Modal>

      <Modal
        isOpen={modalDelete}
        onRequestClose={closeModalDelete}
        style={modalStyles}
      >
        <button onClick={closeModalDelete}>close</button> <br />
                    Deleting an account is irreversible <br />
        <button onClick={() => deleteThisUser()}>Finish Deletion</button>
      </Modal>
      <Modal
        isOpen={modalNetworks}
        onRequestClose={closeModalNetworks}
        style={modalStyles}>
        <button onClick={closeModalNetworks}>close</button> <br />
        <EditNetworks connectedUser={postData}> </EditNetworks>
      </Modal>
    </>
  )
}


export default OwnerProfile;