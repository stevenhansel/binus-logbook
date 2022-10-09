from time import sleep
import asyncio
from pydantic import BaseModel
from playwright.async_api import async_playwright

PAGES = {
    "login": "https://enrichment.apps.binus.ac.id/Login/Student/Login"
}

class Enrichment(BaseModel):
    semester_name: str
    semester_value: str
    track: str
    company_partner: str
    position: str
    location: str
    working_office_hours: str
    site_supervisor_name: str
    site_supervisor_email: str
    site_supervisor_phone_number: str
    faculty_supervisor: str
    office_phone_number: str

class BinusStudent(BaseModel):
    name: str
    email: str
    profile_picture_url: str
    enrichments: list[Enrichment]

class BinusScraper:
    # 1 minute
    NAVIGATION_TIMEOUT_MS = 60 * 1000

    def __init__(self):
        pass

    async def login(self, email: str, password: str):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()

            await page.goto(PAGES["login"])
            await page.wait_for_load_state("domcontentloaded", timeout=self.NAVIGATION_TIMEOUT_MS)

            await page.locator('#login_Username').type(email)
            await page.locator('#login_Password').type(password)

            await page.locator("#btnLogin").click()

            await page.wait_for_load_state("networkidle", timeout=self.NAVIGATION_TIMEOUT_MS)

            name = await page.query_selector("h2[class=student-name]")
            name = await name.inner_text()
            name = name.split('\n')[0].strip()

            profile_picture_url = ''
            profile_picture_node = await page.query_selector('span[class=avatar]')
            if profile_picture_node is not None:
                children = await profile_picture_node.query_selector_all('xpath=child::*')
                if len(children) != 0:
                    profile_picture_url = await children[0].get_attribute("src")

            semesters = []
            semester_select_element = await page.query_selector("select[name=ddSemester]")
            if semester_select_element is not None:
                children = await semester_select_element.query_selector_all('xpath=child::*')
                for child in children:
                    if children is None:
                        continue

                    semester_name = await child.inner_text()
                    semester_name = semester_name.strip()

                    semester_value = await child.get_attribute('value')
                    semesters.append({ "semester_name": semester_name, "semester_value": semester_value })

            PARSE_TABLE = {
                'ENRICHMENT_TRACK': 'track',
                'Company Partner:': 'company_partner',
                'Position:': 'position',
                'Location:': 'location',
                'Working/Office Hours:': 'working_office_hours',
                'Site Supervisor:': 'site_supervisor_name',
                'Site Supervisor Email:': 'site_supervisor_email',
                'Site Supervisor Phone Number:': 'site_supervisor_phone_number',
                'Office Phone Number:': 'office_phone_number',
                'Faculty Supervisor:': 'faculty_supervisor'
            }

            enrichments = []
            for semester in semesters:
                semester_select_element = await page.query_selector("select[name=ddSemester]")
                await semester_select_element.select_option(semester["semester_value"])

                # TODO: find a better way to handle this
                await page.wait_for_timeout(5000)
                await page.wait_for_load_state('networkidle', timeout=self.NAVIGATION_TIMEOUT_MS)

                rows = []
                nodes = await page.query_selector_all(".column.info")
                for node in nodes:
                    if node is not None:
                        inner_text = await node.inner_text()
                        rows.append(inner_text.split('\n'))

                current_enrichment = {}
                current_enrichment["semester_name"] = semester["semester_name"]
                current_enrichment["semester_value"] = semester["semester_value"]
                for key, value in rows:
                    if key not in PARSE_TABLE:
                        continue

                    current_enrichment[PARSE_TABLE[key]] = value

                enrichments.append(current_enrichment)

            # todo: save cookies
            await browser.close()

            return {
                "name": name,
                "email": email,
                "profile_picture_url": profile_picture_url,
                "enrichments": enrichments
            }
