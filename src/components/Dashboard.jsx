import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobsAPI } from '../services/api';
import Header from './Header';
import JobCard from './JobCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    skills: []
  });
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Refetch jobs whenever the authenticated user changes
    console.log('Dashboard - User or auth status changed:', { userId: user?.id, isAuthenticated });
    
    // Reset job list when logging out
    if (!isAuthenticated) {
      setJobs([]);
    }
    
    fetchJobs();
  }, [isAuthenticated, user?.id]); // Add user.id as a dependency to refetch when user changes

  const fetchJobs = async (queryFilters = {}) => {
    setLoading(true);
    try {
      // Add console logs for debugging
      console.log('Dashboard - Auth Status:', { isAuthenticated, userId: user?.id });
      console.log('Dashboard - Token:', localStorage.getItem('token'));
      
      // If user is authenticated, fetch only their jobs using the user-specific endpoint
      // Otherwise, fetch all public jobs
      const response = isAuthenticated
        ? await jobsAPI.getUserJobs()
        : await jobsAPI.getAllJobs(queryFilters);
      
      console.log('Dashboard - Fetched Jobs:', response.data);
      
      setJobs(response.data);
      setError(null);
    } catch (err) {
      console.error('Dashboard - Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs({ title: searchTerm });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      fetchJobs();
    }
  };

  const handleAddSkill = (skill) => {
    if (!filters.skills.includes(skill)) {
      const newSkills = [...filters.skills, skill];
      setFilters({ ...filters, skills: newSkills });
    }
  };

  const handleRemoveSkill = (skill) => {
    const newSkills = filters.skills.filter(s => s !== skill);
    setFilters({ ...filters, skills: newSkills });
  };

  const handleApplyFilter = () => {
    const queryFilters = {};
    if (filters.skills.length > 0) {
      queryFilters.skills = filters.skills.join(',');
    }
    if (searchTerm) {
      queryFilters.title = searchTerm;
    }
    fetchJobs(queryFilters);
  };

  return (
    <div className="dashboard">
      <Header />
      
      <div className="search-container">
        <form className="search-box" onSubmit={handleSearch}>
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Type any job title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
        
        <div className="filter-container">
          <div className="filter-dropdown">
            <span className="filter-text">Skills</span>
            <span className="filter-dropdown-icon">
              <i className="fas fa-chevron-down"></i>
            </span>
          </div>
          
          {/* Available skills to select */}
          <div className="skill-filter">
            <div className="skill-btn">Frontend</div>
            <div className="remove-skill-btn" onClick={() => handleAddSkill('Frontend')}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
          
          <div className="skill-filter">
            <div className="skill-btn">CSS</div>
            <div className="remove-skill-btn" onClick={() => handleAddSkill('CSS')}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
          
          <div className="skill-filter">
            <div className="skill-btn">JavaScript</div>
            <div className="remove-skill-btn" onClick={() => handleAddSkill('JavaScript')}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
          
          <div className="apply-filter-btn" onClick={handleApplyFilter}>
            Apply Filter
          </div>
        </div>
        
        {/* Selected filters */}
        {filters.skills.length > 0 && (
          <div className="selected-filters">
            {filters.skills.map((skill, index) => (
              <div key={index} className="skill-filter">
                <div className="skill-btn">{skill}</div>
                <div className="remove-skill-btn" onClick={() => handleRemoveSkill(skill)}>
                  <i className="fas fa-times"></i>
                </div>
              </div>
            ))}
            <div className="clear-filters" onClick={() => setFilters({ skills: [] })}>
              Clear
            </div>
          </div>
        )}
      </div>
      
      <div className="job-listings">
        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">No jobs found</div>
        ) : (
          jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
      
      {isAuthenticated && (
        <Link to="/add-job" className="add-job-btn">
          + Add Job
        </Link>
      )}
    </div>
  );
};

export default Dashboard; 