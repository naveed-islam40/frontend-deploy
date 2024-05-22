// components/GenericModal.js
import React from 'react';

const GenericModal = ({ isOpen, title, children, closeModal }) => {
  if (!isOpen) return null;  // Ensure nothing is rendered when modal is not open

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 min-h-44 " onClick={closeModal}></div>
      <dialog className="modal smooth-open min-h-44 " open={isOpen}>
        <div className="modal-box relative z-50 min-h-96">
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h2 className="font-bold text-lg">{title}</h2>
          <div className="p-0">
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default GenericModal;
