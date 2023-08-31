import React from "react";

import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import PopupEditProfile from "./PopupEditProfile";
import PopupAddCard from "./PopupAddCard";
import PopupEditAvatar from "./PopupEditAvatar";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; 
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {

//состояние попапов
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
//данные пользователя
const [currentUser, setCurrentUser] = React.useState({});
//данные карточек
const [cardsData, setCardsData] = React.useState([]);
//попап с картинкой
const [selectedCard, setSelectedCard] = React.useState({});

const [isLoggedIn, setIsLoggedIn] = React.useState(false);
const [email, setEmail] = React.useState("");


const [isStatus, setIsStatus] = React.useState(false);

const navigate = useNavigate();

React.useEffect(() => {
if (isLoggedIn) {  api.getInfoServer()
  .then((res) => {
    setCurrentUser(res);
    console.log(res);
    
  })
  .catch(console.error);

  api.getInitialCards()
    .then((res) => {
      setCardsData(res);
    })
    .catch(console.error);}
}, [isLoggedIn]);

//закрытие-открытие попапов
function closeAllPopups() {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddCardPopupOpen(false);
  setIsInfoPopupOpen(false);
  setSelectedCard({});
}

function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
}

function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
}

function handleAddCardClick() {
  setIsAddCardPopupOpen(true);
}

function handleCardClick(selectedCard) {
  setSelectedCard(selectedCard);
}

function handleInfoPopupClick() {
  setIsInfoPopupOpen(true);
}

function handleChangeInfoPopupStatus(status) {
  setIsStatus(status)
}

function handleCardLike(card) {
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  
  // Отправляем запрос в API и получаем обновлённые данные карточки
  api.toggleLike(card._id, isLiked).then((newCard) => {
    setCardsData((res) => res.map((c) => c._id === card._id ? newCard : c));
  })
  .catch(console.error);
}

function handleCardDelete(card) {

  api.deleteCardServer(card._id).then(() => {
    setCardsData((state) => state.filter((item) => item._id !== card._id)); //отфильтровываем, убирая выбранную карточку из массива
  })
  .catch(console.error);
}

function handleUpdateUser(userData) {
  api.patchInfoServer(userData)
  .then((res) => {
    setCurrentUser(res)
    closeAllPopups();
  })
  .catch(console.error);
}

function handleUpdateAvatar(avatarData) {
  api.patchAvatarServer(avatarData)
  .then((res) => {
    setCurrentUser(res)
    closeAllPopups();
  })
  .catch(console.error);
}

function handleUpdateCard(cardData) {
  api.postCardServer(cardData)
  .then((res) => {
    setCardsData([res, ...cardsData])
    closeAllPopups();
  })
  .catch(console.error);
}

const handleLogin = () => {
  setIsLoggedIn(true);
}

React.useEffect(() => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    auth.getContent(token)
      .then((res) => {
        setEmail(res.data.email);
        setIsLoggedIn(true);
        navigate("/", {replace: true});
      })
      .catch(console.error);
  }
}, [navigate]);

const handleLogout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
          <Route path="/" element={
            <ProtectedRoute isLoggiedIn={isLoggedIn}>
              < Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                cards={cardsData}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onLogout={handleLogout}
                email={email}
              />
              <Footer />
            </ProtectedRoute>
          }/>
          <Route
            path="/sign-up"
            element={<Register
              isStatus={handleChangeInfoPopupStatus}
              onPopup={handleInfoPopupClick}
            />}
          />
          <Route
            path="/sign-in"
            element={
              <Login
              loggiedIn={handleLogin}/>
          }/>
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
          }/>
        </Routes>
      < PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      < PopupAddCard
        isOpen={isAddCardPopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleUpdateCard}
      />
      < PopupEditAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        isStatus={isStatus}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
