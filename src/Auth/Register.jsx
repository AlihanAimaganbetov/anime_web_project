import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../redux/authActions';
import {Link} from "react-router-dom";

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(userData));
    };

    return (
        <div>
            <Link to="/">
                <div className='back'>
                    <button>Back</button>
                </div>
            </Link>
            <h2>Register</h2>
            {authState.error && <p>{authState.error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
