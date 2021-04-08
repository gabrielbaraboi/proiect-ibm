import React, { Component } from 'react';
import styled from "styled-components";
import axios from "axios";
import NavBar from "./NavBar.component";
import PostCard from "./PostCard.component"


class ShowPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/posts/')
        .then(res => {
          this.setState({posts: res.data})
        })
      .catch(err => {console.log(err);})
  };

  render() {
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