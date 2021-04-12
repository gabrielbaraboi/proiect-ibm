import React, { Component } from 'react';
import styled from "styled-components";
import axios from "axios";
import NavBar from "./NavBar.component";
import PostCard from "./PostCard.component"
import App from "../App";


class ShowPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      sorting: new URLSearchParams(this.props.location.search).get('sort'),
      programmingLanguage: new URLSearchParams(this.props.location.search).getAll('programmingLanguage'),
      workHours: new URLSearchParams(this.props.location.search).getAll('workHours'),
      workPlace: new URLSearchParams(this.props.location.search).getAll('workPlace'),
      type: new URLSearchParams(this.props.location.search).getAll('type'),
      lastPostDate:'none',
      hasMore:false,
      pageNumber:0
    };
    this.onScroll=this.onScroll.bind(this);
  }
  onScroll()
  {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    if (bottom&&this.state.hasMore) {
      this.setState((prevState)=>({
        ...prevState,
        pageNumber:this.state.pageNumber+1
      }))
    }
  }

  componentDidMount() {
    this.setState(prevState=>({
      ...prevState,
      pageNumber:1
    }));
    document.addEventListener('scroll', this.onScroll);
  };

  componentDidUpdate(prevProps,prevState){
    if(this.state.sorting!==prevState.sorting)
      this.setState(prevState=>({
        ...prevState,
        pageNumber:1,
        posts:[],
        lastPostDate:'none'
      }));
      
    else if(this.state.pageNumber!==prevState.pageNumber)
      axios
        .get('http://localhost:9000/posts/',{
        params:{sorting: this.state.sorting, date: this.state.lastPostDate, programmingLanguage: this.state.programmingLanguage, workHours: this.state.workHours, workPlace: this.state.workPlace, type: this.state.type}
        })
        .then(res => {
          this.setState(prevState=>({
            ...prevState,
            posts: [...this.state.posts,...res.data.posts],
            lastPostDate: res.data.posts.length>0?res.data.lastPostDate:this.state.lastPostDate,
            hasMore: res.data.posts.length>0
          }));
        })
      .catch(err => {console.log(err);});
      
  }
  render() {   
    console.log(this.state.workPlace)
    const posts = this.state.posts;
    console.log("PrintBook: " + posts);
    let postList;

    if (!posts) {
      postList = "there is no book record!";
    } else {
      postList = posts.map((post, k) =>
        <PostCard post={post} key={k} />
      );
    }
    return (
      <main>
        <NavBar></NavBar>
        <h1>{App.userRole}</h1>
        <Container>
          <Row>
            {postList}
          </Row>
        </Container>
      </main>
    );
  }
}

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap:wrap;
`;

export default ShowPosts;