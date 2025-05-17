import React, { useState } from 'react';
import api from '../api/axios';

const GroceryForm: React.FC = () => {
  const [item, setItem] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (!item.trim() || !date) {
      setError('Please enter both the grocery item and the date.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/add-item', { item, date });
      setMessage('Grocery item saved successfully!');
      setItem('');
      setDate('');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to save the grocery item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <label style={{ color: '#fff' }}>
        Grocery Item
        <input
          type="text"
          value={item}
          onChange={e => setItem(e.target.value)}
          placeholder="Enter grocery item"
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>
      <label style={{ color: '#fff' }}>
        Buy on:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="submit" disabled={loading} style={{ padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, minWidth: 140 }}>
          {loading ? 'Saving...' : 'Save Item'}
        </button>
      </div>
      {message && <div style={{ color: 'lightgreen', textAlign: 'center' }}>{message}</div>}
      {error && <div style={{ color: 'salmon', textAlign: 'center' }}>{error}</div>}
    </form>
  );
};

export default GroceryForm;
