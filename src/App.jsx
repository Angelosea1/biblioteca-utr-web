import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

function App(){

    return(
      <Routes>
        {/*path: Ruta de la pagina que se va a mostrar*/}
        {/*element: Componente que se va a mostrar*/}
        <Route path="/" element={<Login/>}/>
        {/* Actividad
        Crear 3 rutas nuevas:
        1. Dashboard
        2. Perfil
        3. Pagina Not Found*/}
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Perfil" element={<Perfil/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes> 

    )
}

export default App;