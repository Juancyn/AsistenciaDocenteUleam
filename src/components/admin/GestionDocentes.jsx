import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/footer';

const GestionDocentes = () => {
  const [docentes, setDocentes] = useState(() => {
    const guardados = localStorage.getItem("docentes");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [nuevoDocente, setNuevoDocente] = useState({
    nombre: "",
    email: "",
    departamento: ""
  });

  useEffect(() => {
    localStorage.setItem("docentes", JSON.stringify(docentes));
  }, [docentes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoDocente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!nuevoDocente.nombre.trim() || !emailValido.test(nuevoDocente.email) || !nuevoDocente.departamento.trim()) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    setDocentes([...docentes, {
      ...nuevoDocente,
      estado: "Activo"
    }]);

    setNuevoDocente({
      nombre: "",
      email: "",
      departamento: ""
    });
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Está seguro de eliminar este docente?")) {
      const copia = [...docentes];
      copia.splice(index, 1);
      setDocentes(copia);
    }
  };

  const handleEdit = (index) => {
    const docente = docentes[index];
    const nuevoNombre = prompt("Editar nombre:", docente.nombre)?.trim();
    const nuevoEmail = prompt("Editar correo:", docente.email)?.trim();
    const nuevoDepartamento = prompt("Editar departamento:", docente.departamento)?.trim();

    const emailValido = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!nuevoNombre || !emailValido.test(nuevoEmail) || !nuevoDepartamento) {
      alert("Datos inválidos. Verifica los campos.");
      return;
    }

    const copia = [...docentes];
    copia[index] = {
      ...docente,
      nombre: nuevoNombre,
      email: nuevoEmail,
      departamento: nuevoDepartamento
    };
    setDocentes(copia);
  };

  return (
    <div className="docentes-container">
      <Navbar />
      <main className="docentes-main">
        <h1>Gestión de Docentes</h1>
        <section className="formulario-login">
          <h2>Listado de Docentes</h2>

          <table className="tabla-docentes">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Departamento</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map((docente, index) => (
                <tr key={index}>
                  <td>{docente.nombre}</td>
                  <td>{docente.email}</td>
                  <td>{docente.departamento}</td>
                  <td>{docente.estado}</td>
                  <td>
                    <button className="editar" onClick={() => handleEdit(index)}>Editar</button>
                    <button className="eliminar" onClick={() => handleDelete(index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Agregar Nuevo Docente</h3>
          <form id="form-agregar-docente" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={nuevoDocente.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo institucional"
              value={nuevoDocente.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="departamento"
              placeholder="Departamento"
              value={nuevoDocente.departamento}
              onChange={handleChange}
              required
            />
            <button type="submit">Agregar Docente</button>
          </form>

          <Link className="volver-dashboard" to="/admin/dashboard">
            ← Volver al Dashboard
          </Link>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .docentes-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f9fc;
          font-family: 'Segoe UI', sans-serif;
        }

        .docentes-main {
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

        h1 {
          font-size: 1.6rem;
          margin-bottom: 20px;
        }

        h2, h3 {
          margin-bottom: 20px;
        }

        .tabla-docentes {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .tabla-docentes th, .tabla-docentes td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }

        .tabla-docentes th {
          background-color: #f2f2f2;
          font-weight: bold;
        }

        .tabla-docentes tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .tabla-docentes tr:hover {
          background-color: #f1f1f1;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .form-group select, .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        #form-agregar-docente button[type="submit"] {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        #form-agregar-docente button[type="submit"]:hover {
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

        .editar, .eliminar {
          padding: 6px 12px;
          color: white;
          border: none;
          border-radius: 4px;
          margin: 0 5px;
          cursor: pointer;
        }

        .editar {
          background-color: #4CAF50;
        }

        .eliminar {
          background-color: #f44336;
        }
      `}</style>
    </div>
  );
};

export default GestionDocentes;
