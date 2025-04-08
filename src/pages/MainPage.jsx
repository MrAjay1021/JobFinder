import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import images from assets
import humancloudLogo from '../assets/images/humancloud.png';
import mediaLogo from '../assets/images/media.png';
import equinixLogo from '../assets/images/equinix.png';
import indiaFlag from '../assets/images/India.png';
import userloggedin from '../assets/images/userloggedin.png';

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
    gap: '15px',
  },
  jobCard: {
    display: 'flex',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    position: 'relative',
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '5px',
    backgroundColor: '#f05252',
  },
  companyLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  jobContent: {
    flex: 1,
  },
  jobTitle: {
    margin: '0 0 10px',
    fontSize: '18px',
    fontWeight: 600,
  },
  jobDetails: {
    display: 'flex',
    gap: '20px',
    marginBottom: '10px',
  },
  jobDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    color: '#666',
  },
  tagRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  typeTag: {
    padding: '4px 8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#666',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  skillTag: {
    padding: '4px 10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#666',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'center',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#f05252',
    borderRadius: '5px',
    border: '1px solid #f05252',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  },
  viewDetailsButton: {
    padding: '8px 16px',
    backgroundColor: '#f05252',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  },
  flagIcon: {
    width: '20px',
    height: '15px',
    marginRight: '5px',
    objectFit: 'contain'
  }
};

const MainPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(['Frontend', 'CSS', 'JavaScript']);
  
  // Sample job data with updated company logos
  const jobs = [
    {
      id: "frontend-job",
      title: 'Frontend Developer',
      company: 'Figmatech',
      companyLogo: equinixLogo,
      employeeCount: '11-50',
      salary: 50000,
      location: 'Delhi',
      isRemote: false,
      jobType: 'Full time',
      skills: ['Frontend', 'CSS', 'JavaScript', 'HTML'],
    },
    {
      id: "wordpress-job",
      title: 'WordPress Development',
      company: 'Adyaka Infosec Private Limited',
      companyLogo: mediaLogo,
      employeeCount: '11-50',
      salary: 25000,
      location: 'Bangalore',
      isRemote: true,
      jobType: 'Full time',
      skills: ['WordPress', 'CSS', 'HTML'],
    },
    {
      id: "frontend-job-2",
      title: 'Frontend Developer',
      company: 'Human Cloud',
      companyLogo: humancloudLogo,
      employeeCount: '11-50',
      salary: 35000,
      location: 'Mumbai',
      isRemote: false,
      jobType: 'Full time',
      skills: ['Frontend', 'CSS', 'JavaScript', 'HTML'],
    }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleClearFilters = () => {
    setSelectedSkills([]);
  };

  const handleLogout = () => {
    logout();
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
                <img src={userloggedin} alt="User" style={styles.userAvatar} />
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
        <div style={styles.searchContainer}>
          <div style={styles.searchBox}>
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
          </div>

          <div style={styles.filterRow}>
            <div style={styles.filterDropdown}>
              <span>Skills</span>
              <span>▼</span>
            </div>

            <div style={styles.filterTagsContainer}>
              {selectedSkills.map((skill, index) => (
                <div key={index} style={styles.filterTag}>
                  <span>{skill}</span>
                  <button 
                    style={styles.closeButton}
                    onClick={() => handleRemoveSkill(skill)}
                  >✕</button>
                </div>
              ))}
            </div>

            <div style={styles.buttonContainer}>
              {isAuthenticated && (
                <Link to="/post-job" style={styles.addJobButton}>
                  <span style={styles.plusIcon}>+</span> Add Job
                </Link>
              )}
              <button style={styles.applyButton}>Apply Filter</button>
              <button 
                style={styles.clearButton}
                onClick={handleClearFilters}
              >Clear</button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div style={styles.jobListings}>
          {jobs.map(job => (
            <div key={job.id} style={styles.jobCard}>
              {/* Red indicator line */}
              <div style={styles.indicator}></div>
              
              {/* Company logo */}
              <div style={styles.companyLogo}>
                <img src={job.companyLogo} alt={job.company} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
              
              {/* Job details */}
              <div style={styles.jobContent}>
                <h3 style={styles.jobTitle}>{job.title}</h3>
                
                <div style={styles.jobDetails}>
                  <div style={styles.jobDetail}>
                    <span>👥</span>
                    <span>{job.employeeCount}</span>
                  </div>
                  <div style={styles.jobDetail}>
                    <span>₹</span>
                    <span>{job.salary.toLocaleString()}</span>
                  </div>
                  <div style={styles.jobDetail}>
                    <img src={indiaFlag} alt="India" style={styles.flagIcon} />
                    <span>{job.location}</span>
                  </div>
                </div>

                <div style={styles.tagRow}>
                  <span style={styles.typeTag}>{job.isRemote ? 'Remote' : 'Office'}</span>
                  <span style={styles.typeTag}>{job.jobType}</span>
                </div>

                <div style={styles.skillTags}>
                  {job.skills.map((skill, index) => (
                    <span key={index} style={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>

              {isAuthenticated ? (
                <div style={styles.actionButtons}>
                  <Link to={`/edit-job/${job.id}`} style={styles.editButton}>Edit job</Link>
                  <Link to={`/view-job-logged-in/${job.id}`} style={styles.viewDetailsButton}>View details</Link>
                </div>
              ) : (
                <div style={styles.viewDetailsButton}>
                  <Link to={`/view-job/${job.id}`} style={styles.viewDetailsButton}>View details</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage; 