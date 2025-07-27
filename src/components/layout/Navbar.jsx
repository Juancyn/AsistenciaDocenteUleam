import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import adminPerfil from '../../assets/imagenes/admin_perfil.png';
import docentePerfil from '../../assets/imagenes/docente_perfil.png';
import logoUleam from '../../assets/imagenes/logo_uleam.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="navbar-header">
      <style jsx>{`
        .navbar-header {
          background-color: rgb(60, 60, 60);
          color: white;
          padding: 10px 20px;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo {
          height: 70px;
          width: auto;
          max-width: 250px;
        }

        .profile-section,
        .no-session-text {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
        }

        .user-role {
          font-weight: bold;
          font-size: 0.9rem;
          padding-left: 30px;
          margin-right: -15px;
        }

        .profile-dropdown {
          position: relative;
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .profile-trigger:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .profile-trigger img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 50%;
        }

        .user-name {
          font-size: 0.9rem;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          background-color: white;
          min-width: 160px;
          box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
          z-index: 1;
          border-radius: 4px;
          overflow: hidden;
          display: ${dropdownVisible ? 'block' : 'none'};
        }

        .dropdown-item {
          color: #333;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          transition: background-color 0.3s;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background-color: #f1f1f1;
          color: #d9534f;
        }

        .no-session-text span {
          font-weight: 500;
          font-size: 1rem;
        }

        @media (max-width: 576px) {
          .user-role {
            display: none;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo-container">
          <img src={logoUleam} alt="Logo ULEAM" className="logo" />
        </div>

        {user ? (
          <div className="profile-section">
            <span className="user-role">
              <strong>{user.role === 'admin' ? 'Administrador' : 'Docente'}</strong>
            </span>
            <div className="profile-dropdown">
              <div className="profile-trigger" onClick={toggleDropdown}>
                <img
                  src={user.role === 'admin' ? adminPerfil : docentePerfil}
                  alt="Perfil"
                />
                <span className="user-name">{user.name}</span>
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleLogout}>
                  Cerrar sesión
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-session-text">
            <h1>ULEAM - Asistencia Docente</h1>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
