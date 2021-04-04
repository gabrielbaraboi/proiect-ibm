import { useParams } from "react-router-dom";

export const ShowPost = () => {
    const { id } = useParams();

    const post = {
        id: id,
        name: `firma1`,
        limbaj: `JavaScript`
    }
    return(
        <div>
            <div>
                {post.name}
            </div>
            <div>
                {post.limbaj}
            </div>
        </div>
    )
}