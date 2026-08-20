import React, { useState } from 'react';
import styles from './About.module.css';

interface AboutPageProps {
  onNavigateHome?: () => void;
}

export const About: React.FC<AboutPageProps> = ({ onNavigateHome }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
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

  const stats = [
    { value: '100%', label: 'Free & Unlimited Downloads' },
    { value: '320 kbps', label: 'High Bitrate Audio Quality' },
    { value: '0 Logs', label: 'Zero Server Storage & Privacy' },
    { value: '⚡ Fast', label: 'High Performance Conversion Engine' }
  ];

  return (
    <main className={styles.pageContainer}>
      {/* 1. Hero Banner */}
      <section className={styles.heroBanner}>
        <span className={styles.crownBadge} role="img" aria-label="KingBox Crown">👑</span>
        <h1 className={styles.heroTitle}>About KingBox</h1>
        <p className={styles.heroSubtitle}>
          Your ultimate destination for seamless, high-speed, and secure online video downloading and media conversion across the internet.
        </p>
        {onNavigateHome && (
          <button type="button" className={styles.backBtn} onClick={onNavigateHome}>
            ← Back to Downloader
          </button>
        )}
      </section>

      {/* 2. Key Highlights Stats Strip */}
      <section className={styles.statsStrip}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statItem}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. About Us Description */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>🌟</div>
          <h2 className={styles.sectionHeading}>Welcome to KingBox</h2>
        </div>
        <p className={styles.paragraph}>
          Welcome to <strong>KingBox</strong>, your ultimate destination for seamless video downloading and conversion. At KingBox, we are committed to providing our users with a user-friendly, efficient, and secure platform to download and convert videos from a plethora of websites across the internet, including YouTube, Facebook, Vimeo, Dailymotion, and more.
        </p>
        <p className={styles.paragraph}>
          Whether you're looking to download your favorite music video, an educational tutorial, or a podcast, KingBox is designed to cater to all your media downloading needs without the hassle of installing additional software.
        </p>
      </section>

      {/* 4. Vision & Mission Grid */}
      <section className={styles.gridTwo}>
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <span className={styles.infoCardIcon}>👁️</span>
            <h3 className={styles.infoCardTitle}>Our Vision</h3>
          </div>
          <p className={styles.paragraph}>
            KingBox was created with the ambition to make online video downloading as straightforward and accessible as possible. We believe in the power of the internet and the importance of accessing multimedia content conveniently offline, anytime and anywhere.
          </p>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <span className={styles.infoCardIcon}>🎯</span>
            <h3 className={styles.infoCardTitle}>Our Mission</h3>
          </div>
          <p className={styles.paragraph}>
            Our mission is to continue innovating and enhancing our services to meet and exceed the evolving needs of our users. We strive to offer a reliable and high-speed downloading experience while ensuring the utmost security and privacy for our users. At KingBox, we are constantly updating our technology to support a wider range of websites and formats, ensuring that your downloading experience is seamless and of the highest quality.
          </p>
        </div>
      </section>

      {/* 5. Meet Our Founder */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>👨‍💻</div>
          <h2 className={styles.sectionHeading}>Meet Our Founder</h2>
        </div>
        
        <div className={styles.founderBox}>
          <div className={styles.founderHeader}>
            <div className={styles.avatar}>SG</div>
            <div className={styles.founderMeta}>
              <div className={styles.nameRow}>
                <h3 className={styles.founderName}>Sapreet Gujjar</h3>
                <span className={styles.verifiedBadge}>PRO DEVELOPER</span>
              </div>
              <p className={styles.founderRole}>Full Stack .NET & AI Automation Developer</p>
              <span className={styles.founderExp}>🎓 Bachelor of Computer Applications (BCA) • 3+ Years Professional Experience</span>
            </div>
          </div>

          <p className={styles.paragraph}>
            Sapreet Gujjar is a Full Stack .NET and AI Automation Developer with 3+ years of professional experience in software development and automation.
          </p>
          <p className={styles.paragraph}>
            He specializes in C#, .NET, ASP.NET Core Web API, Angular, SQL Server, Python, FastAPI, AI integrations, LLM-based solutions, RAG, and workflow automation. His experience includes designing and developing scalable web applications, REST APIs, automation systems, and AI-powered software solutions.
          </p>
          <p className={styles.paragraph}>
            Sapreet has a Bachelor of Computer Applications (BCA) background and has worked on a variety of technology projects involving backend systems, modern web applications, API integrations, automation, and AI-powered products. With a strong interest in building practical and user-focused technology, Sapreet created <strong>KingBox</strong> with the goal of providing a simple and efficient platform for online media downloading and conversion.
          </p>

          <div>
            <span className={styles.skillsLabel}>Core Technical Expertise:</span>
            <div className={styles.skillsGrid}>
              {skills.map((skill) => (
                <span key={skill} className={styles.skillBadge}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Team */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>🤝</div>
          <h2 className={styles.sectionHeading}>Our Team</h2>
        </div>
        <p className={styles.paragraph}>
          KingBox is built with a focus on reliable, efficient, and user-friendly media technology. Our development approach combines modern backend engineering, web technologies, automation, and AI-assisted solutions to continuously improve platform performance and user experience.
        </p>
      </section>

      {/* 7. Contact Us & Landmark */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>📫</div>
          <h2 className={styles.sectionHeading}>Contact Us</h2>
        </div>
        
        <p className={styles.paragraph}>
          We are always here to listen to your feedback, answer your queries, and provide assistance with any issues you might face while using our service. Your feedback is invaluable to us as it helps us improve and evolve our services to better meet your needs. For any inquiries, suggestions, or support, please do not hesitate to reach out to us.
        </p>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIconBox}>📍</div>
            <div className={styles.contactDetails}>
              <span className={styles.contactTitle}>Official Address & Landmark</span>
              <p className={styles.contactText}>
                Shaheed Udham Singh Chowk is a major landmark and intersection located in Cheeka (Chika), in the Kaithal district of Haryana, India (PIN 136034)
              </p>
            </div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIconBox}>📧</div>
            <div className={styles.contactDetails}>
              <span className={styles.contactTitle}>Support & Business Email</span>
              <div className={styles.emailRow}>
                <a href="mailto:sapreetsingh08@gmail.com" className={styles.emailAnchor}>
                  sapreetsingh08@gmail.com
                </a>
                <button type="button" className={styles.copyButton} onClick={handleCopyEmail}>
                  {copied ? '✓ Copied' : 'Copy Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
