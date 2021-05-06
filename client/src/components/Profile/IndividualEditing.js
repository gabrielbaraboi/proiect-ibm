import React, { useState } from 'react';
import { updateProfile } from "../../services/UserServices";
import { AboutMe, DescriptionField } from './ProfileStyledComponents'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { saveUserData, getUserData } from "../../services/localStorageManagment.js";
import facebook from './socialNetworks/facebook.png';
import twitter from './socialNetworks/twitter.png';
import github from './socialNetworks/github.png';
import linkedin from './socialNetworks/linkedin.jpg';

export const EditDescription = ({ toggleEditAboutMe, connectedUser, small }) => {

    const [userData, setPostData] = useState({
        description: connectedUser.detalii.description
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (userData) {
            const formData = new FormData();
            formData.append('data', JSON.stringify(userData));
            await updateProfile(formData, connectedUser.detalii._id)
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
                        onChange={(e) => setPostData({ ...userData, description: e.target.value })}>
                    </DescriptionField> 
                    <button onClick={handleSubmit}> Submit </button>
                    <button onClick={() => toggleEditAboutMe()}> Go back! </button> <br></br>
                </AboutMe>)
                : (<>
                    <DescriptionField
                        value={userData.description}
                        type="text"
                        placeholder="About me"
                        onChange={(e) => setPostData({ ...userData, description: e.target.value })}>
                    </DescriptionField> <br></br>
                    <button onClick={handleSubmit}> Save changes </button>
                    <button onClick={() => toggleEditAboutMe()}> Go back! </button> <br></br>
                </>)}
        </>

    )
}

export const EditName = ({ toggleEditName, connectedUser }) => {

    // console.log(connectedUser)
    const [userData, setPostData] = useState({
        firstName: connectedUser.detalii.firstName,
        lastName: connectedUser.detalii.lastName,
        companyName: connectedUser.detalii.companyName
    });
    console.log(getUserData());
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(userData)
        if (userData) {
            var userInformations = getUserData();
            if (userData.firstName) userInformations['firstName'] = userData.firstName;
            if (userData.lastName) userInformations['lastName'] = userData.lastName;
            if (userData.companyName) userInformations['companyName'] = userData.companyName;
            const formData = new FormData();
            formData.append('data', JSON.stringify(userData));
            await updateProfile(formData, connectedUser.detalii._id)
                .then(res => {
                    window.location.reload();
                    saveUserData(userInformations);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
        const inp = {
        height: 28.5,
        width: 300,
        fontSize: 15
    };
    return (
        <>
            {(connectedUser.detalii.role !== "company") ?
                (<> First Name <br/>
                    <input value={userData.firstName} type="text" placeholder="First Name" style={inp} onChange={(e) => setPostData({ ...userData, firstName: e.target.value })} /> <br></br>
                    Last Name <br/>
                    <input value={userData.lastName} type="text" placeholder="Last Name" style={inp} onChange={(e) => setPostData({ ...userData, lastName: e.target.value })} /> <br></br> </>)
                : (<> Company Name <br/>
                    <input value={userData.companyName} type="text" placeholder="Company Name" style={inp} onChange={(e) => setPostData({ ...userData, companyName: e.target.value })} /> </>)
            }
            <input type="button" value='Submit' onClick={handleSubmit} />
            {/* <button onClick={() => toggleEditName()}> Go back! </button> <br></br> */}
        </>
    )
}
export const EditProfilePicture = ({ toggleEditProfilePicture, connectedUser }) => {

    const [file, setFile] = useState(null);
    const handleSave = async(e) => {
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append('profile-picture', file);
        console.log("got here!");
        await updateProfile(formData, connectedUser.detalii._id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <>
            <input
                filename={file}
                onChange={e => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
            ></input>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => toggleEditProfilePicture()}>Cancel</button>
            <br></br>
        </>
    )
}



export const EditCoverPicture = ({ toggleEditCoverPicture, connectedUser }) => {

    const [file, setFile] = useState(null);
    const handleSave = async(e) => {
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append('cover-picture', file);
        console.log("got here!");
        await updateProfile(formData, connectedUser.detalii._id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <>
            <input
                filename={file}
                onChange={e => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
            ></input>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => toggleEditCoverPicture()}>Cancel</button>
            <br></br>
        </>
    )
}


export const EditDoB = ({ toggleEditDoB, connectedUser }) => {

    const [userData, setPostData] = useState({
        DoB: connectedUser.detalii.DoB
    });

    console.log(userData);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (userData) {
            const formData = new FormData();
            formData.append('data', JSON.stringify(userData));
            await updateProfile(formData, connectedUser.detalii._id)
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
            {(connectedUser.detalii.role === "student") ?
                (<>
                    <center> <Calendar
                        defaultValue={new Date(userData.DoB)}
                        maxDate={new Date()}
                        minDate={new Date("1/1/1940")}
                        onClickDay={(e) => setPostData({ ...userData, DoB: new Date(e) })}
                    /></center>
                </>

                )
                : (<></>)
            }
            <button onClick={handleSubmit} > Save changes </button>
            <button onClick={() => toggleEditDoB()}> Go back! </button> <br></br>
        </>
    )
}


export const EditNetworks = ({ toggleEditNetworks, connectedUser }) => {


    const [userData, setPostData] = useState({
        linkedin: connectedUser.detalii.linkedin,
        github: connectedUser.detalii.github,
        twitter: connectedUser.detalii.twitter,
        facebook: connectedUser.detalii.facebook
    });
    console.log(userData.twitter)
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData)
        if (userData) {
            const formData = new FormData();
            formData.append('data', JSON.stringify(userData));
            await updateProfile(formData, connectedUser.detalii._id)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    const sn = {
        height: 15,
        width: 15,
        marginRight: 10,
        marginTop: 2

      };
    const inp = {
        height: 28.5,
        width: 300,
        fontSize: 15
    };
    return (
        <>
            <img src={linkedin} style={sn}/><input value={userData.linkedin} type="text" style={inp} placeholder="linkedin" onChange={(e) => setPostData({ ...userData, linkedin: e.target.value })} /> <br></br>
            <img src={github} style={sn}/><input value={userData.github} type="text" style={inp} placeholder="github" onChange={(e) => setPostData({ ...userData, github: e.target.value })} /> <br></br>
            <img src={facebook} style={sn}/><input value={userData.facebook} type="text" style={inp} placeholder="facebook" onChange={(e) => setPostData({ ...userData, facebook: e.target.value })} /> <br></br>
            <img src={twitter} style={sn}/><input value={userData.twitter} type="text" style={inp} placeholder="twitter" onChange={(e) => setPostData({ ...userData, twitter: e.target.value })} /> <br></br>
            <button onClick={handleSubmit} > Save changes </button>
            <button onClick={() => toggleEditNetworks()}> Go back! </button> <br></br>
        </>
    )
}



