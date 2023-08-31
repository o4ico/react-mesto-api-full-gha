import React from 'react';
import headerLogo from '../images/logo.svg'; // Путь к изображению внутри сборки

function Logo() {
  return (
    <img
      className="header__logo"
      src={headerLogo}
      alt="логотип Место"
    />
  );
}

export default Logo;