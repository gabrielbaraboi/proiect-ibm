import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ShowPosts } from "./components/ShowPosts.component";
import { ShowPost } from "./components/ShowPost.component"

import useStyles from './styles';

const App = ()=>{
    /*const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch]);*/
    return (
        <Router>
        <div>
          <Route exact path='/' component={ShowPosts} />
          <Route path='/:id' component={ShowPost}/>
          {//<Route path='/add' component={AddPost}></Route> 
          }
        </div>
      </Router>
    );
}
export default App;