import React, { useState } from 'react';
import api from '../api/axios';

const GroceryList: React.FC = () => {
  const [date, setDate] = useState('');
  const [items, setItems] = useState<Array<{ item: string; date: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queried, setQueried] = useState(false);

  const handleShowList = async () => {
    setError(null);
    setQueried(false);
    setItems([]);
    if (!date) {
      setError('Please select a date.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.get<{ items: Array<{ item: string; date: string }> }>(`/items-by-date?date=${date}`);
      setItems(res.data.items || []);
      setQueried(true);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to fetch items.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <label>
        Show items to be bought on
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>
      <button onClick={handleShowList} disabled={loading} style={{ padding: 10, background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, marginBottom: 20 }}>
        {loading ? 'Loading...' : 'Show Grocery List'}
      </button>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      {queried && (
        <div>
          <h3>My items to buy</h3>
          {items.length === 0 ? (
            <div>No items found for selected date</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Item</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.item}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default GroceryList;
