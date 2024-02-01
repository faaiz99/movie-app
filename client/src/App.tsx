import "./App.css";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Error = lazy(() =>
  import("./pages/Error").then(({ Error }) => ({ default: Error })),
);

const Movies = lazy(() =>
  import("./pages/Movies").then(({ Movies }) => ({ default: Movies })),
);
const MovieDetails = lazy(() =>
  import("./pages/MovieDetails").then(({ MovieDetails }) => ({
    default: MovieDetails,
  })),
);
const Signup = lazy(() =>
  import("./pages/Signup").then(({ Signup }) => ({ default: Signup })),
);
const Login = lazy(() =>
  import("./pages/Login").then(({ Login }) => ({ default: Login })),
);
const Footer = lazy(() =>
  import("./components").then(({ Footer }) => ({ default: Footer })),
);
const Navbar = lazy(() =>
  import("./components").then(({ Navbar }) => ({ default: Navbar })),
);
import { Spinner } from "./components";
function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Flowbite>
          <Navbar />
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/movie/:movieTitle" element={<MovieDetails />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <div className="bg-gray-50  pt-5 dark:bg-gray-900 lg:pt-10">
            <Footer />
          </div>
        </Flowbite>
      </Suspense>
    </>
  );
}

export default App;
