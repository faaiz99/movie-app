import "./App.css";
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { Routes, Route } from "react-router-dom";
import { Movie } from "./pages/Movie";
import { MovieDetails } from "./pages/MovieDetails";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { CustomNavbar } from "./components/navbar/Navbar";
import { Carousel } from 'flowbite-react';
import { CustomCard } from "./components/card/Card";
function App() {

  return (
    <>
      <Flowbite>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/movie" element={<Movie/>} />
          <Route path="/movie/:movieId" element={<MovieDetails/>} />
        </Routes>
        <DarkThemeToggle />
      </Flowbite>

    </>
  );
}

export default App;
