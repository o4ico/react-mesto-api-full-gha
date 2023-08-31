import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupEditAvatar({
  isOpen,
  onClose,
  onUpdateAvatar,
}) {

  const avatarRef = React.useRef();

  function handleFormSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,/* Значение инпута, полученное с помощью рефа */
    })
  }

  return (
    <PopupWithForm
    name="avatar"
    title="Обновить аватар"
    buttonText="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleFormSubmit}>
      <input
        className="popup__input popup__input_form_avatar-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        id="avatar-link"
        required
        ref={avatarRef}
      />
      <span className="popup__text-error avatar-link-text-error" />
    </PopupWithForm>
  );
}

export default PopupEditAvatar;