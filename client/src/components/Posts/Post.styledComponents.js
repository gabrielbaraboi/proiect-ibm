import styled from "styled-components";

export const AllPosts = styled.div`
    width: 70%;
    height: auto;
    padding-right: 20px;
`

export const Filter = styled.div`
    width: 30%;
    height: 500px;
    background: #FEFEFE;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 20px;
`

export const Post = styled.div`
    width: 100%;
    background: #FEFEFE;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-top: 20px;
    padding: 20px;
    transition: all .3s ease-in-out;
    &:nth-child(1) {
        margin-top:0;
    }
    &:hover {
        background: #E6E7F680;
    }
`

export const PostHeader = styled.div`
   display: flex;
   flex-wrap: wrap;
`

export const AuthorImage = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 100%;
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 100%;
`

export const PostHeaderBody = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    width: 70%;
`;

export const PostTitle = styled.h1`
    font-size: 22px;
    font-weight: 500;
    a {
        color: #000000;
        transition: all .2s ease-in-out;
    }
    a:hover {
        text-decoration: underline;
        color: #6672B4;
    }
`;

export const PostHeaderDetails = styled.div`
    display: flex;
`

export const Detail = styled.div`
    margin-left: 15px;
    font-size: 12px;
    margin-top: 5px;
    color: #66727E;
    &:nth-child(1) {
        margin-left: 0;
    }
`

export const PostHeaderData = styled.div`
    margin-left: auto;
`

export const DataItem = styled.div`
    font-size: 14px;
    text-align: right;
    color: #66727E;
    a {
        color: #66727E;
        transition: all .2s ease-in-out;
    }
    a:hover {
        color: #6672B4;
        text-decoration: underline
    }
`

export const PostDescription = styled.div`
    font-size: 14px;
    margin-top: 15px;
`

export const PostRequirements = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    margin-top: 10px;
`

export const Requirement = styled.div`
    margin-right: 8px;
    margin-top: 5px;
    padding: 8px 14px;
    background: #F1EBFC;
    border-radius: 8px;
    font-size: 14px;
    color: #7243E4;
`

export const InputRequirements = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    margin: 10px 0 0 0;
    padding: 0;
    width: 100%;
`

export const InputRequirement = styled.div`
    align-items: center;
    display: flex;
    margin-bottom: 5px;
    margin-right: 5px;
    padding: 8px 14px;
    background: #F1EBFC;
    border-radius: 8px;
    font-size: 14px;
    color: #7243E4;
    button {
        align-items: center;
        appearance: none;
        background: #ff4949ab;
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: inline-flex;
        font-size: 12px;
        height: 15px;
        justify-content: center;
        line-height: 0;
        margin-left: 8px;
        padding: 0;
        transform: rotate(45deg);
        width: 15px;
    }
`