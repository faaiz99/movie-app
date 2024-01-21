import { api } from "../config/axios";

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
  const response = await api.post<UserResponse | any>("/login", {
    email,
    password,
  });
  console.log("here");
  console.log(response);
  switch (response.status) {
    case 200: // authentication successful
      return response.data;
    case 401: // invalid credentials
      console.log("here", response.data);
      throw new Error(`Invalid credentials: ${response.data}`);
    case 422: // incomplete or invalid data
      throw new Error(`Invalid data: ${response.data}`);
    case 500: // Internal server error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
}: User) => {
  const response = await api.post<Partial<UserResponse> | any>("/register", {
    email,
    password,
    firstName,
    lastName,
  });
  switch (response.status) {
    case 201: // User created
      return response.data;
    case 409:
      throw new Error(`User already exists: ${response.data}`);
    case 422:
      throw new Error(`Invalid data: ${response.data}`);
    case 500: // Internal server error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const deleteUser = async (id: string) => {
  const response = await api.delete<null>(`/users/${id}`);
  return response.data;
};

/** Movie API Calls */

export type Movie = {
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
  switch (response.status) {
    case 200: // movies found
      return response.data;
    case 500: // Internal Server Error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const createMovie = async ({
  title,
  description,
  poster,
  trailer,
  userId,
}: Omit<Movie, "id">) => {
  const response = await api.post<Movie | any>("/movies", {
    title,
    description,
    poster,
    trailer,
    userId,
  });

  switch (response.status) {
    case 201: // Movie created
      return response.data;
    case 409:
      throw new Error(`Movie already exists: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Movie Data: ${response.data}`);
    case 500: // Internal server error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const updateMovieById = async ({
  id,
  title,
  description,
  poster,
  trailer,
  userId,
}: Movie) => {
  const response = await api.post<Movie | any>(`/movies/${id}`, {
    title,
    description,
    poster,
    trailer,
    userId,
  });

  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      throw new Error(`Movie not found: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Movie Data: ${response.data}`);
    case 500: // Internal server error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const getMovieById = async (movieId: string) => {
  const response = await api.get<Movie | null>(`/movies/${movieId}`);
  switch (response.status) {
    case 200: // movie found
      return response.data;
    case 422: // movie not found
      throw new Error(`Movie Id is missing: ${response.data}`);
    case 500: // Internal server error
    default:
      return response.data;
  }
};

export const deleteMovie = async (movieId: string) => {
  const response = await api.delete<null>(`/movies/${movieId}`);
  return response.data;
};

export const getFeaturedMovies = async () => {
  const response = await api.get<Movie[]>("/movies-featured");
  switch (response.status) {
    case 200: // movies found
      return response.data;
    case 500: // Internal Server Error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const getMovieByTermInTitle = async (term: string) => {
  const response = await api.get<Movie[]>(`/movies-search`, {
    params: { term: term },
  });
  //console.log("res",response)

  switch (response.status) {
    case 200: // movie found
      return response.data;
    case 422: // movie not found
      throw new Error(`Missing or Incomplete Term: ${response.data}`);
    case 500: // server error
    default:
      return response.data;
  }
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
  switch (response.status) {
    case 200: // reviews found
      return response.data;
    case 500: // Internal Server Error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
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
  switch (response.status) {
    case 201: // Review created
      return response.data;
    case 422:
      throw new Error(`Missing or Incomplete Review Data: ${response.data}`);
    case 500: // Internal server error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const getReviewById = async (reviewId: string) => {
  const response = await api.get<Review | null>(`/reviews/${reviewId}`);
  switch (response.status) {
    case 200: // review found
      return response.data;
    case 404: // review not found
      throw new Error(`Review Id is missing: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Review Data: ${response.data}`);
    case 500: // Internal server error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const updateReviewById = async ({
  id,
  title,
  description,
  rating,
  userId,
  movieId,
}: Review) => {
  const response = await api.post<Review | any>(`/reviews/${id}`, {
    title,
    description,
    rating,
    userId,
    movieId,
  });
  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      throw new Error(`Review not found: ${response.data}`);
    case 422:
      throw new Error(`Missing or Incomplete Review Data: ${response.data}`);
    case 500: // Internal server error
      throw new Error(`Internal Server Error: ${response.data}`);
    default:
      return response.data;
  }
};

export const deleteReviewById = async (reviewId: string) => {
  const response = await api.delete<null>(`/reviews/${reviewId}`);
  return response.data;
};
