// Import the page object for interacting with elements

import LoginPage from "../PageObjects/Pages/LoginPage";
import AppointmentPage from "../PageObjects/Pages/AppointmentPage";
import ProcurementPage from "../PageObjects/Pages/ProcurementPage";
import SettingsPage from "../PageObjects/Pages/SettingsPage";
import OperationTheatrePage from "../PageObjects/Pages/OperationTheatrePage";
import CustomPage from "../PageObjects/Pages/CustomPage";
import DispensaryPage from "../PageObjects/Pages/DispensaryPage";
import AccountingPage from "../PageObjects/Pages/AccountingPage";
import HelpDeskPage from "../PageObjects/Pages/HelpDeskPage";
import LaboratoryPage from "../PageObjects/Pages/LaboratoryPage";
import NursinggPage from "../PageObjects/Pages/NursingPage";
import MaternityPage from "../PageObjects/Pages/MaternityPage";

const fs = require("fs");
const path = require("path");

describe("Automation Suite for Yaksha Application", () => {
  // Create instance of the classes
  const loginPage = new LoginPage();
  const appointment = new AppointmentPage();
  const procurementPage = new ProcurementPage();
  const settingsPage = new SettingsPage();
  const customPage = new CustomPage();
  const laboratoryPage = new LaboratoryPage();
  const nursingPage = new NursinggPage();
  const maternityPage = new MaternityPage();

  // Set an acceptable load time in milliseconds
  const acceptableLoadTime = 1000;

  beforeEach(function () {
    // Load DateData.json from fixtures/Data folder
    cy.fixture("Data/DateData").then(function (data) {
      this.testData = data;
    });
    cy.fixture("Data/PatientName").then(function (data) {
      this.patientData = data;
    });

    // Launch browser and navigate
    cy.launchBrowser();
    cy.navigatingToBaseURL();

    // Login before each test
    loginPage.performLogin();
    cy.wait(3000);

    // Verify login was successful
    verifyUserIsLoggedin();
  });

  // Individual test cases

  it("TS-1 Verify Maternity Allowance Payment Receipt Modal", function () {
    customPage.navigateToCustomUrl("/Home/Index#/Maternity/PatientList");
    maternityPage.verifyReceiptModal();
    cy.xpath('//u[text()="Maternity Allowance Payment Receipt"]').should(
      "be.visible"
    );
  });

  it("TS-2 Verify Error Message When Editing an Occupied Bed", function () {
    customPage.navigateToCustomUrl("/Home/Index#/Settings/ADTManage/ManageBed");
    cy.wait(2000);
    settingsPage.verifyErrorMessage();
    verifyOccupiedErrorMessage();
  });

  it("TS-3 Verify Male Ward Bed Count Updates After Deactivating a Bed", function () {
    customPage.navigateToCustomUrl("/Home/Index#/Helpdesk/BedInformation");
    const expectedText = Number("4");
    HelpDeskPage.verifyTotalMaleWard().then((actualNumber) => {
      expect(actualNumber).to.be.above(Number(expectedText));
    });
    customPage.navigateToCustomUrl("/Home/Index#/Settings/ADTManage/ManageBed");
    settingsPage.verifyMaleBedWard();
  });

  it("TS-4 Verify Add New Patient modal opens with Alt + Enter keyboard shortcut", function () {
    customPage.navigateToCustomUrl("/Home/Index#/Dispensary/ActivateCounter");
    cy.wait(2000);
    DispensaryPage.activateCounter();
    cy.xpath('//span[normalize-space(text())="Add New Patient"]').should(
      "be.visible"
    );
  });

  it("TS-5 Verify Remarks text field placeholder value", function () {
    customPage.navigateToCustomUrl(
      "/Home/Index#/OperationTheatre/OtBookingList"
    );
    verifyUserIsOnCorrectURL("Home/Index#/OperationTheatre/OtBookingList");
    OperationTheatrePage.verifyRemarks();
    cy.get('[id="remarks"]').should("be.visible");
  });

  it("TS-6 Verify Capture screenshot of Inventory Requisition section", function () {
    customPage.navigateToCustomUrl(
      "/Home/Index#/Settings/ADTManage/ManageWard"
    );
    settingsPage.verifyBedCreation();
    cy.xpath(
      "//p[contains(@class,'main-message') and text()='Bed Feature Added']"
    ).should("be.visible");
  });

  it("TS-7 Verify Daily Transactions Report for Fiscal Year 2023", function () {
    customPage.navigateToCustomUrl("/Home/Index#/Accounting/Reports");
    AccountingPage.verifyDailyTransaction();
    verifyUserIsOnCorrectURL(
      "/Home/Index#/Accounting/Reports/DailyTransactionReport"
    );
  });

  it("TS-8 Verify Appointment Status Change After Check-in and Invoice Print", function () {
    customPage.navigateToCustomUrl("/Home/Index#/Appointment/PatientSearch");
    appointment.verifyAppointmentStatusChangeAfterInvoicePrint();
    cy.get("@hospitalNumber").then((hospitalNumber) => {
      verifyPatientExistWithHospitalNumber(hospitalNumber);
    });
  });

  it("TS-9 Adding Triage for an Outpatient ", () => {
    customPage.navigateToCustomUrl("/Home/Index#/Nursing/OutPatient");
    nursingPage.verifyAddingTriageForOutpatient();
    verifyTriageSuccessMessage();
  });

  it("TS-10 Verify Nursing Check-in for an Outpatient", () => {
    appointment.verifyAppointmentStatusChangeAfterInvoicePrint();
    cy.get("@hospitalNumber").then((hospitalNumber) => {
      verifyPatientExistWithHospitalNumber(hospitalNumber);
    });
    customPage.navigateToCustomUrl("/Home/Index#/Nursing/OutPatient");
    nursingPage.verifyNursingCheckinForOutpatient();
    cy.xpath('//p[text()="Nursing CheckIn Added Successfully"]').should(
      "be.visible"
    );
  });

  it("TS-11  Verify 'Morning Counter' selection and report generation for the specified date", () => {
    customPage.navigateToCustomUrl("/Home/Index#/Dispensary/ActivateCounter");
    DispensaryPage.generateMorningCounterReport();
    verifyReportGeneration();
  });

  it("TS-12 Verify the tooltip text on hover of Star icon in Laboratory", () => {
    customPage.navigateToCustomUrl("/Home/Index#/Lab/Dashboard");
    cy.wait(2000);
    laboratoryPage.verifyTooltipTextIsVisitible().then((tooltipText) => {
      expect(tooltipText).to.eq("Remember this Date");
    });
  });

  it("TS-13 Add and Verify New Imaging Type in Radiology", function () {
    customPage.navigateToCustomUrl("/Home/Index#/Settings");
    settingsPage.addAndVerifyImg();
    cy.xpath('//div[@col-id="ImagingTypeName"]').first().should("be.visible");
  });

  it("TS-14 Web Element Handling for Dropdowns in Purchase Request", function () {
    customPage.navigateToCustomUrl(
      "/Home/Index#/ProcurementMain/PurchaseRequest/PurchaseRequestList"
    );
    procurementPage.verifyRequestedDateColumnDateWithinRange(this.testData);
    cy.xpath('(//div[@col-id="RequestDate" and @role="gridcell"])[1]').should("be.visible");
  });

  it("TS-15 Verify logout functionality from Admin dropdown", function () {
    // Perform logout functionality verification
    loginPage.verifyLogoutFunctionality();
    verifyUserIsOnCorrectURL("/Account/Logout");
  });
});

