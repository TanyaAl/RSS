import getModal from '../utils/getModal.js';

const renderModal = (data, e) => {
  const { title } = e.target.parentNode;
  const { description } = data;
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-body');
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  const modal = document.querySelector('.modal');
  e.target.previousSibling.classList.replace('fw-bold', 'fw-normal');
  getModal(modal);
};
export default renderModal;
