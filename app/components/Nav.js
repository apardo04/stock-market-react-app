import { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';

export default function Nav({ isLoggedIn }) {
  const [signInModal, toggleSignInModal] = useState(false)
  return(
    <nav>
        <div className="left half logo">
          <a href="/"><img src="/static/images/logo.png"></img></a>
        </div>
        <div className="left half logo-text">Stock Portfolio</div>
      <style jsx>{`
        nav {
          height: 200px;
        }
        .logo-text{
          font-family: 'Cinzel', serif;
          text-align: center;
          max-width: 30%;
          font-size: 3rem;
        }
        .half {
          width: 50%;
        }
        .left {
          float: left;
          width: 33%;
        }
      `}</style>
    </nav>
  )
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool
};