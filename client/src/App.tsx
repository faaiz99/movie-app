import "./App.css";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router-dom";
import { Movies } from "./pages/Movies";
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
          <Route path="/" element={<Movies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:movieTitle" element={<MovieDetails />} />
        </Routes>
        <div className="bg-gray-50 pt-5 dark:bg-gray-900 lg:pt-10">
          <Footer />
        </div>
      </Flowbite>
    </>
  );
}

export default App;
