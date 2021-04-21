import React, { Component } from 'react';
import styled from "styled-components";
import NavBar from "./NavBar/NavBar.component";
import PostCard from "./PostCard.component"
import App from "../App";
import { getNextPostsPage } from "../services/PostsServices";

function setParams({ workPlace, sort, workHours, type, createdBy }) {
  const searchParams = new URLSearchParams();
  if (workPlace > '')
    searchParams.set("workPlace", workPlace);
  if (sort > '')
    searchParams.set("sort", sort);
  if (workHours > '')
    searchParams.set("workHours", workHours);
  if (type > '')
    searchParams.set("type", type);
  if (createdBy > '')
    searchParams.set("createdBy", createdBy)
  return searchParams.toString();
}


class ShowPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      sorting: new URLSearchParams(this.props.location.search).get('sort'),
      programmingLanguage: new URLSearchParams(this.props.location.search).getAll('programmingLanguage'),
      workHours: new URLSearchParams(this.props.location.search).getAll('workHours'),
      createdBy: new URLSearchParams(this.props.location.search).getAll('createdBy'),
      workPlace: new URLSearchParams(this.props.location.search).getAll('workPlace'),
      type: new URLSearchParams(this.props.location.search).getAll('type'),
      lastPostDate: 'none',
      hasMore: false,
      pageNumber: 0,
      loading: true
    };
    this.onScroll = this.onScroll.bind(this);
    //console.log(this.props.connectedUser);
  }
  onScroll() {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    if (bottom && this.state.hasMore) {
      this.setState((prevState) => ({
        ...prevState,
        pageNumber: this.state.pageNumber + 1
      }))
    }
  }

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      pageNumber: 1
    }));
    document.addEventListener('scroll', this.onScroll);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sorting !== prevState.sorting) {
      this.setState(prevState => ({
        ...prevState,
        pageNumber: 1,
        posts: [],
        lastPostDate: 'none'
      }));
      this.updateURL()
    }
    else if (this.state.pageNumber !== prevState.pageNumber) {
      this.setState(prevState => ({
        ...prevState,
        loading: true
      }));
      getNextPostsPage(this.state.sorting, this.state.lastPostDate, this.state.programmingLanguage, this.state.workHours,
        this.state.workPlace, this.state.type, this.state.createdBy)
        .then(res => {
          this.setState(prevState => ({
            ...prevState,
            posts: [...this.state.posts, ...res.data.posts],
            lastPostDate: res.data.posts.length > 0 ? res.data.lastPostDate : this.state.lastPostDate,
            hasMore: res.data.posts.length > 0,
            loading: false,
            emptyList: [...this.state.posts, ...res.data.posts].length>0
          }));
        })
        .catch(err => { console.log(err); });
    }
    if (this.state.workPlace !== prevState.workPlace || this.state.type !== prevState.type || this.state.workHours !== prevState.workHours)
      this.updateURL()

  }

  updateWorkPlace = e => this.setState({ workPlace: e.target.value });
  updateSort = e => this.setState({ sorting: e.target.value });
  updateWorkHours = e => this.setState({ workHours: e.target.value });
  updateType = e => this.setState({ type: e.target.value });
  updateURL = () => {
    const url = setParams({ workPlace: this.state.workPlace, sort: this.state.sorting, workHours: this.state.workHours, type: this.state.type, createdBy: this.state.createdBy });
    this.props.history.push(`?${url}`);
    window.location.reload(false);
  };

  render() {
    const posts = this.state.posts;
    let postList;

    console.log(this.state.emptyList);
    postList = posts.map((post, k) =>
      <PostCard post={post} key={k} />
    );

    return (
      <>
        <header>
          <NavBar />
        </header>
        <main>
          <Container>
            <PageTitle>Last posts</PageTitle>
            <div id="search">
              <select value={this.state.sorting == null ? '' : this.state.sorting.toString()} onChange={this.updateSort}>
                <option value=''>Choose Sort Type</option>
                <option value='asc'>Asc</option>
                <option value='desc'>Desc</option>
              </select>
              <select value={this.state.type == null ? '' : this.state.type.toString()} onChange={this.updateType}>
                <option value=''>Choose Post Type</option>
                <option value='offer'>Offer</option>
                <option value='request'>Request</option>
              </select>
              <select value={this.state.workHours == null ? '' : this.state.workHours.toString()} onChange={this.updateWorkHours}>
                <option value=''>Choose Work Hours</option>
                <option value='full-time'>Full time</option>
                <option value='part-time'>Part time</option>
              </select>
              <select value={this.state.workPlace == null ? '' : this.state.workPlace.toString()} onChange={this.updateWorkPlace}>
                <option value=''>Choose Work Place</option>
                <option value='Timisoara'>Timisoara</option>
                <option value='Bucharest'>Bucharest</option>
              </select>
            </div>
            <Row>
              {!this.state.loading&&postList.length===0?<p>No posts to show</p>:postList}
              {this.state.loading && <strong>Loading</strong>}
            </Row>
          </Container>
        </main>
      </>
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
`
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default ShowPosts;