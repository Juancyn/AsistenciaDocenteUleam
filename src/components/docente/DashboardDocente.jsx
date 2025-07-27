// src/components/docente/DashboardDocente.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const DashboardDocente = () => {
  const { user } = useAuth();
  const [notificacionesVisibles, setNotificacionesVisibles] = useState(false);
  const [ultimoRegistro, setUltimoRegistro] = useState(null);
  
  useEffect(() => {
    if (user) {
      const registros = JSON.parse(localStorage.getItem('asistencias')) || [];
      const registrosUsuario = registros.filter(r => r.docenteId === user.id);
      
      if (registrosUsuario.length > 0) {
        // Ordenar por fecha descendente
        registrosUsuario.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setUltimoRegistro(registrosUsuario[0]);
      }
    }
  }, [user]);

  const toggleNotificaciones = () => {
    setNotificacionesVisibles(!notificacionesVisibles);
  };

  return (
    <div className="dashboard-docente-container">
      <style jsx>{`
        .dashboard-docente-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f0f2f5;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-main {
          flex: 1;
          padding: 30px;
          max-width: 600px;
          margin: 0 auto;
        }

        .dashboard-main h1 {
          text-align: center;
          margin-bottom: 25px;
          font-size: 1.6rem;
        }

        .formulario-login {
          background: white;
          padding: 25px 35px;
          border-radius: 10px;
          box-shadow: 0 0 12px rgba(0,0,0,0.1);
        }

        .formulario-login h2 {
          margin-bottom: 20px;
        }

        .formulario-login p {
          margin: 15px 0;
          font-size: 1.1rem;
        }

        .acciones-extra {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          gap: 10px;
          flex-wrap: wrap;
        }

        .acciones-extra a {
          background-color: #0077b6;
          color: white;
          padding: 10px 15px;
          border-radius: 6px;
          text-decoration: none;
          transition: background-color 0.3s ease;
          text-align: center;
          flex: 1;
        }

        .acciones-extra a:hover {
          background-color: #005f8a;
        }

        .notificaciones {
          margin-top: 30px;
        }

        .notificaciones h3 {
          cursor: pointer;
          background-color: #ddd;
          padding: 10px;
          border-radius: 5px;
        }

        .notificaciones ul {
          list-style: none;
          padding-left: 20px;
          margin-top: 10px;
          display: ${notificacionesVisibles ? 'block' : 'none'};
        }

        .notificaciones li {
          margin-bottom: 5px;
        }
        
        /* Nuevos estilos para la sección de registro */
        .registro-asistencia {
          background-color: #e8f4ff;
          border-left: 4px solid #17a2b8;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
        }
        
        .registro-asistencia h3 {
          margin-top: 0;
          color: #0d6efd;
          font-size: 1.2rem;
        }
        
        .registro-asistencia p {
          margin: 8px 0;
          font-size: 1rem;
        }
        
        .sin-registro {
          font-style: italic;
          color: #6c757d;
        }
      `}</style>

      <Navbar />

      <main className="dashboard-main">
        <h1>Panel del Docente</h1>

        <section className="formulario-login">
          <h2>Bienvenido/a, {user ? user.nombres : 'Docente'}</h2>

          <p>Hoy: <strong>{new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</strong></p>
          
          <div className="registro-asistencia">
            <h3>Último registro de asistencia</h3>
            
            {ultimoRegistro ? (
              <>
                <p><strong>Fecha:</strong> {ultimoRegistro.fecha}</p>
                <p><strong>Entrada:</strong> {ultimoRegistro.horaEntrada}</p>
                <p><strong>Salida:</strong> {ultimoRegistro.horaSalida || 'No registrada'}</p>
                <p><strong>Estado:</strong> {ultimoRegistro.estado}</p>
              </>
            ) : (
              <p className="sin-registro">No hay registros de asistencia</p>
            )}
          </div>

          <p>Próxima clase: <strong>10:00 a.m. - Álgebra Lineal - Aula B201</strong></p>

          <div className="acciones-extra">
            <Link to="/docente/registrar-asistencia">Registrar Asistencia</Link>
            <Link to="/docente/justificar-atraso">Justificar Atraso</Link>
            <Link to="/docente/justificar-inasistencia">Justificar Inasistencia</Link>
            <Link to="/docente/ver-horario">Ver Mi Horario</Link>
          </div>

          <div className="notificaciones">
            <h3 onClick={toggleNotificaciones}>Ver notificaciones</h3>
            <ul>
              <li>Recordatorio: Clase de Física a las 14:00</li>
              <li>El sistema marcará inasistencia después de las 10:15 a.m.</li>
              {!ultimoRegistro && <li>Recuerda registrar tu asistencia hoy</li>}
              {ultimoRegistro && !ultimoRegistro.horaSalida && (
                <li>No olvides registrar tu salida al finalizar tu jornada</li>
              )}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardDocente;