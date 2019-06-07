import Head from './head'
import Nav from '../components/nav'
//import Footer from '../components/footer'
import React, { useEffect } from 'react';
import { string } from 'prop-types'
//import { initGA, logPageView } from '../utils/analytics'

const Layout = props => {
    useEffect(() => {
    });
    return (
        <React.Fragment>
            <Head page={props.page} title={props.title} description={props.description} />
            <Nav page={props.page} />
            {props.children}
         
        </React.Fragment>
    )
}

Layout.propTypes = {
    title: string,
    description: string,
    url: string,
    page: string,
    ogImage: string
  }

export default Layout