import { Container } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import ListadoVehiculo from "./pages/ListadoVehiculo";
import ListadoReparacion from "./pages/ListadoReparacion";
import HomeIcon from '@mui/icons-material/Home';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import Reparacion from "./pages/Reparacion";
import ConstructionIcon from '@mui/icons-material/Construction';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';


// Links o rutas a las que se redirigirá el usuario
const navArrayLinks = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />
  },
  {
    title: "Registro",
    path: "/registro",
    icon: <NoCrashIcon />
  },
  {
    title: "Listado Vehículos",
    path: "/listado",
    icon: <FormatListNumberedIcon />
  },
  {
    title: "Reparacion",
    path: "/reparacion",
    icon: <ConstructionIcon />
  },
  {
    title: "Listado Reparacion",
    path: "/listado-reparacion",
    icon: <FormatListNumberedIcon />
  }

]

export default function App() {
  return (
    <>
      <Navbar navArrayLinks={navArrayLinks} />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/registro"
            element={<Registro />}
          />
          <Route
            path="/reparacion"
            element={<Reparacion />}
          />
          <Route
            path="/listado"
            element={<ListadoVehiculo />}
          />

          <Route
            path="/listado-reparacion"
            element={<ListadoReparacion />}
          />

        </Routes>
      </Container>
    </>
  );
}