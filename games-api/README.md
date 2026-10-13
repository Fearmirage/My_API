# Video Games API

A REST API built with NestJS and TypeScript for browsing and managing video game sales data.

## Features

* Public endpoints to retrieve video game sales records
* OAuth 2.0 Client Credentials authentication for administrative operations
* Create, update, and delete game records
* Pagination, with a maximum of 20 records per page
* Redis caching
* Swagger API documentation
* Postman API documentation

## Technologies

* NestJS
* TypeScript
* Redis
* Postman
* CSV dataset

## Installation

```bash
npm install
```

## Running locally

Start the development server:

```bash
npm run start:dev
```

The API will be available at:
`http://localhost:3000`

## Running the backend on EC2 (Requires SSH private key)

Connect to the EC2 instance via SSH:

```bash
ssh -i ~/KEY_PATH/KEY_NAME.pem ubuntu@51.44.167.218
```

Start Nest JS:

```bash
cd ~/actions-runner/_work/My_API/My_API/games-api
npm run start:prod
```

The API will be available at
`https://51.44.167.218`

Note: The backend runs on the remote EC2 instance, not on your local machine. Keep the SSH session open while running the backend.

## Running the Github Actions self-hosted runner

Connect to the EC2 instance via SSH:

```bash
ssh -i ~/KEY_PATH/KEY_NAME.pem ubuntu@51.44.167.218
```

Start the Github Actions self-hosted runner
```bash
cd ~/actions-runner
./run.sh
```

Keep the terminal session open while the runner is active.

## API Documentation

* Swagger: `http://localhost:3000/api`
* Postman: [View the published API documentation](https://documenter.getpostman.com/view/58314394/2sBYB2pmRi)

## Authentication

Administrative endpoints require a Bearer access token obtained through the OAuth 2.0 Client Credentials flow.

## Dataset

The API uses a video game sales CSV dataset. Data modifications are currently stored in memory and are lost when the application restarts.