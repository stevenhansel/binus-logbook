package binus

import (
	"strings"

	"github.com/playwright-community/playwright-go"
)

const (
	LoginPageURL = "https://enrichment.apps.binus.ac.id/Login/Student/Login"
)

type BinusScraper struct{}

func New() *BinusScraper {
	return &BinusScraper{}
}

type Student struct {
	Name              string
	Email             string
	ProfilePictureURL string
	Enrichments       []Enrichment
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

func (s *BinusScraper) Login(email, password string) (*Student, error) {
	pw, err := playwright.Run()
	if err != nil {
		return nil, err
	}

	headless := false
	browser, err := pw.Chromium.Launch(playwright.BrowserTypeLaunchOptions{
		Headless: &headless,
	})
	if err != nil {
		return nil, err
	}

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

	page.WaitForLoadState("networkidle")

	studentNameNode, err := page.QuerySelector("h2[class=student-name]")
	if err != nil {
		return nil, err
	}
	studentName, err := studentNameNode.InnerText()
	if err != nil {
		return nil, err
	}
	studentName = strings.TrimSpace(strings.Split(studentName, "\n")[0])

	page.WaitForTimeout(10000)

	// entries, err := page.QuerySelectorAll(".athing")
	// if err != nil {
	// }

	// for i, entry := range entries {
	// 	titleElement, err := entry.QuerySelector("td.title > a")
	// 	if err != nil {
	// 	}
	// 	title, err := titleElement.TextContent()
	// 	if err != nil {
	// 	}
	// 	fmt.Printf("%d: %s\n", i+1, title)
	// }

	if err = browser.Close(); err != nil {
		return nil, err
	}
	if err = pw.Stop(); err != nil {
		return nil, err
	}

	return &Student{}, nil
}
