import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { Detail, ImagePlace, AboutMeCard, InformationCard, Informations, GeneralInformation, CoverImagePlace, Details, modalStyles, ProfilePicture, Social, SocialLinks } from '../ProfileStyledComponents';
import { EditDescription, EditName, EditDoB, EditNetworks, EditProfilePicture, EditCoverPicture, EditCV } from "../IndividualEditing";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Modal from 'react-modal';
// import ReactTooltip from "react-tooltip";
import { getCV } from "../../../services/UserServices";


export const OwnerProfile = ({ postData, deleteThisUser }) => {

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

  const { id } = useParams();

  return (
    <>
      <GeneralInformation>
        <CoverImagePlace>
          <img src='https://lp-cms-production.imgix.net/2019-06/28206231.jpg'
            onClick={() => openModalEditPicture()} />
        </CoverImagePlace>
        <Informations>
          <ImagePlace>
            <ProfilePicture onClick={() => openModalEditPicture()} src={`/profile/${id}/profilePicture`} />
          </ImagePlace>
          <Details>
            <Detail>
              {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
              <FontAwesomeIcon icon={faPencilAlt} size="1x" onClick={openModalEditName} className="icon" />
            </Detail>
            <Detail>{postData?.detalii?.role}</Detail>
            <Detail>{DoB}</Detail>
          </Details>
          {
            (postData?.detalii?.role == "student" || postData?.detalii?.role == "company") ?
              (!EditTheNetworks ?
                (<SocialLinks>
                  {postData?.detalii?.linkedin ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.detalii?.linkedin}>
                        <FontAwesomeIcon icon={faLinkedin} size="1x" className="icon linkedin" />
                      </a>
                    </Social>
                    :
                    (<Social>
                      <FontAwesomeIcon icon={faLinkedin} size="1x" className="icon no-social linkedin" />
                    </Social>)
                  }
                  {postData?.detalii?.github ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.detalii?.github}>
                        <FontAwesomeIcon icon={faGithub} size="1x" className="icon github" />
                      </a>
                    </Social>
                    :
                    (<Social>
                      <FontAwesomeIcon icon={faGithub} size="1x" className="icon no-social github" />
                    </Social>)
                  }
                  {postData?.detalii?.facebook ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.detalii?.facebook}>
                        <FontAwesomeIcon icon={faFacebook} size="1x" className="icon facebook" />
                      </a>
                    </Social>
                    :
                    (<Social>
                      <FontAwesomeIcon icon={faFacebook} size="1x" className="icon no-social facebook" />
                    </Social>)
                  }
                  {postData?.detalii?.twitter ?
                    <Social>
                      <a target="_blank" rel="noreferrer" href={postData?.detalii?.twitter}>
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
            {postData?.detalii?.description ? (postData?.detalii?.description) :
              <div>
                Add an about me section.<br />
              </div>
            }
            <button onClick={() => setEditAboutMe(true)}>Edit</button>
          </>) :
          (<EditDescription toggleEditAboutMe={toggleEditAboutMe} connectedUser={postData} small={true}>Editam</EditDescription>)
        }
        {postData?.detalii?.role === 'student' ?
          <div>
            {postData?.detalii?.CV ?
              <a href={`http://localhost:9000/profile/${postData?.detalii?._id}/CV`}>Download CV</a>
              :
              "We don't have CV"
            }
            <EditCV connectedUser={postData}></EditCV>
          </div>
          : null
        }
        <Link to={`/?createdBy=${postData?.detalii?._id}`}>
          View your posts
        </Link>
      </AboutMeCard>
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
        {(postData?.detalii?.role == "student") ?
          (!EditTheDoB ?
            (<>
              Birth Date:
                {postData?.detalii?.DoB ? Moment(postData?.detalii?.DoB).format(' DD-MM-YYYY') : (<></>)}
              <button onClick={() => setEditDoB(true)}>Edit</button>
            </>) :
            (<EditDoB toggleEditDoB={toggleEditDoB} connectedUser={postData}> </EditDoB>)
          ) : (<></>)
        }
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