import axios from 'axios';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const register = (userData) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/api/register', userData);
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data });
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/login', credentials);
        const { accessToken } = response.data;

        // Save the token to localStorage
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('userData', JSON.stringify(response.data));
        dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
        return Promise.resolve(response.data); // Возвращаем успешный результат
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        return Promise.reject(error); // Возвращаем ошибку
    }
};


export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    dispatch({ type: LOGOUT });
};
