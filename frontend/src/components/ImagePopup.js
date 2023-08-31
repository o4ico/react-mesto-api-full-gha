import React from "react";

function ImagePopup({
  onClose,
  card
}) {

  return (
    <div className={`popup popup_image ${card.name ? " popup_opened" : ''}`}>
    <div className="popup__container popup__container_image">
      <button
        className="popup__close-button popup__close-button_image"
        type="button"
        onClick={onClose}
      />
      <img className="popup__image" src={card.link} alt={card.name} />
      <span className="popup__image-title">{card.name}</span>
    </div>
  </div>
  );
}

export default ImagePopup;
