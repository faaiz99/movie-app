# Movie App 🎬

![License](https://img.shields.io/badge/license-MIT-blue.svg)

A full-stack application for movie enthusiasts. Browse, review, and discuss your favorite movies!

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Requirements](#requirements)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)

## Description

This application allows users to browse movies, write reviews, and engage in discussions. It's built with a focus on providing a seamless user experience and efficient performance.

## Tech Stack

This application uses a variety of technologies in its stack:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web application framework
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Docker](https://www.docker.com/) - Containerization platform
- [Prisma](https://www.prisma.io/) - Next-generation ORM

## Installation

### Running with Docker

1. Navigate to the `movie-app` directory:

   ```bash
   cd movie-app
   ```
2. Create a `.env` file in the `movie-app` directory with the following variables:

   ```env
   SALT=
   JWT_SECRET=
   DB_HOST=
   DB_NAME=
   DB_USER=
   DB_PASS=
   DB_PORT=
   PORT=
   ```
3. Build the Docker images:

   ```bash
   docker-compose build
   ```

4. Start the Docker containers:

   ```bash
   docker-compose up
   ```

### Running Without Docker

1. Create a `.env` file in the `movie-app/server` directory with the following variables:

   ```env
   SALT=
   JWT_SECRET=
   DATABASE_URL=
   ```

2. Install the server dependencies and start the server:

   ```bash
   cd server
   npm install
   npx prisma generate
   npx prisma db seed
   npm run dev
   ```

3. Install the client dependencies and start the client:

   ```bash
   cd client
   npm install
   npm run build
   npm run preview
   ```

## Requirements

- Node.js: v18 or above
- npm: v10 or above
- Docker: v25 or above


## Usage

After starting the server and client, you can access the application at `http://localhost:5173`.

## Testing

### Server

To run server tests:

```bash
cd server
npm run test
```

For unit tests:

```bash
npm run test:unit
```

For integration tests:

```bash
npm run test:integration
```

### Client

To run client tests:

```bash
cd client
npm run test
```

For unit tests:

```bash
npm run test:unit
```

For integration tests:

```bash
npm run test:integration
```

## License

This project is licensed under the [MIT License](LICENSE).
