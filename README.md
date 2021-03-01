# Express React Template with Typescript

[![CircleCI](https://circleci.com/gh/bondz/node-express-react-ts.svg?style=svg)](#)

## Installation

- Clone this repository
- Install dependencies with `npm i` or `yarn`
- Copy env.example file and adjust the values to suit your config
- Start the server with

```bash
npm start
  or
yarn start
```

## Usage

## Creating a new shortened url

Make a POST request to the endpoint

```js
api / urlshortner;
```

with a json request body of this format

```JSON
  {
    url: URL
  }
  Note: That the url must be a valid url else your request wont be processed
```

## Redirecting a user to shortened Url site

Make a get request with query parameter to the endpoint

```url
  api/urlshortner?shortId=<shortId>
```

The user will be redirected to the associated website if the url has been previously shortned using this service.

# Development

## Running Test

This application makes use of Jest testing library to test the various api endpoints and client app also.
To run test simply use the command

```bash
      yarn test
      or
      npm run test
```

To run the test in watch mode simply add the watch flag as shown below

```bash
      yarn test --watch
      or
      npm run test --watch
```

## Extras

A client side react application has been embeded into the application to test or bootstrap your app. To run the client app run the commands:

```bash
cd client
yarn
yarn start
```

---

Note:
The server part of this system is already designed and exposes a set of REST endpoints via the `/api` route and a GraphQL endpoint.

The client has also been setup to consume graphql if you chose to use that instead.
