import * as bootstrap from 'bootstrap';

const getModal = (modal) => {
  // console.log('getModal', modal);
  // console.log('modalText', modal.textContent)
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
};

export default getModal;
