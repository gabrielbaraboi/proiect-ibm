import React, { useEffect } from 'react';
import styled from "styled-components"
import { LabelPost } from "./ShowPost.component";
import { Comment } from "./Comment/Comment.component";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import useCommentSearch from '../customHooks/useCommentSearch';
import { postComment } from '../services/CommentsServices';


export const CommentSection = ({ postID, connectedUser, commentCount }) => {
    console.log(postID, connectedUser);
    const { id } = useParams();
    const [commentAdded, setComentAdded] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const { comments, hasMore, loading } = useCommentSearch(pageNumber, id);

    const onScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if (bottom && hasMore) {
            console.log("BOTTOM");
            setPageNumber(prevPN => { return prevPN + 1 });
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', onScroll);
        return () => document.removeEventListener("scroll", onScroll);
    }, [hasMore]);

    const submitComment = e => {
        e.preventDefault();
        const comment = commentAdded;
        if (commentAdded !== "") {
            postComment(id, { comment })
                .then(res => {
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    return (
        <Container>
            <CommentInfo>
                <LabelPost>Comentarii</LabelPost>
                <CommentsCountDiv>
                    <CommentsCount>{commentCount}</CommentsCount>
                    <CommentsCountText>{commentCount > 1 ? `Comentarii` : `Comentariu`}</CommentsCountText>
                </CommentsCountDiv>
            </CommentInfo>
            {connectedUser &&
                <AddComment>
                    <ImageDiv>
                        <UserInitial>{connectedUser ? connectedUser.firstName?.charAt(0) : `U`}</UserInitial>
                        <UserInitial>{connectedUser ? connectedUser.companyName?.charAt(0) : `U`}</UserInitial>
                    </ImageDiv>
                    <CommentInputContainer>
                        <CommentInputTextArea
                            placeholder="Add a comment..."
                            type="text"
                            value={commentAdded}
                            onChange={(e) => setComentAdded(e.target.value)}>
                        </CommentInputTextArea>
                        <PostCommentButton onClick={submitComment}>Posteaza</PostCommentButton>
                    </CommentInputContainer>
                </AddComment>}
            {comments.length === 0
                ?
                !loading
                    ?
                    <center>No comments yet!</center>
                    : null
                : comments?.map((comment, idx) => (
                    <Comment key={idx} comment={comment} connectedUser={connectedUser}></Comment>
                ))
            }
            {loading && <center><strong>Loading</strong></center>}
        </Container>
    )
}

const Container = styled.div`
    @media (max-width: 1000px){
        margin: 0;
        padding: 0 1rem;
  }
`;

const CommentInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
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
    @media (max-width: 1000px){
        width: 50px;
        height: 50px;
        margin: 0 .5rem 0 0;
  }
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
    @media (max-width: 1000px){
       height: 150px;
  }
`;

const UserInitial = styled.div`
    font-size: 1.5rem;
    @media (max-width: 1000px){
        font-size: 1rem;
  }
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
    @media (max-width: 1000px){
       padding: .5rem 0;
       font-size: .8rem;
  }
`;