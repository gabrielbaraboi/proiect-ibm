import React, { useState } from 'react';
import { updateProfile } from "../../services/UserServices";
import { AboutMe, DescriptionField} from './ProfileStyledComponents'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


export const EditDescription  = ({toggleEditAboutMe, connectedUser, small}) => {
    
    console.log(connectedUser)
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
    
    console.log(connectedUser)
    const [userData, setPostData] = useState({
        firstName : connectedUser.detalii.firstName,
        lastName: connectedUser.detalii.lastName,
        companyName: connectedUser.detalii.companyName,
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
    console.log(connectedUser.detalii.role)
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
    
    console.log(connectedUser)
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


 
