import { useState } from "react";
import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMeCard, InformationCard, GeneralInformation, CoverImagePlace, EditProfileButton, NameArea, AboutMe, modalStyles, NetworkImage, NoNetworkImage, ProfilePicture } from '../ProfileStyledComponents';
import { EditDescription, EditName, EditDoB, EditNetworks, EditProfilePicture, EditCoverPicture } from "../IndividualEditing";
import facebook from '../socialNetworks/facebook.png';
import twitter from '../socialNetworks/twitter.png'; 
import github from '../socialNetworks/github.png';
import linkedin from '../socialNetworks/linkedin.jpg';
import gmail from '../socialNetworks/gmail.png';
// import editIcon from '../socialNetworks/edit.png';
import Modal from 'react-modal';


export const ShowProfileToOwner = ({ postData, deleteThisUser }) => {

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


    const { id } = useParams();


    return (
        <ShowPostContainer className="App">
            <NavBar></NavBar>

            <GeneralInformation>
                <CoverImagePlace> 
                    <img src='https://lp-cms-production.imgix.net/2019-06/28206231.jpg' 
                    style={{"width": "100%", "height": "100%", 'border-top-left-radius': '13px', 'border-top-right-radius': '13px', 'position': 'relative', 'background': 'rgba(255,255,255,.55)' }}
                    onClick={() => openModalEditPicture()} />
                </CoverImagePlace>
                <ImagePlace>
                
                    <ProfilePicture 
                        onClick={() => openModalEditPicture()} 
                        // onMouseOver={}ß
                        src={`/profile/${id}/profilePicture`}>
                    </ProfilePicture>
                    <Modal
                        isOpen={modalEditPictureIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalEditPicture}
                        style={modalStyles}>
                    
                        <button onClick={closeModalEditPicture}>close</button> <br/>
                        {!EditTheProfilePicture ?
                                (<> <button onClick={() => setEditProfilePicture(true)}>Change profile picture</button> <br></br> </>) :
                                (<EditProfilePicture toggleEditProfilePicture={toggleEditProfilePicture} connectedUser={postData}></EditProfilePicture>)
                            }
                
                        {/* {!EditTheCoverPicture ?
                            (<> <button onClick={() => setEditCoverPicture(true)}>Change cover picture</button> <br></br> </>) :
                            (<EditCoverPicture toggleEditCoverPicture={toggleEditCoverPicture} connectedUser={postData}></EditCoverPicture>)
                        } */}
                    </Modal>
                </ImagePlace>
                <NameArea>  
                    {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName} <br/>
                    <div style={{"font-size": "15px"}}> {postData?.detalii?.role} </div>
                </NameArea>
                <div>
                    <EditProfileButton onClick={openModalEditName}>Edit Profile</EditProfileButton>
                    <Modal
                        isOpen={modalEditNameIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalEditName}
                        style={modalStyles}
                    >
                    <button onClick={closeModalEditName}>close</button> <br/>
                       <EditName connectedUser={postData}> </EditName> <br/>
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
                </div>       

            </GeneralInformation>
            
            <AboutMeCard>
                
                <AboutMe>
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
                </AboutMe>

            </AboutMeCard>

            {(postData?.detalii?.role == "student" || postData?.detalii?.role == "company") ?
                <InformationCard>

                    {(!EditTheNetworks ?
                        (<>
                            Manage social media <br></br>
                            {postData?.detalii?.linkedin ?
                                <a target="_blank" rel="noreferrer" href={postData?.detalii?.linkedin}>
                                    <img src={linkedin} style={NetworkImage}/>
                                </a> :
                                    (<img src={linkedin} style={NoNetworkImage}/>)
                            }
                            {postData?.detalii?.github ?
                                <a target="_blank" rel="noreferrer" href={postData?.detalii?.github}>
                                    <img src={github} style={NetworkImage}/>
                                </a> :
                                (<img src={github} style={NoNetworkImage}/>)
                            }
                            {postData?.detalii?.facebook ?
                                <a target="_blank" rel="noreferrer" href={postData?.detalii?.facebook}>
                                    <img src={facebook} style={NetworkImage}/>
                                </a> :
                                 (<img src={facebook} style={NoNetworkImage}/>)
                            }
                            {postData?.detalii?.twitter ?
                                (<a target="_blank" rel="noreferrer" href={postData?.detalii?.twitter}>
                                    <img src={twitter} style={NetworkImage}/>
                                </a>) :
                                (<img src={twitter} style={NoNetworkImage}/>)
                            }
                                <center><button onClick={() => setEditNetworks(true)}>Edit</button></center>
                           </> )
                        : (<EditNetworks toggleEditNetworks={toggleEditNetworks} connectedUser={postData} ></EditNetworks>)
                    )}
                </InformationCard>
                :
                (<> </>)

            }


            <InformationCard>
                <Link to={`/?createdBy=${postData?.detalii?._id}`}>
                    View your posts
                    </Link>
            </InformationCard>

            <InformationCard>
                <button onClick={() => openModalDelete()}>Delete your account</button>
                <Modal
                        isOpen={modalDelete}
                        onRequestClose={closeModalDelete}
                        style={modalStyles}
                >
                    <button onClick={closeModalDelete}>close</button> <br/>
                    Deleting an account is irreversible <br/>
                    <button onClick={() => deleteThisUser()}>Finish Deletion</button>
                </Modal>
            </InformationCard>
        </ShowPostContainer>
    )
}


export default ShowProfileToOwner;