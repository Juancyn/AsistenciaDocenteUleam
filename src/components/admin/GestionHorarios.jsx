// src/components/admin/GestionHorarios.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const GestionHorarios = () => {
  const [horarios, setHorarios] = useState(() => {
    const guardados = localStorage.getItem("horarios");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [docentes, setDocentes] = useState([]);
  const [formData, setFormData] = useState({
    docente: '',
    materia: '',
    aula: '',
    dia: '',
    hora: ''
  });

  useEffect(() => {
    const guardados = localStorage.getItem("docentes");
    if (guardados) setDocentes(JSON.parse(guardados));
  }, []);

  useEffect(() => {
    localStorage.setItem("horarios", JSON.stringify(horarios));
  }, [horarios]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { docente, materia, aula, dia, hora } = formData;

    if (!docente || !materia || !aula || !dia || !hora) {
      alert("Completa todos los campos.");
      return;
    }

    const conflicto = horarios.find(
      h => h.dia === dia && h.hora === hora && h.docente === docente
    );
    if (conflicto) {
      alert("Este docente ya tiene una clase a esa hora.");
      return;
    }

    setHorarios([...horarios, formData]);
    setFormData({ docente: '', materia: '', aula: '', dia: '', hora: '' });
  };

  const handleDelete = (index) => {
    const copia = [...horarios];
    copia.splice(index, 1);
    setHorarios(copia);
  };

  return (
    <div className="horarios-container">
      <style jsx>{`
        .horarios-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f9fc;
          font-family: 'Segoe UI', sans-serif;
        }

        .horarios-main {
          flex: 1;
          padding: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .formulario-login {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 { font-size: 1.6rem; margin-bottom: 20px; }
        h2, h3 { margin-bottom: 20px; }

        .tabla-horarios {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .tabla-horarios th, .tabla-horarios td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }

        .tabla-horarios th {
          background-color: #f2f2f2;
          font-weight: bold;
        }

        .tabla-horarios tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .tabla-horarios tr:hover {
          background-color: #f1f1f1;
        }

        .form-group { margin-bottom: 15px; }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        #form-horario button[type="submit"] {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        #form-horario button[type="submit"]:hover {
          background-color: #45a049;
        }

        .volver-dashboard {
          display: inline-block;
          margin-top: 25px;
          background-color: #888;
          color: white;
          padding: 10px 18px;
          text-decoration: none;
          border-radius: 8px;
          text-align: center;
        }

        .volver-dashboard:hover {
          background-color: #555;
        }

        .eliminar {
          padding: 6px 12px;
          color: white;
          background-color: #f44336;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>

      <Navbar />
      <main className="horarios-main">
        <h1>Gestión de Horarios</h1>
        <section className="formulario-login">
          <h2>Listado de Horarios</h2>
          <table className="tabla-horarios">
            <thead>
              <tr>
                <th>Docente</th>
                <th>Materia</th>
                <th>Aula</th>
                <th>Día</th>
                <th>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario, index) => (
                <tr key={index}>
                  <td>{horario.docente}</td>
                  <td>{horario.materia}</td>
                  <td>{horario.aula}</td>
                  <td>{horario.dia}</td>
                  <td>{horario.hora}</td>
                  <td>
                    <button className="eliminar" onClick={() => handleDelete(index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Agregar Nuevo Horario</h3>
          <form id="form-horario" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Docente:</label>
              <select name="docente" value={formData.docente} onChange={handleChange} required>
                <option value="">Seleccione un docente</option>
                {docentes.map((doc, i) => (
                  <option key={i} value={doc.nombre}>{doc.nombre}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="materia">Materia:</label>
              <select id="materia" name="materia" value={formData.materia} onChange={handleChange} required>
                <option value="">Seleccione una materia</option>
                <option value="Álgebra">Álgebra</option>
                <option value="Física">Física</option>
                <option value="Programación">Programación</option>
                <option value="Ética Profesional">Ética Profesional</option>
                <option value="Redes I">Redes I</option>
                <option value="Inteligencia Artificial">Inteligencia Artificial</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="aula">Aula:</label>
              <select id="aula" name="aula" value={formData.aula} onChange={handleChange} required>
                <option value="">Seleccione un aula</option>
                <option value="A204">A204</option>
                <option value="B201">B201</option>
                <option value="C103">C103</option>
                <option value="A302">A302</option>
                <option value="B105">B105</option>
                <option value="C401">C401</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dia">Día:</label>
              <select id="dia" name="dia" value={formData.dia} onChange={handleChange} required>
                <option value="">Seleccione un día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hora">Hora:</label>
              <select id="hora" name="hora" value={formData.hora} onChange={handleChange} required>
                <option value="">Seleccione un horario</option>
                <option value="07:00 - 08:00">07:00 - 08:00</option>
                <option value="08:00 - 10:00">08:00 - 10:00</option>
                <option value="10:00 - 12:00">10:00 - 12:00</option>
                <option value="12:00 - 14:00">12:00 - 14:00</option>
                <option value="14:00 - 16:00">14:00 - 16:00</option>
                <option value="16:00 - 18:00">16:00 - 18:00</option>
                <option value="18:00 - 20:00">18:00 - 20:00</option>
              </select>
            </div>

            <button type="submit">Agregar Horario</button>
          </form>

          <Link className="volver-dashboard" to="/admin/dashboard">
            ← Volver al Dashboard
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GestionHorarios;
