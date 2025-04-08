import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
// CSS is now loaded in the index.html file directly from css folder

// Components
import AddJob from './components/AddJob';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import JobDetails from './components/JobDetails';
import MainPage from './pages/MainPage';
import JobViewDetailsWithoutLogin from './pages/JobViewDetailsWithoutLogin';
import JobViewDetailsWithLogin from './pages/JobViewDetailsWithLogin';

// Placeholder components - will be implemented later
const Profile = () => <div>Profile Page</div>;
const MyApplications = () => <div>My Applications Page</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Dashboard />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/view-job/:id" element={<JobViewDetailsWithoutLogin />} />
            <Route path="/view-job-logged-in/:id" element={<JobViewDetailsWithLogin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-job" element={<AddJob />} />
            <Route path="/my-applications" element={<MyApplications />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 