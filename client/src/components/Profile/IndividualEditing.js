import React, { useState } from 'react';
import { updateProfile } from "../../services/UserServices";
import { AboutMe, DescriptionField} from './ProfileStyledComponents'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { saveUserData, getUserData } from "../../services/localStorageManagment.js";

export const EditDescription  = ({toggleEditAboutMe, connectedUser, small}) => {
    
    const [userData, setPostData] = useState({
        description: connectedUser.detalii.description
    });

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
    console.log(userData);
        return (
            <>
            { !small ?
                    (<AboutMe>
                        <DescriptionField 
                            value={userData.description} 
                            type="text"  
                            placeholder="About me" 
                            onChange={(e) => setPostData({...userData, description : e.target.value})}> 
                        </DescriptionField> <br></br>
                        <input type="button" value='Submit' onClick={handleSubmit}/>
                        <button onClick={() => toggleEditAboutMe()}> Go back! </button> <br></br>
                    </AboutMe>) 
                     : (<>
                        <DescriptionField 
                            value={userData.description} 
                            type="text"  
                            placeholder="About me" 
                            onChange={(e) => setPostData({...userData, description : e.target.value})}> 
                        </DescriptionField> <br></br>
                        <input type="button" value='Submit' onClick={handleSubmit}/>
                        <button onClick={() => toggleEditAboutMe()}> Go back! </button> <br></br>
                    </>) }
            </>
            
        )
}

export const EditName  = ({toggleEditName, connectedUser}) => {
    
    // console.log(connectedUser)
    const [userData, setPostData] = useState({
        firstName : connectedUser.detalii.firstName,
        lastName: connectedUser.detalii.lastName,
        companyName: connectedUser.detalii.companyName,
    });
    console.log(getUserData());
    const handleSubmit = e => {
        e.preventDefault();
        console.log(userData)
        if (userData) {
            var userInformations = getUserData();
            if(userData.firstName) userInformations['firstName'] = userData.firstName;
            if(userData.lastName) userInformations['lastName'] = userData.lastName;
            if(userData.companyName) userInformations['companyName'] = userData.companyName;
            updateProfile(userData, connectedUser.detalii._id)
                .then(res => {
                    window.location.reload();
                    saveUserData(userInformations);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    return (
        <>
            {(connectedUser.detalii.role != "company") ? 
                (<><input value={userData.firstName} type="text"  placeholder="First Name" onChange={(e) => setPostData({...userData, firstName : e.target.value})}/> <br></br> 
                    <input value={userData.lastName} type="text"  placeholder="Last Name" onChange={(e) => setPostData({...userData, lastName: e.target.value})}/> <br></br> </>)
                : (<><input value={userData.companyName} type="text"  placeholder="Company Name" onChange={(e) => setPostData({...userData, companyName : e.target.value})}/> </>)
            }
            <input type="button" value='Submit' onClick={handleSubmit}/>
            <button onClick={() => toggleEditName()}> Go back! </button> <br></br>
        </>
    )
}


export const EditDoB  = ({toggleEditDoB, connectedUser}) => {
    
    const [userData, setPostData] = useState({
        DoB : connectedUser.detalii.DoB
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
    return (
        <>
            {(connectedUser.detalii.role == "student") ? 
                (<>
                    <center> <Calendar 
                        defaultValue={new Date(userData.DoB)}
                        maxDate={new Date()}
                        minDate={new Date("1/1/1940")}
                        onClickDay={(e) => setPostData({...userData, DoB : new Date(e)})}
                    /></center>
                </>
                    
                )
                : (<></>)
            }
            <input type="button" value='Submit' onClick={handleSubmit}/>
            <button onClick={() => toggleEditDoB()}> Go back! </button> <br></br>
        </>
    )
}


export const EditNetworks  = ({toggleEditNetworks, connectedUser}) => {
    

    const [userData, setPostData] = useState({
        linkedin : connectedUser.detalii.linkedin,
        github: connectedUser.detalii.github
    });
        
    const handleSubmit = e => {
        e.preventDefault();
        console.log(userData)
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
    console.log(getUserData());
    return (
           <>
            <input value={userData.linkedin} type="text"  placeholder="linkedin" onChange={(e) => setPostData({...userData, linkedin : e.target.value})}/> <br></br> 
            <input value={userData.github} type="text"  placeholder="github" onChange={(e) => setPostData({...userData, github: e.target.value})}/> <br></br> 
        
            <input type="button" value='Submit' onClick={handleSubmit}/>
            <button onClick={() => toggleEditNetworks()}> Go back! </button> <br></br>
        </>
    )
}


 
