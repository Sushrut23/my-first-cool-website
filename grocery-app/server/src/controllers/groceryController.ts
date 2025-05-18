import { Request, Response } from 'express';
import { getSheetsClient } from '../config/googleApiConfig';

export class GroceryController {
  async addItem(req: Request, res: Response) {
    const { item, date } = req.body;
    if (!item || !date) {
      return res.status(400).json({ error: 'Item and date are required.' });
    }
    try {
      const { sheetsClient, spreadsheetId } = getSheetsClient();
      await sheetsClient.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:B',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[item, date]],
        },
      });
      res.json({ success: true, message: 'Item added.' });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to add item.' });
    }
  }

  async getItemsByDate(req: Request, res: Response) {
    const date = req.query.date as string;
    if (!date) {
      return res.status(400).json({ error: 'Date is required.' });
    }
    try {
      const { sheetsClient, spreadsheetId } = getSheetsClient();
      const result = await sheetsClient.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A:B',
      });
      const rows = result.data.values || [];
      const items = rows.filter(row => row[1] === date).map(row => ({ item: row[0], date: row[1] }));
      res.json({ items });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch items.' });
    }
  }
}
