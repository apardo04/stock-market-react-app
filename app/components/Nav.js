import { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';

export default function Nav() {
  return(
    <nav>
        <div className="left width-33 logo">
          <a href="/"><img src="/static/images/logo.png"></img></a>
        </div>
        <div className="left width-33 logo-text">
          Stockify App<br/>
          <span className="marketing-text">Investment Portfolio</span>
        </div>
      <style jsx>{`
        nav {
          height: 160px;
        }
        .logo img {
          width:25%;
        }
        .logo-text {
          font-family: 'Cinzel', serif;
          text-align: center;
          max-width: 30%;
          font-size: 3.2rem;
        }
        .marketing-text {
            font-size: 1.8rem;
        }
        .width-33 {
          width: 33.3%;
        }
        .left {
          float: left;
        }
        @media only screen and (max-width: 768px) {
          .logo-text {
            width:80%;
          }
          .logo img {
            width:100%;
          }
          .marketing-text {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool
};