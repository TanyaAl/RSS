import getModal from "../utils/getModal";

const renderModal = (data, e) => {
    // console.log('dataItems', data);
    // const modalContainer = document.createElement('div');
    let title = e.target.parentNode.title;
    let description = data.description;
    // console.log('ee', e.target.previousSibling.classList);
    let modalTitle = document.querySelector('.modal-title');
    let modalDescription = document.querySelector('.modal-body');
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    const modal = document.querySelector('.modal');
    // console.log('modal', modal)
    // console.log('outerHTML', modal.outerHTML)
    e.target.previousSibling.classList.replace('fw-bold', 'fw-normal');
    getModal(modal); 
  };
export default renderModal;