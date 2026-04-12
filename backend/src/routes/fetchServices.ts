import { FastifyInstance } from "fastify";
import { SCHEMA_LINK, SERVICES_LINK_TEMPLATE } from "../data/links";
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
import { addService } from "../lib/serviceStore";

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

export default async function fetchServices(fastify: FastifyInstance) {
  fastify.get("/", async () => {
    try {
      let { tStamp, month, day, year } = getDateTimeStamp();

      // uncomment to use actual stx backend

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
            internalName: groupItem.serviceGroupName,
            displayName: groupItem.clientFacingServiceGroupName,
          };
        return [];
      });

      //seperate each service from data.result.groupservices
      const groupservices = data.result.groupservices;
      let services: Service[] = [];
      //each category
      categoryNames.forEach(({ internalName }) => {
        let resultArr = groupservices[internalName]["result"];
        //each service within one category
        resultArr.forEach((result) => {
          const template: Service = {
            internalName: "",
            displayName: "",
            categoryName: "",
            id: "",
            price: "",
            tags: [],
            description: "",
            usageTags: [],
            totalDuration: null,
          };

          //grab easily accessable values
          template.internalName = result["serviceName"];
          template.displayName = result["Client_Facing_Name__c"];
          template.categoryName = result["serviceGroupName"];
          template.id = result["serviceId"];

          //grab total duration & price
          let levels__c = JSON.parse(result["Levels__c"])[0];
          template.totalDuration = levels__c["totalDuration"];
          template.price = levels__c["price"].split(".")[0];

          //grab & seperate values from Description__c
          let description__c = result["Description__c"];
          let descriptionComponents = description__c.split("~");
          descriptionComponents.forEach((component, index) => {
            //tags
            if (index == 0) {
              let tags: string[] = component.split("•");
              if (tags.length > 0) {
                tags = tags.flatMap((tag) => [tag.trim()]);
                template.tags = tags;
              }
              //subCategory
            } else if (index == 1) {
              let subComponents = component.split("@");
              if (subComponents.length > 0)
                template.subCategoryName = subComponents[0];
              if (subComponents.length > 1)
                template.serviceType = subComponents[1];
              //description
            } else if (index == 2) {
              template.description = component;
              //"ideal for"--usage tags
            } else if (index == 3) {
              let subComponents = component
                .split("#")
                .filter((tag) => tag != "");
              if (subComponents.length > 0) template.usageTags = subComponents;
            }
          });
          //append to services array
          services.push(template);
        });
      });

      //update tStamp to show processing duration
      tStamp = getDateTimeStamp().tStamp;
      console.log("---------processing complete--------", tStamp, "PST");
      //write to temp database as textfile
      services.forEach(async (service) => {
        await addService(service);
      });

      return ["Action completed"];
    } catch (error) {
      console.log(error);
      return ["error occured"];
    }
  });
}
