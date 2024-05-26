
# Customer Identity Service

## Problem Statement

Bitespeed needs a way to identify and keep track of a customer's identity across multiple purchases. Orders on FluxKart.com will always have either an **`email`** or **`phoneNumber`** in the checkout event. Bitespeed keeps track of the collected contact information in a relational database table named **`Contact`.**

## Scenarios

1. **New Contact**: If there is no existing contact with the provided email or phone number, create a new primary contact.
2. **Existing Contact (Single Match)**: If a contact exists with either the provided email or phone number, and it is a primary contact, the new entry is marked as a secondary contact linked to the primary contact.
3. **Existing Contacts (Multiple Matches)**: If the provided email matches one primary contact and the phone number matches another primary contact, the second primary contact is marked as secondary, linked to the first primary contact.
4. **Special Case**: 
    - Existing contacts:
      ```json
      {
          "email": "abc@gmail.com",
          "phoneNumber": "8684312405",
          "linkedPrecedence": "primary"
      }
      {
          "email": "abc@gmail.com",
          "phoneNumber": "9684312405",
          "linkedPrecedence": "secondary"
      }
      ```
    - New request:
      ```json
      {
          "email": "xyz@gmail.com",
          "phoneNumber": "9684312405"
      }
      ```
    - In this case, the phone number matches a secondary contact. The secondary contact should now be updated to reflect the new email, ensuring the linkage is maintained correctly.

## Tech Stack

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL**: A powerful, open source object-relational database system.
- **Swagger**: API documentation and testing tool.
- **SequenceDiagram.org**: Tool for creating UML sequence diagrams.

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- PostgreSQL (v12.x or higher)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/bitespeed-customer-identity.git
    cd bitespeed-customer-identity
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up PostgreSQL database**:
    - Create a new database in PostgreSQL.
    - Configure the database connection in `src/config/configuration.ts`.

4. **Run database migrations**:
    ```bash
    npm run migrate
    ```

5. **Start the application**:
    ```bash
    npm run start:dev
    ```

6. **Access Swagger documentation**:
    - Open your browser and navigate to `http://localhost:3000/api`.

## Solution Overview

The application handles the scenarios by interacting with the `Contact` table in PostgreSQL. Here's a high-level overview of how each scenario is managed:

1. **New Contact**:
    - Check if there is no existing contact with the given email or phone number.
    - Create a new primary contact.

2. **Existing Contact (Single Match)**:
    - If a contact with the provided email or phone number exists and is primary, create a secondary contact linked to this primary contact.

3. **Existing Contacts (Multiple Matches)**:
    - If the email matches a primary contact and the phone number matches another primary contact:
      - Update the second primary contact to secondary.
      - Link the secondary contact to the first primary contact.

4. **Special Case**:
    - If a secondary contact matches the phone number:
      - Update the secondary contact with the new email.
      - Ensure the linkage is maintained correctly to the primary contact.

### Example API Endpoints

- **Create/Update Contact**:
  - `POST /contacts`
    - Request Body:
      ```json
      {
          "email": "example@example.com",
          "phoneNumber": "1234567890"
      }
      ```
    - Response:
      ```json
      {"contact":{"primaryContactId":11,"emails":["xyz@gmail.com","abc@gmail.com"],"phoneNumbers":["8584312405","9584312405"],"secondaryContactIds":[12]}}
      ```

### Sequence Diagram

You can create sequence diagrams to illustrate the flow of data and interactions in the system using [SequenceDiagram.org](https://sequencediagram.org).

## Conclusion

This README provides a comprehensive overview of the Bitespeed Customer Identity Service, including problem scenarios, tech stack, setup instructions, and solution details. For more information, refer to the Swagger documentation available at `http://localhost:3000/api`.

---
