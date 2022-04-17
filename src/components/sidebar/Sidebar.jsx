import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {

    const [cats, setCats] = useState([]);


    useEffect(() => {
        const fetchCats = async () => {
            const res = await axios.get('/categories');
            setCats(res.data);
        };
        fetchCats();

        return fetchCats();

    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    className=""
                    src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                    alt=""
                />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, doloribus quam. Doloribus officiis at dolorem, architecto ipsum atque earum. </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {
                        cats.map(cat => (
                            <Link to={`/?cat=${cat.name}`} key={cat.name}className="link">
                                <li className="sidebarListItem">{cat.name}</li>
                            </Link>
                        ))
                    }

                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-twitter-square"></i>
                    <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
                    <i className="sidebarIcon fa-brands fa-instagram-square"></i>

                </div>
            </div>
            <div className="sidebarItem"></div>
        </div>
    )
}

export default Sidebar