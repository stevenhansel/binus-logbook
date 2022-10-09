export type User = {
  name: string,
  profilePictureUrl: string,
  enrichments: Enrichment[],
};

export type Enrichment = {
  id: number,
  semester: string,
  semesterValue: string,
  track: string,
  companyPartner: string,
  position: string,
  location: string,
  workingOfficeHours: string,
  siteSupervisorName: string,
  siteSupervisorEmail: string,
  siteSupervisorPhoneNumber: string,
  facultySupervisor: string,
  officePhoneNumber: string,
};

export type LoginParams = {
  username: string;
  password: string;
};
