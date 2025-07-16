class AdminPage {


  elements = {
    adminTab: () => cy.contains('span.oxd-main-menu-item--name', 'Admin'),
    addAdminButton: () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary').contains('Add'),
    editButton: () => cy.get('i.bi-pencil-fill').first(),
    editFormContainer: () => cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title'),
    userRoleDropdown: () => cy.get('label:contains("User Role")').parents('.oxd-input-group').find('.oxd-select-text-input'),
    userRoleOption: (role) => cy.get('.oxd-select-dropdown').contains(role),
    employeeNameInput: () => cy.get('label:contains("Employee Name")').parents('.oxd-input-group').find('input[placeholder="Type for hints..."]'),
    employeeNameSuggestion: (name) => cy.get('.oxd-autocomplete-dropdown').contains(name),
    statusDropdown: () => cy.get('label:contains("Status")').parents('.oxd-input-group').find('.oxd-select-text-input'),
    statusOption: (status) => cy.get('.oxd-select-dropdown').contains(status),
    usernameInput: () => cy.get('label:contains("Username")').parents('.oxd-input-group').find('input'),
    passwordInput: () => cy.get('label:contains("Password")').parents('.oxd-input-group').find('input[type="password"]').first(),
    confirmPasswordInput: () => cy.get('label:contains("Confirm Password")').parents('.oxd-input-group').find('input[type="password"]'),
    saveButton: () => cy.get('button[type="submit"]').contains('Save'),

    // Test Case 5
    userRoleSortIcon: () => cy.contains('div.oxd-table-header-cell', 'User Role').find('i.oxd-icon-button__icon.oxd-table-header-sort-icon'),

    usernameCell: () => cy.get('.oxd-table-body .oxd-table-row').first().find('div').eq(1),
    secondUserRow: () => cy.get('.oxd-table-body .oxd-table-row').eq(1), // SECOND USER
    usernameCell: () => cy.get('.oxd-table-body .oxd-table-row').eq(1).find('.oxd-table-cell').eq(1),
    deleteIcon: () => cy.get('i.oxd-icon.bi-trash').eq(1),
    confirmDeleteBtn: () => cy.get('.oxd-button--label-danger').contains('Yes, Delete'),
    // successToast: () => cy.get('.oxd-toast').contains('Successfully Deleted'),
    tableBody: () => cy.get('.oxd-table-body'),

    // Test Case 7
    editButton: () => cy.get('i.bi-pencil-fill').first(),
    editFormContainer: () => cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title'),

    // Test Case 8
    sortButton: () => cy.get('div.oxd-table-header-cell').contains('Username'),
    userRows: () => cy.get('.oxd-table-cell:nth-child(2)'),

    //Success Toast
    successToast: () => cy.get('.oxd-toast').contains('Successfully Deleted'),
    successToast: () => cy.get('.oxd-toast').contains('Successfully Saved'),



  }


  passwordMismatchError() {

    cy.fixture('AddUserForm').then((data) => {
      this.elements.adminTab().should('be.visible').click();
      this.elements.addAdminButton().should('be.visible').click();
      cy.wait(2000);

    this.elements.userRoleDropdown().click();
    this.elements.userRoleOption(data.role).click();

    cy.get('input[placeholder="Type for hints..."]').type('A', { force: true });

    cy.get('.oxd-autocomplete-dropdown')
      .should('be.visible')                        // wait for dropdown
      .find('div[role="option"] span')            // target list items
      .first()
      .click({ force: true });                    // click first result

    // Select Status
    this.elements.statusDropdown().click({ force: true });
    this.elements.statusOption(data.status).click({ force: true });

    this.elements.usernameInput().type(`${data.username}_${Date.now()}`);
    this.elements.passwordInput().type(data.password);
    this.elements.confirmPasswordInput().type(data.confirmPasswordWrong);

      this.elements.saveButton().click({ force: true });
    });
  }
// Test Case 4: Add Admin User
  addAdminUserForm() {
  cy.fixture('AddUserForm').then((data) => {
    cy.log('Role:', data.role); // Log value
    expect(data.role).to.exist; // Optional safety check
    // Navigate to Admin tab and click Add
    this.elements.adminTab().should('be.visible').click();
    this.elements.addAdminButton().should('be.visible').click();

    this.elements.userRoleDropdown().click();
    this.elements.userRoleOption(data.role).click();

    cy.get('input[placeholder="Type for hints..."]').type('A', { force: true });

    cy.get('.oxd-autocomplete-dropdown')
      .should('be.visible')                        // wait for dropdown
      .find('div[role="option"] span')            // target list items
      .first()
      .click({ force: true });                    // click first result

    // Select Status
    this.elements.statusDropdown().click({ force: true });
    this.elements.statusOption(data.status).click({ force: true });

    this.elements.usernameInput().type(`${data.username}_${Date.now()}`);
    this.elements.passwordInput().type(data.password);
    this.elements.confirmPasswordInput().type(data.confirmPassword);

    // Submit the form
    this.elements.saveButton().should('be.visible').click();

  });
}

  // Test Case 5: Verify User Deletion
  deleteUserFromTable() {
    this.elements.adminTab().click();
    cy.wait(1000);

    // Click the sort icon to sort by User Role descending
    this.elements.userRoleSortIcon().click({ force: true });
    cy.wait(1500); // Allow table to update
    

    cy.get('div.oxd-table-header-sort-dropdown')
      .should('be.visible');

    // Step 3: Click the "Descending" option inside it
    cy.get('div.oxd-table-header-sort-dropdown')
      .contains('span.oxd-text--span', 'Descending')
      .click({ force: true });

    // Capture username of the first row
    this.elements.usernameCell()
      .invoke('text')
      .then((username) => {
        cy.wrap(username.trim()).as('deletedUsername');
      });

    // Delete the user
    this.elements.deleteIcon().click({ force: true });
    this.elements.confirmDeleteBtn().click({ force: true });
  }

  // Verify the Edit Form Appears
  editUserFormAppear() {
    this.elements.adminTab().should('be.visible').click();
    cy.wait(1000); // Wait for table to load
    this.elements.editButton().should('be.visible').click();
  }

  // Test Case 8: Verify Admin Table Sorting
  goToAdminAndSortByUsername() {
    this.elements.adminTab().should('be.visible').click();
    this.elements.sortButton().should('be.visible').click();
  }

  visitAdminForTolltip() {
    this.elements.adminTab().should('be.visible').click();
  }
  
  NavigateToAdminPage() {
    this.elements.adminTab().should('be.visible').click();
  }
}

export default AdminPage;
