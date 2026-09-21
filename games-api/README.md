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

## API Documentation

* Swagger: `http://localhost:3000/api`
* Postman: [View the published API documentation](https://documenter.getpostman.com/view/58314394/2sBYB2pmRi)

## Authentication

Administrative endpoints require a Bearer access token obtained through the OAuth 2.0 Client Credentials flow.

## Dataset

The API uses a video game sales CSV dataset. Data modifications are currently stored in memory and are lost when the application restarts.

## License

Add the license applicable to this project, if one has been chosen.
