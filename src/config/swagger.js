import swaggerJSDoc from 'swagger-jsdoc';

const serverUrl = process.env.SERVER_URL || 'https://final-77ir.onrender.com';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Final Project API',
      version: '1.0.0',
      description: 'API documentation for the Final Project REST API',
    },
    servers: [
      {
        url: serverUrl,
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
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
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;