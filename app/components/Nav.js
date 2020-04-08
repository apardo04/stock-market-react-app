import PropTypes from 'prop-types';
import { Row } from 'antd';

export default function Nav() {
  return(
    <Row type="flex" justify="center">
      <div className="left whole medium-one-thirds logo">
        <a href="/"><img src="/images/logo.png"></img></a>
      </div>
      <div className="left whole medium-one-thirds medium-one-thirds-margin-right logo-text">
        Stockify App<br/>
        <span className="marketing-text">Investment Portfolio</span>
      </div>
      <style jsx>{`
        .whole {
            width: 100%;
        }
        nav {
          height: auto;
        }
        .logo img {
          width:25%;
        }
        .logo-text {
          font-family: 'Cinzel', serif;
          text-align: center;
          font-size: 3.2rem;
        }
        .marketing-text {
            font-size: 1.8rem;
        }
        /* Desktop CSS */
        @media only screen and (min-width: 768px) {
          .medium-one-thirds {
                width: 33.3%;
            }
            .medium-one-thirds-margin-right {
                margin-right: 33.3%;
            }  
        }
        @media only screen and (max-width: 768px) {
          .logo img {
            width: 40%;
            margin: 0 auto;
            display: block;
          }
          .marketing-text {
            display: none;
          }         
        }
      `}</style>
    </Row>
  )
}

Nav.propTypes = {
  isLoggedIn: PropTypes.bool
};