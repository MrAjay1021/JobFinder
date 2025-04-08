import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import indiaFlag from '../assets/images/India.png';

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
  loginToApply: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#f05252',
    color: 'white',
    textAlign: 'center',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginTop: '20px',
    border: 'none',
    cursor: 'pointer',
  }
};

const JobViewDetailsWithoutLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Mock data for WordPress Developer
  const wordpressJobData = {
    id: "wordpress-job",
    title: "WordPress Development",
    companyName: "Adyaka Infosec Private Limited",
    location: "Bangalore",
    jobType: "Full time",
    monthlySalary: 25000,
    aboutCompany: "We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.",
    description: "We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be involved in the designing and building of knowledge transfer between the server and the users. The candidate's primary focus is going to be the development of all server-side logic, definition and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.",
    skillsRequired: ["CSS", "HTML", "WordPress"],
    additionalInfo: "Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design)."
  };

  // Mock data for Frontend Developer
  const frontendJobData = {
    id: "frontend-job",
    title: "Frontend Developer",
    companyName: "Human Cloud",
    location: "Mumbai",
    jobType: "Full time",
    monthlySalary: 35000,
    aboutCompany: "We specialize in creating modern web applications with cutting-edge technologies. Our team works on a variety of projects across different industries, focusing on delivering high-quality user experiences and interfaces.",
    description: "We're looking for a talented Frontend Developer with strong skills in modern JavaScript frameworks and CSS. The ideal candidate will work closely with our design and backend teams to implement responsive and performant web interfaces.",
    skillsRequired: ["CSS", "JavaScript", "React", "HTML"],
    additionalInfo: "This is a remote position with occasional visits to our Mumbai office for team meetings. We offer flexible working hours and opportunities for professional growth."
  };

  // Determine which job data to use based on ID parameter
  // For simplicity, we're just checking if "wordpress" is in the ID
  const jobData = id.toLowerCase().includes('wordpress') ? wordpressJobData : frontendJobData;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading job details...</div>;
  }

  // Example responsibilities based on job type
  const wordpressResponsibilities = [
    "Work on the development of theme customization, liquid programming languages and corresponding apps",
    "Implement system integrations that are crucial to our success",
    "Contribute to the development of HTML/CSS/JavaScript and standard web technologies integral to building seamless multi-channel experiences",
    "Work on speed optimization and making a mobile-friendly website"
  ];

  const frontendResponsibilities = [
    "Develop responsive web interfaces using React, CSS and modern JavaScript",
    "Collaborate with designers to implement pixel-perfect UI components",
    "Optimize application performance and ensure cross-browser compatibility",
    "Write clean, well-documented code following best practices"
  ];

  // Select responsibilities based on job title
  const responsibilities = jobData.title.toLowerCase().includes('wordpress') 
    ? wordpressResponsibilities 
    : frontendResponsibilities;

  return (
    <div>
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
            <span>1w ago</span>
            <span style={{ margin: '0 8px' }}>·</span>
            <span>{jobData.jobType}</span>
          </div>

          <h2 style={styles.jobTitle}>{jobData.title}</h2>
          
          <div style={styles.locationBadge}>
            <img src={indiaFlag} alt="India" style={styles.flag} />
            <span>{jobData.location}, India</span>
          </div>

          <div style={styles.jobDetail}>
            <span style={styles.detailLabel}>Stipend</span>
            <span style={styles.detailValue}>Rs {jobData.monthlySalary.toLocaleString()}/month</span>
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

          {/* Selected Intern's Responsibilities */}
          <div style={styles.infoSection}>
            <h3 style={styles.sectionHeading}>Selected intern's day-to-day responsibilities include:</h3>
            <ul style={styles.descriptionList}>
              {responsibilities.map((responsibility, index) => (
                <li key={index} style={styles.listItem}>{responsibility}</li>
              ))}
            </ul>
          </div>

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
          <div style={styles.infoSection}>
            <h3 style={styles.sectionHeading}>Additional Information</h3>
            <p style={styles.infoText}>{jobData.additionalInfo}</p>
          </div>

          {/* Login to Apply Button */}
          <Link to="/login" style={styles.loginToApply}>
            Login to Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobViewDetailsWithoutLogin; 