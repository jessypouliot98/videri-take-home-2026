import fs from 'fs';
import { createApp, createOpenApiDocument } from '../src/app.js';

/**
 * This script doesn't work
 * because of an issue where some data is missing from the OpenAPI document,
 * the .json to .d.ts errors.
 * The current solution is to manually generate it from the api instead of the CLI.
 */
async function generate() {
  const app = await createApp();
  const document = createOpenApiDocument(app);
  const documentString = JSON.stringify(document, null, 2);
  fs.writeFileSync(process.argv[2] ?? 'openapi.json', documentString);

  await app.close();
}

void generate();
