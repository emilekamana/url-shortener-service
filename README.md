# URL Shortening Service

This is a URL shortening service built with Node.js, Express, and MongoDB.

#### By **Kamana Izere Emile**

## Features

- Shorten a given URL
- Redirect to the original URL
- Get the stats for a given short code
- Delete a short URL

## Usage

- Localhost: [http://localhost:3000](http://localhost:3000)
- Deployment: [https://url-shortener-service-kz5q.onrender.com](https://url-shortener-service-kz5q.onrender.com)
- Swagger Docs: [http://localhost:3000/api/docs](http://localhost:PORT/api/docs) or [https://url-shortener-service-kz5q.onrender.com/api/docs](https://url-shortener-service-kz5q.onrender.com/api/docs)
- Redirect: BASE_URL/shortCode

## Setup

1. Clone the repository
2. Run

```Console
npm install
```

3. Create a `.env` file with the following variables:
   - `MONGO_URI`: the MongoDB connection string
   - `PORT`: the port number to listen on
4. To start the server, run

```Console
npm run start
```

or in development mode

```Console
npm run dev
```

## API

### Shorten a URL

- `POST /api/shorten`
  - Body: `originalUrl` (string)
  - Response: `shortCode` (string)

### Redirect to the original URL

- `GET /{shortCode}`
  - Response: Redirect to the original URL

### Get the stats for a given short code

- `GET /api/stats/{shortCode}`
  - Response: `stats` (object with `clicks` and `createdAt` properties)

### Delete a short URL

- `DELETE /api/delete/{shortCode}`
  - Response: `message` (string)

## Development

1. To start the server in development mode, run:

```
npm run dev
```

2. Make changes to the code and see the changes reflected

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Zod

## Support and contact details

If you have any questions reach out to me on [emileizere@gmail.com]

## License

Licensed by MIT

Copyright (c) 2025 **Kamana Izere Emile**
