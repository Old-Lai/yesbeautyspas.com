import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import servicesRoutes from "./routes/services";
import fetchServiceRoutes from "./routes/fetchServices"
import { loadServices } from "./lib/serviceStore";

const app = Fastify({ logger: true });

async function loadService() {
  await loadServices();
}
loadService();

// Enable CORS if needed
app.register(cors, { origin: "*" });

// Routes
async function apiRoutes(api: FastifyInstance) {
  api.register(servicesRoutes, { prefix: "/services" });
  api.register(fetchServiceRoutes, { prefix: "/update" })
}

app.register(apiRoutes, { prefix: "/api" });

export default app;
