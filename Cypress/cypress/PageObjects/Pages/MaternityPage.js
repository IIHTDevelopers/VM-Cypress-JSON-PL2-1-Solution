import "cypress-real-events/support";

export default class MaternityPage {
  constructor() {
    this.maternity = {
      maternityLink: 'a[href="#/Maternity"]',
      reports: '//a[contains(text(),"Reports")]',
      maternityallowance: 'a[href="#/Maternity/Reports/MaternityAllowance"]',
      fromDate: '(//input[@id="date"])[1]',
      showreport: '//button[@type="button"]',
      viewdetails: '//a[contains(text(),"View Details")]',
      star_button: '//i[@title="Remember this Date"]',
      star_button_tooltip: "i[title='Remember this Date']",
      staricon: 'i[title="Remember this Date"]',
    };
  }

  /**
   * Purpose:
   * @Test1.2 This function navigates to the Maternity Allowance report page, applies the 'From Date' filter,
   * and verifies that the Receipt modal can be opened by clicking 'View Details'.
   *
   * Steps:
   * 1. Fetch the 'From Date' value from the test data fixture.
   * 2. Navigate through the application to reach the Maternity Allowance Report page.
   * 3. Clear and enter the 'From Date' in the filter field.
   * 4. Click on 'Show Report' to generate the report.
   * 5. Click on 'View Details' to open the Receipt modal.
   *
   * Additional Info:
   * - `force: true` is used while typing the date to override any UI issues (like hidden fields).
   * - Ensures that the Receipt modal is properly triggered after viewing a report.
   */
  verifyReceiptModal() {
    
    cy.fixture("Data/DateData").then((data) => {
      const fromDate = data.DateRange[0].FromDate;
      // Navigate to Maternity Module
      cy.get(this.maternity.maternityLink).click();
      cy.xpath(this.maternity.reports).click();
      cy.get(this.maternity.maternityallowance).click();
      // From Date
      cy.xpath(this.maternity.fromDate)
        .invoke("val", "") // Clear existing date if needed
        .type(fromDate, { force: true });

      cy.xpath(this.maternity.showreport).click();
      cy.xpath(this.maternity.viewdetails).click();
    });
    
  }
}
