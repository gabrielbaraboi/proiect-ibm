import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ShowPost } from "./components/ShowPost.component"
import { ShowProfile } from "./components/ShowProfile.component"
import ShowPosts from "./components/ShowPosts.component"
import Login from "./components/Login.component"
import GlobalStyle from "./GlobalStyle"
import { saveUserData, getUserData, isUserData } from "./services/localStorageManagment";



const App = () => {
  

  const [connectedUser, setConnectedUser] = useState(null);
  
  const setData = (data) => {
    saveUserData(data); //Salveaza datele utilizatorului in local storage
    setConnectedUser(data);
  }

  useEffect(() => {
    console.log(`app use effect`)
    if (isUserData())
    {
      const userData = getUserData();
      setConnectedUser(userData);
      console.log(`avem user ${userData.firstName}`);
    }
    else{
      console.log(`Neconectat`);
    } 
  }, [])

  return (
    <Router>
      <GlobalStyle></GlobalStyle>
      <div>
        <Route 
          exact path='/' 
          render={(props) => (
              <ShowPosts {...props} connectedUser = {connectedUser}/>
          )}
        />
        <Route 
          path='/post/:id' 
          render={(props) => (
            <ShowPost {...props} connectedUser = {connectedUser} />
          )}
        />
        <Route 
          path='/profile/:id' 
          render={(props) => (
            <ShowProfile {...props} connectedUser = {connectedUser} />
          )}
        />
        <Route 
          path='/login' 
          render={(props) => (
            <Login {...props} parentCallback={setData} />
          )}
        />
        {/*
        <Route path='/register' component={Register} />
        //<Route path='/add' component={AddPost}></Route> 
        */}
      </div>
    </Router>
  );
}
export default App;