import gracefulShutdown from "http-graceful-shutdown";
import { logger } from "@utils/logger";
import { app } from "./app";

const server = app.listen(process.env.PORT_API, () => {
  logger.info(`Server started on port: ${process.env.PORT_API}`);
});

gracefulShutdown(server);
