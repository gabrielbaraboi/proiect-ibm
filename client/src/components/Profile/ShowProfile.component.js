import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { deleteUser, logout } from "../../services/UserServices";
import { clearUser } from "../../services/localStorageManagment";
import ShowProfileToGuest from "./Views/GuestView";
import ShowProfileToOwner from "./Views/OwnerView";


export const ShowProfile = ({ connectedUser }) => {
  const [UserExists, setUserExists] = useState(true);

  useEffect(() =>
  axios.get(`http://localhost:9000/profile/${id}`)
    .then(res => {
      setPostData(res.data);
    })
    .catch(err => {
      console.log(err.message);
      setUserExists(false)
    })
  , [])

  const { id } = useParams();

  let logat = false;
  let admin = false;
  if (connectedUser) {
    if (connectedUser.id === id) {
      logat = true;
    }
    if(connectedUser.role === 'admin') {
      admin = true;
    }
  }

  const history = useHistory();
  const deleteThisUser = () => {
    deleteUser(id).then(res => console.log(res)).catch(err => console.log(err));
    if(!admin) {
      logout().then(res => console.log(res)).catch(err => console.log(err.message));
      clearUser();
    }
    history.push('/');
  };

  const [postData, setPostData] = useState({})

  console.log(UserExists);

  return (!logat ? ( !admin ? (<><ShowProfileToGuest postData = {postData}></ShowProfileToGuest></>) 
                            : (<><ShowProfileToGuest admin = {admin} postData = {postData} deleteThisUser = {deleteThisUser}></ShowProfileToGuest></>)) 
                 : (<><ShowProfileToOwner postData = {postData} deleteThisUser = {deleteThisUser} ></ShowProfileToOwner></>)
                 )
 
}

