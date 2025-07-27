// src/components/docente/VerHorario.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { useAuth } from '../../context/AuthContext';
import Footer from '../layout/footer';
const VerHorario = () => {
  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="horario-container">
      <style jsx>{`
        .horario-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f0f2f5;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .horario-main {
          flex: 1;
          padding: 30px;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .formulario-login {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        h1 {
          text-align: center;
          margin-bottom: 25px;
          font-size: 1.6rem;
        }
        
        h2 {
          text-align: center;
          margin-bottom: 25px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          border: 2px solid #444;
          margin-bottom: 20px;
        }
        
        th, td {
          border: 1px solid #444;
          padding: 10px;
          text-align: center;
        }
        
        th {
          background-color: #eee;
          font-weight: bold;
        }
        
        .acciones {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        
        .btn-imprimir {
          background-color: #2c3e50;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          cursor: pointer;
          border: none;
          font-size: 1rem;
        }
        
        .btn-imprimir:hover {
          background-color: #1a252f;
        }
        
        .volver-dashboard {
          background-color: #888;
          color: white;
          padding: 10px 18px;
          text-decoration: none;
          border-radius: 8px;
        }
        
        .volver-dashboard:hover {
          background-color: #555;
        }
        
        @media print {
          header, .acciones {
            display: none !important;
          }
          
          body {
            font-size: 12pt;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          th {
            background-color: #f2f2f2;
          }
          
          .formulario-login {
            box-shadow: none;
            border: none;
          }
          
          footer {
            position: fixed;
            bottom: 0;
            width: 100%;
          }
        }
      `}</style>
      
      <Navbar />
      
      <main className="horario-main">
        <section className="formulario-login">
          <h2>Mi Horario Semanal</h2>
          
          <table>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>07:00 - 08:00</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>08:00 - 10:00</td>
                <td>Álgebra - B201</td>
                <td></td>
                <td>Álgebra - B201</td>
                <td></td>
                <td>Álgebra - B201</td>
              </tr>
              <tr>
                <td>10:00 - 12:00</td>
                <td></td>
                <td>Física - A204</td>
                <td></td>
                <td>Física - A204</td>
                <td></td>
              </tr>
              <tr>
                <td>12:00 - 14:00</td>
                <td>Programación - C103</td>
                <td></td>
                <td></td>
                <td>Programación - C103</td>
                <td></td>
              </tr>
              <tr>
                <td>14:00 - 16:00</td>
                <td></td>
                <td>Ética Profesional - A302</td>
                <td></td>
                <td></td>
                <td>Ética Profesional - A302</td>
              </tr>
              <tr>
                <td>16:00 - 18:00</td>
                <td>Redes I - B105</td>
                <td></td>
                <td>Redes I - B105</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18:00 - 20:00</td>
                <td></td>
                <td>Inteligencia Artificial - C401</td>
                <td></td>
                <td>Inteligencia Artificial - C401</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          
          <div className="acciones">
            <Link to="/docente/dashboard" className="volver-dashboard">
              ← Volver al Dashboard
            </Link>
            <button className="btn-imprimir" onClick={handleImprimir}>
              🖨️ Imprimir Horario
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerHorario;