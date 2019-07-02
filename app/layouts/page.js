import React, { Fragment, useEffect } from 'react';
import { initGA, logPageView } from '../utils/analytics'
import Head from '../components/Head'
import Nav from '../components/Nav'

const Page = ({ children }) => {
    useEffect(() => {
        if (!window.GA_INITIALIZED && process.env.NODE_ENV == 'production') {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
      });
    return (
        <Fragment>
            <Head title="Stockify App"/>
            <Nav />
            <main>
                {children}
            </main>
        </Fragment>
    );
}

export default Page;