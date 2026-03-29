import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS Boilerplate API',
      version: '1.0.0',
      description: 'API documentation for all routes under /src/routes',
    },
    servers: [
      {
        url: '/v1',
        description: 'Base API path',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/**/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
