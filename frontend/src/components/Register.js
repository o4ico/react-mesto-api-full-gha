import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/Auth";
import Footer from "./Footer";
import Logo from "./Logo";

function Register({
  isStatus,
  onPopup
}) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  //обработчик регистрации
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    auth.register(email, password).then((res) => {
      isStatus(true);
      onPopup();
      setFormValue({email: '', password: ''});
    })
    .then((res) => {
      navigate('/login', {replace: true});
    })
    .catch((res) => {
      isStatus(false);
    })
    .finally((res) => {
      onPopup();
    })
  }

  return (
    <>
      <header className="header">
        < Logo />
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </header>
      <main className="main">
        <section className="register">
          <h2 className="register__title">Регистрация</h2>
          <form className="register__form" onSubmit={handleSubmit} noValidate="">
            <input
              className="register__input"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={handleChange}
              value={formValue.email}
              required
            />
            <input
              className="register__input"
              type="password"
              placeholder="Пароль"
              name="password"
              id="password"
              onChange={handleChange}
              value={formValue.password}
              required
            />
            <input
              className="register__submit-button"
              type="submit"
              value="Зарегистрироваться"
            />
          </form>
          <h3 className="register__text">Уже зарегистрированы? <Link className="register__link" to="/sign-in">
              Войти
            </Link></h3>
         </section>
      </main>
      < Footer/>
    </>       
  );
}

export default Register;