import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const RecuperarClave = () => {
  const [correo, setCorreo] = useState('');
  const [amigoInfancia, setAmigoInfancia] = useState('');
  const [mascota, setMascota] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);
  const [paso, setPaso] = useState(1); // 1: Ingresar correo, 2: Preguntas de seguridad
  const navigate = useNavigate();
  const { getUserByEmail } = useAuth();

  const handleSubmitCorreo = (e) => {
    e.preventDefault();
    
    if (!correo) {
      setMensaje('Debe ingresar su correo institucional.');
      setError(true);
      return;
    }

    const usuario = getUserByEmail(correo);
    if (usuario) {
      setPaso(2);
      setMensaje('');
    } else {
      setMensaje('Correo no registrado.');
      setError(true);
    }
  };

  const handleSubmitPreguntas = (e) => {
    e.preventDefault();
    
    if (!amigoInfancia || !mascota) {
      setMensaje('Debe responder ambas preguntas.');
      setError(true);
      return;
    }

    const usuario = getUserByEmail(correo);
    if (usuario) {
      if (usuario.amigoInfancia.toLowerCase() === amigoInfancia.toLowerCase() && 
          usuario.mascota.toLowerCase() === mascota.toLowerCase()) {
        navigate('/cambiar-clave', { state: { correo } });
      } else {
        setMensaje('Respuestas incorrectas.');
        setError(true);
      }
    } else {
      setMensaje('Ocurrió un error. Intente nuevamente.');
      setError(true);
    }
  };

  return (
    <div className="recuperar-container">
      <style jsx>{`
        .recuperar-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: Arial, sans-serif;
        }
        
        .recuperar-main {
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
      
      <main className="recuperar-main">
        <section className="formulario-login">
          {paso === 1 ? (
            <>
              <h2>Solicitar cambio de Contraseña</h2>
              <form onSubmit={handleSubmitCorreo}>
                <label htmlFor="correo">Correo institucional:</label>
                <input
                  type="email"
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
                <button type="submit">Continuar</button>
              </form>
            </>
          ) : (
            <>
              <h2>Preguntas de seguridad</h2>
              <p>Por favor responde las siguientes preguntas:</p>
              <form onSubmit={handleSubmitPreguntas}>
                <label htmlFor="amigo">Nombre de tu mejor amigo de la infancia:</label>
                <input
                  type="text"
                  id="amigo"
                  value={amigoInfancia}
                  onChange={(e) => setAmigoInfancia(e.target.value)}
                  required
                />
                
                <label htmlFor="mascota">Nombre de tu primera mascota:</label>
                <input
                  type="text"
                  id="mascota"
                  value={mascota}
                  onChange={(e) => setMascota(e.target.value)}
                  required
                />
                
                <button type="submit">Verificar respuestas</button>
              </form>
            </>
          )}
          
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

export default RecuperarClave;