import React from "react";
import Modal from "react-modal";
import GenericModal from "../Base/GenericModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmployeeModal = ({
  modalIsOpen,
  closeModal,
  employee,
  setEmployee,
  handleSubmit,

}) => {
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(employee._id);
  const handleupdateEmployee = async () => {
    try {
      const response = await axios.patch(
  `${process.env.REACT_APP_BACKEND_URL}/api/v2/update-employee/${employee._id}`,
  {
    firstName: employee.firstName,
    lastName: employee.lastName,
    department: employee.department,
    position: employee.position,
    email: employee.email,
    dob: employee.dob,
    gender: employee.gender
  }
);
      console.log(response);
      if (response) {
        // navigate("/employees");
        window.location.reload()
        toast.success("Employee Update Successfully");
      }
    } catch (error) {
      toast.error("Something Wrong")
    }
  };

  return (
    <GenericModal isOpen={modalIsOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold text-slate-900 mb-1">
        Modifier un(e) employé(e)
      </h2>
      <h2 className="text-md font-regular text-slate-600">
        Veuillez remplir les informations de l'employé(e).
      </h2>
      <form onSubmit={(e) => handleSubmit(e, employee)}>

        <div className="flex flex-row gap-4">
<div className="w-1/2">
        <div className="label mt-2">
          <span className="label-text">Prénom</span>
        </div>
        <input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          placeholder="Prénom"
          className="input input-bordered w-full"
          required
            />
            </div>
          <div className="w-1/2">
        <div className="label mt-2 ">
          <span className="label-text">Nom</span>
        </div>
        <input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Nom"
          required
            />
            </div>
</div>

        <div className="label mt-2">
          <span className="label-text">Email</span>
        </div>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />
        <div className="label mt-2">
          <span className="label-text">Department</span>
        </div>
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Départment"
          className="input input-bordered w-full"
          required
        />
        <div className="label mt-2">
          <span className="label-text">Position</span>
        </div>
        <input
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
          placeholder="Poste"
          className="input input-bordered w-full"
          required
        />

        <div className="flex flex-row gap-4">
          <div className="w-1/2">
      
        <div className="label mt-2">
  <span className="label-text">Date de naissance</span>
</div>
<input
  type="date"
  name="dob"
  value={employee.dob ? employee.dob.substring(0,10) : ""}
  onChange={handleChange}
  className="input input-bordered w-full"
            />
          </div>
          <div className="w-1/2">

<div className="label mt-2">
  <span className="label-text">Sexe</span>
</div>
<select
  name="gender"
  value={employee.gender || ""}
  onChange={handleChange}
  className="input input-bordered w-full"
>
  <option value="">Sélectionner...</option>
  <option value="Male">Homme</option>
  <option value="Female">Femme</option>
            </select>
            </div>
          
          </div>
        <button
          type="submit"
          className="btn btn-primary mt-8 mb-1 text-md"
          onClick={handleupdateEmployee}
        >
          Confirmer
        </button>
      </form>
    </GenericModal>
  );
};

export default EditEmployeeModal;
