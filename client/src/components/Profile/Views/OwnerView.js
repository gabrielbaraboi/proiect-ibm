import { useState } from "react";
import NavBar from "../../NavBar/NavBar.component";
import { Link } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, InformatiiGenerale, Continut } from '../ProfileStyledComponents'
import EditProfile from "../EditProfile.component";


export const ShowProfileToOwner = ({ postData, deleteThisUser }) => {
    
    const [EditMode, setEditMode] = useState(false);
    const toggleEdit = () => {
        setEditMode(false);
    }

    return (
        <ShowPostContainer className="App">
            <NavBar></NavBar>

            <InformatiiGenerale>
                <ImagePlace> </ImagePlace>
                <AboutMe> 
                
                {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                        <div>
                            Add an about me section.<br/>  
                        </div>
                }

                </AboutMe>

                {EditMode ? ( 
                    <EditProfile toggleEdit={toggleEdit} connectedUser = {postData}></EditProfile>
                ) : (
                    <div>
                        <Continut>
                        {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName} <br></br>
                        <button onClick={() => setEditMode(true)}>Edit</button>
                        <button onClick={() => deleteThisUser()}>Delete your account</button>
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
            {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                        "Add an about me section."
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