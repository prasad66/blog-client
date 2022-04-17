import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'timeago.js';
import './SinglePost.css'
import { Context } from './../../context/context';
const SinglePost = () => {

    const { user } = useContext(Context);

    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const PF = "https://morning-brook-96378.herokuapp.com/images/";

    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/post/${path}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/post/${path}`, {
                data: {
                    username: user.username
                }
            });
            window.location.replace('/');
        } catch (error) {
            console.log(error);
        }

    }

    const handleUpdate = async () => {
        try {
            await axios.put(`/post/${post._id}`, {
                username: user.username,
                title,
                desc
            });
            setUpdateMode(false);
        } catch (error) {
            console.log(error);
        }

    }

    console.log(post)
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {
                    post?.photo ?
                        <img
                            className="postImg"
                            src={PF + post.photo}
                            alt=""
                        />
                        :
                        <img
                            className="postImg"
                            src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?t=st=1648708446~exp=1648709046~hmac=86a4f65e3222afc5cfc46b0c4ed0838f6d44b3788987e1440428b043e3249b70&w=740"
                            alt=""
                        />

                }

                {
                    updateMode ? <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="singlePostTitleInput" autofocus='true' /> : <>
                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username &&
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                                </div>
                            }
                        </h1>
                    </>
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className="titleLink">
                            <b>{post.username}</b>
                        </Link>
                    </span>

                    {
                        post.createdAt === post.updatedAt ?
                            <span className="singlePostDate">
                                Posted: {format(post.createdAt)}
                            </span>
                            :
                            <span className="singlePostDate">
                                Edited: {format(post.updatedAt)}
                            </span>
                    }

                </div>

                {
                    updateMode ? <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="singlePostDescInput" /> :
                        <p className="singlePostDesc">
                            {desc}
                        </p>
                }
                {
                    updateMode &&
                    <div className="singlePostButtons">
                        <button className="singlePostCancelButton" onClick={() => setUpdateMode(false)}>Cancel</button>
                        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                    </div>
                }

            </div>
        </div>
    )
}

export default SinglePost