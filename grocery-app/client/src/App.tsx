import { useState } from 'react'
import './App.css'
import GroceryForm from './components/GroceryForm'
import GroceryList from './components/GroceryList'

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#232323', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
      <div style={{ width: '100%', maxWidth: 420, margin: '60px auto', background: '#2d2d2d', borderRadius: 12, boxShadow: '0 2px 16px #0002', padding: '32px 28px' }}>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 16, textAlign: 'center', color: '#fff' }}>Add a Grocery Item</h2>
          <GroceryForm />
        </section>
        <hr style={{ margin: '40px 0', border: 0, borderTop: '1px solid #444' }} />
        <section>
          <h2 style={{ marginBottom: 16, textAlign: 'center', color: '#fff' }}>View Grocery List by Date</h2>
          <GroceryList />
        </section>
      </div>
    </div>
  )
}

export default App
