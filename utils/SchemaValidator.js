
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { expect } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class SchemaValidator {
  static ajv = addFormats(new Ajv({ allErrors: true }));

  static validateSchema(data, schemaFile) {
    const schemaPath = path.resolve(__dirname, '../schemas', schemaFile);
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.error(`❌ Schema validation failed:\n`, validate.errors);
    }

    expect(valid).toBe(true);
  }
}
