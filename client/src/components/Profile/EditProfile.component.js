import React, { useState } from 'react';
import { updateProfile } from "../../services/UserServices";
import moment from 'moment'
import { ShowPostContainer, ImagePlace, AboutMe, AboutMeSmall, InformatiiGenerale, Continut } from './ProfileStyledComponents'

const EditProfile  = ({toggleEdit, connectedUser}) => {
    
    console.log(connectedUser)
    const [userData, setPostData] = useState({
        firstName : connectedUser.detalii.firstName,
        lastName: connectedUser.detalii.lastName,
        companyName: connectedUser.detalii.companyName,
        DoB: connectedUser.detalii.DoB,
        description: connectedUser.detalii.description
    });

    console.log(userData);
        const handleSubmit = e => {
            e.preventDefault();
            if (userData) {
                updateProfile(userData, connectedUser.detalii._id)
                    .then(res => {
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    if(connectedUser.detalii.role == 'student')
        return (
            <div>
                <input value={userData.firstName} type="text"  placeholder="First Name" onChange={(e) => setPostData({...userData, firstName : e.target.value})}/> <br></br>
                <input value={userData.lastName} type="text"  placeholder="Last Name" onChange={(e) => setPostData({...userData, lastName: e.target.value})}/> <br></br>
                <input value={moment(userData.DoB).format("DD-MM-YYYY")} type="text"  placeholder="Date of birth" onChange={(e) => setPostData({...userData, DoB : e.target.value})}/> <br></br>
                <textarea value={userData.description} type="text"  placeholder="About me" onChange={(e) => setPostData({...userData, description : e.target.value})}> </textarea> <br></br>
                <input type="button" value='Submit' onClick={handleSubmit}/>
                <button onClick={() => toggleEdit()}> Go back! </button> <br></br>
            </div>
            
        )
    else 
    return (
        <div>
            <button onClick={() => toggleEdit()}> Go back </button> <br></br>
            <input value={userData.companyName} type="text"  placeholder="Company Name" onChange={(e) => setPostData({...userData, companyName : e.target.value})}/> <br></br>
            <input type="button" value='Submit' onClick={handleSubmit}/>
        </div>
        
    )  
}

export default EditProfile;

 
