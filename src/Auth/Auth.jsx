import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, LOGOUT } from '../redux/authActions';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(credentials)); // Дождитесь завершения login экшена
            toast.success('Successfully logged in!');
            navigate('/'); // Redirect to home or another page
        } catch (error) {
            toast.error(error.message || 'Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div>
            <Link to="/">
                <div className='back'>
                    <button>Back</button>
                </div>
            </Link>
            <h2>Login</h2>
            {authState.error && <p>{authState.error.message || authState.error}</p>}
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
export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    dispatch({ type: LOGOUT });
};
