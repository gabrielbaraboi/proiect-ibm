import { useState } from "react";
import styled from "styled-components";
import { deleteComment } from "../services/CommentsServices";

export const Comment = ({ comment, connectedUser }) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const deleteThisComment = () => {
        deleteComment(comment._id)
            .then(res => {
                console.log(res);
                setIsDeleted(true);
            })
            .catch(err => console.log(err));
    };
    return (
        <Container>
            <ImageDiv>
                <UserInitial>{`${comment?.comentator?.firstName?.charAt(0) ? comment?.comentator?.firstName?.charAt(0) : comment?.comentator?.companyName?.charAt(0)}`}</UserInitial>
            </ImageDiv>
            <CommentDiv>
                <CommentUserName>{`${comment?.comentator?.firstName ? comment?.comentator?.firstName : comment?.comentator?.companyName} 
                                    ${comment?.comentator?.lastName ? comment?.comentator?.lastName : " "}`}</CommentUserName>
                {isDeleted ?
                    <div>
                        <strong>
                            Comment deleted!
                    </strong>
                    </div>
                    :
                    <CommentText>{`${comment?.comment}`}</CommentText>}
            </CommentDiv>
            {
                (connectedUser?.id === comment?.createdBy || connectedUser?.role === 'admin') && !isDeleted &&
                <div>
                    <button onClick={deleteThisComment}>Delete Comment</button>
                </div>
            }
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