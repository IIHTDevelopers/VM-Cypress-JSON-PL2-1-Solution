import dayjs from "dayjs";

class AppointmentPage {
  constructor() {
    this.appointment = {
      appointmentLink: 'a[href="#/Appointment"]',
      counterItem: "//div[@class='counter-item']",
      appointmentBookingList:
        'ul.page-breadcrumb li a[href="#/Appointment/ListAppointment"]',
      visitTypeDropdown: 'select[name="VistType"]',
      fromDate: '(//input[@id="date"])[1]',
      showPatient: '//button[contains(text(),"Show Patient")]',
      visitTypeColumn: 'div[col-id="AppointmentType"]',
      fromDateField: '(//input[@id="date"])[1]',
      toDateField: '(//input[@id="date"])[2]',
      showPatientButton: '//button[contains(text(),"Show Patient")]',
      religionSelectDropdown: '[id="id_select_ethnic_group"]',
      departmentDropdown: '[id="txtDepartment"]',
      doctorNameDropdown: '[id="doctorName"]',
      printInvoiceButton: '[value="Print Invoice"]',
    };
  }

  /**
   * Purpose:
   * @Test8.2 @Test10.1 This function verifies the process of changing the appointment status after printing an invoice.
   * It performs the following steps:
   * 1. Navigate to the Appointment List page.
   * 2. Create a new appointment by entering patient details.
   * 3. Wait for success message, extract the appointment ID, and log it.
   * 4. Filter appointments by a specific date range and select the created appointment.
   * 5. Check in the patient, select the religion, department, and doctor, and then fill the visit date.
   * 6. Print the invoice and confirm it.
   * 7. Extract the hospital number and store it as an alias.
   *
   * Steps:
   * 1. Navigate to the Appointment List page and click on a specific appointment.
   * 2. Create a new appointment by entering first name, last name, gender, age, phone number, appointment time, and date.
   * 3. After successful creation, extract the appointment ID from the success message.
   * 4. Navigate to the Appointment List page again and filter by date range.
   * 5. Select the created appointment by checking in the patient and updating their details.
   * 6. Print the invoice and confirm it, capturing the hospital number for reference.
   */
  verifyAppointmentStatusChangeAfterInvoicePrint() {
    
    cy.visit(
      "https://healthapp.yaksha.com/Home/Index#/Appointment/ListAppointment"
    );
    cy.wait(2000);
    cy.xpath('//h5[text()="New-1 "]').click();
    cy.xpath('(//a[@href="#/Appointment/CreateAppointment"])[2]').click();
    cy.get('[name="name"]').click({ force: true });

    this.getRandomFirstName().then((firstName) => {
      this.getRandomTime().then((appointmentTime) => {
        this.getFutureDate().then((appointmentDate) => {
          cy.wait(2000);
          cy.get("[formcontrolname='FirstName']").type(firstName);
          cy.get("[formcontrolname='LastName']").type("LastName");
          cy.xpath("//input[@value='Male']/../span").click();
          cy.get("[formcontrolname='Age']").click({ force: true }).type("26");

          const phoneNumber = Math.floor(Math.random() * 1000000000).toString();
          cy.get("[formcontrolname='ContactNumber']").type(phoneNumber);
          cy.get("[formcontrolname='AppointmentTime']").type(appointmentTime);
          cy.get("[formcontrolname='AppointmentDate']").type(appointmentDate);

          cy.get('[name="addappointment"]').click();

          cy.get('[class="main-message"]')
            .invoke("text")
            .then((successMessage) => {
              const appointmentId = successMessage
                .split("AppointmentID is")[1]
                .trim();
              cy.log(`The appointment ID is this ${appointmentId}`);

              cy.wait(5000);
              cy.xpath(
                '(//a[@href="#/Appointment/ListAppointment"])[2]'
              ).click();

              cy.get(this.appointment.visitTypeDropdown).select("New");
              const fromDate = "2020-01-01";
              const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              );
              cy.xpath(this.appointment.fromDateField).type(fromDateFormatted);
              cy.xpath(this.appointment.toDateField).type(appointmentDate);
              cy.xpath(this.appointment.showPatientButton).click({
                force: true,
              });

              cy.wait(5000);
              this.getCheckinButtonByAppointmentId(appointmentId).then(
                (checkinButton) => {
                  this.getPatientNameByAppointmentId(appointmentId).then(() => {
                    cy.wrap(checkinButton).click();

                    cy.get(this.appointment.religionSelectDropdown).select(
                      "Others"
                    );
                    cy.get('[id="ddlCountrySubdivision"]').click();
                    cy.get(this.appointment.departmentDropdown).type(
                      "Cardiology"
                    );
                    cy.focused().type("{enter}");
                    cy.get(this.appointment.doctorNameDropdown).type(
                      "Dr. pooja Mishra"
                    );
                    cy.get('[formcontrolname="VisitDate"]')
                      .clear()
                      .type(appointmentDate);

                    cy.get(this.appointment.printInvoiceButton).click({
                      force: true,
                    });
                    cy.get('[class="confirm"]').click();
                    cy.xpath('//p[text()="Hospital No: "]/strong')
                      .invoke("text")
                      .then((hospitalNumberRaw) => {
                        const hospitalNumber = hospitalNumberRaw.trim();
                        cy.get(".btn-danger").click({ force: true });
                        cy.wrap(hospitalNumber).as("hospitalNumber"); // save hospital number to alias
                      });
                  });
                }
              );
            });
        });
      });
    });
    
  }

  getRandomFirstName() {
    const randomNum = Math.floor(Math.random() * 1000); // Generates number between 0–999
    const randomFirstName = `${randomNum}First`;
    return cy.wrap(randomFirstName);
  }

  getRandomTime() {
    const hour = Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0");
    const randomTime = `${hour}:${minute}`;
    return cy.wrap(randomTime);
  }

  getFutureDate() {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5); // 5 days ahead

    const year = futureDate.getFullYear();
    const month = (futureDate.getMonth() + 1).toString().padStart(2, "0");
    const day = futureDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return cy.wrap(formattedDate);
  }

  getCheckinButtonByAppointmentId(appointmentId) {
    cy.wait(5000);
    return cy.xpath(
      `//div[@col-id="AppointmentId" and text()="${appointmentId}"]/..//a[@danphe-grid-action="checkin"]`
    );
  }

  getPatientNameByAppointmentId(appointmentId) {
    return cy
      .xpath(
        `//div[@col-id="AppointmentId" and text()="${appointmentId}"]/../div[@col-id="FullName"]`
      )
      .invoke("text")
      .then((patientName) => patientName.trim());
  }
}

export default AppointmentPage;
