package student

type StudentService struct {
	binusScraper BinusScraperQuerier
}

func NewService(binusScraper BinusScraperQuerier) *StudentService {
	return &StudentService{binusScraper: binusScraper}
}

func (s *StudentService) Login(email, password string) (*Student, error) {
	// TODO: handle if already exists in db
  // TODO: probably run the scraper inside a consumer
	student, err := s.binusScraper.Login(email, password)
	if err != nil {
		return nil, err
	}

	enrichments := make([]Enrichment, len(student.Enrichments))
	for i := 0; i < len(enrichments); i++ {
		enrichments[i].SemesterName = student.Enrichments[i].SemesterName
		enrichments[i].Track = student.Enrichments[i].Track
		enrichments[i].CompanyPartner = student.Enrichments[i].CompanyPartner
		enrichments[i].Position = student.Enrichments[i].Position
		enrichments[i].Location = student.Enrichments[i].Location
		enrichments[i].WorkingOfficeHours = student.Enrichments[i].WorkingOfficeHours
		enrichments[i].SiteSupervisorName = student.Enrichments[i].SiteSupervisorName
		enrichments[i].SiteSupervisorEmail = student.Enrichments[i].SiteSupervisorEmail
		enrichments[i].SiteSupervisorPhoneNumber = student.Enrichments[i].SiteSupervisorPhoneNumber
		enrichments[i].FacultySupervisor = student.Enrichments[i].FacultySupervisor
		enrichments[i].OfficePhoneNumber = student.Enrichments[i].OfficePhoneNumber
	}

	return &Student{
		Name:        student.Name,
		Email:       student.Email,
		Enrichments: enrichments,
	}, nil
}
