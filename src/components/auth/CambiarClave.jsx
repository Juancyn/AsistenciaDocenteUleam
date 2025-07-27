import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const CambiarClave = () => {
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { updatePassword } = useAuth();

  // Obtener el correo de la ruta anterior
  const correo = location.state?.correo;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nueva || !confirmar) {
      setMensaje('Todos los campos son obligatorios.');
      setError(true);
      return;
    }

    if (nueva.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      setError(true);
      return;
    }

    if (nueva !== confirmar) {
      setMensaje('Las contraseñas no coinciden.');
      setError(true);
      return;
    }

    // Actualizar la contraseña en el contexto
    if (correo) {
      const success = updatePassword(correo, nueva);
      if (success) {
        setMensaje('Contraseña actualizada correctamente. Redirigiendo al inicio...');
        setError(false);

        setTimeout(() => {
          navigate('/');
        }, 2500);
      } else {
        setMensaje('Error al actualizar la contraseña.');
        setError(true);
      }
    } else {
      setMensaje('No se pudo identificar el usuario. Intente nuevamente.');
      setError(true);
    }
  };

  return (
    <div className="cambiar-container">
      <style jsx>{`
        .cambiar-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: Arial, sans-serif;
        }
        
        .cambiar-main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
        }
        
        .formulario-login {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          width: 300px;
        }
        
        .formulario-login h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .formulario-login label {
          display: block;
          margin-top: 10px;
        }
        
        .formulario-login input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }
        
        .formulario-login button {
          margin-top: 15px;
          width: 100%;
          padding: 10px;
          background-color: #a00;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .formulario-login button:hover {
          background-color: #800;
        }
        
        .mensaje {
          margin-top: 15px;
          text-align: center;
          font-weight: bold;
          padding: 10px;
          border-radius: 4px;
        }
        
        .error {
          color: red;
          background-color: #ffd2d2;
        }
        
        .success {
          color: green;
          background-color: #d2ffd2;
        }
      `}</style>
      
      <Navbar />
      
      <main className="cambiar-main">
        <section className="formulario-login">
          <h2>Restablecer Contraseña</h2>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="nueva">Nueva contraseña:</label>
            <input
              type="password"
              id="nueva"
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
              required
            />
            
            <label htmlFor="confirmar">Confirmar contraseña:</label>
            <input
              type="password"
              id="confirmar"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
            
            <button type="submit">Guardar contraseña</button>
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

export default CambiarClave;