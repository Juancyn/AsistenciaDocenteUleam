// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Componentes de autenticación
import Login from './components/auth/Login';
import RecuperarClave from './components/auth/RecuperarClave';
import CambiarClave from './components/auth/CambiarClave';

// Componentes de administrador
import DashboardAdmin from './components/admin/DashboardAdmin';
import GestionDocentes from './components/admin/GestionDocentes';
import GestionJustificaciones from './components/admin/GestionJustificaciones';
import GestionHorarios from './components/admin/GestionHorarios';

// Componentes de docente
import DashboardDocente from './components/docente/DashboardDocente';
import RegistrarAsistencia from './components/docente/RegistrarAsistencia';
import JustificarInasistencia from './components/docente/JustificarInasistencia';
import JustificarAtraso from './components/docente/JustificarAtraso';
import VerHorario from './components/docente/VerHorario';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/recuperar-clave" element={<RecuperarClave />} />
          <Route path="/cambiar-clave" element={<CambiarClave />} />
          
          {/* Rutas de administrador */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/gestion-docentes" element={<GestionDocentes />} />
          <Route path="/admin/gestion-justificaciones" element={<GestionJustificaciones />} />
          <Route path="/admin/gestion-horarios" element={<GestionHorarios />} />
          
          {/* Rutas de docente */}
          <Route path="/docente/dashboard" element={<DashboardDocente />} />
          <Route path="/docente/registrar-asistencia" element={<RegistrarAsistencia />} />
          <Route path="/docente/justificar-atraso" element={<JustificarAtraso />} />
          <Route path="/docente/ver-horario" element={<VerHorario />} />
          <Route path="/docente/justificar-inasistencia" element={<JustificarInasistencia />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
