// ImportEmployeesModal.jsx

import React, { useState, useEffect } from 'react';
import GenericModal from '../Base/GenericModal';
import axios from 'axios';

const ImportEmployeesModal = ({ modalIsOpen, closeModal, companyId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    console.log('companyId:', companyId); // Log companyId to ensure it is passed correctly
  }, [companyId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      return alert('Please select a file');
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v2/companies/${companyId}/employees/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <GenericModal isOpen={modalIsOpen} closeModal={closeModal}>
      <h2 className='text-xl font-bold text-slate-900 mb-1'>Importer des employés</h2>
      <h2 className='text-md font-regular text-slate-600'>Ajoutez un nouvel employé à votre compte.</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className='file-input file-input-bordered w-full max-w-xs my-6'
        />
        <div className='px-6 mb-6 flex w-full absolute bottom-0 left-0 right-0'>
          <button type="submit" className='btn w-full ml-0 bottom-0 left-0 right-0'>Upload</button>
        </div>
      </form>
    </GenericModal>
  );
};

export default ImportEmployeesModal;
