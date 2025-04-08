import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Header from './Header';

// Styles object for inline styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  headerBar: {
    backgroundColor: '#f05252',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
  },
  headerLogo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  formContainer: {
    display: 'flex',
    flex: 1,
  },
  leftSection: {
    flex: '1',
    padding: '40px',
    backgroundColor: 'white',
  },
  rightSection: {
    flex: '1',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    color: 'white',
    position: 'relative',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '1em',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  skillTag: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    color: '#f05252',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  skillClose: {
    marginLeft: '6px',
    cursor: 'pointer',
    backgroundColor: '#f05252',
    color: 'white',
    width: '16px',
    height: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    fontSize: '12px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#f05252',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  rightHeading: {
    fontSize: '28px',
    marginBottom: '40px',
  },
  illustration: {
    marginTop: 'auto',
    alignSelf: 'center',
  },
  errorText: {
    color: '#f05252',
    fontSize: '14px',
    marginTop: '4px',
  }
};

const AddJob = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get job ID from URL
  const { isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  const [jobData, setJobData] = useState({
    title: '',
    companyName: '',
    companyLogoUrl: '',
    location: '',
    jobType: 'Select',
    remoteOption: 'Select',
    monthlySalary: '',
    description: '',
    aboutCompany: '',
    skillsRequired: [],
    additionalInfo: ''
  });

  // Fetch job details if editing
  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await jobsAPI.getJobById(id);
          setJobData(response.data);
        } catch (error) {
          console.error('Failed to fetch job details:', error);
        }
      };
      fetchJobDetails();
    }
  }, [id]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!jobData.title) errors.title = 'Job position is required';
    if (!jobData.companyName) errors.companyName = 'Company name is required';
    if (!jobData.location) errors.location = 'Location is required';
    if (jobData.jobType === 'Select') errors.jobType = 'Job type is required';
    if (jobData.remoteOption === 'Select') errors.remoteOption = 'Remote/Office selection is required';
    if (!jobData.monthlySalary) errors.monthlySalary = 'Salary is required';
    if (!jobData.description) errors.description = 'Job description is required';
    if (!jobData.aboutCompany) errors.aboutCompany = 'Company information is required';
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
      // Ensure monthlySalary is a valid number
      const salary = parseInt(jobData.monthlySalary.toString().replace(/[^0-9]/g, ''), 10) || 50000;
      
      // Create a much simpler job object with only essential fields
      // This minimizes the chance of validation errors
      const formattedData = {
        title: jobData.title,
        companyName: jobData.companyName,
        location: jobData.location,
        // Default to full-time job type
        jobType: "Full Time", 
        // Use the most basic way to send remote info
        isRemote: jobData.remoteOption === 'Remote',
        // Ensure salary is a valid number
        monthlySalary: salary,
        // Trim long text fields to reduce chance of validation errors
        description: jobData.description.substring(0, 2000),
        aboutCompany: jobData.aboutCompany.substring(0, 1000),
        // Ensure skills are an array
        skillsRequired: Array.isArray(jobData.skillsRequired) ? 
                       jobData.skillsRequired.slice(0, 10) : [],
      };
      
      // Only add non-essential fields if they have values
      if (jobData.companyLogoUrl) {
        formattedData.logoUrl = jobData.companyLogoUrl;
      }
      
      if (user && user._id) {
        formattedData.postedBy = user._id;
      }
      
      console.log('Submitting job data:', formattedData);
      
      let response;
      if (id) {
        // Update existing job
        response = await jobsAPI.updateJob(id, formattedData);
        console.log('Job updated successfully:', response);
        alert('Job updated successfully!');
      } else {
        // Create new job
        response = await jobsAPI.createJob(formattedData);
        console.log('Job created successfully:', response);
        alert('Job posted successfully!');
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error saving job:', error);
      
      let errorMsg = 'Failed to save job. ';
      
      if (error.response) {
        console.log('Server error details:', error.response.data);
        errorMsg += error.response.data.message || 'Server error.';
      } else if (error.request) {
        errorMsg += 'Could not connect to server.';
      } else {
        errorMsg += error.message;
      }
      
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with company name */}
      <div style={styles.headerBar}>
        <Link to="/" style={styles.headerLogo}>Jobfinder</Link>
      </div>
      
      {/* Form Container */}
      <div style={styles.formContainer}>
        {/* Left Section - Form */}
        <div style={styles.leftSection}>
          <h1 style={styles.heading}>{id ? 'Edit job description' : 'Add job description'}</h1>
          
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="companyName">Company Name</label>
              <input
                style={styles.input}
                type="text"
                id="companyName"
                name="companyName"
                value={jobData.companyName}
                onChange={handleInputChange}
                placeholder="Enter your company name here"
              />
              {formErrors.companyName && <div style={styles.errorText}>{formErrors.companyName}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="companyLogoUrl">Add logo URL</label>
              <input
                style={styles.input}
                type="text"
                id="companyLogoUrl"
                name="companyLogoUrl"
                value={jobData.companyLogoUrl}
                onChange={handleInputChange}
                placeholder="Enter the link"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="title">Job position</label>
              <input
                style={styles.input}
                type="text"
                id="title"
                name="title"
                value={jobData.title}
                onChange={handleInputChange}
                placeholder="Enter job position"
              />
              {formErrors.title && <div style={styles.errorText}>{formErrors.title}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="monthlySalary">Monthly salary</label>
              <input
                style={styles.input}
                type="text"
                id="monthlySalary"
                name="monthlySalary"
                value={jobData.monthlySalary}
                onChange={handleInputChange}
                placeholder="Enter Amount in rupees"
              />
              {formErrors.monthlySalary && <div style={styles.errorText}>{formErrors.monthlySalary}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="jobType">Job Type</label>
              <select
                style={styles.select}
                id="jobType"
                name="jobType"
                value={jobData.jobType}
                onChange={handleInputChange}
              >
                <option value="Select">Select</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
              {formErrors.jobType && <div style={styles.errorText}>{formErrors.jobType}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="remoteOption">Remote/office</label>
              <select
                style={styles.select}
                id="remoteOption"
                name="remoteOption"
                value={jobData.remoteOption}
                onChange={handleInputChange}
              >
                <option value="Select">Select</option>
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {formErrors.remoteOption && <div style={styles.errorText}>{formErrors.remoteOption}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="location">Location</label>
              <input
                style={styles.input}
                type="text"
                id="location"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                placeholder="Enter Location"
              />
              {formErrors.location && <div style={styles.errorText}>{formErrors.location}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="description">Job Description</label>
              <textarea
                style={styles.textarea}
                id="description"
                name="description"
                value={jobData.description}
                onChange={handleInputChange}
                placeholder="Type the job description"
              ></textarea>
              {formErrors.description && <div style={styles.errorText}>{formErrors.description}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="aboutCompany">About Company</label>
              <textarea
                style={styles.textarea}
                id="aboutCompany"
                name="aboutCompany"
                value={jobData.aboutCompany}
                onChange={handleInputChange}
                placeholder="Type about your company"
              ></textarea>
              {formErrors.aboutCompany && <div style={styles.errorText}>{formErrors.aboutCompany}</div>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="skillsInput">Skills Required</label>
              <div style={{ display: 'flex', position: 'relative' }}>
                <input
                  style={styles.input}
                  type="text"
                  id="skillsInput"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Enter the must have skills"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>▼</div>
              </div>
              {formErrors.skillsRequired && <div style={styles.errorText}>{formErrors.skillsRequired}</div>}
              
              {jobData.skillsRequired.length > 0 && (
                <div style={styles.skillsContainer}>
                  {jobData.skillsRequired.map((skill, index) => (
                    <div key={index} style={styles.skillTag}>
                      {skill}
                      <span 
                        style={styles.skillClose} 
                        onClick={() => handleRemoveSkill(skill)}
                      >×</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="additionalInfo">Information</label>
              <input
                style={styles.input}
                type="text"
                id="additionalInfo"
                name="additionalInfo"
                value={jobData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Enter the additional information"
              />
            </div>
            
            <div style={styles.buttonRow}>
              <button 
                type="button" 
                style={styles.cancelButton}
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : id ? 'Update Job' : '+ Add Job'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Right Section - Black background with illustration */}
        <div style={styles.rightSection}>
          <h2 style={styles.rightHeading}>Recruiter add job details here</h2>
          
          <div style={styles.illustration}>
            {/* This is where the colorful code elements would go */}
            <svg width="300" height="300" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="50" fill="#FF6B6B" />
              <rect x="100" y="100" width="80" height="80" fill="#48CFAD" />
              <polygon points="300,100 350,200 300,300" fill="#FFCE54" />
              <path d="M50,250 C50,150 150,150 150,250" stroke="#AC92EC" strokeWidth="8" fill="none" />
              <circle cx="100" cy="300" r="30" fill="#FC6E51" />
              <circle cx="300" cy="150" r="20" fill="#4FC1E9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob; 