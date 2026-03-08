export interface SchemaResponse {
  status: string;
  message: string;
  result: {
    SCHEMA_NAME: string;
  };
}

export interface GroupsItem {
  active: boolean;
  serviceGroupName: string;
  serviceGroupColor: string;
  sortOrder: number;
  clientFacingServiceGroupName: string;
  isSystem: boolean | null;
}

export interface ServiceLevel {
  totalDuration: number;
  price: string;
  levelNumber: number;
  duration3AvailableForOtherWork: boolean;
  duration3: number;
  duration2AvailableForOtherWork: boolean;
  duration2: number;
  duration1AvailableForOtherWork: boolean;
  duration1: string;
  bufferAfter: number;
  serviceFee: number | null;
  serPrcnt: string;
  Service_Fee_Percent__c: number | null;
  Service_Fee_Amount__c: number | null;
  disprice: string;
  duration4: number;
  duration4AvailableForOtherWork: boolean;
}

export interface ServiceResult {
  Add_On_Service__c: number;
  serviceName: string;
  Required_Post_Service__c: string | null;
  Required_Post_Service_Instore__c: number;
  Required_Post_Service_Online__c: number;
  filters: string;
  workerId: string;
  serviceGroupName: string;
  serviceId: string;
  servicePrice: number;
  Taxable__c: number;
  workerPrice: string;
  Buffer_After__c: number;
  Book_Every__c: number;
  Service_Level__c: number;
  Levels__c: string; // JSON string: must be parsed to ServiceLevel[]
  Duration_1__c: string;
  Duration_2__c: number;
  Duration_3__c: number;
  Duration_4__c: number;
  available1: number;
  Guest_Charge__c: number;
  FirstName: string;
  LastName: string;
  available2: number;
  available3: number;
  available4: number;
  Description__c: string;
  workerDuration: number;
  Service_Fee_Amount__c: number | null;
  Service_Fee_Percent__c: number | null;
  Self_Book__c: number;
  image: string | null;
  Accepting_New_Clients_Online: number;
  workerName: string;
  Favorite_Product_Name: string;
  Favorite_Product_URL: string;
  About_Me: string;
  Facebook_URL: string;
  Instagram_URL: string;
  TikTok_URL: string | null;
  Client_Facing_Name__c: string;
  Available_For_Client_To_Self_Book__c: number | null;
  serviceFee: number;
  color: string;
  priority: number;
  slots: any | null;
  resourceName: string;
}

export interface ServiceCategory {
  result: ServiceResult[];
  appList: any[];
  workerNames: any[];
}

export interface GroupServices {
  [categoryName: string]: ServiceCategory | any[];
}

export interface DataResponse {
  status: number;
  message: string;
  result: {
    groups: GroupsItem[];
    groupservices: GroupServices;
  };
}

export interface CategoryMapping {
  internalName: string;
  displayName: string;
}

export interface Service {
  internalName: string;
  displayName: string;
  categoryName: string; //oveall like facial includes (classic, lux) (from categorygroup)
  subCategoryName?: string; //sub category like classic or lux (from description)
  serviceType?: string; // service type like acne control facial in lux facial (from description)
  id: string;
  price: string;
  tags?: string[]; //from description
  description: string; //substring of description
  usageTags?: string[] // from description
  totalDuration: number | null;
}