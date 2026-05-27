# Project Structure

This project is a Node.js and Express API boilerplate using MongoDB, Mongoose, JWT authentication, Joi validation, BullMQ queues, Socket.IO, and Swagger API documentation.

## Main Folders

```text
src/
  app.js                         Express app setup, middleware, routes, and Swagger UI
  index.js                       Application entry point and server startup
  config/                        Environment, database, Redis, queue, logger, and rate-limit config
  constants/                     Shared response message constants
  controllers/                   Request handlers grouped by feature
  lib/                           Shared library helpers
  middlewares/                   Auth, validation, cache, rate-limit, and admin middleware
  modals/                        Mongoose models and model plugins
  queues/                        BullMQ queue producers
  routes/                        Express route registration only
  services/                      Business logic and reusable service functions
  socket/                        Socket.IO setup
  swagger/                       Swagger/OpenAPI configuration and route docs
  templates/                     Email templates
  utils/                         Shared response, error, async, and helper utilities
  validations/                   Joi request validation schemas
  workers/                       Queue workers
```

## Route Layout

```text
src/routes/
  index.js                       Mounts all API routes under /v1
  authRoutes/                    Auth endpoints under /v1/auth
  userRoutes/                    User endpoints under /v1/user
  adminRoutes/                   Admin endpoints under /v1/admin
  commonRoutes/                  Common endpoints such as notifications
```

## Swagger Layout

```text
src/swagger/
  index.js                       Swagger JS doc configuration
  docs/
    auth.swagger.js              Auth API documentation
    profile.swagger.js           User profile API documentation
    notification.swagger.js      Notification API documentation
    admin-user.swagger.js        Admin user API documentation
    components.swagger.js        Shared tags and reusable schemas
```

Swagger UI is mounted at:

```text
/v1/api-docs
```

## Request Flow

1. `src/index.js` starts the server.
2. `src/app.js` registers global middleware and mounts routes at `/v1`.
3. Route files in `src/routes` attach middleware and controller functions.
4. Validation middleware checks request data using Joi schemas from `src/validations`.
5. Controllers call services and models to perform application work.
6. Responses are returned through shared utilities from `src/utils`.

## Useful Commands

```bash
npm run dev
npm start
npm run lint
npm test
```
