import styled from "styled-components";

export const AllPosts = styled.div`
    width: 75%;
    height: auto;
    padding-right: 20px;
`

export const Filter = styled.div`
    width: 25%;
    height: fit-content;
    background: rgba(255,255,255,.55);
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 2%), 0 0px 0 1px rgb(10 10 10 / 2%);
    border-radius: 6px;
    padding: 20px;
`

export const Post = styled.div`
    width: 100%;
    background: rgba(255,255,255,.55);
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 2%), 0 0px 0 1px rgb(10 10 10 / 2%);
    border-radius: 6px;
    margin-top: 20px;
    transition: all .3s ease-in-out;
    display: flex;
    &:nth-child(1) {
        margin-top:0;
    }
    &:hover {
        background: #FEFEFE;
    }
`

export const PostRightBlock = styled.div`
    padding: 20px 20px 20px 10px;
    width: calc(100% - 150px);
`

export const PostHeader = styled.div`
   display: flex;
   flex-wrap: wrap;
`

export const AuthorImage = styled.div`
    width: 150px;
    padding: 20px;
    border-radius: 6px;
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 6px;
`

export const PostHeaderBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 73%;
    padding-left: 15px;
    border-left: 2px solid #363636;
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
    margin-left: 10px;
    font-size: 12px;
    margin-top: 8px;
    color: #66727E;
    text-transform: capitalize;
    &:after {
        content: "";
        display: inline-block;
        height: 0.5em;
        vertical-align: bottom;
        height: 100%;
        margin-right: -100%;
        margin-left: 8px;
        border-right: 2px solid #e4e4e4;
    }
    &:last-child::after {
        display: none;
    }
    &:nth-child(1) {
        margin-left: 0;
    }
`

export const PostHeaderData = styled.div`
    margin-left: auto;
`

export const DataItem = styled.div`
    font-size: 11px;
    text-align: right;
    color: #66727E;
    margin-top: 5px;
    &:nth-child(1) {
        margin-top: 0;
        font-size: 14px;
    }
    a {
        color: black;
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
    background: #89ccf6;
    border-radius: 8px;
    font-size: 14px;
    color: #ffffff;
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

export const FilterTitle = styled.h2`
    color: #1B2942;
    font-size: 24px;
    font-weight: 500;
    overflow: hidden;
    &:after {
        content:"";
        display: inline-block;
        height: 0.5em;
        vertical-align: bottom;
        width: 100%;
        margin-right: -100%;
        margin-left: 10px;
        border-top: 2px solid #e4e4e4;
    }
`

export const FilterCategory = styled.div`
    margin-left: 10px;
    label {
        margin-left: 5px;
    }
`

export const FilterCategoryTitle = styled.h3`
    color: #1B2942;
    font-size: 18px;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 8px;
    margin-left: -10px;
`

export const FilterField = styled.div`
    color: #686D88;
    display: block;
    position: relative;
    margin-top: 5px;
    height: 18px;
    &:hover label {
	    color: #000000;
    }
    &:hover .check {
	    border: 2px solid #89CCF6;
    }
    input[type=radio] {
        position: absolute;
        visibility: hidden;
    }
    label {
        display: block;
        position: relative;
        cursor: pointer;
        margin-left: 25px;
        font-weight: 500;
        transition: all .25s ease-in-out;
    }
    input[type=radio]:checked ~ .check {
        border: 2px solid #89CCF6;
    }
    input[type=radio]:checked ~ .check::before {
        background: #89CCF6;
    }
    input[type=radio]:checked ~ label {
        color: #000000;
    }
`

export const Check = styled.div`
    display: block;
    position: absolute;
    top: 1px;
    border: 2px solid #AAAAAA;
    border-radius: 100%;
    height: 18px;
    width: 18px;
    transition: all .25s ease-in-out;
    &:before {
        display: block;
        position: absolute;
        content: '';
        border-radius: 100%;
        height: 10px;
        width: 10px;
        top: 2px;
        left: 2px;
        margin: auto;
        transition: all .25s ease-in-out;
    }
`