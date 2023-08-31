import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard({
  isOpen,
  onClose,
  onAddCard
}) {

  const [nameCard, setNameCard] = React.useState('');
  const [link, setLink] = React.useState('');



  function handleChangeName(e) {
    setNameCard(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddCard({
      name: nameCard,
      link: link,
    });
  }

  React.useEffect(() => {
    setNameCard('');
    setLink('');
  }, [isOpen]);


  return (
    <PopupWithForm
    name="add-card"
    title="Новое место"
    buttonText="Создать"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_form_place-name"
        type="text"
        placeholder="Название"
        name="name"
        id="place-name"
        required
        minLength={2}
        maxLength={30}
        onChange={handleChangeName}
        value={nameCard}
      />
      <span className="popup__text-error place-name-text-error" />
      <input
        className="popup__input popup__input_form_picture-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        id="picture-link"
        required
        onChange={handleChangeLink}
        value={link}
      />
      <span className="popup__text-error picture-link-text-error" />
    </PopupWithForm>
  );
}

export default PopupAddCard;