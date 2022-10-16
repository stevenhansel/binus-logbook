export type User = {
  name: string,
  email: string,
  enrichments: Enrichment[],
};

export type Enrichment = {
  companyPartner: string,
  facultySupervisor: string,
  location: string,
  officePhoneNumber: string,
  position: string,
  semesterName: string,
  siteSupervisorEmail: string,
  siteSupervisorName: string,
  siteSupervisorPhoneNumber: string,
  track: string,
  workingOfficeHours: string,
};

export type LoginParams = {
  email: string;
  password: string;
};
