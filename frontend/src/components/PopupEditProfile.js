import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile({
  isOpen,
  onClose,
  onUpdateUser
}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
    name="edit-profile"
    title="Редактировать профиль"
    buttonText="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_form_name"
        type="text"
        placeholder="Имя"
        name="name"
        id="name"
        required
        minLength={2}
        maxLength={40}
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__text-error name-text-error" />
      <input
        className="popup__input popup__input_form_about-me"
        type="text"
        placeholder="О себе"
        name="about"
        id="about-me"
        required
        minLength={2}
        maxLength={200}
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className="popup__text-error about-me-text-error" />
    </PopupWithForm>
  );
}

export default PopupEditProfile;