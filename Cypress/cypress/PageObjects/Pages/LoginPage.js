import loginData from "../../fixtures/Data/ValidLogin.json";

class LoginPage {
  user = "//input[@id='username_id']";
  pass = "//input[@id='password']";
  signIn = "//button[@id='login']";
  errorMsg = "//div[contains(text(),'Invalid credentials !')]";
  admin = "(//a[@class='dropdown-toggle'])[3]";
  logout = "//a[text() = ' Log Out ']";

  /**
   * @Test0 This method logs in the user with valid credentials.
   *
   * @description This method performs the login operation using the provided valid credentials. It highlights the input
   *              fields for better visibility during interaction and fills the username and password fields. After submitting
   *              the login form by clicking the login button, it validates the success of the login process. The login is
   *              considered successful if there are no errors.
   */
  performLogin() {
    try {
      // Access login data from JSON
      const username = loginData.ValidLogin.ValidUserName;
      const password = loginData.ValidLogin.ValidPassword;

      // Fill username
      cy.xpath(this.user).clear().type(username);

      // Fill password
      cy.xpath(this.pass).clear().type(password);

      // Click sign-in button
      cy.xpath(this.signIn).click();

      // Verify successful login by checking if the 'admin' element is visible
      cy.xpath(this.admin).should("be.visible");
    } catch (e) {
      cy.log("Error during login:", e.message);
      throw e; // Rethrow the error for test failure
    }
  }

  /**
   * @Test15
   * @description This method verifies the logout functionality from the Admin dropdown.
   * @expected
   * User is logged out successfully and the login page is displayed.
   */
  verifyLogoutFunctionality() {
    
    cy.wait(5000); // Wait for 10 seconds

    //  click the Admin dropdown
    cy.xpath(this.admin).click();

    //  click the Log Out option
    cy.xpath(this.logout).click();

    // Verify the login button is visible
    cy.xpath(this.signIn).should("be.visible");
    
  }
}
export default LoginPage;
