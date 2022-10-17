export interface User {
  name: string
  email: string
  enrichments: Enrichment[]
}

export interface Enrichment {
  companyPartner: string
  facultySupervisor: string
  location: string
  officePhoneNumber: string
  position: string
  semesterName: string
  siteSupervisorEmail: string
  siteSupervisorName: string
  siteSupervisorPhoneNumber: string
  track: string
  workingOfficeHours: string
}

export interface LoginParams {
  email: string
  password: string
}
