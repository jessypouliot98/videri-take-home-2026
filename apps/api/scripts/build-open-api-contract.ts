import fs from 'fs';
import { createApp, createOpenApiDocument } from '../src/app.js';

async function generate() {
  const app = await createApp();
  const document = createOpenApiDocument(app);
  const documentString = JSON.stringify(document, null, 2);
  fs.writeFileSync(process.argv[2] ?? 'openapi.json', documentString);

  await app.close();
}

void generate();
