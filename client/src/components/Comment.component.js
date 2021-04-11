import styled from "styled-components"

export const Comment = ( { comment }) => {
    return (
        <Container>
            <ImageDiv>
                <UserInitial>{`${comment?.comentator?.firstName?.charAt(0)}`}</UserInitial>
            </ImageDiv>
            <CommentDiv>
                <CommentUserName>{`${comment?.comentator?.firstName} ${comment?.comentator?.lastName}`}</CommentUserName>
                <CommentText>{`${comment?.comment}`}</CommentText>
            </CommentDiv>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    margin: 1rem 0;
    padding: 0 1rem;
`;

const ImageDiv = styled.div`
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    border-radius: 100%;
    background-color: #C4C4C4;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1rem 0 0;
    @media (max-width: 1000px){
        width: 40px;
        height: 40px;
        margin: 0 .5rem 0 0;
  }
    
`;

const CommentDiv = styled.div`
    display: flex;
    flex-direction: column; 
    padding: 0 2rem;
    @media (max-width: 1000px){
        padding: 0 1rem;
  }
`;

const CommentUserName = styled.div`
    font-weight: bold;
    margin: 0 0 .5rem 0;
    @media (max-width: 1000px){
        font-size: 1rem;
  }
`;

const CommentText = styled.div`
    color: #7C7C7C;
    word-break: break-all;
    @media (max-width: 1000px){
        font-size: 1rem;
  }
`;

const UserInitial = styled.div`
    font-size: 1.5rem;
    @media (max-width: 1000px){
        font-size: 1rem;
  }
`;