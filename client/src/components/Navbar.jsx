
import { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Importar Link

function Navbar({ cartItemCount }) {
  const [isNavActive, setIsNavActive] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">
        {/* 2. El logo ahora es un Link a la página de inicio */}
        <Link to="/" className="header-logo">
          <img src="/images/logo.svg" alt="Logo Hermanos Jota" /> 
          <span>Hermanos Jota</span>
        </Link>

        <button 
          className="menu-toggle" 
          id="menu-toggle" 
          aria-label="Abrir menú"
          onClick={() => setIsNavActive(!isNavActive)}
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
        </button>

        <nav className={`main-nav ${isNavActive ? 'is-active' : ''}`} id="main-nav">
          <ul>
            {/* 3. Reemplazamos <a> por <Link> y 'href' por 'to' */}
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
        
        <div className="header-cart">
          <a href="#">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" strokeWidth="2" d="M12.5 21a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM5.5 21a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM3 3h2.25l2.452 12.26a1 1 0 0 0 .976.74h9.844a1 1 0 0 0 .976-.74L21 6H5.25"></path></svg>
            <span className="cart-counter" id="cart-counter">{cartItemCount}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;