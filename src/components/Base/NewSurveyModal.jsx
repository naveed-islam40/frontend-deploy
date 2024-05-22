// components/GenericModal.js
import React from 'react';

const NewSurveyModal = ({ isOpen, title, children, closeModal }) => {
  if (!isOpen) return null;  // Ensure nothing is rendered when modal is not open

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 min-h-44  " onClick={closeModal}></div>
      <dialog className="modal smooth-open min-h-44 " open={isOpen}>
        <div className="bg-white relative z-50 min-h-96 w-3/6 h-5/6  max-w-2/3  rounded-2xl shadow-lg">
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>✕</button>
          {/* <h2 className="font-bold text-lg">{title}</h2> */}
          <div className=' h-screen'>
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NewSurveyModal;
