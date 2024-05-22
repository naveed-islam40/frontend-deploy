import React from "react";
import Modal from "react-modal";
import GenericModal from "../Base/GenericModal";

const AddEmployeeModal = ({
  modalIsOpen,
  closeModal,
  newEmployee,
  setNewEmployee,
  handleSubmit,
  customStyles,
}) => {
  return (
    <GenericModal isOpen={modalIsOpen} closeModal={closeModal}>
      <h2 className="text-xl font-bold text-slate-900 mb-1">
        Ajouter un(e) employé(e)
      </h2>
      <h2 className="text-md font-regular text-slate-600">
        Ajoutez un nouvel employé à votre compte.
      </h2>
      <form onSubmit={handleSubmit} className="form-control w-full mt-4 ">
        <div className="label ">
          <span className="label-text">Prénom</span>
        </div>
        <input
          type="text"
          value={newEmployee.firstName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, firstName: e.target.value })
          }
          placeholder="Bernard"
          className="input input-bordered w-full"
          required
        />
        <div className="label mt-2">
          <span className="label-text">Nom</span>
        </div>
        <input
          type="text"
          value={newEmployee.lastName}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, lastName: e.target.value })
          }
          placeholder="Tapie"
          className="input input-bordered w-full"
          required
        />
        <div className="label mt-2">
          <span className="label-text">Adresse e-mail</span>
        </div>
        <input
          type="email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
          placeholder="bernard@tapie.com"
          className="input input-bordered w-full "
          required
        />
          <div className="label ">
          <span className="label-text">Poste</span>
        </div>
        <input
          type="text"
          value={newEmployee.position}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, position: e.target.value })
          }
          placeholder="Directeur général"
          className="input input-bordered w-full "
          required
        />
                <div className="label ">
          <span className="label-text">Département</span>
        </div>
        <input
          type="text"
          value={newEmployee.department}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, department: e.target.value })
          }
          placeholder="Administration"
          className="input input-bordered w-full "
          required
        />
        <button type="submit" className="btn btn-primary mt-8 mb-1 text-md">
          Ajouter
        </button>
      </form>
    </GenericModal>
  );
};

export default AddEmployeeModal;
