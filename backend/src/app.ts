import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import servicesRoutes from "./routes/services";

const app = Fastify({ logger: true });

// Enable CORS if needed
app.register(cors, { origin: "*" });

// Routes
async function apiRoutes(api: FastifyInstance) {
  api.register(servicesRoutes, { prefix: "/services" });
}

app.register(apiRoutes, { prefix: "/api" });

export default app;
