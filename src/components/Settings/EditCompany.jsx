import React, { useState } from "react";
import Modal from "react-modal";
import GenericModal from "../Base/GenericModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileBase from 'react-file-base64'

const EditCompanyModal = ({
  modalIsOpen,
  closeModal,
  company,
}) => {


  const [formData, setFormData] = useState(company)
  const [image, setImage] = useState("")
  // const [formData, setFormData] = useState({
  //   name: "",
  //   siret: "",
  //   registrationNumber: "",
  //   address: {
  //     street: "",
  //     city: "",
  //     state: "",
  //     postalCode: "",
  //     country: "",
  //   },
  //   companySize: "",
  //   firstName: "",
  //   lastName: "",
  //   jobTitle: "",
  //   phone: "",
  //   knownUs: "",
  // });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const companyId = localStorage.getItem("companyId")
  const handleupdateCompany = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v2/update/company/${companyId}`,
        {
          name: formData.name,
          city: formData.address.city,
          country: formData.address.country,
          postalCode: formData.address.postalCode,
          state: formData.address.state,
          street: formData.address.street,
        }
      );
      console.log(response);
      if (response) {
        navigate("/settings");
        toast.success("Company Update Successfully");
      }
    } catch (error) {
      toast.error("Something Wrong")
    }
  };

  return (
    <GenericModal isOpen={modalIsOpen} closeModal={closeModal}>
      <div className="p-6 px-8">
        <h3 className="text-lg font-semibold text-slate-900">Mon entreprise</h3>
        <p className="text-slate-500">Les informations de votre entreprise</p>
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
                Change logo
              </button>
              <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p> */}
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setImage(base64)}
              />
            </div>
          </div>

          {/* Input fields */}
          <div className="mt-4">
            <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Your Company Name"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="siret" className="block text-sm font-medium leading-6 text-gray-900">
              SIRET:
            </label>
            <input
              type="text"
              id="siret"
              name="siret"
              value={formData.siret}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Your SIRET number"
              disabled
            />
          </div>
          <div className="mt-3">
            <label htmlFor="registrationNumber" className="block text-sm font-medium leading-6 text-gray-900">
              Registration Number:
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Your Registration Number"
              disabled
            />
          </div>
          <div className="mt-3">
            <label htmlFor="address.street" className="block text-sm font-medium leading-6 text-gray-900">
              Street:
            </label>
            <input
              type="text"
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Your Street"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="address.city" className="block text-sm font-medium leading-6 text-gray-900">
              City:
            </label>
            <input
              type="text"
              id="address.city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Your City"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="address.state" className="block text-sm font-medium leading-6 text-gray-900">
              State:
            </label>
            <input
              type="text"
              id="address.state"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Your State"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="address.postalCode" className="block text-sm font-medium leading-6 text-gray-900">
              Postal Code:
            </label>
            <input
              type="text"
              id="address.postalCode"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Your Postal Code"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="address.country" className="block text-sm font-medium leading-6 text-gray-900">
              Country:
            </label>
            <input
              type="text"
              id="address.country"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Your Country"
            />
          </div>
          {/* Add other input fields similarly */}
          <button
            type="button"
            className="rounded-md mt-6 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleupdateCompany}
          >
            Save changes
          </button>
        </div>
      </div>
    </GenericModal>
  );
};

export default EditCompanyModal;
