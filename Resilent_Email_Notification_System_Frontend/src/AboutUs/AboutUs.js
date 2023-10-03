
import React from 'react';
import './aboutusstyle.css';


const contributors = [
    {
      name: 'Rushikesh hulage',
      imageUrl: '../images/Rushikesh_img.jpg',
    },
    {
      name: 'Srajit Tanwar',
      imageUrl: '../images/Srajit_img.jpg',
    },
   
  ];
  
  function AboutUs() {
    return (
      <div>
        <h1>About Us</h1>
        <div className="contributors">
          {contributors.map((contributor, index) => (
            <div key={index} className="contributor">
              <img src={contributor.imageUrl} alt={contributor.name} />
              <p>{contributor.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default AboutUs;