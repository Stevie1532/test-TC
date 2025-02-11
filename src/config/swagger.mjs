import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TrosChat API",
      version: "1.0.0",
      description:
        "API documentation for TrosChat, a location-based anonymous chat app.",
    },
    servers: [
      { url: "http://localhost:3000/api", description: "Local server" },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            username: { type: "string" },
            words: { type: "array", items: { type: "string" } },
            location: {
              type: "object",
              properties: {
                type: { type: "string", example: "Point" },
                coordinates: { type: "array", items: { type: "number" } },
              },
            },
          },
        },
        Request: {
          type: "object",
          properties: {
            senderId: { type: "string", format: "objectId" },
            receiverId: { type: "string", format: "objectId" },
            status: { type: "string", enum: ["pending", "accepted", "denied"] },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.mjs"], // Path to your route files
};

const specs = swaggerJsdoc(options);

export default specs;
