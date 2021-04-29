import { useState } from "react";
import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, GeneralInformations, Content, ProfileImage } from '../ProfileStyledComponents';
import { EditDescription, EditName, EditDoB, EditNetworks, EditProfilePicture } from "../IndividualEditing";


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
        objectFit: "cover"
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
                    {!EditTheName ?
                        (<>
                            {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
                            <button onClick={() => setEditName(true)}>Edit</button><br></br>
                        </>)

                        :
                        (<EditName toggleEditName={toggleEditName} connectedUser={postData} small={false}></EditName>
                        )
                    }
                    {!EditTheProfilePicture ?
                        (<>
                            <button onClick={() => setEditProfilePicture(true)}>Change profile picture</button><br></br>
                        </>
                        )
                        :
                        (
                            <EditProfilePicture toggleEditProfilePicture={toggleEditProfilePicture} connectedUser={postData} small={false}></EditProfilePicture>
                        )
                    }
                    <button onClick={() => deleteThisUser()}>Delete your account</button>
                </Content>

            </GeneralInformations>


            {(postData?.detalii?.role == "student") ?
                <GeneralInformations>

                    {(!EditTheNetworks ?
                        (<>
                            <a href={postData?.detalii?.linkedin}>
                                LinkedIn
                                </a> <br></br>
                            <a href={postData?.detalii?.github}>
                                GitHub
                                </a><br></br>

                            <button onClick={() => setEditNetworks(true)}>Edit</button>

                        </>)
                        : (<EditNetworks toggleEditNetworks={toggleEditNetworks} connectedUser={postData} ></EditNetworks>)
                    )}
                </GeneralInformations>
                :
                (<> </>)

            }


            <GeneralInformations>
                {postData?.detalii?.email} <br />
                {(postData?.detalii?.role == "student") ?
                    (!EditTheDoB ?
                        (<>
                            {postData?.detalii?.DoB ? Moment(postData?.detalii?.DoB).format('DD-MM-YYYY') : (<></>)}
                            <button onClick={() => setEditDoB(true)}>Edit</button>

                        </>)
                        : (<EditDoB toggleEditDoB={toggleEditDoB} connectedUser={postData}> </EditDoB>)
                    ) : (<></>)
                }
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

            <GeneralInformations>
                <Link to={`/?createdBy=${postData?.detalii?._id}`}>
                    View your posts
                    </Link>
            </GeneralInformations>
        </ShowPostContainer>
    )
}


export default ShowProfileToOwner;