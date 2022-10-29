import React from "react";
//Importamos la aplicación/credenciales
// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import Admin from "./pages/Admin";
import Index from "./pages/Index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />

      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
