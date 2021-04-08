import { Link } from "react-router-dom"
import styled from "styled-components";
import NavBar from "./NavBar.component"


export const ShowPosts = () => {
  const post = {
    id: `300`,
    dateCreated: new Date(Date.now()).toString(),
    type: `offer`,
    title: `JS developer`,
    workHours: `full-time`,
  };
  return (
    <main>
      <NavBar></NavBar>
      <Container>
        <Row>
          <div className="card-container">
            <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
            <div className="desc">
              <h2>
                <Link to={`/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              <h3>{post.type}</h3>
              <p>{post.workHours}</p>
            </div>
          </div>
          <div className="card-container">
            <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
            <div className="desc">
              <h2>
                <Link to={`/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              <h3>{post.type}</h3>
              <p>{post.workHours}</p>
            </div>
          </div>
        </Row>
      </Container>
    </main>
  )
};

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap:wrap;
`;