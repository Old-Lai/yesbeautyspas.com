import { FastifyInstance } from "fastify";
// import { SCHEMA_LINK, SERVICES_LINK_TEMPLATE } from "../data/links";
import {
  SchemaResponse,
  DataResponse,
  GroupsItem,
  GroupServices,
  ServiceCategory,
  ServiceResult,
  ServiceLevel,
  CategoryMapping,
  Service,
} from "../types/serviceResponseDefinitions";
import rawdata from "../data/testData.json"; //test Data from previously grabbed data
const data = rawdata as DataResponse;
// import to write to mock database ad textfile
import { addService, getServices } from "../lib/serviceStore";

function getDateTimeStamp() {
  const tStamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const [month, day, year] = tStamp.split(",")[0].split("/");

  return { tStamp, month, day, year };
}

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async () => {
    const services = await getServices();
    return services;
  });
  fastify.get("/facial", async () => {
    let services = await getServices();
    services = services.filter((service) => {
      return service.categoryName == "Facial";
    });
    return services;
  });
  fastify.get("/facial/signature", async () => {
    let services = await getServices();
    services = services.filter((service) => {
      return service.subCategoryName == "signature";
    });
    return services;
  });
  fastify.get("/facial/advanced", async () => {
    let services = await getServices();
    services = services.filter((service) => {
      return service.subCategoryName == "advanced";
    });
    return services;
  });
  fastify.get("/facial/luxury", async () => {
    let services = await getServices();
    services = services.filter((service) => {
      return service.subCategoryName == "luxury";
    });
    return services;
  });
  fastify.get("/head-spa", async () => {
    let services = await getServices();
    services = services.filter((service) => {
      return service.categoryName == "Head Spa";
    });
    return services;
  });
  fastify.get("/massage", async () => {
    let services = await getServices();
    services = services.filter((service) => {
      return service.categoryName == "Massage";
    });
    return services;
  });
  fastify.get("/lash-brows", async () => {
    let services = await getServices();
    services = services.filter((service) => {
      return service.categoryName == "Lashes & Brows";
    });
    return services;
  });
}
