import React, {useState, useEffect} from 'react';
import './Facts.css';

const Facts = () => {
  const factsData = [
    { number: 232, label: 'Clients' },
    { number: 421, label: 'Projects' },
    { number: 1364, label: 'Hours Of Support' },
    { number: 38, label: 'Hard Workers' },
  ];

    const [rotation, setRotation] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        setRotation(scrollY * 0.05); // Adjust the multiplier to control rotation speed
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <>
    <section className="facts-section">
      <div className="container">
        <p className="forcolor">Facts And Figures</p>
        <p className="facts-description">Set ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
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


    <div className="g_circle">
      <div className="g_circle-content">
        <div className="e_circle-number">
          <img
            src="https://grow.betterup.com/hubfs/raw_assets/public/prospection-reports/inclusiveLeadership/images/1-in-4.svg"
            loading="eager"
            alt=""
          />
        </div>
        <p className="p_14">
          One in four employees still don't feel a sense of belonging. Retaining talent and driving peak performance has never been more difficult. 
        </p>
      </div>
      <div data-w-id="e55a1f23-6770-7e34-4f79-1e12a819e597" className="g_people-circle">
        <div
          className="img_outer-circle"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <img
            src="https://grow.betterup.com/hubfs/raw_assets/public/prospection-reports/inclusiveLeadership/images/outer-circle.svg"
            loading="eager"
            alt=""
            className="img_circle"
          />
        </div>
        <div
          className="img_inner-circle"
          style={{ transform: `rotate(-${rotation}deg)` }}
        >
          <img
            src="https://grow.betterup.com/hubfs/raw_assets/public/prospection-reports/inclusiveLeadership/images/inner-circle.svg"
            loading="eager"
            alt=""
            className="img_circle"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Facts;
