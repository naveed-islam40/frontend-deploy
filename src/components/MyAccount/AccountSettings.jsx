import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileBase from 'react-file-base64'

function AccountSettings() {
    const [responseData, setResponseData] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState("");
    const [adminCompanies, setAdminCompanies] = useState([]);

    const id = localStorage.getItem("userId");
    console.log("id", id)
    const naviagte = useNavigate()

    // fetching single user Data

    useEffect(() => {
        const getUserData = async () => {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/v2/admin/get/${id}`;
            const response = await axios.get(url);
            console.log("response account", response)
            setResponseData(response.data.admin);
        };
        getUserData();
    }, [id]);


    useEffect(() => {
        if (responseData) {
            setFirstName(responseData.firstName || "");
            setLastName(responseData.lastName || "");
            // setImage(responseData.image || "");
        }
    }, [responseData]);

    // getting profile picture

    // useEffect(() => {
    //   const getUserImage = async () => {
    //     const url = `http://localhost:4090/api/v2/image/${id}`;
    //     const response = await axios.get(url);
    //     setProfileImg(response.data.image);
    //   };
    //   getUserImage();
    // }, [id]);

    // updating single user data

    const updateUserDetails = async () => {
        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BACKEND_URL}/api/v2/admin/update/${id}`,
                {
                    // username: firstName,
                    firstName: firstName,
                    lastName: lastName,
                    image: image
                }
            );
            if (response) {
                toast.success("Admin Details Update Successfully")
                naviagte("/dashboard")
            }
        } catch (error) {
            console.error("Some Error in Fetching", error);
        }
    };

    // fetching Admin Companies
    // useEffect(() => {
    //   const fetchingCompanies = async () => {
    //     const response = await axios.get(
    //       `http://localhost:4090/api/v2/companies/${responseData._id}`
    //     );
    //     setAdminCompanies([response.data.companies]);
    //   };
    //   fetchingCompanies();
    // }, []);

    return (
        <div className="p-6 px-8">
            <h3 className="text-lg font-semibold text-bsrate">Mon compte</h3>
            <p className="text-slate-500">Vos informations personnelles</p>
            <div className="w-3/6">
                <div className="col-span-full flex items-center gap-x-8 mt-6">
                    {/* <img
                        src={image}
                        alt=""
                        className="h-20 w-20 flex-none rounded-full bg-gray-800 object-cover"
                    /> */}
                    <div>
                        {/* <button
                            type="button"
                            className="rounded-md bg-slate-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Change profile picture
                        </button>
                        <p className="mt-2 text-xs leading-5 text-gray-400">
                            JPG, GIF or PNG. 1MB max.
                        </p> */}
                        <FileBase
                            type="file"
                            multiple={false}
                            className="file-input w-full max-w-xs"
                            onDone={({ base64 }) => setImage(base64)}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                    >
                        Prénom
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="input w-full "
                            placeholder="Votre prénom"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </div>
                                        <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                    >
                        Nom
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="input w-full "
                            placeholder="Votre nom"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </div>
                </div>

                <div className="mt-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                    >
                        Email
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="py-3 px-5 rounded-lg w-full bg-white disabled "
                            placeholder="Votre adresse e-mail"
                            defaultValue={responseData?.email}
                            disabled
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="btn bg-bsrate hover:bg-black text-white mt-4 mb-1 "
                    onClick={updateUserDetails}
                >
                    Mettre à jour
                </button>
            </div>
        </div>
    );
}

export default AccountSettings;
