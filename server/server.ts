import { httpServer } from "./src/app";
import { config } from "./src/config/env.config";
const port = config.PORT;
httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
