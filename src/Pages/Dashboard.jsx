import React from 'react'
import Head4 from '../Components/Head4.jsx'
import '../Styles/Dashboard.scss'
import Stats from '../Components/Stats.jsx'
import Foot from '../Components/Foot.jsx'

const Dashboard = () => {
  return (
    <div>
      <Head4 /><hr/>
      <Stats/>
      <Foot/>
    </div>
  )
}

export default Dashboard
