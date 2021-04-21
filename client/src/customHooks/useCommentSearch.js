import {useEffect,useState} from 'react';
import {getNextCommentPage} from "../services/CommentsServices";

export default function useCommentSearch(pageNumber,postID){

    const [comments,setComments]=useState([]);
    const [lastCommentDate,setLastCommentDate]=useState('none');
    const [hasMore,setHasMore]=useState(false);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
       console.log(`PostID : ${postID} PageNumber : ${pageNumber} LastCommentDate ${lastCommentDate}`)
        setLoading(true);
        getNextCommentPage(postID,lastCommentDate)
        .then(res => {
            setComments(prevComments=> {return [...prevComments,...res.data.comments]});
            setHasMore(res.data.comments.length>0);
            setLastCommentDate(res.data.lastCommentDate);
            setLoading(false);
        })
      .catch(err => {console.log(err);});
      
    },[pageNumber]);
    return {comments,hasMore,loading};
}