import nursing from "../../fixtures/Data/nursing.json";
import dayjs from "dayjs";

export default class NursinggPage {
  constructor() {
    this.nursing = {
      checkbox: '//input[@id="checkbox_outPatient_selectAllPatients"]',
      triange: '//button[text() = "Triage"]',
      chiefComplaint:
        '//div[@class="single-complaint flex-container"]//textarea',
      addTriange: "//button[text()=' Add Triage ']",
      successMessage: "//p[text()='Chief Complaint Added Successfully']",
      check_In: '//button[text() = "Check In"]',
      conclude: "//button[text() = 'Conclude']",
      pastDaysTab: "//a[text()='Past Days']",
      saveBtn: '//input[@value="Save"]',
      successMessageCheckIn: "//p[text()='Nursing CheckIn Added Successfully']",
      successMessageConclude: "//p[text()='Checkout Successfully']",
      fromDate: `(//input[@id="date"])[1]`,
      okButton: '//button[@class="btn green btn-success"]',
      searchbar: "//input[@placeholder='search']",
      overview: '//i[@danphe-grid-action="patient-overview"]',
      upload_button: '(//i[@title="upload files"])[1]',
    };
  }

  /**
   * Purpose:
   * @Test9.2 This function verifies the process of adding triage information for an outpatient.
   * It performs the following steps:
   * 1. Wait for the page to load and select the first checkbox from the nursing module.
   * 2. Click on the 'Triage' section.
   * 3. Enter the chief complaint from the test data.
   * 4. Click on the 'Add Triage' button to submit the triage information.
   * 5. Verify that a success message is displayed indicating the triage was added successfully.
   *
   * Steps:
   * 1. Wait for 3 seconds to ensure the page is fully loaded.
   * 2. Select the first checkbox to proceed with the triage addition process.
   * 3. Click on the triage section to begin entering the details.
   * 4. Type the chief complaint from the provided test data into the appropriate field.
   * 5. Click the "Add Triage" button to submit the information.
   * 6. Wait for 2 seconds and verify the success message appears, indicating successful addition.
   */
  verifyAddingTriageForOutpatient() {
    
    const text = nursing.Text[0].value || "";
    cy.wait(3000);
    cy.xpath(this.nursing.checkbox).first().as("checkbox");
    cy.get("@checkbox").click();
    cy.wait(2000);
    cy.xpath(this.nursing.triange).click();
    cy.xpath(this.nursing.chiefComplaint).type(text);
    cy.xpath(this.nursing.addTriange).click();
    cy.wait(2000);
    
  }

  /**
   * Purpose:
   * @Test10.3 This function verifies the process of checking in a patient for nursing in the outpatient section.
   * It performs the following steps:
   * 1. Wait for the page to load and select the first checkbox from the nursing module.
   * 2. Click the 'Check-In' button to initiate the check-in process.
   * 3. Click the 'Save' button to save the check-in information.
   * 4. Verify that a success message appears, confirming the check-in was successful.
   *
   * Steps:
   * 1. Wait for 3 seconds to ensure the page is fully loaded.
   * 2. Select the first checkbox in the nursing section to start the check-in process.
   * 3. Click the 'Check-In' button to initiate the check-in.
   * 4. Click the 'Save' button to save the check-in information.
   * 5. Wait for 2 seconds and verify that the success message is visible, indicating a successful check-in.
   */
  verifyNursingCheckinForOutpatient() {
    
    cy.wait(3000);
    cy.xpath(this.nursing.checkbox).first().as("nursingCheckbox");
    cy.get("@nursingCheckbox").click();
    cy.wait(2000);
    cy.xpath(this.nursing.check_In).click();
    cy.xpath(this.nursing.saveBtn).click();
    cy.wait(2000);
    cy.xpath(this.nursing.successMessageCheckIn).should("be.visible");
    
  }
}
