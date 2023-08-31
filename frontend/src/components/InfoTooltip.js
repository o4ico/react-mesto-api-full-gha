import React from "react";
import success from '../images/Success.svg';
import fail from '../images/Fail.svg';

function InfoTooltip({
  isOpen,
  onClose,
  isStatus
}) {

  return (
    <div className={`popup popup_info ${isOpen ? " popup_opened" : ''}`}>
    <div className="popup__container popup__container_info">
      <button
        className="popup__close-button"
        type="button"
        onClick={onClose}
      />
      {isStatus ? <>
      <img className="popup__icon" src={success} alt="Галочка" />
      <h3 className="popup__status">Вы успешно зарегистрировались!</h3>
      </> : <>
      <img className="popup__icon" src={fail} alt="Крестик" />
      <h3 className="popup__status">Что-то пошло не так! Попробуйте ещё раз.</h3>
      </>}
    </div>
  </div>
  );
}

export default InfoTooltip;