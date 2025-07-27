// src/components/docente/RegistrarAsistencia.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const RegistrarAsistencia = () => {
  const { user } = useAuth();
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);
  const [tipoRegistro, setTipoRegistro] = useState('entrada');
  const [registroActual, setRegistroActual] = useState(null);

  // Actualizar fecha y hora en tiempo real
  useEffect(() => {
    const actualizarFechaYHora = () => {
      const ahora = new Date();
      setFecha(ahora.toLocaleDateString());
      setHora(ahora.toLocaleTimeString());
    };

    actualizarFechaYHora();
    const intervalId = setInterval(actualizarFechaYHora, 1000);
    
    // Cargar registro actual si existe
    const registros = JSON.parse(localStorage.getItem('asistencias')) || [];
    const hoy = new Date().toISOString().split('T')[0];
    const registroHoy = registros.find(r => 
      r.docenteId === user?.id && 
      r.fecha === hoy
    );
    
    if (registroHoy) {
      setRegistroActual(registroHoy);
      setTipoRegistro(registroHoy.horaSalida ? 'entrada' : 'salida');
    } else {
      setRegistroActual(null);
      setTipoRegistro('entrada');
    }
    
    return () => clearInterval(intervalId);
  }, [user]);

  const handleRegistrarAsistencia = (e) => {
    e.preventDefault();
    
    if (!user) {
      setMensaje('Error: No estás autenticado');
      setError(true);
      return;
    }
    
    const ahora = new Date();
    const fechaISO = ahora.toISOString().split('T')[0];
    const horaActual = ahora.toTimeString().split(' ')[0];
    
    const nuevosRegistros = JSON.parse(localStorage.getItem('asistencias')) || [];
    
    if (tipoRegistro === 'entrada') {
      // Verificar si ya existe un registro hoy
      const existeRegistro = nuevosRegistros.some(r => 
        r.docenteId === user.id && 
        r.fecha === fechaISO
      );
      
      if (existeRegistro) {
        setMensaje('Ya registraste tu entrada hoy');
        setError(true);
        return;
      }
      
      // Crear nuevo registro de entrada
      const nuevoRegistro = {
        id: Date.now(),
        docenteId: user.id,
        docenteNombre: user.nombres,
        fecha: fechaISO,
        horaEntrada: horaActual,
        horaSalida: null,
        estado: 'Asistio',
        timestamp: ahora.getTime()
      };
      
      nuevosRegistros.push(nuevoRegistro);
      setRegistroActual(nuevoRegistro);
      setMensaje(`Entrada registrada a las ${horaActual}`);
      setTipoRegistro('salida');
    } 
    else if (tipoRegistro === 'salida') {
      // Buscar registro de entrada para hoy
      const registroIndex = nuevosRegistros.findIndex(r => 
        r.docenteId === user.id && 
        r.fecha === fechaISO &&
        r.horaSalida === null
      );
      
      if (registroIndex === -1) {
        setMensaje('Debes registrar entrada primero');
        setError(true);
        return;
      }
      
      // Actualizar registro con hora de salida
      nuevosRegistros[registroIndex].horaSalida = horaActual;
      setRegistroActual(nuevosRegistros[registroIndex]);
      setMensaje(`Salida registrada a las ${horaActual}`);
      setTipoRegistro('entrada');
    }
    
    localStorage.setItem('asistencias', JSON.stringify(nuevosRegistros));
    setError(false);
  };

  const handleReiniciarMarca = () => {
    if (!registroActual) {
      setMensaje('No hay marca para reiniciar');
      setError(true);
      return;
    }
    
    if (!window.confirm('¿Estás seguro que deseas reiniciar la marca de asistencia de hoy?')) {
      return;
    }
    
    const registros = JSON.parse(localStorage.getItem('asistencias')) || [];
    const hoy = new Date().toISOString().split('T')[0];
    
    // Filtrar para eliminar el registro de hoy
    const nuevosRegistros = registros.filter(r => 
      !(r.docenteId === user.id && r.fecha === hoy)
    );
    
    localStorage.setItem('asistencias', JSON.stringify(nuevosRegistros));
    
    setRegistroActual(null);
    setTipoRegistro('entrada');
    setMensaje('Marca reiniciada correctamente');
    setError(false);
  };

  return (
    <div className="justificar-container">
      <style jsx>{`
        .justificar-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f9fc;
          font-family: 'Segoe UI', sans-serif;
        }
        
        .justificar-main {
          flex: 1;
          padding: 30px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .formulario-login {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .formulario-login h2 {
          margin-bottom: 20px;
          color: #333;
          text-align: center;
        }
        
        .info-tiempo {
          display: flex;
          justify-content: space-around;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 25px;
          text-align: center;
        }
        
        .info-tiempo p {
          font-size: 18px;
          font-weight: 500;
          color: #444;
          margin: 0;
        }
        
        .info-tiempo strong {
          color: #222;
          font-weight: 600;
        }
        
        .estado-asistencia {
          background-color: #e8f4ff;
          border-left: 4px solid #17a2b8;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        
        .estado-asistencia p {
          margin: 5px 0;
          font-size: 16px;
        }
        
        button {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 18px;
          font-weight: 600;
          width: 100%;
          transition: background-color 0.3s;
        }
        
        button:hover {
          background-color: #218838;
        }
        
        .mensaje {
          margin-top: 15px;
          padding: 12px;
          border-radius: 4px;
          text-align: center;
          font-weight: bold;
        }
        
        .error {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
        }
        
        .success {
          color: #155724;
          background-color: #d4edda;
          border: 1px solid #c3e6cb;
        }
        
        .volver-dashboard {
          display: inline-block;
          margin-top: 25px;
          background-color: #6c757d;
          color: white;
          padding: 10px 18px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.3s;
        }
        
        .volver-dashboard:hover {
          background-color: #5a6268;
          text-decoration: none;
          color: white;
        }
        
        .btn-reiniciar {
          display: block;
          text-align: center;
          background-color: #ffc107;
          color: #333;
          padding: 10px 18px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.3s;
          margin-top: 15px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
        }
        
        .btn-reiniciar:hover {
          background-color: #e0a800;
          text-decoration: none;
          color: #333;
        }
        
        @media (max-width: 768px) {
          .info-tiempo {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
      
      <Navbar />
      
      <main className="justificar-main">
        <div className="formulario-login">
          <h2>Registrar Asistencia</h2>
          
          <div className="info-tiempo">
            <p><strong>Fecha:</strong> {fecha}</p>
            <p><strong>Hora:</strong> {hora}</p>
          </div>
          
          {registroActual && (
            <div className="estado-asistencia">
              <p><strong>Estado actual:</strong></p>
              <p>Entrada: {registroActual.horaEntrada}</p>
              {registroActual.horaSalida && (
                <p>Salida: {registroActual.horaSalida}</p>
              )}
            </div>
          )}
          
          <button 
            onClick={handleRegistrarAsistencia}
            disabled={!user}
          >
            {tipoRegistro === 'entrada' ? 'Marcar Entrada' : 'Marcar Salida'}
          </button>
          
          {mensaje && (
            <div className={`mensaje ${error ? 'error' : 'success'}`}>
              {mensaje}
            </div>
          )}
          
          <button 
            className="btn-reiniciar"
            onClick={handleReiniciarMarca}
          >
            Reiniciar marca del día
          </button>
          
          <Link to="/docente/dashboard" className="volver-dashboard">
            ← Volver al Dashboard
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegistrarAsistencia;