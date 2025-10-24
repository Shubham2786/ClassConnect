import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { subjectsAPI } from '../services/api';

const Subjects = () => {
  const { data: subjects, loading, refetch } = useFetch(subjectsAPI.getAll);
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'Theory',
    credits: 3
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        await subjectsAPI.update(editingSubject.id, formData);
      } else {
        await subjectsAPI.create(formData);
      }
      setFormData({ name: '', code: '', type: 'Theory', credits: 3 });
      setShowForm(false);
      setEditingSubject(null);
      refetch();
    } catch (error) {
      console.error('Error saving subject:', error);
    }
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      type: subject.type,
      credits: subject.credits
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await subjectsAPI.delete(id);
        refetch();
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2>📚 Subjects</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add Subject'}
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">{editingSubject ? 'Edit Subject' : 'Add New Subject'}</h6>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Subject Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Subject Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Type</label>
                      <select
                        className="form-select"
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                      >
                        <option value="Theory">Theory</option>
                        <option value="Lab">Lab</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Credits</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="10"
                        value={formData.credits}
                        onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {editingSubject ? 'Update Subject' : 'Add Subject'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {subjects && subjects.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Credits</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject) => (
                        <tr key={subject.id}>
                          <td>{subject.name}</td>
                          <td>{subject.code}</td>
                          <td>
                            <span className={`badge ${subject.type === 'Lab' ? 'bg-info' : 'bg-secondary'}`}>
                              {subject.type}
                            </span>
                          </td>
                          <td>{subject.credits}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEdit(subject)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(subject.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted mb-0">No subjects found. Add your first subject to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;