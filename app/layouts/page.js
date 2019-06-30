import React, { Fragment } from 'react';
import Head from '../components/Head'
import Nav from '../components/Nav'

const Page = ({ children }) => (
    <Fragment>
        <Head title="Stockify App"/>
        <Nav />
        <main>
            {children}
        </main>
    </Fragment>
);

export default Page;