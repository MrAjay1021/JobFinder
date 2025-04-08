import * as React from 'react';
import { useState } from 'react';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: 'Tech Corp',
      logo: 'https://via.placeholder.com/55',
      title: 'Senior Software Engineer',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '5-8 years',
      salary: '$120k - $150k',
      skills: ['React', 'Node.js', 'TypeScript']
    },
    // Add more sample jobs as needed
  ]);

  const availableSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker'
  ];

  const handleSkillAdd = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedSkills([]);
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerRect1}></div>
        <div className={styles.headerRect2}></div>
        <div className={styles.headerRect3}></div>
        <div className={styles.logo}>JobFinder</div>
        <button className={styles.logout}>Logout</button>
      </header>

      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Type any job title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className={styles.skillsContainer}>
          {availableSkills.map((skill) => (
            <button
              key={skill}
              className={styles.skillButton}
              onClick={() => handleSkillAdd(skill)}
            >
              {skill}
            </button>
          ))}
        </div>

        <div className={styles.skillsContainer}>
          {selectedSkills.map((skill) => (
            <div key={skill} className={styles.skillTag}>
              {skill}
              <div 
                className={styles.skillTagClose}
                onClick={() => handleSkillRemove(skill)}
              >
                ×
              </div>
            </div>
          ))}
        </div>

        <button className={styles.addJobButton}>+ Add Job</button>
        <button className={styles.clearButton} onClick={handleClearAll}>
          Clear
        </button>
      </div>

      <div className={styles.jobList}>
        {jobs.map((job) => (
          <div key={job.id} className={styles.jobCard}>
            <div className={styles.jobCardLeft}></div>
            <img src={job.logo} alt={job.company} className={styles.companyLogo} />
            <div className={styles.jobInfo}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <div className={styles.jobMeta}>
                <span className={styles.jobMetaItem}>
                  🏢 {job.company}
                </span>
                <span className={styles.jobMetaItem}>
                  📍 {job.location}
                </span>
                <span className={styles.jobMetaItem}>
                  💼 {job.experience}
                </span>
                <span className={styles.jobType}>{job.type}</span>
              </div>
            </div>
            <div className={styles.skillTags}>
              {job.skills.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.editButton}>
                ✏️ Edit
              </button>
              <button className={styles.viewDetailsButton}>
                👁️ View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard; 