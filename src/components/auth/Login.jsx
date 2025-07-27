// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    
    if (!emailValido.test(correo)) {
      setMensaje('El correo electrónico no es válido.');
      setError(true);
      return;
    }

    if (password.length < 4) {
      setMensaje('La contraseña debe tener al menos 4 caracteres.');
      setError(true);
      return;
    }

    const result = login(correo, password);
    if (result.success) {
      setMensaje(`¡Inicio de sesión exitoso como ${result.role}! Redirigiendo...`);
      setError(false);
      
      setTimeout(() => {
        navigate(result.role === 'admin' 
          ? '/admin/dashboard' 
          : '/docente/dashboard');
      }, 2000);
    } else {
      setMensaje('Correo o contraseña incorrectos.');
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: Arial, sans-serif;
          font-size: 1.1rem; /* Tamaño base más grande */
        }
        
        .login-main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          width: 100%;
        }
        
        .formulario-login {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 500px; /* Ancho máximo para evitar que sea demasiado ancho */
        }
        
        .formulario-login h2 {
          text-align: center;
          margin-bottom: 30px;
          font-size: 1.8rem; /* Título más grande */
        }
        
        .formulario-login label {
          display: block;
          margin-top: 20px; /* Más espacio entre campos */
          font-size: 1.1rem;
        }
        
        .formulario-login input {
          width: 100%;
          padding: 14px !important; /* Padding más grande */
          margin-top: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 1.1rem; /* Texto más grande en inputs */
        }
        
        .formulario-login button {
          margin-top: 25px; /* Más espacio arriba del botón */
          width: 100%;
          padding: 14px !important; /* Botón más alto */
          background-color: #a00;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1.2rem; /* Texto más grande en botón */
          font-weight: bold;
        }
        
        .formulario-login button:hover {
          background-color: #800;
        }
        
        .acciones-extra {
          text-align: center;
          margin-top: 20px; /* Más espacio */
        }
        
        .acciones-extra a {
          display: block;
          margin: 10px 0; /* Más espacio entre enlaces */
          text-decoration: none;
          color: #a00;
          font-size: 1.1rem; /* Texto más grande */
        }
        
        .sesion-microsoft {
          margin-top: 30px; /* Más espacio */
          text-align: center;
        }
        
        .sesion-microsoft p {
          font-size: 1.1rem; /* Texto más grande */
          margin-bottom: 10px;
        }
        
        .btn-microsoft {
          background-color: #007844;
          color: white;
          border: none;
          padding: 14px !important; /* Botón más alto */
          width: 100%;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1.1rem; /* Texto más grande */
        }
        
        .mensaje {
          margin-top: 20px; /* Más espacio */
          text-align: center;
          font-weight: bold;
          padding: 15px; /* Más padding */
          border-radius: 4px;
          font-size: 1.1rem; /* Texto más grande */
        }
        
        .error {
          color: red;
          background-color: #ffd2d2;
        }
        
        .success {
          color: green;
          background-color: #d2ffd2;
        }

        /* Aumentar tamaño del logo en el navbar */
        .navbar .logo {
          height: 80px !important;
          width: auto !important;
          max-width: 300px;
        }
      `}</style>
      
      <Navbar />
      
      <main className="login-main">
        <section className="formulario-login">
          <h2>Iniciar Sesión</h2>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="correo">Correo Institucional:</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit">Iniciar Sesión</button>
            
            <div className="acciones-extra">
              <a href="/recuperar-clave">¿Olvidó la contraseña?</a>
            </div>
            
            <div className="sesion-microsoft">
              <p>Iniciar sesión mediante su cuenta de:</p>
              <button
                type="button"
                className="btn-microsoft"
              >
                Microsoft 365
              </button>
            </div>
          </form>
          
          {mensaje && (
            <div className={`mensaje ${error ? 'error' : 'success'}`}>
              {mensaje}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;