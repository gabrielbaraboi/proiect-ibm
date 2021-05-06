import { useState } from "react";
import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMeCard, InformationCard, GeneralInformation, CoverImagePlace, profileImageStyle, EditProfileButton, NameArea, AboutMe, modalStyles, NetworkImage, NoNetworkImage } from '../ProfileStyledComponents';
import { EditDescription, EditName, EditDoB, EditNetworks, EditProfilePicture } from "../IndividualEditing";
import facebook from '../socialNetworks/facebook.png';
import twitter from '../socialNetworks/twitter.png';
import github from '../socialNetworks/github.png';
import linkedin from '../socialNetworks/linkedin.jpg';
import gmail from '../socialNetworks/gmail.png';
import Modal from 'react-modal';


export const ShowProfileToOwner = ({ postData, deleteThisUser }) => {

    const [EditTheProfilePicture, setEditProfilePicture] = useState(false);
    const toggleEditProfilePicture = () => {
        setEditProfilePicture(false);
    };

    const [EditAboutMe, setEditAboutMe] = useState(false);
    const toggleEditAboutMe = () => {
        setEditAboutMe(false);
    }
    const [EditTheName, setEditName] = useState(false);
    const toggleEditName = () => {
        setEditName(false);
    }
    const [EditTheDoB, setEditDoB] = useState(false);
    const toggleEditDoB = () => {
        setEditDoB(false);
    }
    const [EditTheNetworks, setEditNetworks] = useState(false);
    const toggleEditNetworks = () => {
        setEditNetworks(false);
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const { id } = useParams();

      const sn2 = {
        height: 70,
        width: 70,
        margin: 20,
        tintColor: 'red',
        opacity: 0.2
      };



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
                <div>
                    <EditProfileButton onClick={openModal}>Edit Profile</EditProfileButton>
                    <Modal
                        isOpen={modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={modalStyles}
                        contentLabel="Example Modal"
                    >
                    <button onClick={closeModal}>close</button> <br/>
                       <EditName connectedUser={postData}> </EditName> <br/>
                       {!EditTheProfilePicture ?
                            (<>
                                <button onClick={() => setEditProfilePicture(true)}>Change profile picture</button> <br></br>
                            </>
                            )
                            :
                            (
                                <EditProfilePicture toggleEditProfilePicture={toggleEditProfilePicture} connectedUser={postData} small={false}></EditProfilePicture>
                            )
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


            
            {(postData?.detalii?.role == "student") ?
            
                    (!EditTheDoB ?
                        (
                            <InformationCard>
                                <>
                                    Birth Date <br></br></>
                                    {postData?.detalii?.DoB ? Moment(postData?.detalii?.DoB).format('DD-MM-YYYY') : (<></>)}
                                    <button onClick={() => setEditDoB(true)}>Edit</button>
                                
                            </InformationCard>
                        )
                        : (<EditDoB toggleEditDoB={toggleEditDoB} connectedUser={postData}> </EditDoB>)
                    ) : (<></>)
            }
    


            <InformationCard>
                <Link to={`/?createdBy=${postData?.detalii?._id}`}>
                    View your posts
                    </Link>
            </InformationCard>

            <InformationCard>
                <button onClick={() => deleteThisUser()}>Delete your account</button>
                
            </InformationCard>
        </ShowPostContainer>
    )
}


export default ShowProfileToOwner;