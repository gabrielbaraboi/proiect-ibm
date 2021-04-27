import { useState } from "react";
import styled from "styled-components";
import { deleteComment, updateComment } from "../services/CommentsServices";

export const Comment = ({ comment, connectedUser }) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const [editing, setEditing] = useState(false);
    const [updatedCommentValue, setUpdatedCommentValue] = useState(comment?.comment);
    const [edited, setEdited] = useState(comment?.datePosted < comment?.updatedAt);
    const deleteThisComment = () => {
        deleteComment(comment._id)
            .then(res => {
                console.log(res);
                setIsDeleted(true);
            })
            .catch(err => console.log(err));
    };
    const startEditing = () => {
        setUpdatedCommentValue(comment?.comment);
        setEditing(true);
        console.log(comment);
    }
    const saveEdit = () => {
        if (!updatedCommentValue)
            return console.log('Nu putem avea coment gol!');
        if (updatedCommentValue === comment?.comment)
            return console.log('Nu s-a facut nici o schimbare');
        updateComment(comment._id, updatedCommentValue)
            .then(res => {
                console.log(res);
                comment.comment = updatedCommentValue;
                setEdited(true);
            })
            .catch(err => console.log(err));
        setEditing(false);

    }

    return (
        <Container>
            <ImageDiv>
                <UserInitial>{comment.commentator ?
                    `${comment?.commentator?.firstName?.charAt(0) ? comment?.commentator?.firstName?.charAt(0) : comment?.commentator?.companyName?.charAt(0)}`
                    : null}
                </UserInitial>
            </ImageDiv>
            <CommentDiv>
                <CommentUserName>{!comment.commentator ? 
                                <strong>Deleted User</strong> 
                                : comment.commentator.role === 'student' ? 
                                    comment.commentator.firstName + " " + comment.commentator.lastName 
                                    : comment.commentator.role==='company' ? 
                                        comment.commentator.companyName
                                        :<strong>Admin account</strong>   
                                }
                </CommentUserName>
                {edited && <i>Edited comment</i>}
                {editing ?
                    <textarea
                        type="text"
                        value={updatedCommentValue}
                        onChange={(e) => setUpdatedCommentValue(e.target.value)}>
                    </textarea>
                    :
                    isDeleted ?
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
                (editing ?
                    <div>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                        <button onClick={() => saveEdit()}>Save edit</button>
                    </div>
                    :
                    <div>
                        <button onClick={deleteThisComment}>Delete Comment</button>
                        <button onClick={() => startEditing()}>Edit Comment</button>
                    </div>
                )
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