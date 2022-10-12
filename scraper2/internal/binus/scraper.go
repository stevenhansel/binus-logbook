package binus

import (
	"reflect"
	"strings"

	"github.com/playwright-community/playwright-go"
)

const (
	LoginPageURL      = "https://enrichment.apps.binus.ac.id/Login/Student/Login"
	ChangeSemesterURL = "https://enrichment.apps.binus.ac.id/Dashboard/Student/IndexStudentDashboard"
)

type BinusScraper struct{}

func New() *BinusScraper {
	return &BinusScraper{}
}

type Student struct {
	Name  string
	Email string
	// ProfilePictureURL string (do this later because base64 encoding)
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

var studentDashboardParseTable = map[string]string{
	"ENRICHMENT TRACK":              "Track",
	"Company Partner:":              "CompanyPartner",
	"Position:":                     "Position",
	"Location:":                     "Location",
	"Working/Office Hours:":         "WorkingOfficeHours",
	"Site Supervisor:":              "SiteSupervisorName",
	"Site Supervisor Email:":        "SiteSupervisorEmail",
	"Site Supervisor Phone Number:": "SiteSupervisorPhoneNumber",
	"Office Phone Number:":          "OfficePhoneNumber",
	"Faculty Supervisor:":           "FacultySupervisor",
}

func (s *BinusScraper) Login(email, password string) (*Student, error) {
	pw, err := playwright.Run()
	if err != nil {
		return nil, err
	}

	defer pw.Stop()

	headless := true
	browser, err := pw.Chromium.Launch(playwright.BrowserTypeLaunchOptions{
		Headless: &headless,
	})
	if err != nil {
		return nil, err
	}

	defer browser.Close()

	page, err := browser.NewPage()
	if err != nil {
		return nil, err
	}

	if _, err = page.Goto(LoginPageURL); err != nil {
		return nil, err
	}
	page.WaitForLoadState("domcontentloaded")
	emailInput, err := page.Locator("#login_Username")
	if err != nil {
		return nil, err
	}

	passwordInput, err := page.Locator("#login_Password")
	if err != nil {
		return nil, err
	}

	loginButton, err := page.Locator("#btnLogin")
	if err != nil {
		return nil, err
	}

	if err := emailInput.Type(email); err != nil {
		return nil, err
	}
	if err := passwordInput.Type(password); err != nil {
		return nil, err
	}
	if err := loginButton.Click(); err != nil {
		return nil, err
	}

	page.WaitForSelector("#StudentTermDashboard")

	studentNameNode, err := page.QuerySelector("h2[class=student-name]")
	if err != nil {
		return nil, err
	}
	studentName, err := studentNameNode.InnerText()
	if err != nil {
		return nil, err
	}
	studentName = strings.TrimSpace(strings.Split(studentName, "\n")[0])

	semesterSelectInput, err := page.QuerySelector("select[name=ddSemester]")
	if err != nil {
		return nil, err
	}

	selectOptionNodes, err := semesterSelectInput.QuerySelectorAll("xpath=child::*")
	if err != nil {
		return nil, err
	}

	semesters := []*Semester{}
	for _, option := range selectOptionNodes {
		semesterName, err := option.InnerText()
		if err != nil {
			return nil, err
		}
		semesterValue, err := option.GetAttribute("value")
		if err != nil {
			return nil, err
		}

		semesters = append(semesters, &Semester{
			Name:  strings.TrimSpace(semesterName),
			Value: semesterValue,
		})
	}

	enrichments := []Enrichment{}
	for _, semester := range semesters {
		changeSemesterSelectInput, err := page.QuerySelector("select[name=ddSemester]")
		if err != nil {
			return nil, err
		}

		optionValues := []string{semester.Value}
		changeSemesterSelectInput.SelectOption(playwright.SelectOptionValues{Values: &optionValues})

		page.WaitForResponse(ChangeSemesterURL)
		page.WaitForTimeout(2000) // Add a slight delay just in case

		dataRows := map[string]string{}
		nodes, err := page.QuerySelectorAll(".column.info")
		if err != nil {
			return nil, err
		}

		for _, node := range nodes {
			text, err := node.InnerText()
			if err != nil {
				return nil, err
			}

			data := strings.Split(text, "\n")
			if len(data) < 2 {
				continue
			}

			key := data[0]
			value := data[1]
			if structFieldName, ok := studentDashboardParseTable[key]; ok {
				dataRows[structFieldName] = value
			}
		}

		currentEnrichment := Enrichment{}

		val := reflect.ValueOf(&currentEnrichment).Elem()
		for i := 0; i < val.NumField(); i++ {
			fieldName := val.Type().Field(i).Name
			if rowValue, ok := dataRows[fieldName]; ok {
				val.Field(i).SetString(rowValue)
			}
		}

		currentEnrichment.SemesterName = semester.Name
		currentEnrichment.SemesterValue = semester.Value

		enrichments = append(enrichments, currentEnrichment)
	}

	return &Student{
		Name:        studentName,
		Email:       email,
		Enrichments: enrichments,
	}, nil
}
