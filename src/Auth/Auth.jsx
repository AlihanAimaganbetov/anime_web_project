import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authActions';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(credentials));
    };

    return (
        <div>
            <h2>Login</h2>
            {authState.error && <p>{authState.error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
