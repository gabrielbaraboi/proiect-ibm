import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteUser, logout, getProfile } from "../../services/UserServices";
import { clearUser } from "../../services/localStorageManagment";
import GuestProfile from "./Views/GuestView";
import OwnerProfile from "./Views/OwnerView";
import { Container, PageTitle, Row } from "../Global.styledComponents"
import NavBar from "../NavBar/NavBar.component";


export const ShowProfile = ({ connectedUser }) => {
  const [UserExists, setUserExists] = useState(true);

  useEffect(() =>
    getProfile(id)
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
    if (connectedUser.role === 'admin') {
      admin = true;
    }
  }

  const history = useHistory();
  const deleteThisUser = () => {
    deleteUser(id).then(res => console.log(res)).catch(err => console.log(err));
    if (!admin) {
      logout().then(res => console.log(res)).catch(err => console.log(err.message));
      clearUser();
    }
    history.push('/');
  };

  const [postData, setPostData] = useState({})

  console.log(UserExists);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Container>
          <PageTitle>Profile</PageTitle>
          {!logat ? (
            !admin ? (
              <GuestProfile postData={postData} />
            ) : (
              <GuestProfile admin={admin} postData={postData} deleteThisUser={deleteThisUser} />
            )
          ) : (
            <OwnerProfile postData={postData} deleteThisUser={deleteThisUser} />
          )}
        </Container>
      </main>
    </>
  )

}

