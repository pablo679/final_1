// /client/src/components/Navbar.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importar useNavigate
import { useAuth } from '../context/AuthContext'; // 2. Importar el hook de autenticación
import { useCart } from '../context/CartContext.jsx';

function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);
  
  // 3. Obtener el estado y las funciones del contexto
  const { isAuthenticated, userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLinkClick = () => {
    setIsNavActive(false);
  };

  // 4. Crear la función de logout
  const handleLogout = () => {
    setIsNavActive(false); // Cierra el menú móvil
    logout(); // Llama a la función del contexto
    navigate('/login'); // Redirige al login
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={handleLinkClick}>
          <img src="/logo.svg" alt="Logo Hermanos Jota" /> 
          <span>Hermanos Jota</span>
        </Link>

        <button 
          className="menu-toggle" 
          aria-label="Abrir menú"
          onClick={() => setIsNavActive(!isNavActive)}
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
        </button>

        <nav className={`main-nav ${isNavActive ? 'is-active' : ''}`} id="main-nav">
          <ul>
            <li><Link to="/" onClick={handleLinkClick}>Inicio</Link></li>
            <li><Link to="/productos" onClick={handleLinkClick}>Productos</Link></li>
            <li><Link to="/contacto" onClick={handleLinkClick}>Contacto</Link></li>

            {/* --- INICIO DE UI CONDICIONAL ADMIN --- */}
            {isAuthenticated && userInfo.isAdmin && (
              <li><Link to="/admin/crear-producto" onClick={handleLinkClick} style={{color: 'var(--verde-salvia)'}}>Crear Producto</Link></li>
            )}
            {/* --- FIN DE UI CONDICIONAL ADMIN --- */}
            
            {/* --- 5. INICIO DE LA UI CONDICIONAL --- */}
            
            {isAuthenticated ? (
              // Si el usuario ESTÁ logueado
              <>
                <li>
                  <span className="navbar-username">Hola, {userInfo.name}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn-logout">Logout</button>
                </li>
              </>
            ) : (
              // Si el usuario NO está logueado
              <>
                <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
                <li><Link to="/registro" onClick={handleLinkClick}>Registro</Link></li>
              </>
            )}

            {/* --- FIN DE LA UI CONDICIONAL --- */}

          </ul>
        </nav>
        
        <div className="header-cart">
          <Link to="/cart" onClick={handleLinkClick}> 
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" strokeWidth="2" d="M12.5 21a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM5.5 21a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM3 3h2.25l2.452 12.26a1 1 0 0 0 .976.74h9.844a1 1 0 0 0 .976-.74L21 6H5.25"></path></svg>
            <span className="cart-counter" id="cart-counter">{totalItemsInCart}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;