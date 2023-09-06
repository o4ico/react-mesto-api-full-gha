import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/Auth";
import Footer from "./Footer";
import Logo from "./Logo";

function Login({
  loggedIn
}) {
  const navigate = useNavigate();

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {// проверка, есть ли у данных token
          localStorage.setItem('jwt', data.token);
        }
        setFormValue({ email: '', password: '' });// сброс формы
        navigate('/', { replace: true });
        loggedIn();// стейт loggedIn родительского App как true, стейт отвечающий за статус входа, а также за попап информации о регистрации(сообщение об успехе или нет)
        //console.log(`какой токен? ${data.token}`);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <header className="header">
        < Logo />
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </header>
      <main className="main">
        <section className="login">
          <h2 className="login__title">Вход</h2>
          <form className="login__form" onSubmit={handleSubmit} noValidate="">
            <input
              className="login__input"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={handleChange}
              value={formValue.email}
              required
            />
            <input
              className="login__input"
              type="password"
              placeholder="Пароль"
              name="password"
              id="password"
              onChange={handleChange}
              value={formValue.password}
              required
            />
            <input
              className="login__submit-button"
              type="submit"
              value="Войти"
            />
          </form>
        </section>
      </main>
      < Footer />
    </>
  );
}

export default Login;