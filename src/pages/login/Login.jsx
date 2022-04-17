import './Login.css'
import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../context/context';
import axios from 'axios';

const Login = () => {

    const { dispatch, isFetching } = useContext(Context);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const userRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userRef.current.value === '' || passwordRef.current.value === '') {
            return;
        }



        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post('https://morning-brook-96378.herokuapp.com/api/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value
            });

            console.log(res);

            res.data && dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            // userRef.current.value = "";
            // passwordRef.current.value = "";
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 404) {
                setError(true);
                setErrorMsg('Wrong Credentials');
            }
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input className="loginInput" type="text" id="username" placeholder="Enter your Username" ref={userRef} />
                <label htmlFor="password">Password</label>
                <input className="loginInput" type="password" id="password" placeholder="Enter your Email" ref={passwordRef} />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to='/register'>Register</Link>
            </button>
            {
                error && (<div className="error">{errorMsg}</div>)
            }
        </div>
    )
}

export default Login