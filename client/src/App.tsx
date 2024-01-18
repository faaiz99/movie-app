import "./App.css";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router-dom";
import { Movie } from "./pages/Movie";
import { MovieDetails } from "./pages/MovieDetails";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Navbar } from "./components";
import { Footer } from "./components";
function App() {
  return (
    <>
      <Flowbite>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
        <Footer />
      </Flowbite>
    </>
  );
}

export default App;
