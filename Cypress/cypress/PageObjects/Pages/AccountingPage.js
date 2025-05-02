class AccountingPage {
  constructor() {
    this.buttons = {
      reportsButton: "//a[normalize-space(text())='Reports']",
      dailyTransactionBtn: "//i[normalize-space(text())='Daily Transaction']",
      loadBtn: "//button[normalize-space(text())='Load']",
      voucherLabel: "//span[normalize-space(text())='Voucher No']",
      settingsBtn: "//a[normalize-space(text())='Settings']",
      searchBar: "//input[@placeholder='search']",
      activateBtn: "//a[normalize-space(text())='Activate']",
      deactivateBtn: "//a[normalize-space(text())='Deactivate']",
      ledgerLocation: "//div[normalize-space(text())='BANK A/C #']",
      successMessage:
        "//p[normalize-space(text())='BANK A/C # is now activated.']",
      successMessage2:
        "//p[normalize-space(text())='BANK A/C # is now Deactivated.']",
    };
  }

  /**
   * Purpose:
   * @Test7.2 This function verifies the daily transaction report by navigating through the necessary UI elements,
   * selecting the correct year, loading the report, and validating the voucher label visibility.
   *
   * Steps:
   * 1. Click the "Reports" button to navigate to the reports section.
   * 2. Click the "Daily Transaction" button to view the daily transaction report.
   * 3. Select the year "2023" from the year dropdown to filter the report.
   * 4. Click the "Load" button to load the daily transaction report.
   * 5. Validate that the voucher label is visible after the report is loaded.
   *
   * Additional Info:
   * - This function ensures that the daily transaction report is loaded correctly and the voucher label is displayed.
   */
  verifyDailyTransaction() {
    
    cy.xpath(this.buttons.reportsButton).click();
    cy.xpath(this.buttons.dailyTransactionBtn).click();
    cy.get("select").select(0);
    cy.xpath(this.buttons.loadBtn).click();
    cy.xpath(this.buttons.voucherLabel).should("be.visible");
    
  }
}

export default new AccountingPage();
