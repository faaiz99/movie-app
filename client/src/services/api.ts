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