import './Register.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post('https://morning-brook-96378.herokuapp.com/api/auth/register', {
                username,
                email,
                password
            });

            console.log(res);

            res.data && window.location.replace('/login');
        } catch (error) {
            console.log(error.response.data);

            if (error.response.data.code === 'email') {
                setError(true);
                setErrorMsg('Email already exists');
            }
            if (error.response.data.code === 'username') {
                setError(true);
                setErrorMsg('Username already exists');
            }

        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input className="registerInput" type="text" id="username" placeholder="Enter your Username" required onChange={e => setUsername(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input className="registerInput" type="text" id="email" placeholder="Enter your Email" required onChange={e => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input className="registerInput" type="password" id="password" placeholder="Password..." required onChange={e => setPassword(e.target.value)} />
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to='/login'>Login</Link>
            </button>
            {
                error && (<div className="error">{errorMsg}</div>)
            }
        </div>
    )
}

export default Register