/**
 * --------------------------------------------//i[text()='Maternity Allowance']----------Helper Methods----------------------------------------------------
 */

function verifyUserIsLoggedin() {
  // Verify successful login by checking if 'admin' element is visible
  cy.xpath('//li[@class="dropdown dropdown-user"]', { timeout: 20000 })
    .should("be.visible")
    .then(() => {
      cy.log("User is successfully logged in.");
    });
}

function verifyUserIsLoggedOut() {
  cy.get("#login").should("be.visible");
}

/**
 * Verifies that the current URL contains the expected partial URL.
 *
 * @param {string} expectedURL - The expected substring that should be present in the current URL.
 */
function verifyUserIsOnCorrectURL(expectedURL) {
  cy.url().should("contain", expectedURL);
}

function verifyImageIsUploaded() {
  // Verify that the image is visible
  cy.get("div.wrapper img").should("be.visible");
}

function isTooltipDisplayed() {
  cy.get("div.modal-content").should("be.visible");
}

function verifyErrorMessage() {
  cy.xpath('//span[text()="Select doctor from the list."]').should(
    "be.visible"
  );
}

function verifyAllNewPatients() {
  cy.get('div[col-id="AppointmentType"]')
    .not(":first")
    .each(($cell) => {
      cy.wrap($cell)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.contain("New");
        });
    });
}

function verifyTriageSuccessMessage() {
  cy.xpath("//p[text()='Chief Complaint Added Successfully']").should(
    "be.visible"
  );
}

function verifySuccessNoteTemplateAdded() {
  cy.xpath(
    '//p[contains(text(),"Success")]/../p[contains(text(),"Progress Note Template added.")]'
  )
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Progress Note Template added.");
    });
}

function verifyOccupiedErrorMessage() {
  cy.xpath(
    '//p[normalize-space(text())="Cannot modify occupied beds."]'
  ).should("be.visible");
}

function verifyPatientExistWithHospitalNumber(hospitalNumber) {
  if (!hospitalNumber || typeof hospitalNumber !== "string") {
    throw new Error("Invalid or missing hospitalNumber");
  }

  cy.xpath('(//a[@href="#/Appointment/PatientSearch"])[2]').click();
  cy.get('[id="id_input_search_using_hospital_no"]')
    .clear()
    .type(hospitalNumber);
  cy.get("body").type("{enter}");
  cy.get("body").type("{enter}");
  cy.wait(10000); // Better to replace with proper wait like `.should('be.visible')`
  cy.xpath('//div[@col-id="PatientCode" and @role="gridcell"]')
    .invoke("text")
    .then((actualHospitalNumber) => {
      const trimmedHospitalNumber = actualHospitalNumber.trim();
      expect(trimmedHospitalNumber).to.eq(hospitalNumber);
    });
}

function verifyReportGeneration() {
  cy.get('div[col-id="CounterName"]').should("have.length.greaterThan", 1);
}
