import {useEffect,useState} from 'react';
import axios from 'axios';

export default function useCommentSearch(pageNumber,postID){

    const [comments,setComments]=useState([]);
    const [lastCommentDate,setLastCommentDate]=useState('none');
    const [hasMore,setHasMore]=useState(false);

    useEffect(()=>{
       console.log(`PostID : ${postID} PageNumber : ${pageNumber} LastCommentDate ${lastCommentDate}`)
        
        axios
        .get(`http://localhost:9000/posts/postComments/${postID}`,{
        params:{lastCommentDate}
        })
        .then(res => {
            setComments(prevComments=> {return [...prevComments,...res.data.comments]});
            setHasMore(res.data.comments.length>0);
            setLastCommentDate(res.data.lastCommentDate);
        })
      .catch(err => {console.log(err);});
      
    },[pageNumber]);
    return {comments,hasMore};
}