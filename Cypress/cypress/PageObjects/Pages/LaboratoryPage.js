export default class LaboratoryPage {
  constructor() {
    this.buttons = {
      staricon: 'i[title="Remember this Date"]',
    };
  }

  /**
   * Purpose:
   * @Test12.2 This function verifies that the tooltip text for the star icon is visible when hovered over.
   * It checks if the star icon exists, waits for the element to be visible, hovers over it,
   * and verifies that the tooltip (title attribute) appears as expected.
   *
   * Steps:
   * 1. Check if the star icon exists using `cy.get()` and assert it using `.should("exist")`.
   * 2. Wait for 2500 ms to ensure the icon is fully loaded and visible.
   * 3. Hover over the star icon using `.realHover()` to trigger the tooltip display.
   * 4. Retrieve the tooltip text from the `title` attribute using `.invoke("attr", "title")`.
   *
   * Preconditions:
   * - Ensure that the star icon button is visible and clickable on the page.
   */
  verifyTooltipTextIsVisitible() {
    
    return cy
      .get(this.buttons.staricon) // <-- Add return here
      .should("exist")
      .wait(2500)
      .realHover()
      .invoke("attr", "title");
      
  }
}
