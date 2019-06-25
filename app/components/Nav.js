import { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';

export default function Nav() {
  return(
    <nav>
        <div className="left width logo">
          <a href="/"><img src="/static/images/logo.png"></img></a>
        </div>
        <div className="left width logo-text">Stock Portfolio</div>
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
          font-size: 3rem;
        }
        .width {
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
        }
      `}</style>
    </nav>
  )
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool
};