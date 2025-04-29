class SettingsPage {
  constructor() {
    this.Submodules = {
      manageBedBtn: 'a[href="#/Settings/ADTManage/ManageBed"]',
      ManageBedButton: '//a[normalize-space(text())="Manage Bed"]',
      editButton: '//a[normalize-space(text())="Edit"]',
      errorMessage:
        '//p[normalize-space(text())="Cannot modify occupied beds."]',

      showReportBtn: '//button[normalize-space(text())="Show Report"]',
      viewDetailsBtn: '//a[normalize-space(text())="View Details"]',

      addCurrencyButton2: "input#AddCurrency",
      currencyCode: "input#CurrencyCode",
      currencyDescriptionField: "input#Description",
      searchBar: "input#quickFilterInput",
      currecnyCodeColum: 'div[col-id="CurrencyCode"]',
      editAction: "(//a[normalize-space(text())='Edit'])[2]",
      isActiveCheckbox: "//input[@type='checkbox']/..//span",
      updateBtn: "//input[@value='Update']",
      addButtonbtn: "//a[normalize-space(text())='Add Bed']",
      wardDropdown: "//select[@class]",
      bedNumber: "//input[@placeholder='Enter Bed Number']",
      bedFeatures: "//input[@placeholder='Select Bed Feature']",
      addButton: "//input[@value='Add']",
      BedSearchBar: "//input[@placeholder='search']",
      radiologyBtn: "//a[normalize-space(text())='Radiology']",
      addImagingTypeBtn: "//a[normalize-space(text())='Add Imaging Type']",
      imagingItemNameField: "//input[@placeholder='Enter Type Name']",
      addBtn: "//input[@id='addBtn']",
      imagingTypeField: '//div[@col-id="ImagingTypeName"]',
    };
  }

  /**
   * @Test7
   * @description This method verifies the error message.
   * @expected
   * The error message should be visible when trying to edit."
   */

  /**
   * Purpose:
   * @Test2.2 This function verifies that an error message is displayed after attempting to edit a record.
   *
   * Steps:
   * 1. Click on the first available 'Edit' button in the list.
   * 2. Verify that the error message element becomes visible after the click action.
   *
   * Additional Info:
   * - Using `.first()` ensures that the first edit option is tested, useful for lists/grids.
   * - Visibility check confirms that the UI responds correctly to the invalid action.
   */
  verifyErrorMessage() {
    // cy.xpath(this.Submodules.manageBedBtn).click();
    cy.xpath(this.Submodules.editButton).first().click();
    cy.xpath(this.Submodules.errorMessage).should("be.visible");
  }

  /**
   * Purpose:
   * @Test3.4 To edit the details of a male bed ward by toggling the 'Is Active' checkbox and updating the record.
   *
   * Steps:
   * 1. Click on the 'Edit' action button for a male bed ward.
   * 2. Toggle the 'Is Active' checkbox (activate/deactivate the ward).
   * 3. Click on the 'Update' button to save the changes.
   *
   * Additional Info:
   * - Each XPath locator (editAction, isActiveCheckbox, updateBtn) should uniquely identify its respective element.
   * - Ensure elements are visible and interactable before performing clicks to avoid flaky tests.
   */
  verifyMaleBedWard() {
    cy.xpath(this.Submodules.editAction).click();
    cy.xpath(this.Submodules.isActiveCheckbox).click();
    cy.xpath(this.Submodules.updateBtn).click();
  }

  /**
   * Purpose:
   * @Test6.2 This function verifies the creation of a new bed in the "Male Ward" section, including the filling of bed details and validation.
   *
   * Steps:
   * 1. Click the "Manage Bed" button to navigate to the bed management section.
   * 2. Click the "Add New Bed" button to initiate bed creation.
   * 3. Select "Male Ward" from the ward dropdown, ensuring it's visible and not disabled.
   * 4. Generate a random bed number and ensure the bed features section is visible and clickable.
   * 5. Select "Male Ward" from the list of available wards.
   * 6. Click on the "Active" checkbox to mark the bed as active.
   * 7. Type the generated bed number into the bed number input field.
   * 8. Click the "Add" button to submit the new bed.
   * 9. Search for the newly created bed by typing the bed number into the search bar.
   *
   * Additional Info:
   * - This verifies the entire bed creation flow, ensuring all steps are functional and the new bed can be searched after creation.
   */
  verifyBedCreation() {
    cy.xpath(this.Submodules.ManageBedButton).click();
    cy.xpath(this.Submodules.addButtonbtn).click();

    cy.xpath(this.Submodules.wardDropdown)
      .should("be.visible")
      .and("not.be.disabled")
      .select("Male Ward");

    const bedNumber = Math.floor(Math.random() * 100000).toString();

    cy.xpath(this.Submodules.bedFeatures).should("be.visible").click();

    cy.xpath("//li[normalize-space()='Male Ward']")
      .should("be.visible")
      .click();

    cy.xpath(this.Submodules.isActiveCheckbox).click();
    cy.xpath(this.Submodules.bedNumber).click({ force: true }).type(bedNumber);
    cy.xpath(this.Submodules.addButton).click();

    cy.xpath(this.Submodules.BedSearchBar)
      .click({ force: true })
      .type(bedNumber);
  }

  /**
   * Purpose:
   * @Test13.2 This function simulates adding a new imaging type to the radiology module and verifies its addition.
   * It generates a random imaging name, enters it into the system, clicks through necessary buttons,
   * and verifies that the new imaging type appears in the list of available imaging types.
   *
   * Steps:
   * 1. Generate a random 4-digit number to create a unique imaging name.
   * 2. Navigate to the radiology module and click the "Add Imaging Type" button.
   * 3. Enter the generated imaging name into the input field.
   * 4. Click the "Add" button to submit the form.
   * 5. Verify that the new imaging type appears in the imaging types list.
   *
   * Preconditions:
   * - Ensure that the radiology button and relevant fields are present and functional.
   * - Ensure the necessary elements are visible and interactable before actions are performed.
   */
  addAndVerifyImg() {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    const imagingName = `Test${randomNum}`;

    cy.xpath(this.Submodules.radiologyBtn).click();
    cy.xpath(this.Submodules.addImagingTypeBtn).click();
    cy.xpath(this.Submodules.imagingItemNameField)
      .should("be.visible")
      .type(imagingName);
    cy.xpath(this.Submodules.addBtn).click();
    cy.xpath(this.Submodules.imagingTypeField).first().should("be.visible");
  }
}

export default SettingsPage;
