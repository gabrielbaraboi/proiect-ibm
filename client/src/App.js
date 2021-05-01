import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ShowPost } from "./components/ShowPost.component"
import { ShowProfile } from "./components/Profile/ShowProfile.component"
import ShowPosts from "./components/Posts/ShowPosts.component";
import Login from "./components/Auth/Login.component"
import Register from "./components/Auth/Register.component"
import AddPost from "./components/Posts/AddPost.component"
import { saveUserData, getUserData, isUserData } from "./services/localStorageManagment";
import axios from 'axios';


const App = () => {

  const [connectedUser, setConnectedUser] = useState(null);

  const setData = (data) => {
    saveUserData(data); //Salveaza datele utilizatorului in local storage
    setConnectedUser(data);
  };

  const getCSRFToken = async () => {
    const { data } = await axios.get('/users/csrfToken').catch(err => console.log(err));
    axios.defaults.headers.post['csrf-token'] = data.csrfToken;
    axios.defaults.headers.delete['csrf-token'] = data.csrfToken;
    axios.defaults.headers.put['csrf-token'] = data.csrfToken;
  };

  useEffect(() => {
    console.log(`app use effect`);
    getCSRFToken();
    if (isUserData()) {
      const userData = getUserData();
      setConnectedUser(userData);
      console.log(`avem user ${userData.firstName}`);
    }
    else {
      console.log(`Neconectat`);
    }
  }, [])

  return (
    <Router>
      <div>
        <Route
          exact path='/'
          render={(props) => (
            <ShowPosts {...props} connectedUser={connectedUser} />
          )}
        />
        <Route
          path='/post/:id'
          render={(props) => (
            <ShowPost {...props} connectedUser={connectedUser} />
          )}
        />
        <Route
          path='/profile/:id'
          render={(props) => (
            <ShowProfile {...props} connectedUser={connectedUser} parentCallback={setData} />
          )}
        />
        <Route
          path='/login'
          render={(props) => (
            <Login {...props} parentCallback={setData} getCSRF={getCSRFToken} />
          )}
        />
        <Route
          path='/register'
          component={Register} />
        <Route
          path='/posts/new'
          render={(props) => (
            <AddPost {...props} connectedUser={connectedUser} />
          )}
        />
      </div>
    </Router>
  );
}

export default App;