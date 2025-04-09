import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobsAPI } from '../services/api';

// Import images from assets
import humancloudLogo from '../assets/images/humancloud.png';
import mediaLogo from '../assets/images/media.png';
import equinixLogo from '../assets/images/equinix.png';
import indiaFlag from '../assets/images/India.png';
import boyAvatar from '../assets/images/boy.svg';

// Directly implement the CSS styles to match the screenshot
const styles = {
  mainContainer: {
    display: 'flex', 
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9'
  },
  header: {
    backgroundColor: '#f05252', 
    padding: '15px 0',
    display: 'flex',
    justifyContent: 'center',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
  },
  headerContent: {
    width: '90%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  authButtons: {
    display: 'flex',
    gap: '10px'
  },
  loginButton: {
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerButton: {
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    border: '1px solid white',
    backgroundColor: 'white',
    color: '#f05252',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoutButton: {
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'white'
  },
  userAvatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  addJobButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 20px',
    backgroundColor: '#f05252',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  plusIcon: {
    marginRight: '5px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  content: {
    maxWidth: '1200px',
    width: '90%',
    margin: '20px auto',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
  searchBox: {
    position: 'relative',
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '12px 40px',
    fontSize: '14px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '10px',
  },
  filterDropdownContainer: {
    position: 'relative',
  },
  filterDropdown: {
    padding: '8px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
  filterTagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  filterTag: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    backgroundColor: '#ffebee',
    color: '#f05252',
    borderRadius: '5px',
    fontSize: '14px',
    gap: '5px',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    backgroundColor: '#f05252',
    color: 'white',
    borderRadius: '50%',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
  },
  buttonContainer: {
    marginLeft: 'auto',
    display: 'flex',
    gap: '10px',
  },
  applyButton: {
    padding: '8px 20px',
    backgroundColor: '#f05252',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  clearButton: {
    padding: '8px 15px',
    backgroundColor: 'transparent',
    color: '#f05252',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  jobListings: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
  },
  jobCard: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    position: 'relative',
    padding: '15px',
    border: '1px solid #f0f0f0',
    backgroundColor: '#fff5f5',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '6px',
    backgroundColor: '#f05252',
  },
  companyLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginRight: '15px',
  },
  jobContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  jobTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  jobDetails: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    color: '#666',
    fontSize: '14px',
  },
  jobDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  tagRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '3px',
  },
  typeTag: {
    padding: '4px 10px',
    borderRadius: '4px',
    color: '#f05252',
    fontSize: '14px',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '6px',
  },
  skillTag: {
    padding: '3px 10px',
    backgroundColor: '#ffebee',
    color: '#333',
    borderRadius: '20px',
    fontSize: '14px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  viewDetailsButton: {
    backgroundColor: '#f05252',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 14px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
  },
  addJobButtonFixed: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#f05252',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    textDecoration: 'none',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    zIndex: 1000,
  },
};

// Helper function to get appropriate logo based on company name
const getCompanyLogo = (job) => {
  if (job.logoUrl || job.companyLogoUrl) {
    return job.logoUrl || job.companyLogoUrl;
  }
  
  // Return default logos based on company name pattern
  const companyName = job.companyName?.toLowerCase() || '';
  if (companyName.includes('human') || companyName.includes('cloud')) {
    return humancloudLogo;
  } else if (companyName.includes('media') || companyName.includes('adyaka')) {
    return mediaLogo;
  } else if (companyName.includes('equinix') || companyName.includes('tech') || companyName.includes('figma')) {
    return equinixLogo;
  }
  
  // Default placeholder
  return 'https://via.placeholder.com/150';
};

const MainPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([
    'Frontend', 'Backend', 'CSS', 'HTML', 'JavaScript', 'React', 'Node.js', 
    'Python', 'PHP', 'WordPress', 'UI/UX', 'Design', 'Mobile', 'DevOps'
  ]);
  const dropdownRef = useRef(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Fetch jobs on component mount and when authentication status changes
  useEffect(() => {
    fetchJobs();
  }, [isAuthenticated]);
  
  // Fetch jobs function
  const fetchJobs = async (queryFilters = {}) => {
    setLoading(true);
    try {
      // If authenticated, fetch only user's jobs, otherwise fetch all jobs
      const response = isAuthenticated
        ? await jobsAPI.getUserJobs(queryFilters) 
        : await jobsAPI.getAllJobs(queryFilters);
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Optional: Add debounce here for search on type
  };

  // Apply search filter when submit or enter is pressed
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs({ title: searchTerm });
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleClearFilters = () => {
    setSelectedSkills([]);
    setSearchTerm('');
    fetchJobs(); // Fetch all jobs again with no filters
  };

  const handleApplyFilter = () => {
    const queryFilters = {};
    if (selectedSkills.length > 0) {
      queryFilters.skills = selectedSkills.join(',');
    }
    if (searchTerm) {
      queryFilters.title = searchTerm;
    }
    fetchJobs(queryFilters);
  };

  const handleLogout = () => {
    logout();
    // Clear any filters
    setSelectedSkills([]);
    setSearchTerm('');
    // The jobs will be refetched automatically due to the useEffect dependency on isAuthenticated
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div style={styles.mainContainer}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Link to="/" style={styles.headerLogo}>Jobfinder</Link>
          
          {isAuthenticated ? (
            <div style={styles.userProfile}>
              <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
              <div style={styles.userInfo}>
                <span>Hello! {user?.name || 'Recruiter'}</span>
                <img src={boyAvatar} alt="User" style={styles.userAvatar} />
              </div>
            </div>
          ) : (
            <div style={styles.authButtons}>
              <Link to="/login" style={styles.loginButton}>Login</Link>
              <Link to="/register" style={styles.registerButton}>Register</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {isAuthenticated && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px 20px',
            marginBottom: '20px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{ margin: 0, color: '#333', fontSize: '18px' }}>
              My Job Dashboard
            </h2>
            <div style={{ color: '#666', fontSize: '14px' }}>
              You are viewing jobs that you have created. You can still view details of any job.
            </div>
          </div>
        )}
        
        <div style={styles.searchContainer}>
          <form style={styles.searchBox} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Type any job title"
              value={searchTerm}
              onChange={handleSearch}
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </form>

          <div style={styles.filterRow}>
            <div style={styles.filterDropdownContainer}>
              <div 
                ref={dropdownRef}
                style={styles.filterDropdown}
                onClick={toggleDropdown}
              >
                <span>Skills</span>
                <span>▼</span>
                
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '200px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    borderRadius: '5px',
                    marginTop: '5px',
                    zIndex: 100,
                    maxHeight: '250px',
                    overflowY: 'auto',
                  }}>
                    {availableSkills
                      .filter(skill => !selectedSkills.includes(skill))
                      .map((skill, index) => (
                        <div 
                          key={index} 
                          style={{
                            padding: '10px 15px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#333',
                            borderBottom: '1px solid #f0f0f0',
                            hover: { backgroundColor: '#ffebee' }
                          }}
                          onClick={() => handleAddSkill(skill)}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffebee'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          {skill}
                        </div>
                      ))
                    }
                    {availableSkills.filter(skill => !selectedSkills.includes(skill)).length === 0 && (
                      <div style={{
                        padding: '10px 15px',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        No more skills available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.filterTagsContainer}>
              {selectedSkills.map((skill, index) => (
                <div key={index} style={styles.filterTag}>
                  <span>{skill}</span>
                  <button 
                    style={styles.closeButton}
                    onClick={() => handleRemoveSkill(skill)}
                  >×</button>
                </div>
              ))}
            </div>

            <div style={styles.buttonContainer}>
              {isAuthenticated && (
                <Link to="/post-job" style={styles.addJobButton}>
                  <span style={styles.plusIcon}>+</span> Add Job
                </Link>
              )}
              <button 
                style={styles.applyButton}
                onClick={handleApplyFilter}
              >Apply Filter</button>
              <button 
                style={styles.clearButton}
                onClick={handleClearFilters}
              >Clear</button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div style={styles.jobListings}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Loading jobs...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              {isAuthenticated ? 
                "You haven't created any jobs yet. Click the '+' button to add a new job." : 
                "No jobs found with the current filters."}
            </div>
          ) : (
            jobs.map(job => (
              <div key={job._id} style={styles.jobCard}>
                {/* Red indicator line */}
                <div style={styles.indicator}></div>
                
                {/* Company logo */}
                <div style={styles.companyLogo}>
                  <img src={getCompanyLogo(job)} alt={job.companyName} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                
                {/* Job details */}
                <div style={styles.jobContent}>
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  
                  <div style={styles.jobDetails}>
                    <div style={styles.jobDetail}>
                      <span>👥</span>
                      <span>{job.companySize || '11-50'}</span>
                    </div>
                    <div style={styles.jobDetail}>
                      <span>₹</span>
                      <span>{job.monthlySalary?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div style={styles.jobDetail}>
                      <img src={indiaFlag} alt="India" style={{ width: '20px', height: '15px', marginRight: '5px' }} />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <div style={styles.tagRow}>
                    <span style={{...styles.typeTag, color: job.isRemote ? '#f05252' : '#f05252'}}>{job.remoteOffice || (job.isRemote ? 'Remote' : 'Office')}</span>
                    <span style={styles.typeTag}>{job.jobType}</span>
                  </div>

                  <div style={styles.skillTags}>
                    {job.skillsRequired && job.skillsRequired.map((skill, index) => (
                      <span key={index} style={styles.skillTag}>{skill}</span>
                    ))}
                  </div>
                  
                  <div style={styles.cardFooter}>
                    {isAuthenticated && (
                      <Link 
                        to={`/edit-job/${job._id}`} 
                        state={{ jobData: job }}
                        style={{
                          ...styles.viewDetailsButton,
                          backgroundColor: 'white',
                          color: '#f05252',
                          border: '1px solid #f05252',
                          marginRight: '10px'
                        }}
                      >
                        Edit job
                      </Link>
                    )}
                    <Link to={isAuthenticated ? `/view-job-logged-in/${job._id}` : `/view-job/${job._id}`} style={styles.viewDetailsButton}>
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add job button for authenticated users */}
        {isAuthenticated && (
          <Link to="/post-job" style={styles.addJobButtonFixed}>
            +
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainPage; 