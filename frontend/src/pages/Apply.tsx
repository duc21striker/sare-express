import { useState } from 'react';
import Nav from '../components/Nav';
import './Apply.css';

interface FormData {
  fullName: string; dob: string; gender: string; phone: string; email: string;
  address: string; city: string; nextOfKin: string; nextOfKinPhone: string;
  idType: string; idNumber: string; idFile: File | null; photoFile: File | null;
  vehicleType: string; plateNumber: string; vehicleDocFile: File | null;
  yearsExp: string;
}

const initialData: FormData = {
  fullName: '', dob: '', gender: '', phone: '', email: '',
  address: '', city: '', nextOfKin: '', nextOfKinPhone: '',
  idType: '', idNumber: '', idFile: null, photoFile: null,
  vehicleType: '', plateNumber: '', vehicleDocFile: null, yearsExp: ''
};

export default function Apply() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [animating, setAnimating] = useState(false);

  const update = (field: keyof FormData, value: any) => setData(prev => ({ ...prev, [field]: value }));

  const goToStep = (newStep: number) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(newStep);
      setAnimating(false);
    }, 200);
  };

  const handleSubmit = async () => {
    // Build FormData for API
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) formData.append(key, value);
      else formData.append(key, value as string);
    });
    
    try {
      // Replace with actual API call
      // const res = await fetch('/api/applications', { method: 'POST', body: formData });
      // const json = await res.json();
      const mockId = 'SARE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setAppId(mockId);
      setSubmitted(true);
    } catch (err) {
      alert('Submission failed. Please try again.');
    }
  };

  if (submitted) {
    return (
      <>
        <Nav />
        <div className="container apply-container">
          <div className="confirmation-card reveal is-visible">
            <div className="check-icon">✓</div>
            <h2>Application received!</h2>
            <p className="app-id">Application ID: <strong>{appId}</strong></p>
            <span className="badge" style={{ background: 'rgba(245,166,35,0.15)', color: 'var(--gold)' }}>Pending review</span>
            <p className="confirmation-note">We're checking your documents — this usually takes 24–48 hours. We'll text and email you once you're approved.</p>
            <a href="/status" className="btn btn-outline" style={{ marginTop: 24 }}>Check status</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="container apply-container">
        <h1>Become a rider</h1>
        <p className="apply-sub">Join our network of vetted delivery riders.</p>
        
        <div className="progress-bar">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`progress-step ${step >= s ? 'active' : ''}`}>
              <span className="progress-dot">{step > s ? '✓' : s}</span>
              <span className="progress-label">{s === 1 ? 'Personal' : s === 2 ? 'Identity' : 'Review'}</span>
            </div>
          ))}
        </div>

        <div className={`form-container ${animating ? 'slide-out' : ''}`}>
          {step === 1 && (
            <div className="form-step">
              <h3>Personal details</h3>
              <div className="form-grid">
                <input placeholder="Full name" value={data.fullName} onChange={e => update('fullName', e.target.value)} />
                <input type="date" placeholder="Date of birth" value={data.dob} onChange={e => update('dob', e.target.value)} />
                <select value={data.gender} onChange={e => update('gender', e.target.value)}>
                  <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
                <input placeholder="Phone number" value={data.phone} onChange={e => update('phone', e.target.value)} />
                <input type="email" placeholder="Email" value={data.email} onChange={e => update('email', e.target.value)} />
                <input placeholder="Home address" value={data.address} onChange={e => update('address', e.target.value)} />
                <select value={data.city} onChange={e => update('city', e.target.value)}>
                  <option value="">Select city</option><option>Lagos</option><option>Abuja</option><option>Port Harcourt</option>
                </select>
                <input placeholder="Next of kin name" value={data.nextOfKin} onChange={e => update('nextOfKin', e.target.value)} />
                <input placeholder="Next of kin phone" value={data.nextOfKinPhone} onChange={e => update('nextOfKinPhone', e.target.value)} />
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" onClick={() => goToStep(2)}>Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Identity & vehicle</h3>
              <div className="form-grid">
                <select value={data.idType} onChange={e => update('idType', e.target.value)}>
                  <option value="">ID type</option><option>NIN</option><option>Driver's License</option><option>Voter's Card</option><option>International Passport</option>
                </select>
                <input placeholder="ID number" value={data.idNumber} onChange={e => update('idNumber', e.target.value)} />
                <label className="file-input">Upload ID document <input type="file" accept="image/*" onChange={e => update('idFile', e.target.files?.[0] || null)} /></label>
                <label className="file-input">Upload passport photo <input type="file" accept="image/*" onChange={e => update('photoFile', e.target.files?.[0] || null)} /></label>
                <select value={data.vehicleType} onChange={e => update('vehicleType', e.target.value)}>
                  <option value="">Vehicle type</option><option>Motorcycle</option><option>Bicycle</option><option>Tricycle</option>
                </select>
                {data.vehicleType !== 'Bicycle' && (
                  <input placeholder="Plate number" value={data.plateNumber} onChange={e => update('plateNumber', e.target.value)} />
                )}
                <label className="file-input">Upload vehicle document <input type="file" accept="image/*" onChange={e => update('vehicleDocFile', e.target.files?.[0] || null)} /></label>
                <input placeholder="Years of riding experience" value={data.yearsExp} onChange={e => update('yearsExp', e.target.value)} />
              </div>
              <div className="form-actions">
                <button className="btn btn-ghost" onClick={() => goToStep(1)}>Back</button>
                <button className="btn btn-primary" onClick={() => goToStep(3)}>Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h3>Review & submit</h3>
              <div className="review-grid">
                <div className="review-item"><span>Name</span><strong>{data.fullName}</strong><button onClick={() => goToStep(1)}>Edit</button></div>
                <div className="review-item"><span>City</span><strong>{data.city}</strong><button onClick={() => goToStep(1)}>Edit</button></div>
                <div className="review-item"><span>ID Type</span><strong>{data.idType}</strong><button onClick={() => goToStep(2)}>Edit</button></div>
                <div className="review-item"><span>Vehicle</span><strong>{data.vehicleType}</strong><button onClick={() => goToStep(2)}>Edit</button></div>
              </div>
              <label className="consent">
                <input type="checkbox" />
                <span>I confirm this information is accurate and I consent to Sare Express verifying my documents</span>
              </label>
              <div className="form-actions">
                <button className="btn btn-ghost" onClick={() => goToStep(2)}>Back</button>
                <button className="btn btn-accent" onClick={handleSubmit}>Submit application</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}