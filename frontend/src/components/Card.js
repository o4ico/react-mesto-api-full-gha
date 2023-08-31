import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      {isOwn && <button className="card__delite-button" type="button" onClick={handleCardDelete} />}
      <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="card__caption">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__like-container">
          <button className={`card__like-button ${isLiked ? " card__like-button_active" : ''}`} type="button" onClick={handleCardLike}/>
          <h3 className="card__likes">{card.likes.length}</h3>
        </div>
      </div>
    </article>
  );
}

export default Card;