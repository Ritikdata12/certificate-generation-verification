import React from 'react';
import './Facts.css';

const Facts = () => {
  const factsData = [
    { number: 232, label: 'Clients' },
    { number: 421, label: 'Projects' },
    { number: 1364, label: 'Hours Of Support' },
    { number: 38, label: 'Hard Workers' },
  ];

  return (
    <section className="facts-section">
      <div className="container">
        <h2>FACTS</h2>
        <p className="facts-description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
        <div className="facts-grid">
          {factsData.map((fact, index) => (
            <div className="fact-item" key={index}>
              <h3>{fact.number}</h3>
              <p>{fact.label}</p>
            </div>
          ))}
        </div>
        <div className="foreground-images">
          <img src= 'https://image.slidesdocs.com/responsive-images/background/navigating-the-internet-in-3d-a-laptops-web-search-journey-powerpoint-background_060d70845f__960_540.jpg' alt="Foreground Image 1" />
          <img src= 'https://image.slidesdocs.com/responsive-images/background/navigating-the-internet-in-3d-a-laptops-web-search-journey-powerpoint-background_060d70845f__960_540.jpg' alt="Foreground Image 1" />
          <img src= 'https://image.slidesdocs.com/responsive-images/background/navigating-the-internet-in-3d-a-laptops-web-search-journey-powerpoint-background_060d70845f__960_540.jpg' alt="Foreground Image 1" />
        </div>
      </div>
    </section>
  );
};

export default Facts;
