// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5080/api/v1/';

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', {
            email,
            password
        });
        if (response.data.token) {
            // Store the entire user object including firstName and lastName
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data.user;
    } catch (error) {
        console.error('Login failed:', error.response.data);
        throw error;
    }
};

const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const updateUser = async (userData) => {
    try {
        const response = await axios.put(API_URL + 'update', userData);
        if (response.data.success) {
            // Update local storage if necessary or handle updated user data
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Update failed:', error.response.data);
        throw error;
    }
};

export { loginUser, getUserInfo, updateUser };
