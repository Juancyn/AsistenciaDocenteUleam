// src/context/AuthContext.js
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    {
      email: "docente@uleam.edu.ec",
      password: "1234",
      role: "docente",
      name: "Michelle Vera",
      amigoInfancia: "Santiago",
      mascota: "Toby"
    },
    {
      email: "admin@uleam.edu.ec",
      password: "1234",
      role: "admin",
      name: "Carlos Zambrano",
      amigoInfancia: "Ariel",
      mascota: "Astra"
    }
  ]);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser({
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name
      });
      return { success: true, role: foundUser.role };
    }
    return { success: false, message: "Credenciales incorrectas" };
  };

  const logout = () => {
    setUser(null);
  };

  const getUserByEmail = (email) => {
    return users.find(u => u.email === email);
  };

  const updatePassword = (email, newPassword) => {
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.email === email ? { ...u, password: newPassword } : u
      )
    );
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      users,
      login, 
      logout, 
      getUserByEmail,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}