import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: '', name: '' });
  const [showModal, setShowModal] = useState(false);

  const loadItems = async () => {
    const res = await axios.get('http://localhost:8080/api/items');
    setItems(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`http://localhost:8080/api/items/${form.id}`, form);
    } else {
      await axios.post('http://localhost:8080/api/items', form);
    }
    setForm({ id: '', name: '' });
    setShowModal(false);
    loadItems();
  };

  const handleEdit = (item) => {
    setForm(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/items/${id}`);
    loadItems();
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <h3>Items</h3>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Item
      </button>

      <ul className="list-group">
        {items.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <div>
              <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{form.id ? 'Edit' : 'Add'} Item</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Item name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Items;
