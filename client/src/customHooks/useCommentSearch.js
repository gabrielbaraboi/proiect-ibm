import {useEffect,useState} from 'react';
import {getNextCommentPage} from "../services/CommentsServices";

export default function useCommentSearch(pageNumber,postID){

    const [comments,setComments]=useState([]);
    const [lastCommentID,setLastCommentID]=useState('none');
    const [hasMore,setHasMore]=useState(false);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
       console.log(`PostID : ${postID} PageNumber : ${pageNumber} LastCommentDate ${lastCommentID}`)
        setLoading(true);
        getNextCommentPage(postID,lastCommentID)
        .then(res => {
            setComments(prevComments=> {return [...prevComments,...res.data.comments]});
            setHasMore(res.data.comments.length>0);
            if(res.data.comments.length>0)
              setLastCommentID(res.data.lastCommentID);
            setLoading(false);
        })
      .catch(err => {console.log(err);});
      
    },[pageNumber]);
    return {comments,hasMore,loading};
}