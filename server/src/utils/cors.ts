export const Policy = {
	origin: "*",
	methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
	allowedHeaders: ["Content-Type", "authorization"],
	credentials: true,
};
