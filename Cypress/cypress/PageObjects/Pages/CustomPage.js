export default class CustomPage {
  constructor() {
    this.buttons = {
      reportsButton: "//a[text()=' Reports ']",
      schemeRefundTab: 'ul.page-breadcrumb a[href="#/Utilities/SchemeRefund"]',
      counterItem: "//div[@class='counter-item']",
      newSchemenRefundEntryButton:
        "//a[contains(text(),'New Scheme Refund Entry')]",
      saveSchemeRefundButton: "button#savebutton",
      warningPopup:
        "//p[contains(text(),'warning')]/../p[contains(text(),'Please fill all the mandatory fields.')]",

      bookAppointmentButton: "//a[normalize-space(text())='Book Appointment']",
      newPatientButton: "//a[normalize-space(text())='New Patient']",
      firstNameField: "//input[@placeholder='First Name']",
      lastNameField: "//input[@placeholder='Last Name']",
      maleCheckbox: "//label[.//input[@value='Male']]//span",
      ageField: "//input[@placeholder='Age']",
      contactNumberField: "//input[@placeholder='Contact Number']",
      appointmenttimeField: "//input[@formcontrolname='AppointmentTime']",
    };
  }

  /**
   * Purpose:
   * @Test1.1 @Test2.1 @Test3.1 @Test3.3 @Test4.1 @Test5.1 @Test6.1 @Test7.1 @Test8.1 @Test9.1 @Test10.2 @Test11.1 @Test12.1 @Test13.1 @Test14.1 To navigate to a specific page within the application by appending a relative path to the base URL.
   *
   * Steps:
   * 1. Define the base URL of the application.
   * 2. Append the given relative path to the base URL to form the full URL.
   * 3. Use Cypress `cy.visit()` to navigate to the constructed URL.
   * 4. Wait for 2 seconds to ensure the page loads completely (optional but helpful for stability).
   * 5. Log the full URL in the console for debugging and tracking purposes.
   *
   * Additional Info:
   * - `cy.wait(2000)` is used here for stability, but explicit waits should be avoided unless necessary.
   * - Useful for navigation in modular or multi-page applications.
   */
  navigateToCustomUrl(relativePath) {
    const baseUrl = "https://healthapp.yaksha.com";
    const fullUrl = `${baseUrl}${relativePath}`;
    cy.visit(fullUrl);
    cy.wait(2000);
    console.log(`Navigated to: ${fullUrl}`);
  }

  createNewPatient(data) {
    cy.xpath(this.buttons.reportsbookAppointmentButtonButton).click();
    cy.xpath(this.buttons.newPatientButton).click();
    cy.xpath(this.buttons.firstNameField).type(data.firstname);
    cy.xpath(this.buttons.lastNameField).type();
    cy.xpath(this.buttons.maleCheckbox).click();
    cy.xpath(this.buttons.ageField).type("25");
    cy.xpath(this.buttons.contactNumberField).type("9852145874");

    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);

    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    const timeStr = `${hours}:${minutes} ${ampm}`;

    cy.xpath(this.buttons.appointmenttimeField).clear().type(timeStr);
  }
}
