import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithWarning({
  isOpen,
  onClose
}) {

  function handleFormSubmit() {

  }

  return (
    <PopupWithForm
    namePopup="warning"
    nameForm="warning"
    title="Вы уверены?"
    buttonText="Да"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleFormSubmit}/>
  );
}

export default PopupWithWarning;