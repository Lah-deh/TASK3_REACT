import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";


const Head = () => {
  return (
    <header>
        <div className='header'>
          <h2>Techwave</h2>
          <GiHamburgerMenu className='burger' />
        </div>

    </header>
  )
}

export default Head
