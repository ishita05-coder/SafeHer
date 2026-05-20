import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '', relation: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/contacts', formData);
      setContacts([...contacts, res.data.data]);
      setFormData({ name: '', phone: '', relation: '' });
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add contact');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (error) {
      alert('Failed to delete contact');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="glass p-4 rounded-xl flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Emergency Contacts
        </h1>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-slate-700"
        >
          ← Back to Dashboard
        </button>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-semibold mb-4">Add New Contact</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Name" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder="Phone Number (e.g. +1234567890)" 
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Relation (e.g. Parent, Friend)" 
                required
                value={formData.relation}
                onChange={e => setFormData({...formData, relation: e.target.value})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-bold shadow-lg shadow-pink-500/30 transition-all">
              Save Contact
            </button>
          </form>
        </div>

        <div className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Your Contacts</h2>
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : contacts.length === 0 ? (
            <p className="text-slate-400">No contacts added yet. Add one to be notified during SOS.</p>
          ) : (
            <ul className="space-y-4">
              {contacts.map(contact => (
                <li key={contact._id} className="p-4 bg-slate-800 rounded-xl flex justify-between items-center border border-slate-700">
                  <div>
                    <h3 className="font-bold text-lg">{contact.name}</h3>
                    <p className="text-slate-400 text-sm">{contact.relation}</p>
                    <p className="text-pink-400 font-mono text-sm">{contact.phone}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(contact._id)}
                    className="p-2 text-red-500 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Delete Contact"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contacts;
