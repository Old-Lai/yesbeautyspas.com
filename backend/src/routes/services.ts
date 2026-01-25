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
  CategoryMapping
} from "../definitions/serviceResponseDefinitions";
import rawdata from "../data/testData.json"; //test Data from previously grabbed data
const data = rawdata as DataResponse;

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
    let { tStamp, month, day, year } = getDateTimeStamp();

    // uncomment to use actual stx backend
    /*
    let response = await fetch(SCHEMA_LINK);
    const schema_data: SchemaResponse = await response.json();
    const schemaName = schema_data.result?.SCHEMA_NAME;

    let serviceLink = SERVICES_LINK_TEMPLATE.replace(
      "[SCHEMA_NAME]",
      schemaName,
    )
      .replace("[year]", year)
      .replace("[day]", day)
      .replace("[month]", month);

    response = await fetch(serviceLink);
    const data = await response.json();
    */

    //failed condition
    if (data.message != "General Success") {
      console.log("----------stx grab Failed!----------", tStamp, "PST");
      return ["stx backend grabbing failed"];
    }

    //sucess condition
    console.log("----------stx grab sucess!----------", tStamp, "PST");
    //grab service category names from data.result.groups
    const groups = data.result.groups;
    const categoryNames: CategoryMapping[] = groups.flatMap((groupItem) => {
      if (groupItem.serviceGroupName != "System Class")
        return {
          system_name: groupItem.serviceGroupName,
          display_name: groupItem.clientFacingServiceGroupName,
        };
      return [];
    });

    //seperate each service from data.result.groupservices
    const groupservices = data.result.groupservices;

    //update tStamp to show processing duration
    tStamp = getDateTimeStamp().tStamp;
    console.log("---------processing complete--------", tStamp, "PST");
    return [groupservices];
  });
}
