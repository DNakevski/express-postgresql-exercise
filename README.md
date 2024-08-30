This repository is a simple playground for an Express.js backend API using using Typescript and a PostgreSQL database running in local Docker containers. Although the example uses the concept of parking bookings, it does not include any business logic or management of parking sessions. It is strictly a representation of CRUD operations using the aforementioned tech stack.

## Prerequisite

- Docker installation
- Node.js (preferably latest version or at least version 18.0) and NPM

## Installation

### Docker setup

Once you have Docker up and running on your local machine, navigate to the repository and go to the `src/pg-infrastructure/` directory. Inside, you will find two files:

1.  **docker-compose.yml** - This is the Docker Compose file that defines the services for PostgreSQL and pgAdmin4, a database management tool that provides an easy way to inspect the data.
2.  **docker_postgres_init.sql** - This SQL file is used for seeding the data. It is automatically executed during the initialization of the Docker containers as defined in the `docker-compose.yml` file (see line **16**).

While you are in the `src/pg-infrastructure/` directory, run the `docker-compose up` command. This should build the images and start the containers.

> **NOTE:** for all the PosgtreSQL and pgAdmin4 configurations, like users, password and databases check the **docker-compose.yml** file. They are backed into it and one day I will move them into proper **.env** files.

### Dependencies

This is straight forward, go inside of the root of the project and run the `npm install` command.
In order to start the backend server there are two options:

1.  `npm run start` - runs the express server in regular mode
2.  `npm run dev` - runs the express server using nodemon and restarts automatically after each change in the code. This is the preferred one during development phase.

You can see the commands inside _package.json_ file

## Code structure

The root folder of the project contains basic setup files, such as `package.json`, `tsconfig.json`, and `.gitignore`.

The entire codebase is located in the `src` folder, which includes several subfolders:

- **`@types`**: Contains custom declaration types. In our case, it includes an extension of the **Request** type from Express.
- **`middleware`**: Contains all the middleware functions used in the Express routing pipeline, including middleware for authentication, validation, error handling, etc.
- **`pg-infrastructure`**: Contains the `docker-compose` file for PostgreSQL and pgAdmin4, as well as the SQL script for initializing the database with data.
- **`schemas`**: Contains the schemas for the entities used in the code.
- **`services`**: Contains the service logic. In our case, this includes only the booking service, which is responsible for interacting with the database. No additional business logic is implemented here.
- **`utils`**: Contains utility functions used within the codebase. Currently, it only includes custom error handlers.
- **`admin`**: Contains the routes and the controller for the "admin" endpoints.
- **`standard-user`**: Contains the routes and the controller for the "standard user" endpoints.

Although the functionality for both admin and standard user endpoints could be handled with a single controller and route definitions—by introducing some conditional logic or middleware—I decided to separate them to better reflect a more "real-life" scenario. In a real use case, it is likely that these would be separated anyway.
