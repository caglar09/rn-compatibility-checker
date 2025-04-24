import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        RN Compatibility Checker uses a simple command-line interface.
        It analyzes your project's package.json file and quickly checks the platform compatibility of the React Native libraries you use.
      </>
    ),
  },
  {
    title: 'Comprehensive Data Source',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        By using the up-to-date data source from React Native Directory,
        it accesses compatibility information for over 1700 React Native libraries and provides accurate results for your project.
      </>
    ),
  },
  {
    title: 'Detailed Reporting',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        It checks compatibility for iOS, Android, Web, Expo Go, and the New Architecture.
        It provides detailed and summary reports, identifies unmaintained packages, and evaluates your project's platform compatibility.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
