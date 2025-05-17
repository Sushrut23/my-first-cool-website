// This file handles Google Sheets API authentication
// Ensure creds.json contains your service account credentials

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import path from 'path';

export function getSheetsClient() {
    const credsPath = path.join(__dirname, 'creds.json');
    const creds = JSON.parse(readFileSync(credsPath, 'utf8'));
    const auth = new google.auth.JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheetsClient = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1vkDRkPh37FYVrrfGJ6nxIltxUs9NrL2SuOlmHCop0As';
    return { sheetsClient, spreadsheetId };
}
