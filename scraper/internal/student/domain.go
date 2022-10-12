package student

type Student struct {
	Name  string
	Email string
	// ProfilePictureURL string (do this later because base64 encoding)
	Enrichments []Enrichment
}

type Enrichment struct {
	SemesterName              string
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
