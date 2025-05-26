import { S3Client } from '@aws-sdk/client-s3';
if (!process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY) {
  throw console.error('R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY');
}

const r2Endpoint =
  'https://6a041dfe24d207d6638700bb76b02118.r2.cloudflarestorage.com';
export const r2Client = new S3Client({
  region: 'auto', // R2 doesn't require a region
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
