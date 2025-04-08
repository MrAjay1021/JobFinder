import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import '../styles/AddJob.css';

const AddJob = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const [jobData, setJobData] = useState({
    title: '',
    companyName: '',
    location: '',
    jobType: 'Full-time',
    description: '',
    monthlySalary: '',
    skillsRequired: [],
    applyBy: ''
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!jobData.title) errors.title = 'Job title is required';
    if (!jobData.companyName) errors.companyName = 'Company name is required';
    if (!jobData.location) errors.location = 'Location is required';
    if (!jobData.description) errors.description = 'Description is required';
    if (!jobData.monthlySalary) errors.monthlySalary = 'Salary is required';
    if (jobData.skillsRequired.length === 0) errors.skillsRequired = 'At least one skill is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({...formErrors, [name]: ''});
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !jobData.skillsRequired.includes(currentSkill.trim())) {
      setJobData({
        ...jobData,
        skillsRequired: [...jobData.skillsRequired, currentSkill.trim()]
      });
      setCurrentSkill('');
      
      // Clear skill error if it exists
      if (formErrors.skillsRequired) {
        setFormErrors({...formErrors, skillsRequired: ''});
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setJobData({
      ...jobData,
      skillsRequired: jobData.skillsRequired.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format salary as number
      const formattedData = {
        ...jobData,
        monthlySalary: Number(jobData.monthlySalary),
        postedBy: user._id
      };
      
      await jobsAPI.createJob(formattedData);
      alert('Job posted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-job-page">
      <Header />
      
      <div className="add-job-container">
        <h1 className="add-job-title">Post a New Job</h1>
        
        <form className="add-job-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Job Title <span className="required">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              onChange={handleInputChange}
              placeholder="e.g. Frontend Developer"
              className={formErrors.title ? 'input-error' : ''}
            />
            {formErrors.title && <span className="error-message">{formErrors.title}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName">Company Name <span className="required">*</span></label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={jobData.companyName}
                onChange={handleInputChange}
                placeholder="e.g. Acme Inc."
                className={formErrors.companyName ? 'input-error' : ''}
              />
              {formErrors.companyName && <span className="error-message">{formErrors.companyName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location <span className="required">*</span></label>
              <input
                type="text"
                id="location"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                placeholder="e.g. Remote, Bangalore"
                className={formErrors.location ? 'input-error' : ''}
              />
              {formErrors.location && <span className="error-message">{formErrors.location}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobType">Job Type <span className="required">*</span></label>
              <select
                id="jobType"
                name="jobType"
                value={jobData.jobType}
                onChange={handleInputChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="monthlySalary">Monthly Salary (₹) <span className="required">*</span></label>
              <input
                type="number"
                id="monthlySalary"
                name="monthlySalary"
                value={jobData.monthlySalary}
                onChange={handleInputChange}
                placeholder="e.g. 50000"
                className={formErrors.monthlySalary ? 'input-error' : ''}
              />
              {formErrors.monthlySalary && <span className="error-message">{formErrors.monthlySalary}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Job Description <span className="required">*</span></label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleInputChange}
              placeholder="Describe the job responsibilities, requirements, benefits, etc."
              rows="6"
              className={formErrors.description ? 'input-error' : ''}
            ></textarea>
            {formErrors.description && <span className="error-message">{formErrors.description}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills Required <span className="required">*</span></label>
            <div className="skills-input-container">
              <input
                type="text"
                id="skills"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder="e.g. JavaScript, React"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                className={formErrors.skillsRequired ? 'input-error' : ''}
              />
              <button type="button" className="add-skill-btn" onClick={handleAddSkill}>Add</button>
            </div>
            {formErrors.skillsRequired && <span className="error-message">{formErrors.skillsRequired}</span>}
            
            <div className="skills-list">
              {jobData.skillsRequired.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {skill}
                  <span className="remove-skill" onClick={() => handleRemoveSkill(skill)}>×</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="applyBy">Application Deadline</label>
            <input
              type="date"
              id="applyBy"
              name="applyBy"
              value={jobData.applyBy}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="add-job-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob; 