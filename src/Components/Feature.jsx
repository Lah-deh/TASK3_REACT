import React from 'react'
import { SiFuturelearn } from "react-icons/si";
import { CgInsights } from "react-icons/cg";
import { SiGitconnected } from "react-icons/si";
import { FaInnosoft } from "react-icons/fa";






const features = [
  {
    title: "Hands-On Learning",
    description: "Participate in workshops led by industry experts and gain practical experience with the latest tech tools.",
    icon: <SiFuturelearn />
  },
  {
    title: "Expert Insights",
    description: "Hear from top innovators and thought leaders about emerging trends and real-world applications.",
    icon: <CgInsights />
  },
  {
    title: "Connect & Collaborate",
    description: "Meet like-minded peers, share ideas, and expand your professional network.",
    icon: <SiGitconnected />
  },
  {
    title: "Discover Innovations",
    description: "Explore cutting-edge projects and tech demonstrations shaping the future.",
    icon: <FaInnosoft />
  },
];


const Feature = () => {
  return (
    <section className="features" id='fee'>
      <h2 className="heading">Key Features</h2>
      <div className="grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            {React.cloneElement(feature.icon, { className: "icon" })}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            
          </div>
        ))}
      </div>
    </section>

  )
}

export default Feature
