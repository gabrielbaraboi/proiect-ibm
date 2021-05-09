import React, { Component } from 'react';
import NavBar from "../NavBar/NavBar.component";
import PostCard from "./PostCard.component"
import { getNextPostsPage, getWorkPlaces } from "../../services/PostsServices";
import { Container, PageTitle, Row } from "../Global.styledComponents"
import { AllPosts, Filter, FilterTitle, FilterCategory, FilterCategoryTitle, FilterField, Check } from "./Post.styledComponents"

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
      loading: true,
      workPlaces: []
    };
    this.onScroll = this.onScroll.bind(this);
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
            loading: false
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
    window.location.reload();
  };

  render() {
    const posts = this.state.posts;
    let postList;

    getWorkPlaces()
      .then(res => {
        this.state.workPlaces = Array.from(new Set(res.data.workPlaces.map(a => a.workPlace)))
      })
      .catch(err => {
        console.log(err);
      });

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
            <Row>
              <AllPosts>
                {!this.state.loading && postList.length === 0 ? <p>No posts to show</p> : postList}
                {this.state.loading && <strong>Loading</strong>}
              </AllPosts>
              <Filter>
                <FilterTitle>Filter</FilterTitle>
                <FilterCategory>
                  <FilterCategoryTitle>Sort</FilterCategoryTitle>
                  <FilterField>
                    <input type="radio" id="asc" name="sort" value="asc" onChange={this.updateSort} checked={this.state.sorting !== null ? this.state.sorting.toString() === "asc" : false} />
                    <label htmlFor="asc">Ascending</label>
                    <Check className="check" />
                  </FilterField>
                  <FilterField>
                    <input type="radio" id="desc" name="sort" value="desc" onChange={this.updateSort} checked={this.state.sorting !== null ? this.state.sorting.toString() === "desc" : true} />
                    <label htmlFor="desc">Descending</label>
                    <Check className="check" />
                  </FilterField>
                </FilterCategory>
                <FilterCategory>
                  <FilterCategoryTitle>Type</FilterCategoryTitle>
                  <FilterField>
                    <input type="radio" id="offer" name="type" value="offer" onChange={this.updateType} checked={this.state.type.toString() === "offer"} />
                    <label htmlFor="offer">Offer</label><br />
                    <Check className="check" />
                  </FilterField>
                  <FilterField>
                    <input type="radio" id="request" name="type" value="request" onChange={this.updateType} checked={this.state.type.toString() === "request"} />
                    <label htmlFor="request">Request</label>
                    <Check className="check" />
                  </FilterField>
                </FilterCategory>
                <FilterCategory>
                  <FilterCategoryTitle>Work Hours</FilterCategoryTitle>
                  <FilterField>
                    <input type="radio" id="full-time" name="workHours" value="full-time" onChange={this.updateWorkHours} checked={this.state.workHours.toString() === "full-time"} />
                    <label htmlFor="full-time">Full Time</label><br />
                    <Check className="check" />
                  </FilterField>
                  <FilterField>
                    <input type="radio" id="part-time" name="workHours" value="part-time" onChange={this.updateWorkHours} checked={this.state.workHours.toString() === "part-time"} />
                    <label htmlFor="part-time">Part Time</label>
                    <Check className="check" />
                  </FilterField>
                </FilterCategory>
                <FilterCategory>
                  <FilterCategoryTitle>Work Place</FilterCategoryTitle>
                  {this.state.workPlaces.map((workPlace, k) =>
                    <FilterField key={k}>
                      <input type="radio" id={`workplace-`, k} name="workPlace" value={workPlace} onChange={this.updateWorkPlace} checked={this.state.workPlace.toString() === workPlace} />
                      <label htmlFor={`workplace-`, k}>{workPlace}</label>
                      <Check className="check" />
                    </FilterField>
                  )}
                </FilterCategory>
              </Filter>
            </Row>
          </Container>
        </main>
      </>
    );
  }
}

export default ShowPosts;