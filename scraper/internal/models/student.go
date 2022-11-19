package models

type Student struct {
	Name        string
	Email       string
	Enrichments []Enrichment
}

type Enrichment struct {
	SemesterName              string
	SemesterValue             string
	Track                     string
	CompanyPartner            string
	Position                  string
	Location                  string
	WorkingOfficeHours        string
	SiteSupervisorName        string
	SiteSupervisorEmail       string
	SiteSupervisorPhoneNumber string
	FacultySupervisor         string
	OfficePhoneNumber         string
}

type Semester struct {
	Name  string
	Value string
}
