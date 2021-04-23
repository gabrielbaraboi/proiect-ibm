import React, { useState } from 'react';
import NavBar from "./NavBar/NavBar.component";
import { updateProfile } from "../services/UserServices";
import { useParams } from "react-router-dom";






const EditProfile  = ({toggleEdit, connectedUser}) => {
    
    
    const [userData, setPostData] = useState({
        firstName : "",
        lastName: "",
        companyName: ""
    });

    console.log(userData);
        const handleSubmit = e => {
            e.preventDefault();
            if (userData) {
                updateProfile(userData, connectedUser.id)
                    .then(res => {
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    if(connectedUser.role == 'student')
        return (
            <div>
                <NavBar/>
                <button onClick={() => toggleEdit()}> Go back! </button> <br></br>
                <input value={userData.firstName} type="text"  placeholder="First Name" onChange={(e) => setPostData({...userData, firstName : e.target.value})}/> <br></br>
                <input value={userData.lastName} type="text"  placeholder="Last Name" onChange={(e) => setPostData({...userData, lastName: e.target.value})}/> <br></br>
                <input type="button" value='Submit' onClick={handleSubmit}/>
            </div>
            
        )
    else 
    return (
        <div>
            <NavBar/>
            <button onClick={() => toggleEdit()}> Go back </button> <br></br>
            <input value={userData.companyName} type="text"  placeholder="Company Name" onChange={(e) => setPostData({...userData, companyName : e.target.value})}/> <br></br>
            <input type="button" value='Submit' onClick={handleSubmit}/>
        </div>
        
    )  
}

export default EditProfile;

 
