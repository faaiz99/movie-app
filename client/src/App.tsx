import "./App.css";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner } from "./components";

const Error = lazy(() =>
  import("./pages/error").then(({ Error }) => ({ default: Error })),
);
const Movies = lazy(() =>
  import("./pages/movies").then(({ Movies }) => ({ default: Movies })),
);
const MovieDetails = lazy(() =>
  import("./pages/movie-details").then(({ MovieDetails }) => ({
    default: MovieDetails,
  })),
);
const Signup = lazy(() =>
  import("./pages/signup").then(({ Signup }) => ({ default: Signup })),
);
const Login = lazy(() =>
  import("./pages/login").then(({ Login }) => ({ default: Login })),
);
const Footer = lazy(() =>
  import("./components").then(({ Footer }) => ({ default: Footer })),
);
const Navbar = lazy(() =>
  import("./components").then(({ Navbar }) => ({ default: Navbar })),
);

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
            <Route path="/movie/:title" element={<MovieDetails />} />
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
