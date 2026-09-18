import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Status from './pages/Status';
import Admin from './pages/Admin';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  useEffect(() => {
    // Effect 8: Day/night accent shift
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) {
      document.documentElement.setAttribute('data-time', 'night');
    } else {
      document.documentElement.removeAttribute('data-time');
    }
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.PROD ? '/sare-express' : '/'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/status" element={<Status />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;