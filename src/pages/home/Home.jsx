import Posts from '../../components/posts/Posts'
import Header from '../../components/header/Header'
import './Home.css'
import Sidebar from './../../components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const Home = () => {

    const { search } = useLocation();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`https://morning-brook-96378.herokuapp.com/api/post/${search}`);
            setPosts(res.data);
        };
        fetchPosts();

        return fetchPosts();

    }, [search]);

    return (
        <>
            <Header />
            <div className='home'>
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>
    )
}

export default Home