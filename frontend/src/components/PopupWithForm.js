function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  onClose,
  onSubmit,
  isOpen
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? " popup_opened" : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button popup__close-button_edit" type="button" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} noValidate="" onSubmit={onSubmit}>
          {children}
          <input
          className="popup__submit-button popup__submit-button_edit-profile"
          type="submit"
          value={buttonText}
        />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;