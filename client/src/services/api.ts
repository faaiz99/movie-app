import axios from "axios";
import { AxiosResponse } from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});


/** Add Bearer to all requests */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


/** User API Calls */

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type UserWithoutNames = Omit<User, "firstName" | "lastName">;

type UserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export const authenticationUser = async ({
  email,
  password,
}: UserWithoutNames) => {
  const response = await api.post<UserResponse>("/login", { email, password });
  return response.data;
};

export const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
}: User) => {
  const response = await api.post<Partial<UserResponse>>("/register", {
    email,
    password,
    firstName,
    lastName,
  });
  return response.data;
};

/** will add the reponse type later */
export const deleteUser = async (id: string) => {
  const response = await api.delete<null>(`/users/${id}`);
  return response.data;
};

/** Movie API Calls */

type Movie = {
  id: string;
  title: string;
  description: string;
  poster: string;
  trailer: string;
  userId: string;
  reviews?: Review[];
  createdAt?: Date;
  updatedAt?: Date;

};



export const getMovies = async () => {
  const response = await api.get<Movie[]>("/movies");
  return response.data;
};

export const createMovie = async ({
  title,
  description,
  poster,
  trailer,
  userId,
}: Omit<Movie, "id">) => {
  const response = await api.post<Movie>("/movies", {
    title,
    description,
    poster,
    trailer,
    userId,
  });
  return response.data;
};

export const updateMovieById = async ({
  id,
  title,
  description,
  poster,
  trailer,
  userId,
}: Movie) => {
  const response = await api.post<Movie>(`/movies/${id}`, {
    title,
    description,
    poster,
    trailer,
    userId,
  });
  return response.data;
};

export const getMovieById = async (movieId: string) => {
  const response = await api.get<Movie| null>(`/movies/${movieId}`);
  return response.data;
};

/** will add the reponse type later */
export const deleteMovie = async (movieId: string) => {
  const response = await api.delete<null>(`/movies/${movieId}`);
  return response.data;
};

export const getFeaturedMovies = async () => {
  const response = await api.get<Movie[]>("/movies-featured");
  return response.data;
};

export const getMovieByTermInTitle = async (term: string) => {
  const response = await api.get<Movie[] | null>(`/movies-search`, { params: { term: term } });
  return response.data;
};

/** Review API Calls */

type Review = {
  id: string;
  title: string;
  description: string;
  rating: number;
  userId: string;
  movieId: string;
  createdAt?: Date;
  updatedAt?: Date;
};


export const getReviews = async () => {
  const response = await api.get<Review[]>("/reviews");
  return response.data;
};

export const addReviewToMovie = async ({
  title,
  description,
  rating,
  userId,
  movieId,
}: Omit<Review, "id">) => {
  const response = await api.post<Review>(`/reviews/${movieId}`, {
    title,
    description,
    rating,
    userId,
  });
  return response.data;
};

export const getReviewById = async (reviewId: string) => {
  const response = await api.get<Review | null>(`/reviews/${reviewId}`);
  return response.data;
};

export const updateReviewById = async ({
  id,
  title,
  description,
  rating,
  userId,
  movieId,
}: Review) => {
  const response = await api.post<Review>(`/reviews/${id}`, {
    title,
    description,
    rating,
    userId,
    movieId,
  });
  return response.data;
};

/** will add the reponse type later */
export const deleteReviewById = async (reviewId: string) => {
  const response = await api.delete<null>(`/reviews/${reviewId}`);
  return response.data;
};
