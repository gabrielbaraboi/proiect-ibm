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
    console.log(this.props.connectedUser);
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
    let postList;

    if (!posts) {
      postList = "there is no post record!";
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
          <PageTitle>Last posts</PageTitle>
          <Row>
            {postList}
          </Row>
        </Container>
      </main>
    );
  }
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const PageTitle = styled.p`
  padding: 8px 20px;
  margin: 30px 0;
  font-size: 22px;
  color: #3e3e3e;
  border-radius: 5px;
  display: inline-block;
  background: #DCDCDC;
  // text-transform: uppercase;
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default ShowPosts;