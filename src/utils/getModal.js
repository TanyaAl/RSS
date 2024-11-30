import * as bootstrap from 'bootstrap';

const getModal = (modal) => {
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
};

export default getModal;
