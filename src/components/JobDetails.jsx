import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobsAPI, applicationsAPI } from '../services/api';
import Header from './Header';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const isOwner = isAuthenticated && user && job?.postedBy?._id === user._id;
  const hasApplied = isAuthenticated && user?.applications?.some(app => app.job === id);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await jobsAPI.getJobById(id);
      setJob(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch job details. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await applicationsAPI.submitApplication({ jobId: id });
      alert('Application submitted successfully!');
      fetchJobDetails(); // Refresh to update application status
    } catch (err) {
      alert('Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (error || !job) {
    return <div className="error">{error || 'Job not found'}</div>;
  }

  return (
    <div className="job-details-page">
      <Header />
      
      <div className="job-header">
        <h1 className="job-header-title">
          {job.title} work from home job/internship at {job.companyName}
        </h1>
      </div>
      
      <div className="job-details-container">
        <div className="job-meta">
          <span className="job-meta-item">1w ago</span>
          <span className="job-meta-dot">.</span>
          <span className="job-meta-item">{job.jobType}</span>
          {job.companyName && (
            <>
              <span className="job-meta-dot">.</span>
              <span className="job-meta-item">{job.companyName}</span>
            </>
          )}
        </div>
        
        <h2 className="job-title">{job.title}</h2>
        <p className="job-location">{job.location} | India</p>
        
        <div className="job-info-section">
          <div className="job-info-item">
            <div className="job-info-label">
              <span className="job-info-icon">
                <i className="fas fa-money-bill-alt"></i>
              </span>
              Stipend
            </div>
            <div className="job-info-value">
              Rs {job.monthlySalary.toLocaleString()}/month
            </div>
          </div>
          
          <div className="job-info-item">
            <div className="job-info-label">
              <span className="job-info-icon">
                <i className="fas fa-calendar-alt"></i>
              </span>
              Duration
            </div>
            <div className="job-info-value">
              6 Months
            </div>
          </div>
        </div>
        
        <div className="section">
          <h3 className="section-title">About company</h3>
          <p className="section-content">{job.description}</p>
        </div>
        
        <div className="section">
          <h3 className="section-title">About the job/internship</h3>
          <p className="section-content">{job.description}</p>
        </div>
        
        <div className="section">
          <h3 className="section-title">Skill(s) required</h3>
          <div className="job-skills">
            {job.skillsRequired && job.skillsRequired.map((skill, index) => (
              <div key={index} className="job-skill">{skill}</div>
            ))}
          </div>
        </div>
        
        <div className="section">
          <h3 className="section-title">Additional Information</h3>
          <p className="section-content">
            Stipend structure: This is a performance-based internship. 
            In addition to the minimum-assured stipend, you will also be 
            paid a performance-linked incentive (₹ 2500 per design).
          </p>
        </div>
        
        {isOwner ? (
          <div className="edit-job-btn" onClick={() => navigate(`/edit-job/${id}`)}>
            Edit job
          </div>
        ) : isAuthenticated && !hasApplied ? (
          <button 
            className="apply-job-btn" 
            onClick={handleApply} 
            disabled={applying}
          >
            {applying ? 'Applying...' : 'Apply Now'}
          </button>
        ) : isAuthenticated && hasApplied ? (
          <div className="applied-message">
            You have already applied for this job
          </div>
        ) : (
          <button 
            className="apply-job-btn" 
            onClick={() => navigate('/login')}
          >
            Login to Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetails; 