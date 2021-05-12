import styled from "styled-components";

const Container = styled.div`
display: flex;
margin: 1rem 0;
border-bottom: 1px solid #c4c4c4;
padding: 1rem 0 2rem 0;
position: relative;
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

const CommentMenu = styled.div`
position: absolute;
top: 0;
right: 0;
`;

const DropdownMenu = styled.div`
display: flex;
flex-direction: column;
z-index: 1;
`;

const DropdownMenuIcon = styled.div`
text-align: right;
`;

const IconContainer = styled.div`
    background-color: white;
    margin: .1rem 0;
    padding: 0 .2rem;
    :hover{
        cursor: pointer;
    }
`;

const CancelIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    :hover{
        cursor: pointer;
    }
`;

const SaveDiv = styled.div`
    position: absolute;
    top: 25px;
    right: 0;

`;

const SaveButton = styled.div`
    background-color: #89CCF6;
    color: white;
    border-radius: 5px;
    padding: .5rem;
    :hover{
        cursor: pointer;
    }

`;
export { Container, ImageDiv, CommentDiv, CommentUserName, CommentText, UserInitial, CommentMenu, DropdownMenu, DropdownMenuIcon, IconContainer, CancelIcon, SaveDiv, SaveButton};