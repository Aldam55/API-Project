import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReviewFormPage from '../AddReviewFormPage';

function AddReviewFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='reviews-button' onClick={() => setShowModal(true)}>Add a Review</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReviewFormPage />
        </Modal>
      )}
    </>
  );
}

export default AddReviewFormModal;
