## Any notes your made preparing for the exercise

Implementing a backend system using NestJS, Prisma, TypeScript, and Jest for testing the API.

## Tasks to complete

### 1. Create the NestJS Repository

- Set up a new NestJS project repository.

### 2. Define Prisma Models

- Create models for the database.
- Models include:
  - Team
  - Player
  - RealGame
  - RealGamePlayer

### 3. Develop Jest Tests for Endpoints

- Implement End-to-End (E2E) tests for player endpoint.
- Test all CRUD operations (Create, Read, Update, Delete).

### 4. Implement API Endpoints

- Develop a series of endpoints to handle:
  - GET (Read)
  - POST (Create)
  - PUT/PATCH (Update)
  - DELETE (Remove)

### 5. Implement Update Restrictions

- Certain fields should be immutable after creation.
- Develop tests to ensure only specific fields can be updated.

### 6. Display Nested Data

- Utilize Prisma's `include` feature to display nested data.
- Consider displaying `RealGamePlayer` within `Player`.
- Add query string options for data retrieval.

### 7. Handle External Data (OptaId)

- Assume `optaId` comes from an external source and cannot be updated once set.

## Additional Preparation

- Prepare for handling the relationships as per the ER diagram:
  - A `Player` can belong to a `Team`.
  - A `Team` can play home or away in a `RealGame`.
  - A `Team` can be a winner or loser in a `RealGame`.
  - A `RealGame` involves multiple `RealGamePlayers`.
  - A `RealGamePlayer` is associated with a `Player` and a `RealGame`.

# Instructions for Executing the Submission

**Install Dependencies**:

- Navigate to the root directory of the project.
- Run `npm install` to install all required dependencies.

## Using Docker

- Ensure Docker is installed and running on your machine.
- Run `docker-compose up` to build and start the application along with all its services.

## Running the Application in Development Mode

- After installing the dependencies, start the application in development mode.
- Run `npm run start:dev`.
- This command will generate the Prisma client and start the NestJS application with hot-reload enabled.
- Hot-reload allows you to see changes in real-time as you develop.

## Interacting with the API

- Once the application is running, access the Swagger UI at `/api`.
- The Swagger UI provides a detailed overview of all API endpoints.
- You can interact with the API directly through the Swagger interface.

## API Documentation

- Access the Swagger UI at `/api` for a detailed overview of all API endpoints.

## Endpoints Overview

### Players (`/players`)

- **GET(ID)**: Retreive a player in db by players id.
- **GET(ALL)**: Retreive all players in db.
- **POST**: Create a new player.
- **PATCH**: Update an existing player.
- **DELETE**: Remove a player.

### Real Games (`/real-games`)

- **GET(ID)**: Retreive a real game in db by id.
- **GET(ALL)**: Retreive all real games in db.
- **POST**: Create a new real game.
- **PATCH**: Update an existing real game.
- **DELETE**: Remove a real game.

### Real Game Players (`/real-games/:id/real-game-players`)

- **GET(ID)**: Retreive a real game player in db by id.
- **GET(ALL)**: Retreive all real games players in db based on real game id.
- **POST**: Create a new real game player.
- **PATCH**: Update an existing real game player.
- **DELETE**: Remove a real game player.

### Teams (`/teams`)

- **GET(ID)**: Retreive a team in db by id.
- **GET(ALL)**: Retreive all teams in db.
- **POST**: Create a new team.
- **PATCH**: Update an existing team.
- **DELETE**: Remove a team.

## End-to-End (E2E) Testing

- **Players Test Suite**:
  - Performs CRUD operations on the Player entity.
  - Includes a specific test ensuring only certain fields can be updated.

## Additional Notes

### Potential Further Work

1. **Expanded E2E Testing**:

   - Given more time, additional end-to-end tests would be developed for other endpoints.

2. **Database Normalization**:

   - More time would allow for the creation of new models to further normalize the database.

   - New tables would help reduce data redundancy and improve query efficiency.

### Normalization Strategy

- The goal would be to segregate data into more specific, focused tables.
- Examples of new tables include:
  - **Competition Table**: For storing information about different competitions or leagues.
  - **GameDetails Table**: For storing specific details about each game that are not directly related to the teams playing.
  - **TeamGame Table**: For tracking which teams played in which games and their scores.
  - **PlayerStats Table**: For storing the stats for players in a structured way and generate uuid instead of putting realGameOptaId and playerOptaId together
  - **Coach Table**: For detailed information about coaches.

Other database suggestions would be to remove duplicate fields such as date and datetime from real game table which can just be date and can be converted to other formats if necessary.

Thank you for reading my submission.
