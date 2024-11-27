import getModal from '../utils/getModal';

const renderModal = (data, e) => {
  // console.log('dataItems', data);
  // const modalContainer = document.createElement('div');
  const { title } = e.target.parentNode;
  const { description } = data;
  // console.log('ee', e.target.previousSibling.classList);
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-body');
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  const modal = document.querySelector('.modal');
  // console.log('modal', modal)
  // console.log('outerHTML', modal.outerHTML)
  e.target.previousSibling.classList.replace('fw-bold', 'fw-normal');
  getModal(modal);
};
export default renderModal;
