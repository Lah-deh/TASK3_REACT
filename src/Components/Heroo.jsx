import React from 'react'
import { Link } from 'react-router-dom';

const Heroo = () => {
  return (
    <div className='hero'>
      <h2>Welcome to TechWave - Where Innovation Meets Experience.</h2>
      <p>Join us for an immersive tech event with workshops, talks, and hands-on sessions. Connect, explore trends, and grow your skills.</p>
      <button>
        <Link to={"/Register"} className='li'>Get Started</Link>
      </button>
    </div>
  )
}

export default Heroo
