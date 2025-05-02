import dispensary from "../../fixtures/Data/dispensary.json";
import dayjs from "dayjs";

class DispensaryPage {
  constructor() {
    this.buttons = {
      morningCounterBtn: "//h5[normalize-space(text())='Morning Counter']",
      addNewPatientButton: "//span[normalize-space(text())='Add New Patient']",
      ReportsBtn: "//a[normalize-space(text())='Reports']",
    };
    this.dispensary = {
      dispensaryLink: 'a[href="#/Dispensary"]',
      activateCounter: "//a[contains(text(),'Counter')]",
      counterSelection: '//div[@class="counter-item"]',
      counterName: '//div[@class="counter-item"]//h5',
      activatedCounterInfo: `div.mt-comment-info`,
      deactivateCounterButton: `//button[contains(text(),'Deactivate Counter')]`,
      titleName: '//span[@class="caption-subject"]',
      name: '(//div[@class="col-sm-4 col-md-3"]//label//span)[1]',
      prescription: "//a[contains(text(),' Prescription ')]",
      reports: `//a[contains(text(),'Reports')]`,
      fromDate: `(//input[@id="date"])[1]`,
      showReportButton: `//span[text()="Show Report"]`,
      userCollectionReport: `//i[text()="User Collection"]`,
      counterDropdown: `//select[@id="ddlCounter"]`,
      counterNameFromTable: `//div[@col-id="CounterName"]`,
      morningCounter: '(//div[@class="counter-item"])[1]',
    };
  }

  /**
   * Purpose:
   * @Test4.2 To activate the morning counter and verify that the 'Add New Patient' button becomes visible.
   *
   * Steps:
   * 1. Click on the 'Morning Counter' button to activate the counter.
   * 2. Use a keyboard shortcut (Alt+N) to open the patient search functionality.
   * 3. Wait briefly to ensure the UI updates.
   * 4. Verify that the 'Add New Patient' button is visible, confirming counter activation.
   *
   * Additional Info:
   * - Ensure that the morningCounterBtn locator correctly identifies the activation button.
   * - Adding a short wait helps stabilize the test after keyboard input.
   */
  activateCounter() {
    
    cy.xpath(this.buttons.morningCounterBtn).click();
    cy.get('[id="patient-search"]').type("{alt}n");
    cy.wait(1000);
    cy.xpath(this.buttons.addNewPatientButton).should("be.visible");
    
  }

  verifyMorningCounter() {
    cy.xpath(this.buttons.ReportsBtn).click();
  }

  /**
   * Purpose:
   * @Test11.2 This function generates the Morning Counter Report by selecting a date range and specific counter options,
   * and verifying that the correct "Morning Counter" data is shown in the report table.
   *
   * Steps:
   * 1. Retrieve the `FromDate` from the `dispensary.DateRange` array, and format it to the correct format (YYYY-MM-DD).
   * 2. Wait for elements to load and navigate to the reports section.
   * 3. Select the specific report (User Collection Report) from the available reports.
   * 4. Select the start date (`FromDate`) for the report.
   * 5. Select the counter option (Morning Counter).
   * 6. Click the 'Show Report' button to generate the report.
   * 7. Wait for the report to load, then verify that each row in the table for counter name contains the text "Morning Counter."
   *
   * Preconditions:
   * - Ensure the required dispensary data (`FromDate`) is available.
   * - Ensure the report section is properly loaded and accessible.
   */
  generateMorningCounterReport() {
    
    const fromDate = dispensary.DateRange[0].FromDate || "";
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    cy.wait(2000);
    cy.xpath(this.dispensary.reports).scrollIntoView().click();
    cy.xpath(this.dispensary.userCollectionReport).scrollIntoView().click();
    cy.wait(2000);

    cy.xpath(this.dispensary.fromDate).scrollIntoView().type(fromDateFormatted);
    cy.wait(2000);

    cy.xpath(this.dispensary.counterDropdown).scrollIntoView().select(1);

    cy.xpath(this.dispensary.showReportButton).scrollIntoView().click();
    cy.wait(2000);

    cy.xpath(this.dispensary.counterNameFromTable).each(($el, index) => {
      if (index > 0) {
        cy.wrap($el).should("have.text", "Morning Counter");
      }
    });
    
  }
}

export default new DispensaryPage();
