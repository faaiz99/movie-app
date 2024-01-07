import { httpServer } from "./src/app";
const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
