export const Policy = {
	origin: "*", 
	methods: ["GET", "POST", "DELETE"],
	allowedHeaders: ["Content-Type", "authorization"],
	credentials: true,
};