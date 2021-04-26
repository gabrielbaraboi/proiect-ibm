import { useState } from "react";
import NavBar from "../../NavBar/NavBar.component";
import { Link } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, InformatiiGenerale, Continut } from '../ProfileStyledComponents'

import { EditDescription, EditName, EditDoB } from "../IndividualEditing";


export const ShowProfileToOwner = ({ postData, deleteThisUser }) => {
    
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
                    <button onClick={() => deleteThisUser()}>Delete your account</button>
                </Continut>

            </InformatiiGenerale>
            
            <InformatiiGenerale>
                {postData?.detalii?.email} <br/>
                {(postData?.detalii?.role == "student") ?
                    (!EditTheDoB ?
                        (<>
                            {postData?.detalii?.DoB ? Moment(postData?.detalii?.DoB).format('DD-MM-YYYY') : (<></>)}
                            <button onClick={() => setEditDoB(true)}>Edit</button>
                            
                        </>)
                            : (<EditDoB toggleEditDoB={toggleEditDoB} connectedUser = {postData}> </EditDoB>)
                    ) : (<></>)
                } 
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