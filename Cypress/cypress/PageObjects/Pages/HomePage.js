
class HomePage {
  // Defining Elements
  elements = {
    // Test Case 1
    profileIcon: () => cy.get('p.oxd-userdropdown-name'),
    logoutOption: () => cy.contains('Logout'),
    // Test Case 9
    upgradeLink: () => cy.get('a.orangehrm-upgrade-link'),

  };

  // Test Case 1: Verify Logout Functionality
  LogoutFuntionCheck() {
    this.elements.profileIcon()
      .should('be.visible')
      .click({ force: true });

    this.elements.logoutOption()
      .should('be.visible')
      .click({ force: true });
  }





}


export default HomePage;
