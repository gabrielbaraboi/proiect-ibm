import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ShowPost } from "./components/ShowPost.component"
import { ShowProfile } from "./components/ShowProfile.component"
import ShowPosts from "./components/ShowPosts.component"
import Login from "./components/Login.component"
import GlobalStyle from "./GlobalStyle"
import axios from "axios";

import { useHistory } from 'react-router';


const App = () => {
  

  const [connectedUser, setConnectedUser] = useState(null);
  
  const getUserData = (data) => {
    setConnectedUser(data);
    
    
  }

  useEffect(() => {
    console.log(connectedUser);
    
  }, [connectedUser])
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
            <Login {...props} parentCallback={getUserData} />
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