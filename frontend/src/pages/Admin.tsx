import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import './Admin.css';

type Status = 'pending' | 'under_review' | 'approved' | 'rejected';

interface Application {
  id: number;
  application_id: string;
  full_name: string;
  city: string;
  vehicle_type: string;
  submitted_at: string;
  status: Status;
  phone: string;
  email: string;
  id_document_path: string;
  photo_path: string;
  rejection_reason?: string;
}

const STATUS_LABEL: Record<Status, string> = {
  pending: 'Pending',
  under_review: 'Under review',
  approved: 'Approved',
  rejected: 'Rejected',
};

export default function Admin() {
  const [apps, setApps] = useState<Application[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [search, setSearch] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showReject, setShowReject] = useState(false);

  // Mock data
  useEffect(() => {
    setApps([
      { id: 1, application_id: 'SARE-A1B2C3', full_name: 'Emeka Okafor', city: 'Lagos', vehicle_type: 'Motorcycle', submitted_at: '2026-01-15', status: 'pending', phone: '08012345678', email: 'emeka@email.com', id_document_path: '/uploads/riders/SARE-A1B2C3/id_document.jpg', photo_path: '/uploads/riders/SARE-A1B2C3/photo.jpg' },
      { id: 2, application_id: 'SARE-D4E5F6', full_name: 'Aisha Bello', city: 'Abuja', vehicle_type: 'Bicycle', submitted_at: '2026-01-14', status: 'under_review', phone: '08087654321', email: 'aisha@email.com', id_document_path: '/uploads/riders/SARE-D4E5F6/id_document.jpg', photo_path: '/uploads/riders/SARE-D4E5F6/photo.jpg' },
      { id: 3, application_id: 'SARE-G7H8I9', full_name: 'Chidi Nwosu', city: 'Port Harcourt', vehicle_type: 'Tricycle', submitted_at: '2026-01-13', status: 'approved', phone: '08055555555', email: 'chidi@email.com', id_document_path: '/uploads/riders/SARE-G7H8I9/id_document.jpg', photo_path: '/uploads/riders/SARE-G7H8I9/photo.jpg' },
      { id: 4, application_id: 'SARE-J1K2L3', full_name: 'Blessing Adeyemi', city: 'Lagos', vehicle_type: 'Motorcycle', submitted_at: '2026-01-12', status: 'rejected', phone: '08098765432', email: 'blessing@email.com', id_document_path: '/uploads/riders/SARE-J1K2L3/id_document.jpg', photo_path: '/uploads/riders/SARE-J1K2L3/photo.jpg', rejection_reason: 'ID document unreadable.' },
    ]);
  }, []);

  const selected = useMemo(
    () => apps.find((a) => a.id === selectedId) || null,
    [apps, selectedId]
  );

  const filtered = useMemo(() => {
    return apps.filter((a) => {
      if (filterStatus && a.status !== filterStatus) return false;
      if (filterCity && a.city !== filterCity) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.full_name.toLowerCase().includes(q) &&
          !a.phone.includes(q) &&
          !a.application_id.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [apps, filterStatus, filterCity, search]);

  const counts = useMemo(() => ({
    total: apps.length,
    pending: apps.filter((a) => a.status === 'pending').length,
    under_review: apps.filter((a) => a.status === 'under_review').length,
    approved: apps.filter((a) => a.status === 'approved').length,
    rejected: apps.filter((a) => a.status === 'rejected').length,
  }), [apps]);

  const updateStatus = (id: number, status: Status, reason?: string) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status, rejection_reason: reason ?? a.rejection_reason } : a
      )
    );
    setShowReject(false);
    setRejectReason('');
  };

  const initials = (name: string) =>
    name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <>
      <Nav />
      <div className="admin container">
        {/* Header */}
        <header className="admin-header">
          <div>
            <h1>Rider applications</h1>
            <p className="admin-sub">
              Review, approve, and track incoming riders across all cities.
            </p>
          </div>
          <Link to="/" className="btn btn-outline">← Back to site</Link>
        </header>

        {/* Stats strip */}
        <div className="admin-stats">
          <div className="stat">
            <span className="stat-label">Total</span>
            <span className="stat-value">{counts.total}</span>
          </div>
          <div className="stat stat-pending">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{counts.pending}</span>
          </div>
          <div className="stat stat-review">
            <span className="stat-label">Under review</span>
            <span className="stat-value">{counts.under_review}</span>
          </div>
          <div className="stat stat-approved">
            <span className="stat-label">Approved</span>
            <span className="stat-value">{counts.approved}</span>
          </div>
          <div className="stat stat-rejected">
            <span className="stat-label">Rejected</span>
            <span className="stat-value">{counts.rejected}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              placeholder="Search by name, phone, or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
            <option value="">All cities</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
          </select>
        </div>

        {/* Layout */}
        <div className="admin-layout">
          {/* Table */}
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>City</th>
                  <th>Vehicle</th>
                  <th>Submitted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="empty-row">
                      No applications match your filters.
                    </td>
                  </tr>
                )}
                {filtered.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedId(app.id)}
                    className={selectedId === app.id ? 'is-selected' : ''}
                  >
                    <td>
                      <div className="cell-applicant">
                        <span className={`avatar avatar-${app.status}`}>
                          {initials(app.full_name)}
                        </span>
                        <div>
                          <div className="cell-name">{app.full_name}</div>
                          <div className="cell-id">{app.application_id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{app.city}</td>
                    <td>{app.vehicle_type}</td>
                    <td className="cell-date">{app.submitted_at}</td>
                    <td>
                      <span className={`status-pill status-${app.status}`}>
                        <span className="status-dot" />
                        {STATUS_LABEL[app.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail drawer */}
          {selected && (
            <aside className="admin-drawer">
              <button className="drawer-close" onClick={() => setSelectedId(null)}>×</button>

              <div className="drawer-head">
                <span className={`avatar avatar-lg avatar-${selected.status}`}>
                  {initials(selected.full_name)}
                </span>
                <div>
                  <h2>{selected.full_name}</h2>
                  <p className="drawer-id">{selected.application_id}</p>
                </div>
              </div>

              <div className="drawer-status-row">
                <span className={`status-pill status-${selected.status}`}>
                  <span className="status-dot" />
                  {STATUS_LABEL[selected.status]}
                </span>
                <span className="drawer-city">{selected.city}</span>
              </div>

              <div className="drawer-section">
                <h3>Contact</h3>
                <div className="drawer-grid">
                  <div><span>Phone</span><strong>{selected.phone}</strong></div>
                  <div><span>Email</span><strong>{selected.email}</strong></div>
                </div>
              </div>

              <div className="drawer-section">
                <h3>Vehicle</h3>
                <div className="drawer-grid">
                  <div><span>Type</span><strong>{selected.vehicle_type}</strong></div>
                  <div><span>Submitted</span><strong>{selected.submitted_at}</strong></div>
                </div>
              </div>

              <div className="drawer-section">
                <h3>Documents</h3>
                <div className="drawer-images">
                  <figure>
                    <img src={selected.id_document_path} alt="ID document" />
                    <figcaption>Government ID</figcaption>
                  </figure>
                  <figure>
                    <img src={selected.photo_path} alt="Passport photo" />
                    <figcaption>Passport photo</figcaption>
                  </figure>
                </div>
              </div>

              {selected.rejection_reason && (
                <div className="drawer-rejection">
                  <span>Rejection reason</span>
                  <p>{selected.rejection_reason}</p>
                </div>
              )}

              <div className="drawer-actions">
                {selected.status !== 'approved' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => updateStatus(selected.id, 'approved')}
                  >
                    Approve rider
                  </button>
                )}
                {selected.status !== 'rejected' && (
                  <button
                    className="btn btn-outline btn-danger"
                    onClick={() => setShowReject(true)}
                  >
                    Reject
                  </button>
                )}
              </div>

              {showReject && (
                <div className="drawer-reject-form">
                  <textarea
                    placeholder="Reason for rejection (sent to applicant)…"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <div className="reject-actions">
                    <button className="btn btn-ghost" onClick={() => setShowReject(false)}>
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger-solid"
                      disabled={!rejectReason.trim()}
                      onClick={() =>
                        updateStatus(selected.id, 'rejected', rejectReason.trim())
                      }
                    >
                      Confirm rejection
                    </button>
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </>
  );
}