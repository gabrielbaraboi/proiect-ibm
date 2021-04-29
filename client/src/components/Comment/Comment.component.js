import { useState } from "react";
import { deleteComment, updateComment } from "../../services/CommentsServices";
import { mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';
import { Container, ImageDiv, CommentDiv, CommentUserName, CommentText, UserInitial, CommentMenu, DropdownMenu, DropdownMenuIcon } from "./Comment.StyledComponents";
export const Comment = ({ comment, connectedUser }) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const [editing, setEditing] = useState(false);
    const [updatedCommentValue, setUpdatedCommentValue] = useState(comment?.comment);
    const [edited, setEdited] = useState(comment?.datePosted < comment?.updatedAt);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);

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
                                        :<strong style={{color: 'blue'}}>Admin account</strong>   
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
                    <CommentMenu>
                        <DropdownMenuIcon>
                        <Icon path={mdiDotsHorizontal} 
                            size={1}
                            onClick={(e) => setShowDropdownMenu(!showDropdownMenu)}
                            >
                        </Icon>
                        </DropdownMenuIcon>
                        {showDropdownMenu ? 
                        <DropdownMenu>
                            <button onClick={deleteThisComment}>Delete Comment</button>
                            <button onClick={() => startEditing()}>Edit Comment</button>
                        </DropdownMenu>
                    :
                    ``}
                        
                    </CommentMenu>
                )
            }
        </Container>
    )
}