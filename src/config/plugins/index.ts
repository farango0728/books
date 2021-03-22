import Hapi from '@hapi/hapi';
// import Inert from '@hapi/inert';
// import Vision from '@hapi/vision';

export default async function initializePlugins(server: Hapi.Server): Promise<void> {
  try {
    // Docs -> Swagger
    // await server.register([
    //   Inert,
    //   Vision
    // ]);
  } catch (err) {
    console.error('Docs plugin error:', err);
  }
}