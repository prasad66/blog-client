import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/context';
import './Settings.css'
import { useContext, useState } from 'react';
import axios from 'axios';

const Settings = () => {

    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const PF = 'https://morning-brook-96378.herokuapp.com/images/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username, email, password

        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = PF + filename;
            try {
                await axios.post('https://morning-brook-96378.herokuapp.com/api/upload', data)

            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await axios.put('https://morning-brook-96378.herokuapp.com/api/users/' + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

            // res.data && window.location.replace('/post/' + res.data._id);
        } catch (error) {
            console.log(error);
            dispatch({ type: "UPDATE_FAILURE" });
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            className=""
                            src={file ? URL.createObjectURL(file) : user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <label htmlFor="username" >Username</label>
                    <input type="text" placeholder={user.username} id="username" onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="email" >Email</label>
                    <input type="email" placeholder={user.email} id="email" onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="password" >Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {
                        success && (<span style={{ color: 'green', marginTop: '30px', alignSelf: 'center' }}>Profile has been updated</span>)
                    }
                </form>
            </div>
            <Sidebar />
        </div>
    )
}

export default Settings