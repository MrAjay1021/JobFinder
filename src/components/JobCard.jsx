import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const JobCard = ({ job }) => {
  const { isAuthenticated, user } = useAuth();
  const isOwner = isAuthenticated && user && job.postedBy?._id === user?._id;

  return (
    <div className="job-card">
      <div className="job-card__indicator" />
      <img 
        className="job-card__logo" 
        src={job.logoUrl || 'https://via.placeholder.com/55'} 
        alt={job.companyName} 
      />
      <div className="job-card__content">
        <h3 className="job-card__title">{job.title}</h3>
        <div className="job-details">
          <div className="job-detail">
            <span className="job-detail-icon">
              <i className="fas fa-users"></i>
            </span>
            <span>{job.companySize || '11-50'}</span>
          </div>
          <div className="job-detail">
            <span className="job-detail-icon">
              <i className="fas fa-rupee-sign"></i>
            </span>
            <span>{job.monthlySalary.toLocaleString()}</span>
          </div>
          <div className="job-detail">
            <span className="job-detail-icon">
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span>{job.location}</span>
          </div>
        </div>

        <div className="job-type-container">
          <span className="job-type">{job.remoteOffice}</span>
          <span className="job-type">{job.jobType}</span>
        </div>

        {job.skillsRequired && job.skillsRequired.length > 0 && (
          <div className="job-skills">
            {job.skillsRequired.map((skill, index) => (
              <span key={index} className="job-skill">{skill}</span>
            ))}
          </div>
        )}
      </div>

      <div className="job-actions">
        {isAuthenticated && isOwner && (
          <Link to={`/edit-job/${job._id}`} className="job-action-btn edit-btn">
            Edit job
          </Link>
        )}
        <Link to={isAuthenticated ? `/view-job-logged-in/${job._id}` : `/view-job/${job._id}`} className="job-action-btn view-btn">
          View details
        </Link>
      </div>
    </div>
  );
};

export default JobCard; 