# Senior Full Stack Developer Technical Challenge: EventBooker

Hello and welcome\! We're excited to see your skills in action. This challenge is designed to simulate a real-world task and give us a good understanding of how you approach problems, structure your code, and make technical decisions.

The goal here isn't to trick you or test obscure knowledge. It's a starting point for a great conversation during our follow-up code review session. Please don't spend more than **3-4 hours** on this. We respect your time and are more interested in a well-architected, clean solution than a feature-packed one.

Good luck, and we look forward to seeing what you build\!

## The Challenge: Core Concept

You will build "EventBooker," a small-scale event ticketing platform. The application will allow public users to browse events, while logged-in users can book free tickets. Additionally, event-listings can be created in the system via a secure external webhook.

**The Tech Stack:**

  * **Framework:** Next.js
  * **Language:** TypeScript
  * **Database:** PostgreSQL
  * **ORM:** Prisma
  * **Styling:** Tailwind / CSS (your choice)

## Guidelines
- We are not evaluating visual design and prefer simple, clear UI.
- You may install npm packages, but keep dependencies minimal.
- Please do not spend time on implementing an authentication system. Use a hardcoded `userId` for authenticated actions.

## Getting Started

1.  **Prerequisites:** Ensure you have Docker and Docker Compose installed. Use Node via `.nvmrc`:
    ```bash
    nvm use
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:** Copy the `.env.example` file to a new `.env` file. This contains the database connection string and a secret for the webhook.
    ```bash
    cp .env.example .env
    ```
4.  **Start the Database:** Run the provided Docker container to spin up a PostgreSQL instance.
    ```bash
    docker-compose up -d
    ```
5.  **Apply Migrations:** Use Prisma to set up the database schema.
    ```bash
    npx prisma migrate dev
    ```    
    Tip: Open Prisma Studio to inspect your DB:
    ```bash
    npx prisma studio
    ```
6.  **Run the Application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Requirements & User Stories

Please define your database schema in `prisma/schema.prisma` to support the following features. We suggest models for `User`, `Event`, and `Ticket`.

### Part 1: The Public Experience

  * **Story 1: View All Events:**

      * As a public user, I want to see a list of all available events on the homepage.
      * Each event in the list should display its name, date and location.

  * **Story 2: View Event Details:**

      * As a public user, when I click on an event, I want to be taken to a detailed page for that specific event.
      * This page should show more event details.

### Part 2: The Authenticated User Experience

**Authentication Note:** Please do **not** implement real authentication. Simply hardcoding a `userId` for authenticated actions is fine.

  * **Story 3: Book a Ticket:**

      * As a logged-in user, on the event details page, I want to see a "Book Ticket" button if tickets are available.
      * When I click the button, a ticket should be created for me for that event.

  * **Story 4: View My Tickets:**

      * As a logged-in user, I want a "My Tickets" page that shows a list of all events I have successfully booked.

### Part 3: External Integration (Webhook)

  * **Story 5: Create Events via Webhook:**
      * As an the owner of EventBooker, I want an external system to be able to create events in EventBooker by calling a secure webhook.
      * You should create an API endpoint at `POST /api/webhooks/events`. A skeleton for this endpoint handler has already been created.
      * **Security:** The endpoint must be secured. It should only process requests that include a valid `X-Signature` header, which is an HMAC-SHA256 signature of the request body, created using the `WEBHOOK_SECRET` from your `.env` file.
      * **Payload Shape:**
        ```json
        {
          "event_id": "string",
          "name": "string",
          "description": "string",
          "date": "ISO date string",
          "location": "string",
          "totalTickets": "number"
        }
        ```
      * **Testing:** Use the provided script to generate, sign, and send requests locally (reads `WEBHOOK_SECRET` from `.env`):
        ```bash
        npm run create-event
        ```

## What We're Looking For

  * **Architecture & Design:** Your choices regarding data modeling (Prisma schema), API design and security.
  * **Code Quality:** Clean, readable, and maintainable TypeScript and React code. Good component structure and clear separation of concerns.
  * **Problem Solving:** Your overall approach to translating the requirements into a working application.

## Submission & Next Steps 

1.  When you are finished, create your own repository and share it with us.
2.  We will schedule a 45-minute follow-up call to discuss your solution. This will be a collaborative code review where you can walk us through your work and explain your decisions.

We are truly excited to see your solution. Happy coding\!
