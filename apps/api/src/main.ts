import { createApp, setupOpenApi } from './app.js';

async function bootstrap() {
  const app = await createApp();
  setupOpenApi(app);
  await app.listen(process.env.PORT ?? 3001);
}

void bootstrap();
