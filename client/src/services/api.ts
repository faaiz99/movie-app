import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
// 	// get your store state here
// 	const storeState = useAuthStore.g
// 	config.headers.Authorization = `Bearer ${storeState.token}`;

// 	return config;
//   });

/** User API Calls */

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type UserWithoutNames = Omit<User, 'firstName' | 'lastName'>;

export const authenticationUser = async ({ email, password }: UserWithoutNames) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const registerUser = async ({ email, password, firstName, lastName }: User) => {
  const response = await api.post("/register", { email, password, firstName, lastName });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

/** Movie API Calls */

type Movie = {
  id: string;
  title: string;
  description: string;
  poster: string;
  trailer: string;
  userId:string
};

export const getMovies = async () => {
  const response = await api.get("/movies");
  return response.data;

};

export const createMovie = async ({title, description, poster, trailer, userId}: Omit<Movie, "id">) => {
  const response = await api.post("/movies", {title, description, poster, trailer, userId});
  return response.data;
};

export const updateMovieById = async ({id, title, description, poster, trailer, userId}: Movie) => {
  const response = await api.put(`/movies/${id}`, {title, description, poster, trailer, userId});
  return response.data;
};

export const getMovieById = async (movieId: string) => {
  const response = await api.get(`/movies/${movieId}`);
  return response.data;
};

export const deleteMovie = async (movieId: string) => {
  const response = await api.delete(`/movies/${movieId}`);
  return response.data;
};

export const getFeaturedMovies = async () => {
  const response = await api.get("/movies-featured");
  return response.data;
};

export const getMovieByTermInTitle = async (term: string) => {
  const response = await api.get(`/movies-search`, { params: { term:term } });
  return response.data;
}

/** Review API Calls */

type Review = {
  id: string;
  title: string;
  description: string;
  rating: number;
  userId: string;
  movieId: string;
};

export const getReviews = async () => {
  const response = await api.get("/reviews");
  return response.data;
};

export const addReviewToMovie = async ({title, description, rating, userId, movieId}: Omit<Review, "id">) => {
  const response = await api.post(`/reviews/${movieId}`, {title, description, rating, userId});
  return response.data;
};

export const getReviewById = async (reviewId: string) => {
  const response = await api.get(`/reviews/${reviewId}`);
  return response.data;

};

export const updateReviewById = async ({id, title, description, rating, userId, movieId}: Review) => {
  const response = await api.post(`/reviews/${id}`, {title, description, rating, userId, movieId});
  return response.data;
};

export const deleteReviewById = async (reviewId: string) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};