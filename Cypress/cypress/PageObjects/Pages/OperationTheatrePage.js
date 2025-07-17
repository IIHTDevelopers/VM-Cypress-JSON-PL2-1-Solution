class OperationTheatrePage {
  constructor() {
    this.otBooking = {
      operationTheatreLink: 'a[href="#/OperationTheatre"]',
      newOtBookingButton: '//button[contains(text(),"New OT Booking")]',
      addNewOtButton: 'input[value="Add New OT"]',
      modalHeading: "div.modelbox-div",

      newOTBtn: '//button[normalize-space(text())="New OT Booking"]',
      remarksTextArea: '//textarea[@placeholder="Remarks"]',
    };
  }

  /**
   * Purpose:
   * @Test5.2 To verify that the "Remarks" text area is visible, enabled, and contains the correct placeholder text.
   *
   * Steps:
   * 1. Click the 'New OT' button to navigate to the OT booking page.
   * 2. Verify that the remarks text area is visible on the page.
   * 3. Ensure the remarks text area is enabled, allowing input.
   * 4. Check that the placeholder text for the remarks area is correctly set to "Remarks".
   *
   * Additional Info:
   * - This verifies the UI behavior of the remarks text area, ensuring it's ready for user interaction.
   */
  verifyRemarks() {
    
    cy.xpath(this.otBooking.newOTBtn).click();

    cy.xpath(this.otBooking.remarksTextArea)
      .should("be.visible")
      .and("not.be.disabled")
      .and("have.attr", "placeholder", "Remarks");
      
  }
}

export default new OperationTheatrePage();
