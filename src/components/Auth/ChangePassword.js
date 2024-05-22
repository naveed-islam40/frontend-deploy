// src/ChangePassword.js

import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async (event) => {
        event.preventDefault();
        setLoading(true);

        // const { error } = await supabase.auth.updateUser({
        //   password: password
        // });

        // if (error) {
        //   alert(error.error_description || error.message);
        // } else {
        //   alert('Your password has been updated!');
        // }
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v2/admin/reset-new-password/${token}`, { newPassword })
            if (response) {
                toast.success("Password Reset Successfully")
            }
            navigate("/signin")

        } catch (error) {
            console.log(error)
        }

        setLoading(false);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="col-6 form-widget bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Change Password</h1>
                <p className="text-gray-600 mb-4">Enter your new password</p>
                <form onSubmit={handleChangePassword}>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Your new password"
                            value={newPassword}
                            required
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none hover:bg-indigo-600"
                        >
                            {loading ? 'Loading...' : 'Update password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ChangePassword;
