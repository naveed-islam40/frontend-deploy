import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, employee }) => {


    const navigate = useNavigate()

    const deleteEmployee = async () => {
       try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v2/delete-employee/${onConfirm}`)
        window.location.reload()
        if(response){
            // toast.success("Employee Delete Successfully")
        }
       } catch (error) {
        // toast.error("Some Error While Updating Employee Details")
       }
    }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Deletion"
      className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-0"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
        <h2 className="text-lg font-bold text-slate-900">Supprimer un employé</h2>
        <p className="mt-2 text-slate-600">
          Êtes-vous sûr de vouloir supprimer cet employé(e) <span className="font-semibold">{employee?.firstName} {employee?.lastName}</span>?
        </p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={deleteEmployee}
          >
            Supprimer
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;