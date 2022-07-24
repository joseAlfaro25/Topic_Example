
import { useState } from 'react'

const useModal = () => {
 const [modalIsOpen, setIsOpen] = useState(false);

  function openModal():void {
    setIsOpen(true);
  }

  function closeModal():void {
    setIsOpen(false);
  }
  return {
    openModal,
    closeModal,
    modalIsOpen
  }
}

export default useModal