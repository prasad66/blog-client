import './Post.css'
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';


const Post = ({ post }) => {

  const PF = 'http://localhost:3000/images/';

  console.log(PF + post.photo)

  return (
    <div className="post">
      {
        post.photo &&
        <img
          className="postImg"
          src={PF + post.photo}
          alt=""
        />

      }
      <div className="postInfo">
        <div className="postCats">
          {
            post?.categories?.map((category, index) => (
              <span key={index}>{category.name}</span>
            ))
          }
        </div>
        <Link to={`/post/${post._id}`} className="titleLink">
          <div className="postTitle">
            {post.title}
          </div>
        </Link>
        <hr />
        <span className="postDate">{format(post.createdAt)}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  )
}

export default Post