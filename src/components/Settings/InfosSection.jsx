import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileBase from 'react-file-base64'

function InfosSection() {
    const navigate = useNavigate();
    const [image, setImage] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        siret: "",
        address: "",
        city: "",
        postalCode: "",
        numOfEmployees: "",
        image: ""
    });

    const companyId = localStorage.getItem("companyId");
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useState(() => {
        const createCompany = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/v2/company/${companyId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setFormData(response.data.company);
            } catch (error) {
                console.error("Failed to complete onboarding:", error);
                console.log(error.response || error);
            }
        };
        createCompany();
    }, []);

    const updateCompanyDetails = async () => {
        const response = await axios.patch(
            `${process.env.REACT_APP_BACKEND_URL}/api/v2/update/company/${companyId}`,
            { ...formData, image }
        );
        console.log(response);
        if (response) {
            toast.success("company details update successfully");
        }
    };

    return (
        <div className="p-6 px-8">
            <h3 className="text-lg font-semibold text-slate-900">
                Mon entreprise
            </h3>
            <p className="text-slate-500">Les informations de votre entreprise</p>
            <div className="w-3/6">

                <div className="col-span-full flex items-center gap-x-8 mt-6">

                    {/* <img
                        src={image}
                        alt=""
                        className="h-20 w-20 flex-none rounded-full bg-gray-800 object-cover"
                    /> */}
                    {/* <div>
                        <button
                            type="button"
                            className="rounded-md bg-slate-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Change logo
                        </button>
                        <p className="mt-2 text-xs leading-5 text-gray-400">
                            JPG, GIF or PNG. 1MB max.
                        </p>
                    </div> */}
                    <div className="mt-0 mb-2">
                        <label
                            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                        >
                            Logo de l'entreprise
                        </label>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setImage(base64)}
                        />
                    </div>
                </div>

                {/* Input fields */}
                <div className="mt-4">
                    <label
                        htmlFor="companyName"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1.5"
                    >
                        Nom de l'entreprise
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input w-full "
                        placeholder="Your Company Name"
                    />
                </div>
                <div className="mt-3">
                    <label
                        htmlFor="siret"
                        className="block text-sm font-medium leading-6 text-gray-900 mb-1.5"
                    >
                        SIRET
                    </label>
                    <input
                        type="text"
                        id="siret"
                        name="siret"
                        value={formData.siret}
                        onChange={handleChange}
                        className="input  w-full "
                        placeholder="Your SIRET number"
                        disabled
                    />
                </div>

                <div className="mt-3">
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Addresse
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input  w-full "
                        placeholder="Your Postal Code"
                    />
                </div>

                <div className="mt-3">
    <label
        htmlFor="postalCode"
        className="block text-sm font-medium leading-6 text-gray-900 mb-1.5"
    >
        Code postal
    </label>
    <input
        type="text"
        id="postalCode"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        className="input w-full "
        placeholder="Your Postal Code"
    />
                </div>

                <div className="mt-3">
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Ville
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="input  w-full "
                        placeholder="Your City"
                    />
                </div>

                

                <button
                    type="button"
                    className="btn bg-bsrate hover:bg-black text-white mt-4 mb-1 "
                    onClick={updateCompanyDetails}
                >
                    Mettre à jour
                </button>
            </div>
        </div>
    );
}

export default InfosSection;