import React, { useState } from 'react';
import styles from './AboutModal.module.css';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('sapreetsingh08@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skills = [
    'C#',
    '.NET',
    'ASP.NET Core Web API',
    'Angular',
    'SQL Server',
    'Python',
    'FastAPI',
    'AI Integrations',
    'LLM Solutions',
    'RAG Architecture',
    'Workflow Automation'
  ];

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="about-modal-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.crown} role="img" aria-label="KingBox Crown">👑</span>
            <h2 id="about-modal-title" className={styles.title}>About KingBox</h2>
          </div>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className={styles.body}>
          {/* 1. About Us Intro */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>🌟 Welcome to KingBox</h3>
            <p className={styles.text}>
              Welcome to <strong>KingBox</strong>, your ultimate destination for seamless video downloading and conversion. At KingBox, we are committed to providing our users with a user-friendly, efficient, and secure platform to download and convert videos from a plethora of websites across the internet, including YouTube, Facebook, Vimeo, Dailymotion, and more.
            </p>
            <p className={styles.text}>
              Whether you're looking to download your favorite music video, an educational tutorial, or a podcast, KingBox is designed to cater to all your media downloading needs without the hassle of installing additional software.
            </p>
          </div>

          {/* 2. Vision & Mission Grid */}
          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>👁️</span>
                <h4 className={styles.cardTitle}>Our Vision</h4>
              </div>
              <p className={styles.text}>
                KingBox was created with the ambition to make online video downloading as straightforward and accessible as possible. We believe in the power of the internet and the importance of accessing multimedia content conveniently offline, anytime and anywhere.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>🎯</span>
                <h4 className={styles.cardTitle}>Our Mission</h4>
              </div>
              <p className={styles.text}>
                Our mission is to continue innovating and enhancing our services to meet and exceed the evolving needs of our users. We strive to offer a reliable and high-speed downloading experience while ensuring the utmost security and privacy for our users.
              </p>
            </div>
          </div>

          {/* 3. Founder Card */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>👨‍💻 Meet Our Founder</h3>
            <div className={styles.founderCard}>
              <div className={styles.founderHeader}>
                <div className={styles.avatarCircle}>SS</div>
                <div className={styles.founderInfo}>
                  <h4 className={styles.founderName}>Sapreet Singh</h4>
                  <p className={styles.founderRole}>Full Stack .NET & AI Automation Developer</p>
                  <span className={styles.founderDegree}>🎓 Bachelor of Computer Applications (BCA) • 2.5+ Years Experience</span>
                </div>
              </div>

              <p className={styles.text}>
                Sapreet is a Full Stack .NET and AI Automation Developer specializing in C#, .NET, ASP.NET Core Web API, Angular, SQL Server, Python, FastAPI, AI integrations, LLM-based solutions, RAG architecture, and workflow automation. His experience includes designing scalable web applications, REST APIs, automation systems, and AI-powered products.
              </p>
              
              <p className={styles.text}>
                With a strong passion for building practical and user-focused technology, Sapreet created <strong>KingBox</strong> with the goal of providing a simple, high-speed, and privacy-first platform for online media downloading and conversion.
              </p>

              <div>
                <span className={styles.contactLabel}>Technical Expertise:</span>
                <div className={styles.skillsContainer}>
                  {skills.map((skill) => (
                    <span key={skill} className={styles.skillBadge}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Our Team */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>🤝 Our Engineering Focus</h3>
            <p className={styles.text}>
              KingBox is built with a focus on reliable, efficient, and user-friendly media technology. Our development approach combines modern backend engineering, web technologies, automation, and AI-assisted solutions to continuously improve platform performance, speed, and overall user experience.
            </p>
          </div>

          {/* 5. Contact Us */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>📫 Contact Us</h3>
            <div className={styles.contactGrid}>
              <div className={styles.contactBox}>
                <span className={styles.contactIcon}>📍</span>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Address</span>
                  <p className={styles.contactValue}>
                    Shaheed Udham Singh Chowk (Major Landmark), Cheeka (Chika), Kaithal District, Haryana, India (PIN: 136034)
                  </p>
                </div>
              </div>

              <div className={styles.contactBox}>
                <span className={styles.contactIcon}>📧</span>
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>Email Support</span>
                  <div className={styles.contactValue}>
                    <a href="mailto:sapreetsingh08@gmail.com" className={styles.emailLink}>
                      sapreetsingh08@gmail.com
                    </a>
                    <button type="button" className={styles.copyBtn} onClick={handleCopyEmail}>
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            KingBox © {new Date().getFullYear()} — Engineering Excellence & Privacy
          </p>
          <button type="button" className={styles.footerBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
