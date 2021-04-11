import styled from "styled-components"
import { LabelPost } from "./ShowPost.component";
import { Comment } from "./Comment.component";

export const CommentSection = ( { comments }) => {
    console.log(comments);
    return (
        <Container>
            <CommentInfo>
                <LabelPost>Comentarii</LabelPost>
                <CommentsCountDiv>
                    <CommentsCount>{comments?.length}</CommentsCount>
                    <CommentsCountText>Comentarii</CommentsCountText>
                </CommentsCountDiv>
            </CommentInfo>
            <AddComment>
                <ImageDiv>
                    <UserInitial>U</UserInitial>
                </ImageDiv>
                <CommentInputContainer>
                    <CommentInputTextArea placeholder="Add a comment..." type="text"></CommentInputTextArea>
                    <PostCommentButton>Posteaza</PostCommentButton>
                </CommentInputContainer>
            </AddComment>
            {
                comments?.map( comment => (
                    <Comment key={comment.id} comment={comment}></Comment>
                ))
            }
        </Container>
    )
}

const Container = styled.div`
    padding: 0 5rem;
`;

const CommentInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CommentsCountDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CommentsCount = styled.div`
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
`;

const CommentsCountText = styled.div`
    font-size: .8rem;
    color: #7C7C7C;
`;

const AddComment = styled.div`
    display: flex;
    margin: 1rem 0;
    padding: 0 .5rem;
`;

const ImageDiv = styled.div`
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 100%;
    background-color: #C4C4C4;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 1.5rem 0 0;
`;

const CommentInputContainer = styled.div`
    display: flex;
    flex-direction:column;
    flex: 1;
    margin: 0 0 0 1.3rem;
    height: 200px;
`;

const CommentInputTextArea = styled.textarea`
    
    font-size: 1.2rem;
    width: 100%;
    height: 100%;
`;

const UserInitial = styled.div`
    font-size: 1.5rem;
`;

const PostCommentButton = styled.button`
    padding: 1rem 0;
    margin: 1rem 0;
    font-weight: bold;
    transition: .5s ease;
    font-size: 1rem;
    &:hover{
        cursor: pointer;
        transform: translateY(5px);
    }
`;