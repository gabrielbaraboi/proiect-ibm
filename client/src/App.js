import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ShowPost } from "./components/ShowPost.component"
import ShowPosts from "./components/ShowPosts.component"
import GlobalStyle from "./GlobalStyle"


const App = () => {
  /*const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getPosts());
  },[dispatch]);*/
  return (
    <Router>
      <GlobalStyle></GlobalStyle>
      <div>
        <Route exact path='/' component={ShowPosts} />
        <Route path='/post/:id' component={ShowPost} />
        {/*<Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        //<Route path='/add' component={AddPost}></Route> 
        */}
      </div>
    </Router>
  );
}
export default App;