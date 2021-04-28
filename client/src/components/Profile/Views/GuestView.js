import NavBar from "../../NavBar/NavBar.component";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, InformatiiGenerale, Continut, Imagine } from '../ProfileStyledComponents'

export const ShowProfileToGuest = ({ postData, deleteThisUser, admin }) => {

  const { id } = useParams();

  const mystyle = {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  };


  return (
    
      <ShowPostContainer className="App">
        <NavBar></NavBar>

        <InformatiiGenerale>
          <ImagePlace>
            <Imagine src={`/profile/${id}/profilePicture`} style={mystyle}></Imagine>
          </ImagePlace>
          <AboutMe> 
          
            {postData?.detalii?.description}

          </AboutMe>
                <div>
                  <Continut>
                    {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName} <br></br>
                    {admin ? (<><button onClick={() => deleteThisUser()}>Delete User</button></>) : (<></>) }
                
                </Continut>
                  
                </div>
            
          
        
        </InformatiiGenerale>
        
        {(postData?.detalii?.linkedin || postData?.detalii?.github) ?
          (<InformatiiGenerale>
            {postData?.detalii?.linkedin ? (<a href = {postData?.detalii?.linkedin}> LinkedIn </a>) : (<></>)} 
            {postData?.detalii?.github ? (<><br/><a href = {postData?.detalii?.github}> GitHub </a></>) : (<></>)} 
          </InformatiiGenerale>)
          : (<></>)
      }

        <InformatiiGenerale>
            {postData?.detalii?.email} 
        </InformatiiGenerale>

        <AboutMeSmall>
        {postData?.detalii?.description ? ("About me: " +  postData?.detalii?.description) : 
                    "Add an about me section."
            }
        </AboutMeSmall>
        

        <InformatiiGenerale>
            <Link to={`/?createdBy=${postData?.detalii?._id}`}>
        View more posts by {postData?.detalii?.companyName} {postData?.detalii?.firstName} {postData?.detalii?.lastName}
              </Link>
        </InformatiiGenerale>
      </ShowPostContainer >
    )
  }

export default ShowProfileToGuest;
