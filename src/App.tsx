import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { AdminApp } from './admin/AdminApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}

export default App;
