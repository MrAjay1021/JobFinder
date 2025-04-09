import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import wallpaperDog from '../assets/images/WallpaperDog.png';

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
    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
  },
  leftSection: {
    flex: '1',
    padding: window.innerWidth < 768 ? '20px' : '40px',
    backgroundColor: 'white',
  },
  rightSection: {
    flex: '1',
    padding: window.innerWidth < 768 ? '20px' : '40px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    color: 'white',
    position: 'relative',
    minHeight: window.innerWidth < 768 ? '300px' : '500px',
  },
  heading: {
    fontSize: window.innerWidth < 768 ? '24px' : '28px',
    fontWeight: 'bold',
    marginBottom: window.innerWidth < 768 ? '20px' : '30px',
  },
  formGroup: {
    marginBottom: window.innerWidth < 768 ? '15px' : '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: window.innerWidth < 768 ? '10px' : '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: window.innerWidth < 768 ? '14px' : '16px',
  },
  select: {
    width: '100%',
    padding: window.innerWidth < 768 ? '10px' : '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: window.innerWidth < 768 ? '14px' : '16px',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '1em',
  },
  textarea: {
    width: '100%',
    padding: window.innerWidth < 768 ? '10px' : '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: window.innerWidth < 768 ? '14px' : '16px',
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
    flexDirection: window.innerWidth < 480 ? 'column' : 'row',
    gap: window.innerWidth < 480 ? '10px' : '0',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: window.innerWidth < 768 ? '14px' : '16px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#f05252',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: window.innerWidth < 768 ? '14px' : '16px',
  },
  rightHeading: {
    fontSize: window.innerWidth < 768 ? '24px' : '28px',
    marginBottom: window.innerWidth < 768 ? '20px' : '40px',
  },
  illustration: {
    marginTop: 'auto',
    alignSelf: 'center',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100% - 80px)',
  },
  wallpaperImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
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
  const location = useLocation(); // Get location object with state
  const { isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
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
      // First check if job data was passed via location state
      if (location.state && location.state.jobData) {
        const stateJobData = location.state.jobData;
        
        // Map the job data to match the form structure
        setJobData({
          title: stateJobData.title || '',
          companyName: stateJobData.companyName || '',
          companyLogoUrl: stateJobData.companyLogo || stateJobData.logoUrl || '',
          location: stateJobData.location || '',
          jobType: stateJobData.jobType || 'Select',
          remoteOption: stateJobData.isRemote ? 'Remote' : 'Office',
          monthlySalary: stateJobData.monthlySalary?.toString() || '',
          description: stateJobData.description || '',
          aboutCompany: stateJobData.aboutCompany || '',
          skillsRequired: stateJobData.skillsRequired || [],
          additionalInfo: stateJobData.additionalInfo || ''
        });
      } else {
        // If not passed via state, fetch from API
        const fetchJobDetails = async () => {
          try {
            const response = await jobsAPI.getJobById(id);
            if (response.data) {
              const apiJobData = response.data;
              setJobData({
                title: apiJobData.title || '',
                companyName: apiJobData.companyName || '',
                companyLogoUrl: apiJobData.logoUrl || apiJobData.companyLogoUrl || '',
                location: apiJobData.location || '',
                jobType: apiJobData.jobType || 'Select',
                remoteOption: apiJobData.remoteOffice || (apiJobData.isRemote ? 'Remote' : 'Office'),
                monthlySalary: apiJobData.monthlySalary?.toString() || '',
                description: apiJobData.description || '',
                aboutCompany: apiJobData.aboutCompany || '',
                skillsRequired: apiJobData.skillsRequired || [],
                additionalInfo: apiJobData.additionalInfo || ''
              });
            }
          } catch (error) {
            console.error('Failed to fetch job details:', error);
          }
        };
        fetchJobDetails();
      }
    }
  }, [id, location]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Add resize listener for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamically update styles based on window width
  const getResponsiveStyles = () => {
    return {
      ...styles,
      formContainer: {
        ...styles.formContainer,
        flexDirection: windowWidth < 768 ? 'column' : 'row',
      },
      leftSection: {
        ...styles.leftSection,
        padding: windowWidth < 768 ? '20px' : '40px',
      },
      rightSection: {
        ...styles.rightSection, 
        padding: windowWidth < 768 ? '20px' : '40px',
        minHeight: windowWidth < 768 ? '300px' : '500px',
      },
      heading: {
        ...styles.heading,
        fontSize: windowWidth < 768 ? '24px' : '28px',
        marginBottom: windowWidth < 768 ? '20px' : '30px',
      },
      illustration: {
        ...styles.illustration,
        height: windowWidth < 768 ? '250px' : 'calc(100% - 80px)',
      },
      wallpaperImage: {
        ...styles.wallpaperImage,
        maxHeight: windowWidth < 768 ? '250px' : '100%',
      }
    };
  };
  
  const responsiveStyles = getResponsiveStyles();

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
        // Include additional info field
        additionalInfo: jobData.additionalInfo || ''
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
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        style={styles.skillClose}
                      >
                        ×
                      </button>
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
                onClick={() => navigate(-1)} 
                style={styles.cancelButton}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={isSubmitting}
              >
                {id ? (isSubmitting ? 'Updating...' : 'Update Job') : (isSubmitting ? 'Submitting...' : 'Add Job')}
              </button>
            </div>
          </form>
        </div>
        
        {/* Right Section - Illustration */}
        <div style={responsiveStyles.rightSection}>
          <h2 style={responsiveStyles.rightHeading}>Recruiter add job details here</h2>
          <div style={responsiveStyles.illustration}>
            <img 
              src={wallpaperDog} 
              alt="Job Illustration" 
              style={responsiveStyles.wallpaperImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob; 