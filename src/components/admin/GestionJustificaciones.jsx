// src/components/admin/GestionJustificaciones.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const GestionJustificaciones = () => {
  const [justificaciones, setJustificaciones] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(null); // { id, docente }

  useEffect(() => {
    // Cargar justificaciones desde localStorage
    const cargarJustificaciones = () => {
      const datos = JSON.parse(localStorage.getItem('justificaciones')) || [];
      // Agregar IDs únicos si no existen
      const datosConIds = datos.map((item, index) => ({
        ...item,
        id: item.id || `just-${Date.now()}-${index}`
      }));
      setJustificaciones(datosConIds);
    };
    
    cargarJustificaciones();
  }, []);

  const cambiarEstado = (id, nuevoEstado) => {
    const nuevasJustificaciones = justificaciones.map(j => {
      if (j.id === id) {
        return { ...j, estado: nuevoEstado };
      }
      return j;
    });
    
    setJustificaciones(nuevasJustificaciones);
    localStorage.setItem('justificaciones', JSON.stringify(nuevasJustificaciones));
  };

  const eliminarJustificacion = (id) => {
    const nuevasJustificaciones = justificaciones.filter(j => j.id !== id);
    setJustificaciones(nuevasJustificaciones);
    localStorage.setItem('justificaciones', JSON.stringify(nuevasJustificaciones));
    setMostrarConfirmacion(null);
  };

  const verJustificativo = (justificacion) => {
    if (!justificacion.archivoBase64) {
      alert("No hay justificativo adjunto para esta solicitud");
      return;
    }
    
    // Crear una ventana emergente con el documento
    const ventana = window.open();
    ventana.document.write(`
      <html>
        <head>
          <title>Justificativo - ${justificacion.nombreArchivo || 'Documento'}</title>
        </head>
        <body style="margin:0; padding:0;">
          ${
            justificacion.archivoBase64.startsWith('data:image') 
              ? `<img src="${justificacion.archivoBase64}" style="max-width:100%;">`
              : `<iframe src="${justificacion.archivoBase64}" width="100%" height="100%" style="border:none;"></iframe>`
          }
        </body>
      </html>
    `);
  };

  const justificacionesFiltradas = justificaciones.filter(j => 
    j.docente.toLowerCase().includes(filtro.toLowerCase()) || 
    j.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="gestion-container">
      <style jsx>{`
        .gestion-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f9fc;
          font-family: 'Segoe UI', sans-serif;
        }

        .gestion-main {
          flex: 1;
          padding: 30px;
        }

        .filtro-container {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
        }

        .filtro-container input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }

        th, td {
          border: 1px solid #e0e0e0;
          padding: 12px 15px;
          text-align: left;
        }

        th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #495057;
        }

        tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        tr:hover {
          background-color: #f1f3f5;
        }

        .acciones {
          display: flex;
          gap: 8px;
        }

        button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .btn-justificativo {
          background-color: #17a2b8;
          color: white;
        }

        .btn-justificativo:disabled {
          background-color: #b0b0b0;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .btn-aprobar {
          background-color: #28a745;
          color: white;
        }

        .btn-rechazar {
          background-color: #dc3545;
          color: white;
        }

        .btn-eliminar {
          background-color: #6c757d;
          color: white;
        }

        .btn-eliminar:hover {
          background-color: #5a6268;
        }

        .sin-archivo {
          color: #6c757d;
          font-style: italic;
          font-size: 13px;
        }

        .estado-pendiente {
          color: #ffc107;
          font-weight: 500;
        }

        .estado-aprobado {
          color: #28a745;
          font-weight: 500;
        }

        .estado-rechazado {
          color: #dc3545;
          font-weight: 500;
        }

        .sin-resultados {
          text-align: center;
          padding: 30px;
          color: #6c757d;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          margin-top: 20px;
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

        .confirmacion-eliminar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .confirmacion-contenido {
          background-color: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          max-width: 500px;
          width: 90%;
        }

        .confirmacion-botones {
          display: flex;
          gap: 15px;
          margin-top: 20px;
          justify-content: flex-end;
        }

        .btn-cancelar {
          background-color: #6c757d;
          color: white;
          padding: 8px 16px;
        }

        .btn-confirmar {
          background-color: #dc3545;
          color: white;
          padding: 8px 16px;
        }
      `}</style>

      {mostrarConfirmacion && (
        <div className="confirmacion-eliminar">
          <div className="confirmacion-contenido">
            <h3>Confirmar eliminación</h3>
            <p>
              ¿Estás seguro que deseas eliminar la justificación de 
              <strong> {mostrarConfirmacion.docente}</strong>?
            </p>
            <p>Esta acción no se puede deshacer.</p>
            <div className="confirmacion-botones">
              <button 
                className="btn-cancelar"
                onClick={() => setMostrarConfirmacion(null)}
              >
                Cancelar
              </button>
              <button 
                className="btn-confirmar"
                onClick={() => eliminarJustificacion(mostrarConfirmacion.id)}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />
      <main className="gestion-main">
        <h1>Gestión de Justificaciones</h1>
        
        <div className="filtro-container">
          <input 
            type="text" 
            placeholder="Buscar por docente o tipo..." 
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        
        {justificacionesFiltradas.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Docente</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Justificativo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {justificacionesFiltradas.map((justificacion) => (
                <tr key={justificacion.id}>
                  <td>{justificacion.docente}</td>
                  <td>{justificacion.tipo}</td>
                  <td>{justificacion.fecha}</td>
                  <td className={`estado-${justificacion.estado?.toLowerCase() || 'pendiente'}`}>
                    {justificacion.estado || 'Pendiente'}
                  </td>
                  <td>
                    {justificacion.archivoBase64 ? (
                      <span>{justificacion.nombreArchivo || "Documento adjunto"}</span>
                    ) : (
                      <span className="sin-archivo">Sin archivo adjunto</span>
                    )}
                  </td>
                  <td className="acciones">
                    <button
                      className="btn-justificativo"
                      onClick={() => verJustificativo(justificacion)}
                      disabled={!justificacion.archivoBase64}
                      title={justificacion.archivoBase64 ? "Ver documento" : "No hay documento adjunto"}
                    >
                      Ver
                    </button>
                    <button 
                      className="btn-aprobar"
                      onClick={() => cambiarEstado(justificacion.id, 'Aprobado')}
                      disabled={justificacion.estado === 'Aprobado'}
                    >
                      Aprobar
                    </button>
                    <button 
                      className="btn-rechazar"
                      onClick={() => cambiarEstado(justificacion.id, 'Rechazado')}
                      disabled={justificacion.estado === 'Rechazado'}
                    >
                      Rechazar
                    </button>
                    <button 
                      className="btn-eliminar"
                      onClick={() => setMostrarConfirmacion({
                        id: justificacion.id,
                        docente: justificacion.docente
                      })}
                      title="Eliminar justificación"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="sin-resultados">
            <p>No se encontraron justificaciones</p>
          </div>
        )}

        <Link className="volver-dashboard" to="/admin/dashboard">
          ← Volver al Dashboard
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default GestionJustificaciones;