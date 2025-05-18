// Handles Google Sheets API authentication using service account from environment

import { google } from 'googleapis';

export function getSheetsClient() {
  const rawCreds = process.env.GOOGLE_SERVICE_ACCOUNT;

  if (!rawCreds) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT environment variable not set.');
  }

  const creds = JSON.parse(rawCreds);

  // Fix for private_key newlines when loaded from env
  const fixedPrivateKey = creds.private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: fixedPrivateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheetsClient = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '1vkDRkPh37FYVrrfGJ6nxIltxUs9NrL2SuOlmHCop0As'; // Replace with your actual ID if needed

  return { sheetsClient, spreadsheetId };
}
