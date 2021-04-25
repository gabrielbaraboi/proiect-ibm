import { useState } from "react";
import NavBar from "../../NavBar/NavBar.component";
import { Link } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, InformatiiGenerale, Continut } from '../ProfileStyledComponents'
import EditProfile from "../EditProfile.component";

import { EditDescription, EditName } from "../IndividualEditing";


export const ShowProfileToOwner = ({ postData, deleteThisUser }) => {
    
    const [EditMode, setEditMode] = useState(false);
    const toggleEdit = () => {
        setEditMode(false);
    }

    const [EditAboutMe, setEditAboutMe] = useState(false);
    const toggleEditAboutMe = () => {
        setEditAboutMe(false);
    }
    const [EditTheName, setEditName] = useState(false);
    const toggleEditName = () => {
        setEditName(false);
    }


    return (
        <ShowPostContainer className="App">
            <NavBar></NavBar>

            <InformatiiGenerale>
                <ImagePlace> </ImagePlace>
                {!EditAboutMe ? 
                    (<AboutMe> 
                        {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                                <div>
                                    Add an about me section.<br/>  
                                </div>
                        }
                        <button onClick={() => setEditAboutMe(true)}>Edit</button>
                    </AboutMe>) : 
                    
                    (<EditDescription toggleEditAboutMe={toggleEditAboutMe} connectedUser = {postData} small={false}></EditDescription>)
                }

                {EditMode ? ( 
                    <EditProfile toggleEdit={toggleEdit} connectedUser = {postData}></EditProfile>
                ) : (
                    <div>
                        <Continut>
                        {!EditTheName ?
                            (<>
                                {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
                                <button onClick={() => setEditName(true)}>Edit</button><br></br>
                            </>)
                            
                            : 
                            (<EditName toggleEditName={toggleEditName} connectedUser = {postData} small={false}></EditName>
                             )
                        }
                        <button onClick={() => setEditMode(true)}>Global Editing</button>
                        <button onClick={() => deleteThisUser()}>Delete your account</button>
                        {/* (<EditDescription toggleEditAboutMe={toggleEditAboutMe} connectedUser = {postData} small={false}></EditDescription>) */}
                    </Continut>
                        
                    </div>
                )
                }
            
            </InformatiiGenerale>
            
            <InformatiiGenerale>
                {postData?.detalii?.email} <br/>
                {postData?.detalii?.DoB ? Moment(postData?.detalii?.DoB).format('DD-MM-YYYY') : (<></>)} 
            </InformatiiGenerale>

            <AboutMeSmall>
            {!EditAboutMe ? 
                    (<> 
                        {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                                <div>
                                    Add an about me section.<br/>  
                                </div>
                        }
                        <button onClick={() => setEditAboutMe(true)}>Edit</button>
                    </>) : 
                    
                    (<EditDescription toggleEditAboutMe={toggleEditAboutMe} connectedUser = {postData} small={true}>Editam</EditDescription>)
            }
            </AboutMeSmall>
            
            <InformatiiGenerale>
                <Link to={`/?createdBy=${postData?.detalii?._id}`}>
                        View your posts
                    </Link>
            </InformatiiGenerale>
        </ShowPostContainer>
    )
}


export default ShowProfileToOwner;