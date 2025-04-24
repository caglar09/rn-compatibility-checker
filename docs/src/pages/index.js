import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Quick Start - 5 min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="CLI tool for checking platform compatibility of React Native libraries">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        
        <section className={styles.section}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <h2 className={styles.sectionTitle}>Why RN Compatibility Checker?</h2>
                <p>
                  In React Native development, it is important to know which platforms your libraries support.
                  RN Compatibility Checker analyzes your project's package.json file and checks compatibility with iOS, Android, Web, Expo Go, and the New Architecture.
                </p>
                
                <div className="command-line">
                  <span className="command-line__prompt">$ </span>
                  <span className="command-line__command">npx rn-compatibility-checker ./package.json</span>
                  <div className="command-line__output">
                    ✔ package.json file read successfully.<br/>
                    Checking compatibility for project sample-react-native-project...<br/>
                    Found 11 React Native dependencies.<br/>
                    ✔ Loaded 1746 React Native libraries.<br/>
                    ✔ Platform compatibility check completed.<br/>
                  </div>
                </div>
                
                <h3>Features</h3>
                <ul>
                  <li>Automatically detects React Native dependencies in your project's package.json</li>
                  <li>Checks compatibility for iOS, Android, Web, Expo Go, and the New Architecture</li>
                  <li>Provides detailed and summary reports</li>
                  <li>Identifies unmaintained packages</li>
                </ul>
                
                <div className={styles.ctaContainer}>
                  <Link
                    className="button button--primary button--lg"
                    to="/docs/installation">
                    Installation
                  </Link>
                  <Link
                    className="button button--outline button--lg button--secondary"
                    to="/docs/usage">
                    Usage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
