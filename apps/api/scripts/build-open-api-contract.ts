import fs from 'fs';
import { createApp, createOpenApiDocument } from '../src/app.js';

async function generate() {
  const app = await createApp();
  const document = createOpenApiDocument(app);

  fs.writeFileSync(
    process.argv[2] ?? 'openapi.json',
    JSON.stringify(document, null, 2),
  );

  await app.close();
}

void generate();
