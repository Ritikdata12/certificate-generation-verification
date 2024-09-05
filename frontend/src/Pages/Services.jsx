import React from 'react';
import './Services.css';
import { motion } from "framer-motion"
import { fadeIn } from '../Framers';

const Services = () => {
  const servicesData = [
    {
      icon: '📧',
      title: 'Lorem Ipsum',
      description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
    },
    {
      icon: '📋',
      title: 'Dolor Sitema',
      description: 'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata',
    },
    {
      icon: '📊',
      title: 'Sed ut perspiciatis',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    },
    {
      icon: '🔍',
      title: 'Magni Dolores',
      description: 'Excepturi sint occaecat cupiditate non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    },
    {
      icon: '💡',
      title: 'Nemo Enim',
      description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque',
    },
    {
      icon: '📅',
      title: 'Eiusmod Tempor',
      description: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
    },
    {
        icon: '💡',
        title: 'Nemo Enim',
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque',
      },
      {
        icon: '📅',
        title: 'Eiusmod Tempor',
        description: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
      },
  ];

  return (
    <motion.div
    initial="hidden"
    whileInView="show" 
      variants={fadeIn('left', 0.01)} 
      viewport={{ once: false, amount: 0.2 }}
  >
    <section className="services-section">
      <div className="container">
        <h2>SERVICES</h2>
        <p className="description">Laudem latine persequeris id sed, ex fabulas delectus quo. No vel partiendo abhorreant vituperatoribus, ad pro quaestio laboramus. Ei ubique vivendum pro. At ius nisl accusam lorenta zanos paradigma tridexa panatarel.</p>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className="service-item" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </motion.div>
  );
};

export default Services;
