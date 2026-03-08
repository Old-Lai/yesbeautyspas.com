import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import servicesRoutes from "./routes/services";
import fetchServiceRoutes from "./routes/fetchServices";
import { loadServices } from "./lib/serviceStore";

export async function buildApp() {
  const app = Fastify({ logger: true });

  await loadServices();

  // Enable CORS if needed
  app.register(cors, { origin: "*" });

  // Routes
  app.register(apiRoutes, { prefix: "/api" });

  return app;
}

async function apiRoutes(api: FastifyInstance) {
  api.register(servicesRoutes, { prefix: "/services" });
  api.register(fetchServiceRoutes, { prefix: "/update" });
}
