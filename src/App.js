import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Placeholder components - will be implemented later
const Home = () => <div>Home Page</div>;
const Login = () => <div>Login Page</div>;
const Register = () => <div>Register Page</div>;
const JobList = () => <div>Job List Page</div>;
const JobDetail = () => <div>Job Detail Page</div>;
const Profile = () => <div>Profile Page</div>;
const PostJob = () => <div>Post Job Page</div>;
const MyApplications = () => <div>My Applications Page</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/my-applications" element={<MyApplications />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 