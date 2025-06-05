// src/lib/firebase.ts
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_BASE64 in env');
}

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString(
    'utf-8',
  ),
);
const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApps()[0];
const messaging = getMessaging(app);

export { app as firebaseAdmin, messaging };
