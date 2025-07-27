import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const DashboardAdmin = () => {
  const { user } = useAuth();
  const [notificacionesVisibles, setNotificacionesVisibles] = useState(false);
  const [totalDocentes, setTotalDocentes] = useState(0);
  const [justificacionesPendientes, setJustificacionesPendientes] = useState(0);
  
  // Cargar datos al iniciar
  useEffect(() => {
    // Obtener docentes desde localStorage
    const docentes = JSON.parse(localStorage.getItem('docentes')) || [];
    setTotalDocentes(docentes.length);
    
    // Obtener justificaciones desde localStorage
    const justificaciones = JSON.parse(localStorage.getItem('justificaciones')) || [];
    
    // Contar justificaciones pendientes
    const pendientes = justificaciones.filter(j => 
      j.estado === 'pendiente' || !j.estado
    ).length;
    
    setJustificacionesPendientes(pendientes);
  }, []);

  const toggleNotificaciones = () => {
    setNotificacionesVisibles(!notificacionesVisibles);
  };

  // Mensaje dinámico para notificaciones
  const getMensajeNotificaciones = () => {
    if (justificacionesPendientes === 0) {
      return "No hay justificaciones pendientes";
    } else if (justificacionesPendientes === 1) {
      return "Hay 1 justificación pendiente por revisar";
    } else {
      return `Hay ${justificacionesPendientes} justificaciones pendientes por revisar`;
    }
  };

  return (
    <div className="dashboard-admin-container">
      <style jsx>{`
        .dashboard-admin-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f0f2f5;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .dashboard-main {
          flex: 1;
          padding: 30px;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .dashboard-main h1 {
          text-align: center;
          margin-bottom: 25px;
          font-size: 1.8rem;
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
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 25px;
        }
        
        .acciones-extra a {
          background-color: #0077b6;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
          transition: background-color 0.3s ease;
          flex: 1;
          min-width: 180px;
          text-align: center;
        }
        
        .acciones-extra a:hover {
          background-color: #023e8a;
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
        
        /* Nuevos estilos para las estadísticas */
        .estadisticas {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .tarjeta-estadistica {
          flex: 1;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          text-align: center;
          border-left: 4px solid #0077b6;
        }
        
        .tarjeta-estadistica h3 {
          margin-top: 0;
          font-size: 0.9rem;
          color: #666;
        }
        
        .tarjeta-estadistica p {
          font-size: 1.8rem;
          font-weight: bold;
          margin: 5px 0;
          color: #333;
        }
      `}</style>
      
      <Navbar />
      
      <main className="dashboard-main">
        <h1>Panel del Administrador</h1>
        
        <section className="formulario-login">
          <h2>Bienvenido, {user?.nombres || 'Administrador'}</h2>
          
          <div className="estadisticas">
            <div className="tarjeta-estadistica">
              <h3>Docentes activos</h3>
              <p>{totalDocentes}</p>
            </div>
            <div className="tarjeta-estadistica">
              <h3>Justificaciones pendientes</h3>
              <p>{justificacionesPendientes}</p>
            </div>
          </div>
          
          <div className="acciones-extra">
            <Link to="/admin/gestion-docentes">Gestión de Docentes</Link>
            <Link to="/admin/gestion-justificaciones">Revisar Justificaciones</Link>
            <Link to="/admin/gestion-horarios">Gestionar Horarios</Link>
          </div>
          
          <div className="notificaciones">
            <h3 onClick={toggleNotificaciones}>Ver notificaciones</h3>
            <ul>
              <li>{getMensajeNotificaciones()}</li>
              {justificacionesPendientes > 0 && (
                <li>Por favor revisa las justificaciones pendientes lo antes posible</li>
              )}
            </ul>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardAdmin;