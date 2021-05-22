import { useState, useEffect, useRef } from "react";
import { deleteComment, updateComment } from "../../services/CommentsServices";
import { mdiDotsVertical, mdiDelete, mdiCommentEdit, mdiClose, mdiCancel} from '@mdi/js';
import Icon from '@mdi/react';
import { Container, ImageDiv, CommentDiv, CommentUserName, CommentText, UserInitial, CommentMenu, DropdownMenu, DropdownMenuIcon, IconContainer, CancelIcon, SaveDiv, SaveButton, EditedI } from "./Comment.StyledComponents";
import ReactImageFallback from "react-image-fallback";
import { ImageCircleStyle } from '../Global.styledComponents';
import socketIOClient from "socket.io-client";
const ENDPOINT = `http://127.0.0.1:9001`;

export const Comment = ({ comment, connectedUser, setCommentCount}) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [editing, setEditing] = useState(false);
    const [updatedCommentValue, setUpdatedCommentValue] = useState(comment?.comment);
    const [edited, setEdited] = useState(comment?.datePosted < comment?.updatedAt);
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const socketRef = useRef(null);

    const deleteThisComment = () => {
        deleteComment(comment._id)
            .then(res => {
                console.log(res);
                socketRef.current.emit(`deleteComment`, comment);
                setIsDeleted(true);
                setCommentCount((prevCount) => prevCount - 1);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socketRef.current = socket;
        socket.on(`deleteComment`, commId =>{
            console.log(`eeeee`);
            if (commId === comment._id){
                console.log(comment);
                setIsDeleted(true);
                setCommentCount((prevCount) => prevCount - 1);
                
            }
        });

        socket.on(`editComment`, comm => {
            if (comm._id === comment._id){
                console.log(comm);
                comment.comment = comm.comment;
                setUpdatedCommentValue(comm.comment);
                setEdited(true);
            }
        })
        return () => {
            socket.disconnect();
        }
    },[])

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
                socketRef.current.emit(`editComment`, comment);
                setEdited(true);
            })
            .catch(err => console.log(err));
        setEditing(false);

    }

  

    return (
        <Container>
            <ImageDiv>
                {/* <CommentPicture src={`/profile/${comment?.createdBy}/profilePicture`}></CommentPicture> */}
                <ReactImageFallback
                    src={`/profile/${comment?.createdBy}/profilePicture`}
                    fallbackImage={process.env.PUBLIC_URL + '/iconUser.jpg'}
                    style={ImageCircleStyle} />
                {/* <UserInitial>{comment.commentator ?
                    `${comment?.commentator?.firstName?.charAt(0) ? comment?.commentator?.firstName?.charAt(0) : comment?.commentator?.companyName?.charAt(0)}`
                    : null}
                </UserInitial> */}
            </ImageDiv>
            <CommentDiv>
                <CommentUserName>{!comment.commentator ? 
                                <strong>Deleted User</strong> 
                                : comment.commentator.role === 'student' ? 
                                    <a href={`/profile/${comment.createdBy}`}>{`${comment.commentator.firstName + " " + comment.commentator.lastName}`} </a>
                                    : comment.commentator.role==='company' ? 
                                        <a href={`/profile/${comment.createdBy}`}>{`${comment.commentator.companyName}`} </a>
                                        :<strong style={{color: 'blue'}}>Admin account</strong>   
                                }
                </CommentUserName>
                {edited && <EditedI>(edited)</EditedI>}
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
                        <CommentText>{updatedCommentValue}</CommentText>}
            </CommentDiv>
            {
                (connectedUser?.id === comment?.createdBy || connectedUser?.role === 'admin') && !isDeleted &&
                (editing ?
                    <div>
                        <CancelIcon>
                            <Icon path={mdiClose} 
                                size={1}
                                title={`Cancel`}
                                onClick={() => {setEditing(false); setUpdatedCommentValue(comment?.comment)}}
                                >
                            </Icon>
                        </CancelIcon>
                        {/* <button onClick={() => setEditing(false)}>Cancel</button> */}
                        <SaveDiv>
                            <SaveButton onClick={() => saveEdit()}>Save</SaveButton>
                        </SaveDiv>
                    </div>
                    :
                    <CommentMenu>
                        <DropdownMenuIcon>
                        <Icon path={mdiDotsVertical} 
                            size={1}
                            onClick={(e) => setShowDropdownMenu(!showDropdownMenu)}
                            >
                        </Icon>
                        </DropdownMenuIcon>
                        {showDropdownMenu ? 
                        <DropdownMenu>
                            <IconContainer>
                            <Icon path={mdiDelete} 
                                color={`#FF7272`}
                                title={`Delete comment`}
                                size={1}
                                onClick={(e) => {deleteThisComment(); setShowDropdownMenu(!showDropdownMenu);}}
                                >
                            </Icon>
                            
                            </IconContainer>
                            <IconContainer>
                            <Icon path={mdiCommentEdit} 
                                title={`Edit comment`}
                                size={1}
                                onClick={(e) => {startEditing(); setShowDropdownMenu(!showDropdownMenu);}}
                                >
                        </Icon>
                        
                            </IconContainer>
                            </DropdownMenu>
                    :
                    ``}    
                    </CommentMenu>
                )
            }
        </Container>
    )

   
}
