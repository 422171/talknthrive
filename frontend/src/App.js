// App.js
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import BackgroundSection from './components/BackgroundSection';

import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add a default route if needed */}
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<BackgroundSection />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;