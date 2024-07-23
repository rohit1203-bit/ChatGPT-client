// import logo from './logo.svg';
// import './App.css';
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Navbar/>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
