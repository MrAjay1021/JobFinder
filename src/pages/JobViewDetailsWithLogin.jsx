import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobsAPI } from '../services/api';
import indiaFlag from '../assets/images/India.png';
import boyAvatar from '../assets/images/boy.svg';
import googleLogo from '../assets/images/media.png'; // Using media.png as Google logo

// Styles for the component
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#f05252',
    padding: '15px 0',
    display: 'flex',
    justifyContent: 'center',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
    marginBottom: '20px',
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
  jobCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
  titleCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
  jobTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
  },
  jobTypeRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    color: '#666',
    fontSize: '14px',
  },
  infoSection: {
    margin: '16px 0',
  },
  sectionHeading: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px',
  },
  companyInfo: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  skillTag: {
    backgroundColor: '#f5f5f5',
    color: '#666',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  infoText: {
    color: '#666',
    lineHeight: '1.6',
  },
  locationBadge: {
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    fontSize: '14px',
    marginBottom: '16px',
  },
  flag: {
    width: '16px',
    height: '12px',
    marginRight: '6px',
  },
  jobDetail: {
    display: 'flex',
    gap: '10px',
    marginBottom: '8px',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#666',
    width: '100px',
  },
  detailValue: {
    color: '#333',
  },
  descriptionList: {
    listStyleType: 'decimal',
    paddingLeft: '20px',
    margin: '12px 0',
    color: '#666',
    lineHeight: '1.6',
  },
  listItem: {
    margin: '8px 0',
  },
  headerWithButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#f05252',
    color: 'white',
    textAlign: 'center',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  companyLogo: {
    width: '24px',
    height: '24px',
    marginRight: '8px',
    borderRadius: '4px',
  }
};

// Helper function to format date
const formatTimeAgo = (dateString) => {
  if (!dateString) return '1w ago'; // Fallback
  
  const now = new Date();
  const past = new Date(dateString);
  
  // Handle invalid date
  if (isNaN(past.getTime())) return '1w ago';
  
  const seconds = Math.floor((now - past) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  
  if (months > 0) return `${months}mo ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
};

const JobViewDetailsWithLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch job data from API
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        // Attempt to get the job from the API
        const response = await jobsAPI.getJobById(id);
        // Display the job data regardless of ownership
        setJobData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching job data:', err);
        setError('Failed to load job details');
        
        // Fallback to mock data if API fails
        if (id.toLowerCase().includes('wordpress')) {
          setJobData(wordpressJobData);
        } else {
          setJobData(frontendJobData);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobData();
  }, [id]);

  // Mock data as fallback
  const wordpressJobData = {
    id: "wordpress-job",
    title: "WordPress Development",
    companyName: "Adyaka Infosec Private Limited",
    companyLogo: googleLogo,
    location: "Bangalore",
    jobType: "Full time",
    monthlySalary: 25000,
    aboutCompany: "We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.",
    description: "We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be involved in the designing and building of knowledge transfer between the server and the users. The candidate's primary focus is going to be the development of all server-side logic, definition and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.",
    skillsRequired: ["CSS", "HTML", "WordPress"],
    additionalInfo: "Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design)."
  };

  const frontendJobData = {
    id: "frontend-job",
    title: "Frontend Developer",
    companyName: "Google",
    companyLogo: googleLogo,
    location: "Mumbai",
    jobType: "Full time",
    monthlySalary: 35000,
    aboutCompany: "We specialize in creating modern web applications with cutting-edge technologies. Our team works on a variety of projects across different industries, focusing on delivering high-quality user experiences and interfaces.",
    description: "We're looking for a talented Frontend Developer with strong skills in modern JavaScript frameworks and CSS. The ideal candidate will work closely with our design and backend teams to implement responsive and performant web interfaces.",
    skillsRequired: ["CSS", "JavaScript", "React", "HTML"],
    additionalInfo: "This is a remote position with occasional visits to our Mumbai office for team meetings. We offer flexible working hours and opportunities for professional growth."
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading job details...</div>;
  }

  if (error && !jobData) {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>{error}</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // If no job data, show error
  if (!jobData) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Job not found</div>;
  }

  // Ensure we have a valid monthlySalary value
  const monthlySalary = jobData.monthlySalary || 0;

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Link to="/" style={styles.headerLogo}>Jobfinder</Link>
          <div style={styles.userProfile}>
            <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            <div style={styles.userInfo}>
              <span>Hello! {user?.name || 'Recruiter'}</span>
              <img src={boyAvatar} alt="User" style={styles.userAvatar} />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {/* Title Card */}
        <div style={styles.titleCard}>
          <h1 style={styles.jobTitle}>
            {jobData.title} work from home job/internship at {jobData.companyName}
          </h1>
        </div>

        {/* Job Details Card */}
        <div style={styles.jobCard}>
          <div style={styles.jobTypeRow}>
            <span>{formatTimeAgo(jobData.createdAt)}</span>
            <span style={{ margin: '0 8px' }}>·</span>
            <span>{jobData.jobType}</span>
          </div>

          <div style={styles.headerWithButton}>
            <h2 style={styles.jobTitle}>{jobData.title}</h2>
            <Link 
              to={`/edit-job/${jobData._id || jobData.id}`} 
              state={{ jobData: jobData }}
              style={styles.editButton}
            >
              Edit job
            </Link>
          </div>
          
          <div style={styles.locationBadge}>
            <img src={indiaFlag} alt="India" style={styles.flag} />
            <span>{jobData.location}, India</span>
          </div>

          <div style={styles.jobDetail}>
            <span style={styles.detailLabel}>Stipend</span>
            <span style={styles.detailValue}>Rs {monthlySalary.toLocaleString()}/month</span>
          </div>

          <div style={styles.jobDetail}>
            <span style={styles.detailLabel}>Duration</span>
            <span style={styles.detailValue}>6 Months</span>
          </div>

          {/* About Company Section */}
          <div style={styles.infoSection}>
            <h3 style={styles.sectionHeading}>About company</h3>
            <p style={styles.companyInfo}>{jobData.aboutCompany}</p>
          </div>

          {/* About Job Section */}
          <div style={styles.infoSection}>
            <h3 style={styles.sectionHeading}>About the job/internship</h3>
            <p style={styles.companyInfo}>{jobData.description}</p>
          </div>

          {/* Selected Intern's Responsibilities - Only show if explicitly provided */}
          {jobData.responsibilities && jobData.responsibilities.length > 0 && (
            <div style={styles.infoSection}>
              <h3 style={styles.sectionHeading}>Selected intern's day-to-day responsibilities include:</h3>
              <ul style={styles.descriptionList}>
                {jobData.responsibilities.map((responsibility, index) => (
                  <li key={index} style={styles.listItem}>{responsibility}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Required Section */}
          <div style={styles.infoSection}>
            <h3 style={styles.sectionHeading}>Skill(s) required</h3>
            <div style={styles.skillsContainer}>
              {jobData.skillsRequired.map((skill, index) => (
                <div key={index} style={styles.skillTag}>{skill}</div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          {jobData.additionalInfo && (
            <div style={styles.infoSection}>
              <h3 style={styles.sectionHeading}>Additional Information</h3>
              <p style={styles.infoText}>{jobData.additionalInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobViewDetailsWithLogin; 