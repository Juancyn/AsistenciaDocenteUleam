// src/components/docente/JustificarInasistencia.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const JustificarInasistencia = () => {
  const [form, setForm] = useState({
    motivo: '',
    archivoBase64: '',
    nombreArchivo: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleArchivo = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    
    const lector = new FileReader();
    lector.onload = () => {
      setForm(prev => ({
        ...prev,
        archivoBase64: lector.result,
        nombreArchivo: archivo.name
      }));
    };
    lector.readAsDataURL(archivo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.motivo) {
      setMensaje('Debe ingresar un motivo para justificar la inasistencia.');
      setError(true);
      return;
    }

    const nuevaJustificacion = {
      docente: "Michelle Vera",  // Esto debería venir del contexto de autenticación
      tipo: "Inasistencia",
      motivo: form.motivo,
      archivoBase64: form.archivoBase64,
      nombreArchivo: form.nombreArchivo,
      fecha: new Date().toISOString().split('T')[0]
    };

    // Guardar en localStorage
    const existentes = JSON.parse(localStorage.getItem("justificaciones")) || [];
    existentes.push(nuevaJustificacion);
    localStorage.setItem("justificaciones", JSON.stringify(existentes));

    setMensaje('Justificación de inasistencia enviada correctamente.');
    setError(false);
    setForm({ motivo: "", archivoBase64: "", nombreArchivo: "" });
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

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          color: #444;
        }

        .form-group textarea {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ddd;
          min-height: 120px;
          resize: vertical;
          box-sizing: border-box;
        }

        .form-group input[type="file"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #f9f9f9;
        }

        button {
          background-color: #28a745;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
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

        .archivo-info {
          margin-top: 8px;
          font-size: 14px;
          color: #666;
          font-style: italic;
        }
      `}</style>

      <Navbar />
      
      <main className="justificar-main">
        <section className="formulario-login">
          <h2>Justificar Inasistencia</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Motivo de la inasistencia:</label>
              <textarea
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
                required
                placeholder="Explique detalladamente el motivo de su inasistencia..."
              />
            </div>
            
            <div className="form-group">
              <label>Adjuntar archivo (PDF, imagen, etc.):</label>
              <input 
                type="file" 
                onChange={handleArchivo}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {form.nombreArchivo && (
                <div className="archivo-info">
                  Archivo seleccionado: {form.nombreArchivo}
                </div>
              )}
            </div>
            
            <button type="submit">Enviar Justificación</button>
          </form>
          
          {mensaje && (
            <div className={`mensaje ${error ? 'error' : 'success'}`}>
              {mensaje}
            </div>
          )}
          
          <Link className="volver-dashboard" to="/docente/dashboard">
            ← Volver al Dashboard
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JustificarInasistencia;