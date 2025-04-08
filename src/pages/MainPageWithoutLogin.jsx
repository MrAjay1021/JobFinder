import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// Removing unused imports
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// Import images from assets
import humancloudLogo from '../assets/images/humancloud.png';
import mediaLogo from '../assets/images/media.png';
import equinixLogo from '../assets/images/equinix.png';
import indiaFlag from '../assets/images/India.png';

// Import CSS directly - this will be loaded from index.html via the CSS folder
// We'll use inline styles that match the CSS classes from Mainpagewithoutlogin.css

const MainPageWithoutLogin = ({ jobs = [], availableSkills = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const dropdownRef = useRef(null);
  // Removing unused variable
  // const navigate = useNavigate();
  
  useEffect(() => {
    // Filter jobs based on search term and selected skills
    if (jobs.length > 0) {
      let filtered = [...jobs];
      
      // Filter by search term
      if (searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(searchLower) || 
          job.company.toLowerCase().includes(searchLower)
        );
      }
      
      // Filter by selected skills
      if (selectedSkills.length > 0) {
        filtered = filtered.filter(job => 
          selectedSkills.every(skill => 
            job.skills && job.skills.includes(skill)
          )
        );
      }
      
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs([]);
    }
  }, [jobs, searchTerm, selectedSkills]);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
  };

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleApplyFilter = () => {
    // This function would trigger any additional filter logic if needed
    // Currently filters are applied automatically through the useEffect
  };

  // CSS variables from styles.css
  const cssVars = {
    red400: '#ed5353',
    red50: '#ffefef',
    red300: '#ff6b6b',
    white: '#ffffff',
    gray400: '#9c9c9c',
    gray500: '#909090',
    shadowXs: '0 0 22px 4px rgba(255, 32, 32, 0.25)',
    radiusSm: '2px',
    space1g: '12px',
    space2x1: '18px',
    space5x1: '26px',
    space7xl: '31px',
    space11x1: '38px'
  };

  // Styles based on MainpagewithoutloginOne.css and Mainpagewithoutlogin.css
  const styles = {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: cssVars.white,
      gap: '32px',
    },
    header: {
      backgroundColor: cssVars.red400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: '54px',
      borderBottomRightRadius: '62px',
    },
    headerContent: {
      width: '96%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
    },
    headerLogo: {
      color: cssVars.white,
      fontSize: '24px',
      fontWeight: 'bold',
      textDecoration: 'none'
    },
    authButtons: {
      display: 'flex',
      gap: '10px'
    },
    loginButton: {
      color: cssVars.white,
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: '500',
      borderRadius: '20px',
      padding: '8px 20px',
      backgroundColor: 'transparent',
      border: `1px solid ${cssVars.white}`,
      cursor: 'pointer',
      textDecoration: 'none'
    },
    registerButton: {
      color: cssVars.red400,
      backgroundColor: cssVars.white,
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: '500',
      borderRadius: '20px',
      padding: '8px 20px',
      border: `1px solid ${cssVars.white}`,
      cursor: 'pointer',
      textDecoration: 'none'
    },
    content: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    searchContainer: {
      backgroundColor: cssVars.white,
      boxShadow: cssVars.shadowXs,
      padding: cssVars.space5x1,
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    columnSearch: {
      gap: cssVars.space11x1,
      display: 'flex',
      width: '90%',
      flexDirection: 'column',
      marginBottom: '20px',
    },
    searchBox: {
      display: 'flex',
      width: '100%',
      position: 'relative',
    },
    searchInput: {
      color: cssVars.gray500,
      paddingLeft: '20px',
      paddingRight: cssVars.space5x1,
      fontSize: '18px',
      gap: cssVars.space2x1,
      borderColor: cssVars.gray400,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '5px',
      width: '100%',
      height: '50px',
      outline: 'none',
    },
    rowFilter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '20px',
      marginTop: '20px',
    },
    filterDropdownContainer: {
      position: 'relative',
    },
    filterDropdown: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      border: '1px solid #e0e0e0',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: cssVars.white,
      minWidth: '120px',
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '200px',
      maxHeight: '250px',
      overflowY: 'auto',
      backgroundColor: cssVars.white,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: '5px',
      zIndex: 100,
      marginTop: '5px',
    },
    dropdownItem: {
      padding: '10px 15px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#333',
      borderBottom: '1px solid #f0f0f0',
    },
    dropdownItemHover: {
      backgroundColor: cssVars.red50,
    },
    filterTagsContainer: {
      paddingLeft: '4px',
      paddingRight: '4px',
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      rowGap: cssVars.space2x1,
      columnGap: '12px',
    },
    filterTag: {
      display: 'flex',
      alignItems: 'center',
      padding: '5px 10px',
      backgroundColor: cssVars.red50,
      borderRadius: cssVars.radiusSm,
      fontSize: '14px',
      gap: '5px',
    },
    closeButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      backgroundColor: cssVars.red300,
      color: cssVars.white,
      borderTopRightRadius: cssVars.radiusSm,
      borderBottomRightRadius: cssVars.radiusSm,
      border: 'none',
      fontSize: '12px',
      cursor: 'pointer',
      padding: '14px 12px 12px 12px',
    },
    buttonContainer: {
      gap: cssVars.space7xl,
      alignSelf: 'flex-end',
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
    },
    applyButton: {
      color: cssVars.white,
      padding: '8px 20px',
      backgroundColor: cssVars.red400,
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
    },
    clearButton: {
      color: cssVars.red400,
      marginTop: '12px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
    jobListings: {
      width: '90%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      paddingBottom: '30px',
    },
    jobCard: {
      width: '100%',
      backgroundColor: cssVars.white,
      boxShadow: cssVars.shadowXs,
      display: 'flex',
      padding: '20px',
      position: 'relative',
      alignItems: 'center',
    },
    indicator: {
      position: 'absolute',
      width: '5px',
      height: '100%',
      left: 0,
      top: 0,
      backgroundColor: cssVars.red400,
    },
    companyLogo: {
      width: '55px',
      height: '55px',
      borderRadius: '12px',
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
      fontSize: '19px',
      fontWeight: '500',
      color: '#000',
      marginBottom: '10px',
      margin: 0,
    },
    jobDetails: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      marginTop: '10px',
      flexWrap: 'wrap',
    },
    jobDetail: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: '500',
      color: cssVars.gray400,
      marginRight: '30px',
      marginBottom: '5px',
    },
    jobDetailIcon: {
      color: cssVars.gray400,
      marginRight: '5px',
    },
    typeRow: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    jobType: {
      fontSize: '15px',
      fontWeight: '500',
      color: cssVars.red400,
    },
    skillTags: {
      display: 'flex',
      marginTop: '10px',
      gap: '15px',
      flexWrap: 'wrap',
    },
    skillTag: {
      height: '30px',
      backgroundColor: cssVars.red50,
      borderRadius: '1.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 10px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#000',
    },
    actionsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewDetailsButton: {
      width: '130px',
      height: '36px',
      backgroundColor: cssVars.red400,
      borderRadius: '4px',
      fontSize: '15px',
      fontWeight: '500',
      color: cssVars.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    flagIcon: {
      width: '20px',
      height: '15px',
      marginRight: '5px',
      objectFit: 'contain',
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: cssVars.gray400,
      fontSize: '18px',
    }
  };

  // Handle responsive styles based on window width
  const isMediumScreen = windowWidth <= 1050;
  const isSmallScreen = windowWidth <= 550;

  const columnSearchStyle = {
    ...styles.columnSearch,
    ...(windowWidth <= 1440 ? { width: '100%' } : {}),
    ...(isMediumScreen ? { width: '100%' } : {})
  };

  const rowFilterStyle = {
    ...styles.rowFilter,
    ...(isMediumScreen ? { 
      flexDirection: 'column', 
      alignItems: 'flex-start' 
    } : {})
  };

  const filterTagsContainerStyle = {
    ...styles.filterTagsContainer,
    ...(isSmallScreen ? { alignSelf: 'stretch' } : {})
  };

  const searchContainerStyle = {
    ...styles.searchContainer,
    ...(isSmallScreen ? { padding: '16px 20px' } : {})
  };

  const jobCardStyle = {
    ...styles.jobCard,
    ...(isSmallScreen ? { 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      gap: '15px'
    } : {})
  };

  const jobDetailsStyle = {
    ...styles.jobDetails,
    ...(isSmallScreen ? { 
      flexDirection: 'column',
      alignItems: 'flex-start'
    } : {})
  };

  const skillTagsStyle = {
    ...styles.skillTags,
    ...(isSmallScreen ? { 
      marginBottom: '15px'
    } : {})
  };

  const actionsContainerStyle = {
    ...styles.actionsContainer,
    ...(isSmallScreen ? { 
      width: '100%'
    } : {})
  };

  return (
    <div style={styles.mainContainer}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Link to="/" style={styles.headerLogo}>Jobfinder</Link>
          
          <div style={styles.authButtons}>
            <Link to="/login" style={styles.loginButton}>Login</Link>
            <Link to="/register" style={styles.registerButton}>Register</Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <div style={searchContainerStyle}>
          <div style={columnSearchStyle}>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Type any job title"
                value={searchTerm}
                onChange={handleSearch}
                style={styles.searchInput}
              />
            </div>

            <div style={rowFilterStyle}>
              <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', gap: '10px' }}>
                <div ref={dropdownRef} style={styles.filterDropdownContainer}>
                  <div 
                    style={styles.filterDropdown}
                    onClick={toggleDropdown}
                  >
                    <span>Skills</span>
                    <span>▼</span>
                  </div>
                  {isDropdownOpen && (
                    <div style={styles.dropdownMenu}>
                      {availableSkills.filter(skill => !selectedSkills.includes(skill)).map((skill, index) => (
                        <div 
                          key={index} 
                          style={styles.dropdownItem}
                          onClick={() => handleAddSkill(skill)}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = cssVars.red50;
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                      {availableSkills.filter(skill => !selectedSkills.includes(skill)).length === 0 && (
                        <div style={styles.dropdownItem}>No more skills available</div>
                      )}
                    </div>
                  )}
                </div>

                <div style={filterTagsContainerStyle}>
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
              </div>

              <div style={styles.buttonContainer}>
                <button 
                  style={styles.applyButton}
                  onClick={handleApplyFilter}
                >
                  Apply Filter
                </button>
                <button 
                  style={styles.clearButton}
                  onClick={handleClearFilters}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div style={styles.jobListings}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job._id || job.id} style={jobCardStyle}>
              {/* Red indicator line */}
              <div style={styles.indicator}></div>
              
              {/* Company logo */}
              <div style={styles.companyLogo}>
                <img src={job.logoUrl || 'https://via.placeholder.com/55'} alt={job.company} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
              
              {/* Job details */}
              <div style={styles.jobContent}>
                <h3 style={styles.jobTitle}>{job.title}</h3>
                
                <div style={jobDetailsStyle}>
                  <div style={styles.jobDetail}>
                    <span style={styles.jobDetailIcon}>👥</span>
                    <span>{job.companySize || '11-50'}</span>
                  </div>
                  <div style={styles.jobDetail}>
                    <span style={styles.jobDetailIcon}>₹</span>
                    <span>{(job.monthlySalary || 0).toLocaleString()}</span>
                  </div>
                  <div style={styles.jobDetail}>
                    <img src={indiaFlag} alt="India" style={styles.flagIcon} />
                    <span>{job.location}</span>
                  </div>
                </div>

                <div style={styles.typeRow}>
                  <span style={styles.jobType}>{job.remoteOffice || (job.isRemote ? 'Remote' : 'Office')}</span>
                  <span style={styles.jobType}>{job.jobType}</span>
                </div>

                <div style={skillTagsStyle}>
                  {(job.skills || job.skillsRequired || []).map((skill, index) => (
                    <span key={index} style={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>

              <div style={actionsContainerStyle}>
                <Link to={`/view-job/${job._id || job.id}`} style={styles.viewDetailsButton}>View details</Link>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            {jobs.length === 0 ? 
              "Loading jobs..." : 
              "No jobs match your search criteria. Try adjusting your filters."}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPageWithoutLogin; 