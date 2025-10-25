import React from 'react'
import '../Styles/Landing.scss'
import Head from '../Components/Head.jsx'
import Heroo from '../Components/Heroo.jsx'
import Feature from '../Components/Feature.jsx'
import Footer from '../Components/Footer.jsx'

const Landing = () => {
  return (
    <div>
        <Head />
        <Heroo />
        <Feature />
        <Footer />
        {/* json-server --watch db.json --port 5000 */}

      
    </div>
  )
}

export default Landing
