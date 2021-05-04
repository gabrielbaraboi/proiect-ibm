import { useState } from "react";
import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, GeneralInformations, Content, ProfileImage } from '../ProfileStyledComponents';
import { EditDescription, EditName, EditDoB, EditNetworks, EditProfilePicture } from "../IndividualEditing";
import facebook from '../socialNetworks/facebook.png';
import twitter from '../socialNetworks/twitter.png';
import github from '../socialNetworks/github.png';
import linkedin from '../socialNetworks/linkedin.jpg';
import gmail from '../socialNetworks/gmail.png';

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
        height: 70,
        width: 70,
        margin: 20,
        tintColor: 'red',
        opacity: 0.2
      };


    return (
        <ShowPostContainer className="App">
            <NavBar></NavBar>

            <GeneralInformations>
                <ImagePlace>
                    <ProfileImage src={`/profile/${id}/profilePicture`} style={mystyle}></ProfileImage>
                </ImagePlace>
                {!EditAboutMe ?
                    (<AboutMe>
                        {postData?.detalii?.description ? ("About me: " + postData?.detalii?.description) :
                            <div>
                                Add an about me section.<br />
                            </div>
                        }
                        <button onClick={() => setEditAboutMe(true)}>Edit</button>
                    </AboutMe>) :

                    (<EditDescription toggleEditAboutMe={toggleEditAboutMe} connectedUser={postData} small={false}></EditDescription>)
                }

                <Content>
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
                    {!EditTheName ?
                        (<>
                            {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName} 
                            <button onClick={() => setEditName(true)}>Edit</button><br></br>
                            <img src={gmail} style={{ height: 15, width: 15 }}/> <span style={{fontSize: 15}}>{postData?.detalii?.email} </span>

                        </>)

                        :
                        (<EditName toggleEditName={toggleEditName} connectedUser={postData} small={false}></EditName>
                        )
                        
                    }
                </Content>

            </GeneralInformations>
            <AboutMeSmall>
                {!EditAboutMe ?
                    (<>
                        {postData?.detalii?.description ? ("About me: " + postData?.detalii?.description) :
                            <div>
                                Add an about me section.<br />
                            </div>
                        }
                        <button onClick={() => setEditAboutMe(true)}>Edit</button>
                    </>) :

                    (<EditDescription toggleEditAboutMe={toggleEditAboutMe} connectedUser={postData} small={true}>Editam</EditDescription>)
                }
            </AboutMeSmall>

            {(postData?.detalii?.role == "student" || postData?.detalii?.role == "company") ?
                <GeneralInformations>

                    {(!EditTheNetworks ?
                        (<>
                            Manage social media <br></br>
                            {postData?.detalii?.linkedin ?
                                <a target="_blank" href={postData?.detalii?.linkedin}>
                                    <img src={linkedin} style={sn}/>
                                </a> :
                                    (<img src={linkedin} style={sn2}/>)
                            }
                            {postData?.detalii?.github ?
                                <a target="_blank" href={postData?.detalii?.github}>
                                    <img src={github} style={sn}/>
                                </a> :
                                (<img src={github} style={sn2}/>)
                            }
                            {postData?.detalii?.facebook ?
                                <a target="_blank" href={postData?.detalii?.facebook}>
                                    <img src={facebook} style={sn}/>
                                </a> :
                                 (<img src={facebook} style={sn2}/>)
                            }
                            {postData?.detalii?.twitter ?
                                (<a target="_blank" href={postData?.detalii?.twitter}>
                                    <img src={twitter} style={sn}/>
                                </a>) :
                                (<img src={twitter} style={sn2}/>)
                            }
                                <center><button onClick={() => setEditNetworks(true)}>Edit</button></center>
                           </> )
                        : (<EditNetworks toggleEditNetworks={toggleEditNetworks} connectedUser={postData} ></EditNetworks>)
                    )}
                </GeneralInformations>
                :
                (<> </>)

            }


            
            {(postData?.detalii?.role == "student") ?
            
                    (!EditTheDoB ?
                        (
                            <GeneralInformations>
                                <>
                                    Birth Date <br></br></>
                                    {postData?.detalii?.DoB ? Moment(postData?.detalii?.DoB).format('DD-MM-YYYY') : (<></>)}
                                    <button onClick={() => setEditDoB(true)}>Edit</button>
                                
                            </GeneralInformations>
                        )
                        : (<EditDoB toggleEditDoB={toggleEditDoB} connectedUser={postData}> </EditDoB>)
                    ) : (<></>)
            }
    


            <GeneralInformations>
                <Link to={`/?createdBy=${postData?.detalii?._id}`}>
                    View your posts
                    </Link>
            </GeneralInformations>

            <GeneralInformations>
                <button onClick={() => deleteThisUser()}>Delete your account</button>
            </GeneralInformations>
        </ShowPostContainer>
    )
}


export default ShowProfileToOwner;